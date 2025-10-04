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

  const handleLoadingComplete = () => {
    setIsLoading(false);
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
          <BackgroundEffects />
          <div className="relative z-10">
            <HeroSection />
            
            {/* PhotoSection前的分割条 */}
            <div className="relative z-20">
              <div className="h-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 shadow-lg" />
              <div className="h-1 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300" />
            </div>
            
            <PhotoSection ref={photoSectionRef} />
            
            {/* PhotoSection后的分割条 */}
            <div className="relative z-20">
              <div className="h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300" />
              <div className="h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 shadow-lg" />
            </div>
            
            <ContentSection />
          </div>
        </div>
      )}
    </>
  );
}