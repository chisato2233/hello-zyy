"use client";

import { useRef } from 'react';

export default function ContentSection() {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // 获取鼠标/触摸位置
  const getMousePosition = (event) => {
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };

    const containerRect = container.getBoundingClientRect();
    
    // 处理触摸事件
    if (event.touches && event.touches.length > 0) {
      return {
        x: event.touches[0].clientX - containerRect.left,
        y: event.touches[0].clientY - containerRect.top
      };
    }
    
    // 处理鼠标事件
    return {
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top
    };
  };

  // 粒子爆炸效果
  const createParticleExplosion = (event) => {
    const button = buttonRef.current;
    const container = containerRef.current;
    
    if (!button || !container) return;

    // 获取点击/触摸位置
    const mousePosition = getMousePosition(event);
    const centerX = mousePosition.x;
    const centerY = mousePosition.y;

    // 创建多个粒子
    const particles = ['😭','🤣','😊','🤩','🤔','🤨','🤯',];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      createParticle(centerX, centerY, particles[Math.floor(Math.random() * particles.length)]);
    }

    // 按钮反馈动画
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
  };

  const createParticle = (x, y, emoji) => {
    const particle = document.createElement('div');
    particle.textContent = emoji;
    particle.className = 'particle';
    
    // 随机方向和速度
    const angle = (Math.PI * 2 * Math.random());
    const velocity = 100 + Math.random() * 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 50; // 向上的初始速度
    
    // 设置初始样式
    Object.assign(particle.style, {
      position: 'absolute',
      left: x + 'px',
      top: y + 'px',
      fontSize: '20px',
      pointerEvents: 'none',
      zIndex: '1000',
      userSelect: 'none',
    });

    containerRef.current.appendChild(particle);

    // 动画参数
    let currentX = x;
    let currentY = y;
    let currentVx = vx;
    let currentVy = vy;
    const gravity = 100; // 重力加速度
    const startTime = Date.now();
    const duration = 3000; // 2秒动画

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      if (elapsed > duration / 1000) {
        particle.remove();
        return;
      }

      // 物理计算：抛物线运动
      currentX += currentVx * 0.016; // 假设60fps
      currentY += currentVy * 0.016;
      currentVy += gravity * 0.016; // 重力影响

      // 更新位置
      particle.style.left = currentX + 'px';
      particle.style.top = currentY + 'px';
      
      // // 淡出效果
      // const opacity = Math.max(0, 1 - elapsed * 2);
      // particle.style.opacity = opacity;
      
      // // 旋转效果
      // const rotation = elapsed * 360;
      // particle.style.transform = `rotate(${rotation}deg) scale(${1 - elapsed * 0.5})`;

      requestAnimationFrame(animate);
    };

    animate();
  };

  return (
    <section ref={containerRef} className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* 内容卡片 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/40">
            <h3 className="text-2xl font-light bg-gradient-to-r from-sky-500 to-pink-400 bg-clip-text text-transparent mb-4">Reflection</h3>
            <p className="text-slate-500 leading-relaxed">
              锐意开发中
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/40">
            <h3 className="text-2xl font-light bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-4">Connection</h3>
            <p className="text-slate-500 leading-relaxed">
              玩命。。。玩命开发中  
            </p>
          </div>
        </div>

        {/* 交互按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-3 bg-gradient-to-r from-sky-400 via-pink-400 to-rose-400 text-white rounded-full font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            按一下试试
          </button>
          <button 
            ref={buttonRef}
            onClick={createParticleExplosion}
            onTouchStart={createParticleExplosion}
            className="px-8 py-3 bg-white/70 backdrop-blur-md text-slate-400 rounded-full font-light border border-white/50 transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95 select-none"
          >
            骗你的按了也没用
          </button>
        </div>
      </div>
    </section>
  );
}
