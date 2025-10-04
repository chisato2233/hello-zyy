"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './components/LoadingScreen';
import BackgroundEffects from './components/BackgroundEffects';
import HeroSection from './components/HeroSection';
import PhotoSection from './components/PhotoSection';
import ContentSection from './components/ContentSection';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const photoSectionRef = useRef(null);
  const backgroundEffectsRef = useRef(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // 背景颜色变化处理函数
  const handleBackgroundChange = (darkProgress) => {
    if (backgroundEffectsRef.current) {
      backgroundEffectsRef.current.setDarkProgress(darkProgress);
    }
  };

  // 初始化完成后刷新ScrollTrigger
  useEffect(() => {
    if (isLoading) return;
    
    // 延迟刷新确保所有元素都已渲染
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <div className="min-h-screen relative overflow-hidden scrollbar-hide">
          <BackgroundEffects ref={backgroundEffectsRef} />
          <div className="relative z-10">
            <HeroSection />
            
            
            <PhotoSection 
              ref={photoSectionRef} 
              onBackgroundChange={handleBackgroundChange}
            />
            
            
            <ContentSection />
          </div>
        </div>
      )}
    </>
  );
}