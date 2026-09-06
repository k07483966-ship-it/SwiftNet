'use client';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, Home, Download, ShoppingBag, Receipt, CheckSquare, MessageSquare, Trophy, ChevronDown, LogOut, ShieldCheck, Award, Store, Coins, Package, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@/src/context/NavigationContext';
import { MTNLogo, TelecelLogo, AirtelTigoLogo, WAECLogo } from '@/src/components/common/NetworkLogos';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAgentModal?: () => void;
  onOpenStoreModal?: (tab?: 'create' | 'orders' | 'earnings') => void;
}

export default function Sidebar({ isOpen, onClose, onOpenAgentModal, onOpenStoreModal }: SidebarProps) {
  const [buyDataOpen, setBuyDataOpen] = useState(false);
  const { currentPage, params, navigateTo, logoutUser } = useNavigation();

  // Lock scroll on body when mobile sidebar is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
      }
      window.addEventListener('keydown', handleKeyDown);
    } else {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
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
    setBuyDataOpen(false);
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

  const handleOpenTransactions = () => {
    navigateTo('transactions');
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
            
            <a 
              href="/"
              className={getItemClass('dashboard')}
              onClick={(e) => {
                e.preventDefault();
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
            </a>

            <a 
              href="/deposit"
              className={getItemClass('deposit')} 
              onClick={(e) => {
                e.preventDefault();
                handleOpenDeposit();
              }}
            >
              <div className={getIconClass('deposit')}><Download size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'deposit' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Deposit
              </div>
            </a>

            <a 
              href="/orders"
              className={getItemClass('orders')} 
              onClick={(e) => {
                e.preventDefault();
                handleOpenOrders();
              }}
            >
              <div className={getIconClass('orders')}><ShoppingBag size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'orders' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Orders
              </div>
            </a>

            <a 
              href="/transactions"
              className={getItemClass('transactions')} 
              onClick={(e) => {
                e.preventDefault();
                handleOpenTransactions();
              }}
            >
              <div className={getIconClass('transactions')}><Receipt size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'transactions' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Transactions
              </div>
            </a>

            <a 
              href="/checkers"
              className={getItemClass('checkers')} 
              onClick={(e) => {
                e.preventDefault();
                handleOpenCheckers();
              }}
            >
              <div className={getIconClass('checkers')}><CheckSquare size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'checkers' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                My checkers
              </div>
            </a>

            <a 
              href="/support"
              className={getItemClass('support')}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('support');
                onClose();
              }}
            >
              <div className={getIconClass('support')}><MessageSquare size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'support' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Support
              </div>
            </a>

            <a 
              href="/leaderboard"
              className={getItemClass('leaderboard')} 
              onClick={(e) => {
                e.preventDefault();
                handleOpenLeaderboard();
              }}
            >
              <div className={getIconClass('leaderboard')}><Trophy size={14} /></div>
              <div className={`font-label text-[12.5px] ${currentPage === 'leaderboard' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Leaderboard
              </div>
            </a>

            {/* BUY DATA SECTION WITH INDIVIDUAL NETWORKS */}
            <div className="font-overline text-[var(--text-3)] m-[12px_0_4px_4px] text-[10px]">BUY DATA</div>
            <a 
              href="/buy-data"
              className={getItemClass('buy-data')} 
              onClick={(e) => {
                e.preventDefault();
                setBuyDataOpen(!buyDataOpen);
              }}
            >
              <div className={getIconClass('buy-data')}><ShoppingBag size={13} /></div>
              <div className={`font-label text-[12px] flex-1 ${currentPage === 'buy-data' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>
                Buy Data
              </div>
              <ChevronDown size={13} className={`text-[var(--text-3)] transition-transform duration-180 ${buyDataOpen ? 'rotate-180' : ''}`} />
            </a>
            <AnimatePresence>
              {buyDataOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pl-[14px] pr-[4px] flex flex-col gap-[3px] py-1.5">
                    {/* MTN */}
                    <a 
                      href="/buy-data?network=mtn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenBuyData('mtn');
                      }} 
                      className={`h-[30px] rounded-[7px] px-[8px] flex items-center gap-[8px] text-[11.5px] font-medium transition-colors cursor-pointer ${
                        currentPage === 'buy-data' && params.network === 'mtn'
                          ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200/80'
                          : 'text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <MTNLogo className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 truncate">MTN</span>
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-100/90 px-[4px] py-[0.5px] rounded-[3px]">4.50+</span>
                    </a>

                    {/* Telecel */}
                    <a 
                      href="/buy-data?network=telecel"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenBuyData('telecel');
                      }} 
                      className={`h-[30px] rounded-[7px] px-[8px] flex items-center gap-[8px] text-[11.5px] font-medium transition-colors cursor-pointer ${
                        currentPage === 'buy-data' && params.network === 'telecel'
                          ? 'bg-red-50 text-red-900 font-bold border border-red-200/80'
                          : 'text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <TelecelLogo className="w-[18px] h-[18px] flex-shrink-0" variant="red" />
                      <span className="flex-1 truncate">Telecel</span>
                      <span className="text-[9px] font-bold text-red-700 bg-red-100/90 px-[4px] py-[0.5px] rounded-[3px]">6.00+</span>
                    </a>

                    {/* AirtelTigo */}
                    <a 
                      href="/buy-data?network=airteltigo"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenBuyData('airteltigo');
                      }} 
                      className={`h-[30px] rounded-[7px] px-[8px] flex items-center gap-[8px] text-[11.5px] font-medium transition-colors cursor-pointer ${
                        currentPage === 'buy-data' && params.network === 'airteltigo'
                          ? 'bg-sky-50 text-sky-900 font-bold border border-sky-200/80'
                          : 'text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <AirtelTigoLogo className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 truncate">AirtelTigo</span>
                      <span className="text-[9px] font-bold text-sky-700 bg-sky-100/90 px-[4px] py-[0.5px] rounded-[3px]">8.00+</span>
                    </a>

                    {/* Results Checkers */}
                    <a 
                      href="/buy-data?network=waec"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenBuyData('waec');
                      }} 
                      className={`h-[30px] rounded-[7px] px-[8px] flex items-center gap-[8px] text-[11.5px] font-medium transition-colors cursor-pointer ${
                        currentPage === 'buy-data' && params.network === 'waec'
                          ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200/80'
                          : 'text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <WAECLogo className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 truncate">Results Checkers</span>
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-100/90 px-[4px] py-[0.5px] rounded-[3px]">20.00</span>
                    </a>
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
            <a 
              href="#agent-upgrade"
              className={navItemClass}
              onClick={(e) => {
                e.preventDefault();
                onOpenAgentModal?.();
                onClose();
              }}
            >
              <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center bg-blue-50 border border-blue-200/80 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-180">
                <Award size={13.5} />
              </div>
              <div className="font-label text-[12px] font-medium flex-1 text-slate-700 group-hover:text-blue-600">Become an Agent</div>
              <span className="text-[8.5px] font-bold px-[5px] py-[1px] rounded-[4px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white tracking-wider">UPGRADE</span>
            </a>

            {/* Create Store */}
            <a 
              href="/create-store"
              className={getItemClass('create-store')}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('create-store');
                onClose();
              }}
            >
              <div className={getIconClass('create-store')}><Store size={13.5} /></div>
              <div className={`font-label text-[12px] flex-1 ${currentPage === 'create-store' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>Create Store</div>
            </a>

            {/* Store Packages */}
            <a 
              href="/store-packages"
              className={getItemClass('store-packages')}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('store-packages');
                onClose();
              }}
            >
              <div className={getIconClass('store-packages')}><Package size={13.5} /></div>
              <div className={`font-label text-[12px] flex-1 ${currentPage === 'store-packages' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>Store Packages</div>
            </a>

            {/* Store Orders */}
            <a 
              href="/store-orders"
              className={getItemClass('store-orders')}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('store-orders');
                onClose();
              }}
            >
              <div className={getIconClass('store-orders')}><ShoppingBag size={13.5} /></div>
              <div className={`font-label text-[12px] flex-1 ${currentPage === 'store-orders' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>Store Orders</div>
            </a>

            {/* Store Earnings */}
            <a 
              href="/store"
              className={getItemClass('store')}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('store');
                onClose();
              }}
            >
              <div className={getIconClass('store')}>
                <Coins size={13.5} />
              </div>
              <div className={`font-label text-[12px] flex-1 ${currentPage === 'store' || currentPage === 'store-earnings' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>Store Earnings</div>
              <span className="text-[9.5px] font-bold px-[5px] py-[0.5px] rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">₵485.50</span>
            </a>

            {/* Admin Panel Link */}
            <a 
              href="/admin/mastergatepanel"
              className="h-[36px] rounded-[8px] px-[8px] flex items-center gap-[10px] text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-180 cursor-pointer font-semibold"
            >
              <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center bg-indigo-100/70 border border-indigo-200 text-indigo-600">
                <ShieldCheck size={13} />
              </div>
              <div className="font-label text-[12px]">Admin Panel</div>
            </a>

            {/* My Account */}
            <a 
              href="/account"
              className={getItemClass('account')}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('account');
                onClose();
              }}
            >
              <div className={getIconClass('account')}>
                <User size={13.5} />
              </div>
              <div className={`font-label text-[12px] flex-1 ${currentPage === 'account' ? 'text-[var(--color-primary-500)] font-semibold' : ''}`}>My Account</div>
            </a>

            <a 
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                logoutUser();
              }}
              className="h-[36px] rounded-[8px] px-[8px] mt-[16px] flex items-center gap-[10px] text-[var(--text-2)] hover:bg-[#FEF2F2] hover:text-[#DC2626] transition-colors duration-180 cursor-pointer group"
            >
              <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center bg-[var(--surface-2)] border border-[var(--border)] group-hover:bg-white group-hover:border-[#FECACA] group-hover:text-[#DC2626] transition-colors duration-180">
                <LogOut size={13} />
              </div>
              <div className="font-label text-[12px]">Logout</div>
            </a>
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
