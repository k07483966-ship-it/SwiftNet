'use client';
import React from 'react';

export function MTNLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`rounded-full bg-[#FFCC00] flex items-center justify-center p-[2px] shadow-2xs border border-amber-400/80 ${className}`}>
      <svg viewBox="0 0 100 60" className="w-full h-full" fill="none">
        <ellipse cx="50" cy="30" rx="46" ry="26" stroke="#000000" strokeWidth="6" fill="#FFCC00" />
        <text
          x="50"
          y="38"
          fontSize="23"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          fill="#000000"
          letterSpacing="-0.8"
        >
          MTN
        </text>
      </svg>
    </div>
  );
}

export function TelecelLogo({
  className = "w-6 h-6",
  variant = "white"
}: {
  className?: string;
  variant?: "red" | "white";
}) {
  return (
    <div
      className={`rounded-full ${
        variant === 'white'
          ? 'bg-white text-[#E60000] border border-red-200'
          : 'bg-[#E60000] text-white border border-red-700'
      } flex items-center justify-center shadow-2xs ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-[70%] h-[70%]" fill="currentColor">
        {/* Telecel distinct dot */}
        <circle cx="68" cy="26" r="9.5" />
        {/* Telecel lowercase 't' */}
        <path d="M42 22 V40 H25 V55 H42 V78 C42 87 47 92 57 92 H70 V77 H59 C56 77 56 75 56 71 V55 H72 V40 H56 V22 Z" />
      </svg>
    </div>
  );
}

export function AirtelTigoLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`rounded-full bg-white flex items-center justify-center overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#002D62" />
        {/* Red swirl wave */}
        <path d="M18 70 C 18 38, 52 18, 82 34 C 72 66, 38 82, 18 70 Z" fill="#E21B22" />
        {/* AT Brandmark */}
        <text
          x="50"
          y="58"
          fontSize="24"
          fontWeight="900"
          fontStyle="italic"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          fill="#FFFFFF"
          letterSpacing="-1"
        >
          AT
        </text>
      </svg>
    </div>
  );
}

export function WAECLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`rounded-full bg-[#1F3E7C] text-[#FBB03B] flex items-center justify-center font-bold text-[8.5px] border border-blue-900 shadow-2xs ${className}`}>
      <span className="tracking-tighter">WAEC</span>
    </div>
  );
}
