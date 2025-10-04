"use client";

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeDCardDemo from './3DPhoto';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger);

const PhotoSection = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const photosRef = useRef(null);
  const titleRef = useRef(null);
  
  // 照片数据 - 使用public文件夹中的本地图片
  const photos = [
    {
      title: "芒果白雪黑糯米",
      description: "最喜欢的美食？",
      src: "/images/mj.jpg",
      alt: "芒果白雪黑糯米"
    },
    {
      title: "冬天", 
      description: "紫色的围巾（？盲猜男友送的）",
      src: "/images/cold.jpg",
      alt: "回忆2"
    },
    {
      title: "HPM",
      description: "终于上殿堂了",
      src: "/images/hpm.jpg",
      alt: "回忆3"
    },
    {
      title: "服装",
      description: "是不是唯一的成套的衣服......",
      src: "/images/special.jpg",
      alt: "回忆4"
    },
    {
      title: "臭袜子",
      description: "我也不知道为啥你这么喜欢拍袜子的图片",
      src: "/images/111.jpg",
      alt: "回忆5"
    },
    {
      title: "森林！",
      description: "不知道放什么图片了，于是随便放了一个凑数",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "回忆6"
    }
  ];

  // 现代化GSAP动画初始化
  useEffect(() => {
    const container = containerRef.current;
    const photos = photosRef.current;
    const title = titleRef.current;
    
    if (!container || !photos || !title) return;

    // 现代化滚动距离计算
    const photoWidth = 400; // 每张照片宽度
    const gap = 32; // gap-8 = 32px
    const viewportWidth = window.innerWidth;
    
    // 计算总的照片宽度（不包括padding）
    const totalPhotosWidth = photos.children.length * (photoWidth + gap) - gap; // 最后一张照片没有gap
    
    // 计算需要滚动的距离：总宽度减去一个视口宽度
    const scrollDistance = totalPhotosWidth - viewportWidth + viewportWidth; // 确保最后一张照片完全可见
    
    console.log('现代化滚动计算:', { 
      photoCount: photos.children.length,
      totalPhotosWidth, 
      viewportWidth, 
      scrollDistance 
    });

    // 设置初始状态
    gsap.set(title, { y: 100, scale: 0.8, opacity: 0 });
    gsap.set(photos, { x: "100%" });

    // 1. 标题动画 - 创造滞留效果，让标题在横向滚动期间保持在视口中
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: () => `+=${scrollDistance + 500}`, // 延长动画范围，覆盖整个横向滚动期间
        scrub: 1,
        markers: false,
      }
    })
    .to(title, {
      y: -50,
      scale: 1.2,
      opacity: 1,
      duration: 0.3, // 快速进入
      ease: "power2.out"
    })
    .to(title, {
      y: -80, // 继续轻微上移，创造滞留感
      scale: 1.1, // 轻微缩小
      duration: 0.4, // 滞留阶段
      ease: "none"
    })
    .to(title, {
      y: -120, // 最终离开
      scale: 0.9,
      opacity: 0.8,
      duration: 0.3, // 缓慢离开
      ease: "power2.in"
    });

    // 2. 照片容器滑入 - 与标题滞留效果配合
    gsap.to(photos, {
      x: "0%",
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 60%", // 稍微延后，让标题先稳定
        end: "top 30%", // 更快完成滑入
        scrub: 1,
        markers: false,
      }
    });

    // 3. 主要横向滚动 - 以照片容器为中心触发
    const horizontalTween = gsap.to(photos.children, {
      xPercent: -100 * (photos.children.length - 1),
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: photos, // 🎯 关键改动：以照片容器为触发目标
      start: "center center", // 照片容器中心到达视口中心时开始
      end: () => `+=${scrollDistance}`,
      pin: container, // 固定整个容器
      scrub: 1,
      animation: horizontalTween,
      anticipatePin: 1,
      invalidateOnRefresh: false,
      markers: true,
      onUpdate: (self) => {
        console.log('横向滚动进度:', Math.round(self.progress * 100) + '%');
        
        if (self.isActive) {
          document.body.style.overflowX = 'hidden';
        }
      },
      onToggle: (self) => {
        if (!self.isActive) {
          document.body.style.overflowX = 'auto';
        }
      },
      onEnter: () => console.log('照片容器到达中心，开始横向滚动'),
      onLeave: () => console.log('横向滚动完成'),
    });

    // 鼠标悬停效果
    Array.from(photos.children).forEach((photo) => {
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl.to(photo, {
        scale: 1.05,
        rotateY: 5,
        z: 50,
        duration: 0.3,
        ease: "power2.out"
      });

      photo.addEventListener('mouseenter', () => hoverTl.play());
      photo.addEventListener('mouseleave', () => hoverTl.reverse());
    });

    // 清理函数 - 确保正确清理所有ScrollTrigger
    return () => {
      document.body.style.overflowX = 'auto';
      
      // 清理与当前容器相关的所有ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill(false); // false参数防止重置动画
        }
      });
      
      // 清理所有相关的GSAP动画
      gsap.killTweensOf([title, photos, photos.children]);
    };
  }, []);

  return (
    <section 
      ref={ref}
      className="relative photo-section overflow-hidden"
      style={{ minHeight: '200vh' }} // 增加高度确保动画完整播放
    >
      {/* 多层背景效果 */}
      <div className="absolute inset-0">
        {/* 主背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />

        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99,102,241,0.3) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>
      
      <div 
        ref={containerRef} 
        className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      >
        {/* 增强的标题设计 */}
        <div ref={titleRef} className="text-center mb-8 relative">
          {/* 标题背景装饰 */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl" />
          </div>
          
          {/* 主标题 */}
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 leading-tight">
              美好回忆照片墙
            </h2>
            
            {/* 标题下划线装饰 */}
            <div className="flex justify-center mb-2">
              <div className="h-1 w-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* 照片容器 - 现代化横向布局 */}
        <div className="relative overflow-hidden rounded-2xl w-full">
          {/* 照片容器背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl" />
          
          {/* 照片轨道 - 精确计算宽度 */}
          <div 
            ref={photosRef}
            className="flex gap-8 relative z-10 py-8"
            style={{ 
              width: `${photos.length * 432}px`, // 400px照片 + 32px gap
              paddingLeft: '50vw', // 使用视口宽度的一半作为起始留白
              paddingRight: '50vw', // 使用视口宽度的一半作为结束留白
            }}
          >
            {photos.map((photo, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-96 transform-gpu relative group"
                style={{ perspective: '1000px' }}
              >
                <ThreeDCardDemo photo={photo} index={index} />
              </div>
            ))}
          </div>
          
          {/* 轨道边缘渐变遮罩 */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-indigo-50 to-transparent pointer-events-none z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-pink-50 to-transparent pointer-events-none z-20" />
        </div>

      </div>
    </section>
  );
});

PhotoSection.displayName = 'PhotoSection';

export default PhotoSection;