export default function BackgroundEffects() {
  return (
    <>
      {/* 淡粉淡蓝渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-pink-100 to-rose-50"></div>
      
      {/* 光晕效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-60 right-10 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-32 left-1/4 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-28 animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-22 animate-pulse animation-delay-6000"></div>
      </div>
    </>
  );
}
