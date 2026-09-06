'use client';
import { useState } from 'react';
import { PanelLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { AnimatePresence } from 'motion/react';
import ProfileDropdown from './ProfileDropdown';
import GiftRewardButton from './GiftRewardButton';
import { useNavigation } from '@/src/context/NavigationContext';

export default function Header({ 
  onOpenMenu,
  onOpenProfile, 
}: { 
  onOpenMenu: () => void;
  onOpenProfile?: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { breadcrumbs, navigateTo, currentPage, isNavigating } = useNavigation();

  // Active page title for mobile
  const activeTitle = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard';

  return (
    <header className="sticky top-0 z-40 h-[44px] px-[14px] flex items-center justify-between bg-white/92 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.02)] relative">
      {/* Anchor Navigation Progress Bar */}
      {isNavigating && (
        <div className="absolute top-0 left-0 right-0 h-[2.5px] overflow-hidden z-50 bg-blue-100">
          <div className="h-full w-[40%] bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500 rounded-full animate-anchor-progress shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
        </div>
      )}

      <div className="flex items-center">
        <button 
          onClick={onOpenMenu}
          className="flex items-center justify-center lg:hidden active:scale-[0.92] transition-transform text-[var(--text-2)] hover:text-[var(--text-1)] p-[3px] rounded-[4px] -ml-[2px]"
          aria-label="Toggle Panel"
          title="Toggle Panel"
        >
          <PanelLeft size={14} strokeWidth={1.8} className="text-slate-600" />
        </button>
        
        {/* Compact Professional Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="hidden lg:flex items-center text-[11px] font-medium text-slate-400 ml-[6px]">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <div key={crumb.label} className="flex items-center">
                {idx > 0 && <ChevronRight size={10} className="mx-[4px] text-slate-300 flex-shrink-0" />}
                {crumb.page && !isLast ? (
                  <a
                    href={crumb.page === 'dashboard' ? '/' : `/${crumb.page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(crumb.page!);
                    }}
                    className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className={isLast ? 'text-slate-800 font-semibold truncate max-w-[200px]' : 'text-slate-500'}>
                    {crumb.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
        
        {/* Dynamic page title on mobile */}
        <h1 className="lg:hidden text-[13px] font-semibold text-slate-900 ml-[8px] tracking-[-0.01em] truncate max-w-[180px] sm:max-w-[260px]">
          {activeTitle}
        </h1>
      </div>

      {/* Right Controls: Gift Reward Icon + Profile Trigger */}
      <div className="flex items-center gap-[8px] sm:gap-[10px]">
        {/* Professional Real Animated Gift Icon */}
        <GiftRewardButton />

        {/* Profile Trigger & Well-Shaped Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              onOpenProfile?.();
            }}
            className="flex items-center gap-[6px] p-[2px] rounded-[8px] hover:bg-slate-100/80 active:scale-[0.97] transition-all cursor-pointer select-none"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-label="Toggle user profile menu"
          >
            <div className="hidden min-[380px]:flex flex-col items-end justify-center leading-[12px] ml-[2px]">
              <div className="text-[11.5px] font-semibold text-[var(--text-1)]">ktech</div>
              <div className="text-[10px] font-normal text-[var(--text-3)]">Agent</div>
            </div>

            <div className="relative w-[28px] h-[28px] rounded-full overflow-hidden border border-[var(--border-2)] hover:border-blue-400 transition-all flex items-center justify-center shadow-xs bg-slate-100">
              <Image 
                src="https://i.postimg.cc/s2pRY0YM/image-removebg-preview-(38).png" 
                alt="Profile Avatar" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <ProfileDropdown 
                isOpen={dropdownOpen} 
                onClose={() => setDropdownOpen(false)} 
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
