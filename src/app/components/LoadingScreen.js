"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return Math.min(prev + 1, 100);
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-50 via-pink-50 to-rose-100 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.2,
        filter: "blur(10px)",
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
    >
      {/* 背景光晕效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        {/* 主标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-sky-400 via-pink-400 to-rose-400 bg-clip-text text-transparent mb-6 leading-tight">
            Loading
          </h1>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-sky-300 via-pink-300 to-rose-300 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
        </motion.div>

        {/* 进度条区域 - 居中显示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="w-full max-w-2xl"
        >
          {/* 进度百分比显示 */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-500 to-pink-500 bg-clip-text text-transparent tabular-nums">
              {Math.floor(progress)}%
            </div>
            <div className="text-sm text-slate-400 mt-2 font-light tracking-wider">
              Preparing something special...
            </div>
          </motion.div>
          
          {/* 居中的进度条 */}
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 via-pink-400 to-rose-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* 装饰元素 */}
        <motion.div
          className="absolute -top-8 -right-8"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-60" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-6 -left-6"
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full opacity-50" />
        </motion.div>
      </div>
    </motion.div>
  );
}
