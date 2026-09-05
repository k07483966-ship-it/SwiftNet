'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  User, 
  Crown, 
  LogOut, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowUpRight,
  Plus,
  X
} from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prevent background/dashboard from moving or scrolling when dropdown is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyId = () => {
    navigator.clipboard?.writeText('104829');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Full-screen backdrop to intercept touch/mouse events so dashboard does NOT move */}
      <div 
        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[0.5px]"
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
      />

      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, scale: 0.95, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -6 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-full right-0 mt-[8px] w-[285px] sm:w-[295px] max-w-[calc(100vw-24px)] bg-white rounded-[16px] border border-slate-200 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.18),0_6px_16px_-4px_rgba(15,23,42,0.06)] z-50 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Overview Header with explicit Close 'X' button */}
        <div className="p-[12px] pb-[10px] bg-gradient-to-b from-slate-50/90 to-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <div className="relative flex-shrink-0">
                <div className="w-[38px] h-[38px] rounded-full overflow-hidden border-2 border-white shadow-xs ring-1 ring-slate-200/80">
                  <Image
                    src="https://picsum.photos/seed/ktech/100/100"
                    alt="ktech avatar"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-[9px] h-[9px] bg-emerald-500 border-2 border-white rounded-full ring-1 ring-emerald-500/20" />
              </div>

              <div>
                <div className="flex items-center gap-[5px]">
                  <span className="font-bold text-[14px] text-slate-800 tracking-tight">ktech</span>
                  <span className="px-[5px] py-[1px] rounded-[3px] bg-blue-50 border border-blue-200/60 text-blue-700 font-semibold text-[9.5px] tracking-wide">
                    AGENT
                  </span>
                </div>
                <div className="flex items-center gap-[5px] mt-[1px]">
                  <span className="text-[10.5px] text-slate-400 font-medium">ID: 104829</span>
                  <button
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-[2px] text-[10px] font-medium text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-[4px] py-[1px] rounded transition-colors"
                    title="Copy User ID"
                  >
                    {copied ? <Check size={9} className="text-emerald-600" /> : <Copy size={9} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Close Button */}
            <button
              onClick={onClose}
              className="w-[24px] h-[24px] rounded-full bg-slate-100 hover:bg-slate-200 active:scale-[0.94] flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Close Profile Menu"
              title="Close"
            >
              <X size={13} strokeWidth={2.2} />
            </button>
          </div>

          {/* Compact Balance in Header */}
          <div className="mt-[10px] p-[8px] px-[10px] rounded-[10px] bg-slate-50 border border-slate-200/70 flex items-center justify-between">
            <div className="flex items-center gap-[7px]">
              <div className="w-[18px] h-[12px] rounded-[2px] overflow-hidden relative shadow-xs border border-black/10 flex-shrink-0">
                <svg viewBox="0 0 45 30" className="w-full h-full block">
                  <rect width="45" height="10" fill="#CE1126" />
                  <rect y="10" width="45" height="10" fill="#FCD116" />
                  <rect y="20" width="45" height="10" fill="#006B3F" />
                  <polygon points="22.5,10 24.35,15.7 30.34,15.7 25.5,19.22 27.35,24.92 22.5,21.4 17.65,24.92 19.5,19.22 14.66,15.7 20.65,15.7" fill="#000000" />
                </svg>
              </div>
              <div>
                <div className="text-[9.5px] font-medium text-slate-400 leading-none">Balance</div>
                <div className="text-[13px] font-bold text-slate-800 tracking-tight leading-snug mt-[1px]">₵0.00</div>
              </div>
            </div>

            <button 
              onClick={() => {
                onClose();
                window.dispatchEvent(new CustomEvent('open-deposit-modal'));
              }}
              className="h-[24px] px-[8px] rounded-[6px] bg-blue-600 hover:bg-blue-700 active:scale-[0.97] text-white text-[10.5px] font-semibold flex items-center gap-[3px] transition-all cursor-pointer"
            >
              <Plus size={11} strokeWidth={2.5} />
              <span>Deposit</span>
            </button>
          </div>
        </div>

        {/* Upgrade Card - Sleek, Compact & Professional */}
        <div className="p-[10px]">
          <div className="rounded-[12px] bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] text-white p-[11px] shadow-xs relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-[5px]">
                <span className="w-[20px] h-[20px] rounded-[5px] bg-amber-400/25 border border-amber-300/40 flex items-center justify-center">
                  <Crown size={11} className="text-amber-300 fill-amber-300" />
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-100">UPGRADE</span>
              </div>
              <span className="text-[9.5px] font-semibold bg-white/20 px-[5px] py-[1px] rounded-full text-white backdrop-blur-xs">
                Save 18%
              </span>
            </div>

            <div className="mt-[6px]">
              <h4 className="text-[12.5px] font-bold text-white tracking-tight">Super Reseller Tier</h4>
              <p className="text-[10px] text-blue-100/90 leading-tight mt-[2px]">
                Wholesale rates on MTN & Telecel plus 0% fee.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                window.dispatchEvent(new CustomEvent('open-agent-modal'));
              }}
              className="mt-[9px] w-full h-[28px] rounded-[8px] bg-white text-blue-700 hover:bg-blue-50 active:scale-[0.98] font-bold text-[11px] flex items-center justify-center gap-[5px] shadow-2xs transition-all cursor-pointer"
            >
              <span>Upgrade Account</span>
              <ArrowUpRight size={12} />
            </button>
          </div>
        </div>

        {/* Account Menu Section */}
        <div className="px-[8px] pb-[8px] space-y-[1px]">
          <button 
            onClick={onClose}
            className="w-full h-[34px] px-[8px] rounded-[8px] flex items-center justify-between text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors group"
          >
            <div className="flex items-center gap-[8px]">
              <div className="w-[24px] h-[24px] rounded-[6px] bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <User size={12} />
              </div>
              <span className="text-[12px] font-medium">My Account</span>
            </div>
            <span className="text-[10px] text-slate-400">Settings</span>
          </button>

          <button 
            onClick={onClose}
            className="w-full h-[34px] px-[8px] rounded-[8px] flex items-center justify-between text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors group"
          >
            <div className="flex items-center gap-[8px]">
              <div className="w-[24px] h-[24px] rounded-[6px] bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <ShieldCheck size={12} />
              </div>
              <span className="text-[12px] font-medium">Security & PIN</span>
            </div>
            <span className="text-[10px] text-slate-400">2FA Active</span>
          </button>
        </div>

        {/* Logout & Brand Footer */}
        <div className="p-[8px] bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full h-[32px] rounded-[8px] bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600 transition-all flex items-center justify-center gap-[6px] font-semibold text-[11.5px] active:scale-[0.98] shadow-2xs"
          >
            <LogOut size={12} strokeWidth={2.2} />
            <span>Log Out</span>
          </button>
          <div className="flex items-center justify-center gap-[6px] text-[9.5px] text-slate-400 mt-[7px]">
            <div className="w-[14px] h-[14px] relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="SwiftNet"
                width={14}
                height={14}
                className="object-contain"
              />
            </div>
            <span>SwiftNet • Powered by <span className="font-semibold text-slate-500">Ironclad IT</span></span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
