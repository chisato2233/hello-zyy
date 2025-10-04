"use client";

import { useState, useImperativeHandle, forwardRef } from 'react';

const BackgroundEffects = forwardRef((props, ref) => {
  const [darkProgress, setDarkProgress] = useState(0);

  // 暴露控制接口给父组件
  useImperativeHandle(ref, () => ({
    setDarkProgress: (progress) => {
      setDarkProgress(Math.max(0, Math.min(1, progress)));
    }
  }));

  // 计算颜色插值
  const interpolateColor = (lightColor, darkColor, progress) => {
    const light = lightColor.match(/\w\w/g).map(x => parseInt(x, 16));
    const dark = darkColor.match(/\w\w/g).map(x => parseInt(x, 16));
    
    const r = Math.round(light[0] + (dark[0] - light[0]) * progress);
    const g = Math.round(light[1] + (dark[1] - light[1]) * progress);
    const b = Math.round(light[2] + (dark[2] - light[2]) * progress);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // 动态背景颜色 - 更深邃优雅的深色
  const bgColor1 = interpolateColor('e0f2fe', '020617', darkProgress); // sky-100 to slate-950
  const bgColor2 = interpolateColor('fce7f3', '0c0a09', darkProgress); // pink-100 to stone-950
  const bgColor3 = interpolateColor('fdf2f8', '000000', darkProgress); // rose-50 to pure black

  // 动态光晕颜色和透明度 - 深色时几乎消失
  const haloOpacity = 0.3 * (1 - darkProgress * 0.9); // 深色时大幅减少光晕

  return (
    <>
      {/* 动态渐变背景 */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom right, ${bgColor1}, ${bgColor2}, ${bgColor3})`
        }}
      />
      
      {/* 动态光晕效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{
            backgroundColor: interpolateColor('7dd3fc', '1e293b', darkProgress), // sky-300 to slate-800
            opacity: haloOpacity
          }}
        />
        <div 
          className="absolute top-60 right-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{
            backgroundColor: interpolateColor('f9a8d4', '292524', darkProgress), // pink-300 to stone-800
            opacity: haloOpacity * 0.8,
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute bottom-32 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{
            backgroundColor: interpolateColor('a7f3d0', '1c1917', darkProgress), // emerald-200 to stone-900
            opacity: haloOpacity * 0.9,
            animationDelay: '4s'
          }}
        />
        <div 
          className="absolute bottom-20 right-1/3 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{
            backgroundColor: interpolateColor('fda4af', '0c0a09', darkProgress), // rose-300 to stone-950
            opacity: haloOpacity * 0.7,
            animationDelay: '6s'
          }}
        />
      </div>

      {/* 深色模式时的优雅纹理 */}
      {darkProgress > 0.2 && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: darkProgress * 0.02, // 更微妙的纹理
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '80px 80px' // 更大的网格
          }}
        />
      )}
      
      {/* 深色时的边缘渐变 */}
      {darkProgress > 0.5 && (
        <>
          <div 
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              opacity: darkProgress * 0.8,
              background: `linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)`
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              opacity: darkProgress * 0.8,
              background: `linear-gradient(to top, rgba(0,0,0,0.3), transparent)`
            }}
          />
        </>
      )}
    </>
  );
});

BackgroundEffects.displayName = 'BackgroundEffects';

export default BackgroundEffects;
