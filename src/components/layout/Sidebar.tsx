'use client';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, Home, Download, ShoppingBag, CheckSquare, MessageSquare, Trophy, ChevronDown, LogOut, ShieldCheck, Award, Store, Coins } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@/src/context/NavigationContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAgentModal?: () => void;
  onOpenStoreModal?: (tab?: 'create' | 'orders' | 'earnings') => void;
}

export default function Sidebar({ isOpen, onClose, onOpenAgentModal, onOpenStoreModal }: SidebarProps) {
  const [buyDataOpen, setBuyDataOpen] = useState(false);
  const { currentPage, navigateTo } = useNavigation();

  // Focus trap and ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        document.body.style.overflow = 'hidden';
      }
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const navItemClass = "h-[36px] rounded-[8px] px-[8px] mb-[2px] flex items-center gap-[10px] text-[var(--text-2)] hover:bg-[var(--surface-2)] transition-colors duration-180 cursor-pointer group select-none";
  const iconChipClass = "w-[24px] h-[24px] rounded-[6px] flex items-center justify-center bg-[var(--surface-2)] border border-[var(--border)] group-hover:bg-white group-hover:border-[var(--border-2)] transition-colors duration-180";
  
  const activeNavClass = "h-[36px] rounded-[8px] px-[8px] mb-[2px] flex items-center gap-[10px] bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] transition-colors duration-180 cursor-pointer select-none";
  const activeIconChipClass = "w-[24px] h-[24px] rounded-[6px] flex items-center justify-center bg-white border border-[var(--color-primary-200)] text-[var(--color-primary-500)]";

  const getItemClass = (page: string) => 
    currentPage === page ? activeNavClass : navItemClass;
  const getIconClass = (page: string) => 
    currentPage === page ? activeIconChipClass : iconChipClass;

  const handleOpenBuyData = (net: 'mtn' | 'airteltigo' | 'telecel' | 'waec') => {
    navigateTo('buy-data', { network: net });
    onClose();
  };

  const handleOpenDeposit = () => {
    navigateTo('deposit');
    onClose();
  };

  const handleOpenLeaderboard = () => {
    navigateTo('leaderboard');
    onClose();
  };

  const handleOpenOrders = () => {
    navigateTo('orders');
    onClose();
  };

  const handleOpenCheckers = () => {
    navigateTo('checkers');
    onClose();
  };

  const handleOpenStore = (tab: 'create' | 'orders' | 'earnings' = 'create') => {
    navigateTo('store', { tab });
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-[#0F172A]/45 backdrop-blur-xs z-50 lg:hidden touch-none"
            onClick={onClose}
            onTouchMove={(e) => e.preventDefault()}
          />
        )}
      </AnimatePresence>

      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-[var(--surface)] rounded-r-[14px] lg:rounded-none lg:shadow-none shadow-[var(--shadow-drawer)] lg:border-r lg:border-[var(--border)] lg:sticky lg:top-0 lg:h-screen lg:flex-shrink-0 lg:translate-x-0 lg:transition-none transition-transform duration-240 ease-[cubic-bezier(.32,.72,0,1)] overscroll-contain ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full flex flex-col justify-between" role="dialog" aria-modal="true">
          
          <div>
            <div className="p-[14px] flex items-center gap-[10px] border-b border-[var(--border)]">
              <div className="w-[32px] h-[32px] rounded-[8px] bg-white border border-slate-200/80 shadow-xs flex items-center justify-center flex-shrink-0 overflow-hidden relative p-[2px]">
                <Image 
                  src="/logo.png"
                  alt="SwiftNet"
                  width={28}
                  height={28}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="truncate flex-1">
                <span className="text-[15px] font-bold text-[var(--text-1)] tracking-[-0.02em]">Swift</span>
                <span className="text-[15px] font-bold text-[#2563EB] tracking-[-0.02em]">Net</span>
              </div>
              <button onClick={onClose} className="w-[28px] h-[28px] rounded-[8px] bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--text-2)] lg:hidden flex-shrink-0 hover:bg-gray-100 active:scale-[0.97] transition-all cursor-pointer" aria-label="Close sidebar">
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-[8px]">
            <div className="font-overline text-[var(--text-3)] m-[8px_0_4px_4px] text-[10px]">OVERVIEW</div>
            
            <div 
              className={getItemClass('dashboard')}
              onClick={() => {
                navigateTo('dashboard');
                onClose();
              }}
            >
              <div className={getIconClass('dashboard')}>
                <Home size={14} />
              </div>
              <div className={`font-label text-[12.5px] ${currentPage === 'dashboard' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Dashboard
              </div>
            </div>

            <div className={getItemClass('deposit')} onClick={handleOpenDeposit}>
              <div className={getIconClass('deposit')}><Download size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'deposit' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Deposit
              </div>
            </div>

            <div className={getItemClass('orders')} onClick={handleOpenOrders}>
              <div className={getIconClass('orders')}><ShoppingBag size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'orders' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Orders
              </div>
            </div>

            <div className={getItemClass('checkers')} onClick={handleOpenCheckers}>
              <div className={getIconClass('checkers')}><CheckSquare size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'checkers' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                My checkers
              </div>
            </div>

            <div 
              className={navItemClass}
              onClick={() => {
                window.open('https://chat.whatsapp.com', '_blank', 'noopener,noreferrer');
                onClose();
              }}
            >
              <div className={iconChipClass}><MessageSquare size={14} /></div>
              <div className="font-label text-[12.5px]">Support</div>
            </div>

            <div className={getItemClass('leaderboard')} onClick={handleOpenLeaderboard}>
              <div className={getIconClass('leaderboard')}><Trophy size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'leaderboard' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Leaderboard
              </div>
            </div>

            <div className="font-overline text-[var(--text-3)] m-[12px_0_4px_4px] text-[10px]">BUY DATA</div>
            <div className={getItemClass('buy-data')} onClick={() => setBuyDataOpen(!buyDataOpen)}>
              <div className={getIconClass('buy-data')}><ShoppingBag size={13} /></div>
              <div className={`font-label text-[12px] flex-1 ${currentPage === 'buy-data' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Buy Data
              </div>
              <ChevronDown size={13} className={`text-[var(--text-3)] transition-transform duration-180 ${buyDataOpen ? 'rotate-180' : ''}`} />
            </div>
            <AnimatePresence>
              {buyDataOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pl-[42px] flex flex-col py-1">
                    <div 
                      onClick={() => handleOpenBuyData('mtn')} 
                      className="h-[28px] flex items-center text-[11.5px] font-medium text-[var(--text-2)] hover:text-[var(--color-primary-600)] cursor-pointer transition-colors"
                    >
                      MTN
                    </div>
                    <div 
                      onClick={() => handleOpenBuyData('airteltigo')} 
                      className="h-[28px] flex items-center text-[11.5px] font-medium text-[var(--text-2)] hover:text-[var(--color-primary-600)] cursor-pointer transition-colors"
                    >
                      AirtelTigo
                    </div>
                    <div 
                      onClick={() => handleOpenBuyData('telecel')} 
                      className="h-[28px] flex items-center text-[11.5px] font-medium text-[var(--text-2)] hover:text-[var(--color-primary-600)] cursor-pointer transition-colors"
                    >
                      Telecel
                    </div>
                    <div 
                      onClick={() => handleOpenBuyData('waec')} 
                      className="h-[28px] flex items-center text-[11.5px] font-medium text-[var(--text-2)] hover:text-[var(--color-primary-600)] cursor-pointer transition-colors"
                    >
                      Results Checkers
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AGENT & STORE SECTION */}
            <div className="font-overline text-[var(--text-3)] m-[14px_0_4px_4px] text-[10px] flex items-center justify-between pr-[4px]">
              <span>AGENT & STORE</span>
              <span className="text-[8.5px] font-bold text-blue-600 bg-blue-50 border border-blue-200/60 px-[4px] py-[0.5px] rounded-[3px]">PRO</span>
            </div>

            {/* Become an Agent / Upgrade */}
            <div 
              className={navItemClass}
              onClick={() => {
                onOpenAgentModal?.();
                onClose();
              }}
            >
              <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center bg-blue-50 border border-blue-200/80 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-180">
                <Award size={13.5} />
              </div>
              <div className="font-label text-[12px] font-medium flex-1 text-slate-700 group-hover:text-blue-600">Become an Agent</div>
              <span className="text-[8.5px] font-bold px-[5px] py-[1px] rounded-[4px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white tracking-wider">UPGRADE</span>
            </div>

            {/* Create Store */}
            <div 
              className={getItemClass('store')}
              onClick={() => handleOpenStore('create')}
            >
              <div className={getIconClass('store')}><Store size={13.5} /></div>
              <div className={`font-label text-[12px] flex-1 ${currentPage === 'store' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>Create Store</div>
            </div>

            {/* Store Orders */}
            <div 
              className={navItemClass}
              onClick={() => handleOpenStore('orders')}
            >
              <div className={iconChipClass}><ShoppingBag size={13.5} /></div>
              <div className="font-label text-[12px] flex-1">Store Orders</div>
              <span className="text-[9.5px] font-bold px-[5px] py-[0.5px] rounded-full bg-slate-100 border border-slate-200 text-slate-600">6</span>
            </div>

            {/* Store Earnings */}
            <div 
              className={navItemClass}
              onClick={() => handleOpenStore('earnings')}
            >
              <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center bg-emerald-50 border border-emerald-200/80 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-180">
                <Coins size={13.5} />
              </div>
              <div className="font-label text-[12px] flex-1 text-slate-700 group-hover:text-emerald-700">Store Earnings</div>
              <span className="text-[9.5px] font-bold px-[5px] py-[0.5px] rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">₵485.50</span>
            </div>

            <div className="h-[36px] rounded-[8px] px-[8px] mt-[16px] flex items-center gap-[10px] text-[var(--text-2)] hover:bg-[#FEF2F2] hover:text-[#DC2626] transition-colors duration-180 cursor-pointer group">
              <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center bg-[var(--surface-2)] border border-[var(--border)] group-hover:bg-white group-hover:border-[#FECACA] group-hover:text-[#DC2626] transition-colors duration-180">
                <LogOut size={13} />
              </div>
              <div className="font-label text-[12px]">Logout</div>
            </div>
          </div>

          {/* Professional Smaller Powered by Ironclad IT */}
          <div className="px-[12px] py-[10px] border-t border-[var(--border)] bg-slate-50/70 select-none">
            <div className="flex items-center justify-center gap-[5px] text-[9.5px] text-slate-400">
              <ShieldCheck size={11} className="text-slate-400" />
              <span className="tracking-wide">POWERED BY</span>
              <span className="font-semibold text-slate-600 tracking-normal">IRONCLAD IT</span>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}
