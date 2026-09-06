'use client';
import { useState, useRef, useEffect } from 'react';
import { Gift, Sparkles, X, Clock, AlertCircle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GiftRewardButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lock dashboard movement when gift dropdown is open
  useEffect(() => {
    if (!dropdownOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="relative h-[30px] px-[8px] sm:px-[9px] rounded-[8px] bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-2xs flex items-center gap-[5px] transition-all duration-150 active:scale-[0.98] group cursor-pointer"
        aria-label="Reseller Rewards & Gift"
        aria-expanded={dropdownOpen}
        title="Reseller Rewards & Gift"
      >
        {/* Animated Gift Icon */}
        <div className="relative flex items-center justify-center">
          <Gift size={14} className="text-amber-600 group-hover:text-amber-700" />
        </div>

        {/* Label visible on sm+ screens */}
        <span className="font-semibold text-[11px] text-slate-700 tracking-tight hidden sm:inline-block">
          Gift
        </span>

        <span className="w-[5px] h-[5px] rounded-full bg-amber-500 animate-pulse hidden min-[440px]:block" />
      </button>

      {/* Professional Feature Unavailable Dropdown */}
      <AnimatePresence>
        {dropdownOpen && (
          <>
            {/* Backdrop to close and prevent body scrolling */}
            <div 
              className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[0.5px]"
              onClick={() => setDropdownOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full right-0 mt-[8px] w-[290px] max-w-[calc(100vw-20px)] bg-white rounded-[16px] border border-slate-200 shadow-[0_16px_36px_-8px_rgba(15,23,42,0.18),0_6px_16px_-4px_rgba(0,0,0,0.06)] z-50 overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-[12px] pb-[10px] bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[24px] h-[24px] rounded-[6px] bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700">
                    <Gift size={13} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-[12.5px] font-bold text-slate-800 tracking-tight leading-none">
                      Gift & Rewards Hub
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => setDropdownOpen(false)}
                  className="w-[22px] h-[22px] rounded-[6px] bg-slate-100 hover:bg-slate-200 active:scale-[0.94] flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  aria-label="Close gift menu"
                  title="Close"
                >
                  <X size={13} strokeWidth={2.2} />
                </button>
              </div>

              {/* Feature Unavailable Body with Custom SVG Illustration */}
              <div className="p-[16px] flex flex-col items-center text-center">
                {/* Clean Professional SVG Illustration */}
                <div className="w-[72px] h-[72px] rounded-full bg-amber-50/80 border border-amber-100 flex items-center justify-center mb-[12px] relative">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Gift Box Base */}
                    <rect x="10" y="20" width="28" height="20" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.8" />
                    {/* Gift Box Lid */}
                    <rect x="8" y="15" width="32" height="7" rx="2" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.8" />
                    {/* Vertical Ribbon */}
                    <rect x="22" y="15" width="4" height="25" fill="#F59E0B" />
                    {/* Ribbon Bow */}
                    <path d="M19 12C19 9.5 21.5 8 23.5 10C24 10.5 24 15 24 15C24 15 20.5 14.5 19 12Z" fill="#F59E0B" />
                    <path d="M29 12C29 9.5 26.5 8 24.5 10C24 10.5 24 15 24 15C24 15 27.5 14.5 29 12Z" fill="#F59E0B" />
                    {/* Maintenance Gear / Clock Pill */}
                    <circle cx="36" cy="36" r="8" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M36 32V36L38.5 38.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold tracking-wide uppercase mb-[6px]">
                  <Clock size={11} className="text-amber-600" />
                  <span>Feature Unavailable</span>
                </div>

                <h3 className="text-[14px] font-bold text-slate-900 tracking-tight leading-snug">
                  Gift Rewards Coming Soon
                </h3>

                <p className="text-[11.5px] text-slate-500 leading-relaxed mt-[4px] max-w-[240px]">
                  The Gift & Promo Voucher system is currently undergoing scheduled platform upgrades and will be enabled in our next release.
                </p>

                {/* Flat Action Button */}
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="mt-[14px] w-full h-[34px] rounded-[8px] bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-semibold text-[12px] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
