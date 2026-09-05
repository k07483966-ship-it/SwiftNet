'use client';
import { useState, useRef, useEffect } from 'react';
import { Gift, Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GiftRewardButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);
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
        className="relative h-[30px] px-[8px] sm:px-[9px] rounded-[9px] bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100/90 hover:to-orange-100/90 border border-amber-200/80 shadow-[0_1px_2px_rgba(245,158,11,0.12)] flex items-center gap-[5px] transition-all duration-180 active:scale-[0.96] group cursor-pointer"
        aria-label="Reseller Rewards & Daily Gift"
        aria-expanded={dropdownOpen}
        title="Reseller Rewards & Daily Gift"
      >
        {/* Animated Gift Icon */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{
              rotate: [0, -9, 9, -7, 7, 0],
              scale: [1, 1.08, 1.08, 1.04, 1.04, 1]
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "easeInOut"
            }}
            className="text-amber-600 group-hover:text-amber-700"
          >
            <Gift size={15} strokeWidth={2.2} className="drop-shadow-2xs" />
          </motion.div>

          {/* Glowing active notification ping */}
          {!claimed && (
            <span className="absolute -top-[3px] -right-[4px] flex h-[6px] w-[6px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-rose-500" />
            </span>
          )}
        </div>

        {/* Label visible on sm+ screens */}
        <span className="font-semibold text-[10.5px] text-amber-900 tracking-tight hidden sm:inline-block">
          {claimed ? 'Claimed' : 'Gift'}
        </span>

        <Sparkles size={10} className="text-amber-500 hidden min-[440px]:block animate-pulse" />
      </button>

      {/* Actual Anchored Gift Dropdown */}
      <AnimatePresence>
        {dropdownOpen && (
          <>
            {/* Backdrop to close and prevent body scrolling */}
            <div 
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[0.5px]"
              onClick={() => setDropdownOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full right-0 mt-[8px] w-[268px] max-w-[calc(100vw-20px)] bg-white rounded-[15px] border border-amber-200/90 shadow-[0_16px_36px_-8px_rgba(245,158,11,0.22),0_6px_16px_-4px_rgba(0,0,0,0.06)] z-50 overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Banner */}
              <div className="p-[10px] px-[12px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[22px] h-[22px] rounded-[6px] bg-white/20 flex items-center justify-center text-white">
                    <Gift size={12} strokeWidth={2.4} />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold tracking-tight leading-none">Daily Agent Gift</h4>
                    <span className="text-[9.5px] text-amber-100 leading-none">Active Bonus for ktech</span>
                  </div>
                </div>

                <button
                  onClick={() => setDropdownOpen(false)}
                  className="w-[22px] h-[22px] rounded-full bg-black/15 hover:bg-black/25 active:scale-[0.94] flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Close gift menu"
                  title="Close"
                >
                  <X size={12} strokeWidth={2.4} />
                </button>
              </div>

              {/* Compact Bonus Box */}
              <div className="p-[10px]">
                <div className="p-[8px] px-[10px] rounded-[10px] bg-amber-50/80 border border-amber-200/70 flex items-center justify-between">
                  <div>
                    <div className="text-[9.5px] font-bold uppercase tracking-wider text-amber-800">
                      Streak Day 3
                    </div>
                    <div className="text-[13.5px] font-bold text-slate-800 leading-tight mt-[1px]">
                      ₵2.50 Free Cashback
                    </div>
                    <div className="text-[9px] text-slate-500 mt-[1px]">
                      Auto-applied to MTN & Telecel bulk orders
                    </div>
                  </div>
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-amber-100/90 flex items-center justify-center text-amber-800 font-bold text-[13px] flex-shrink-0">
                    🎁
                  </div>
                </div>

                <div className="mt-[8px] flex items-center justify-between text-[10px] text-slate-500 px-[2px]">
                  <span>Expires in: <strong className="text-slate-700">14h 22m</strong></span>
                  <span className="text-emerald-600 font-medium flex items-center gap-[2px]">
                    <Check size={10} strokeWidth={2.5} /> Active
                  </span>
                </div>

                {/* Claim CTA */}
                <div className="mt-[10px]">
                  {claimed ? (
                    <div className="h-[30px] w-full rounded-[8px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-[11px] flex items-center justify-center gap-[5px]">
                      <Check size={12} strokeWidth={2.5} className="text-emerald-600" />
                      <span>Claimed to Wallet!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setClaimed(true)}
                      className="h-[30px] w-full rounded-[8px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-[0.98] text-white font-semibold text-[11px] flex items-center justify-center gap-[5px] shadow-xs transition-all cursor-pointer"
                    >
                      <span>Claim ₵2.50 Bonus</span>
                      <ArrowRight size={11} strokeWidth={2.5} />
                    </button>
                  )}
                </div>

                <div className="text-center text-[9px] text-slate-400 mt-[8px]">
                  SwiftNet Loyalty • Next bonus tomorrow
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
