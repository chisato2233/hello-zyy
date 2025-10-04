"use client";
import { motion } from "framer-motion";
import { NumberTicker } from "../../components/ui/number-ticker";

export default function HeroSection() {
  // 计算相识天数：从 2018-6-30 到今天
  const startDate = new Date('2018-06-30');
  const today = new Date();
  const daysDifference = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  return (
    <motion.section 
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-light mb-8 bg-gradient-to-r from-sky-500 via-pink-400 to-rose-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Zyy 你好呀！
        </motion.h1>
        
        <motion.div 
          className="w-24 h-0.5 bg-gradient-to-r from-sky-300 via-pink-300 to-rose-300 mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        
        {/* 相识天数计数器 */}
        <motion.div 
          className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/40 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div 
            className="flex text-sm md:text-base text-slate-400 font-light mb-2 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            今天是我们相识的：
          </motion.div>
          <div className="flex items-baseline justify-center space-x-2">
            <NumberTicker
              value={daysDifference}
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent"
              delay={2.5}
            />
            <motion.span 
              className="text-2xl md:text-3xl text-slate-300 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              天
            </motion.span>
          </div>
          <motion.div 
            className="flex justify-end text-xs md:text-sm text-slate-300 mt-3 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
          >
            - 从 2018年6月30日 开始
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}