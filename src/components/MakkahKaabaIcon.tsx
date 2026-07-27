import React from 'react';

interface MakkahKaabaIconProps {
  size?: number;
  className?: string;
}

export const MakkahKaabaIcon: React.FC<MakkahKaabaIconProps> = ({ size = 34, className = '' }) => (
  <div className={`relative flex items-center justify-center pointer-events-none ${className}`}>
    <div className="absolute w-10 h-10 rounded-full bg-[#FFD700]/50 blur-md animate-pulse"></div>
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="relative z-10 filter drop-shadow-[0_0_14px_rgba(255,215,0,0.95)]"
    >
      {/* Outer Hexagon Frame */}
      <path d="M32 4L58 17V43L32 56L6 43V17L32 4Z" fill="#080C0B" stroke="#FFD700" strokeWidth="2.5" />
      {/* Top Roof */}
      <path d="M32 4L58 17L32 29L6 17L32 4Z" fill="#182520" stroke="#C5A059" strokeWidth="1.5" />
      {/* Left Wall */}
      <path d="M6 17L32 29V56L6 43V17Z" fill="#0A0E0D" stroke="#C5A059" strokeWidth="1.5" />
      {/* Right Wall */}
      <path d="M32 29L58 17V43L32 56V29Z" fill="#121D19" stroke="#C5A059" strokeWidth="1.5" />
      {/* Gold Kiswah Belt */}
      <path d="M6 23L32 35L58 23" stroke="#FFD700" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M6 25L32 37L58 25" stroke="#FFF1CB" strokeWidth="1" strokeLinecap="round" />
      {/* Golden Door */}
      <rect x="37" y="36" width="7" height="13" rx="1" fill="#FFD700" stroke="#B38728" strokeWidth="1" />
      <line x1="40.5" y1="36" x2="40.5" y2="49" stroke="#8C671F" strokeWidth="1" />
    </svg>
  </div>
);
