'use client';
import React from 'react';

interface BanterLoaderProps {
  variant?: 'primary' | 'white' | 'slate';
  label?: string;
  className?: string;
  fullScreen?: boolean;
}

export default function BanterLoader({
  variant = 'primary',
  label,
  className = '',
  fullScreen = false,
}: BanterLoaderProps) {
  const variantClass = 
    variant === 'white' 
      ? 'banter-loader--white' 
      : variant === 'slate' 
        ? 'banter-loader--slate' 
        : '';

  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-[72px] h-[72px] my-[10px]">
        {/* From Uiverse.io by Nawsome */}
        <div className={`banter-loader ${variantClass}`}>
          <div className="banter-loader__box" />
          <div className="banter-loader__box" />
          <div className="banter-loader__box" />
          <div className="banter-loader__box" />
          <div className="banter-loader__box" />
          <div className="banter-loader__box" />
          <div className="banter-loader__box" />
          <div className="banter-loader__box" />
          <div className="banter-loader__box" />
        </div>
      </div>
      {label && (
        <p className="mt-[16px] text-[12px] font-medium tracking-wide text-slate-500 animate-pulse">
          {label}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-xs transition-opacity duration-200">
        {content}
      </div>
    );
  }

  return content;
}
