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
      <path d="M32 4L58 17V43L32 56L6 43V17L32 4Z" fill="#050B14" stroke="#FFD700" strokeWidth="2.5" />
      {/* Top Roof */}
      <path d="M32 4L58 17L32 29L6 17L32 4Z" fill="#182520" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Left Wall */}
      <path d="M6 17L32 29V56L6 43V17Z" fill="#0A0E0D" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Right Wall */}
      <path d="M32 29L58 17V43L32 56V29Z" fill="#121D19" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Gold Kiswah Belt */}
      <path d="M6 23L32 35L58 23" stroke="#FFD700" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M6 25L32 37L58 25" stroke="#FFF1CB" strokeWidth="1" strokeLinecap="round" />
      {/* Golden Door */}
      <rect x="37" y="36" width="7" height="13" rx="1" fill="#FFD700" stroke="#B38728" strokeWidth="1" />
      <line x1="40.5" y1="36" x2="40.5" y2="49" stroke="#8C671F" strokeWidth="1" />
    </svg>
  </div>
);

export const MadinahMosqueIcon: React.FC<MakkahKaabaIconProps> = ({ size = 34, className = '' }) => (
  <div className={`relative flex items-center justify-center pointer-events-none ${className}`}>
    <div className="absolute w-10 h-10 rounded-full bg-sky-500/40 blur-md animate-pulse"></div>
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="relative z-10 filter drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]"
    >
      {/* Outer Circle */}
      <circle cx="32" cy="32" r="28" fill="#050B14" stroke="#10B981" strokeWidth="2" />
      {/* Green Dome */}
      <path d="M18 36C18 24 24 16 32 16C40 16 46 24 46 36H18Z" fill="#10B981" stroke="#34D399" strokeWidth="1.5" />
      {/* Crescent Finial */}
      <path d="M32 8V16" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 9C32 9 33.5 10.5 33.5 12.5C33.5 14.5 32 16 30 16C31 16 32.5 14.5 32.5 12.5C32.5 10.5 31 9 30 9Z" fill="#FFD700" />
      {/* Base Building */}
      <rect x="16" y="36" width="32" height="16" rx="2" fill="#121D19" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Arch Doors */}
      <path d="M22 52V42C22 40 24 38 26 38C28 38 30 40 30 42V52H22Z" fill="#050B14" stroke="#FFD700" strokeWidth="1" />
      <path d="M34 52V42C34 40 36 38 38 38C40 38 42 40 42 42V52H34Z" fill="#050B14" stroke="#FFD700" strokeWidth="1" />
    </svg>
  </div>
);

