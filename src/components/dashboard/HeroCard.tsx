'use client';
import Image from 'next/image';
import { User, Wallet, ShoppingBag, Receipt, Layers, FileCheck, Store, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigation } from '@/src/context/NavigationContext';

export default function HeroCard() {
  const { navigateTo } = useNavigation();

  const quickActions = [
    { label: 'Deposit', icon: Wallet, primary: true },
    { label: 'Orders', icon: ShoppingBag },
    { label: 'Transactions', icon: Receipt },
    { label: 'Buy Data', icon: Layers },
    { label: 'Results Checker', icon: FileCheck },
    { label: 'Create Store', icon: Store },
  ];

  const handleActionClick = (label: string) => {
    if (label === 'Create Store') {
      navigateTo('store', { tab: 'create' });
    } else if (label === 'Orders' || label === 'Transactions') {
      navigateTo('orders');
    } else if (label === 'Deposit') {
      navigateTo('deposit');
    } else if (label === 'Buy Data') {
      navigateTo('buy-data', { network: 'mtn' });
    } else if (label === 'Results Checker') {
      navigateTo('checkers');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: 'easeOut', delay: 0 }}
      className="relative rounded-[16px] p-[16px] overflow-hidden bg-white border border-[var(--border)] shadow-[var(--shadow-card)]"
    >
      {/* High-end Professional Geometric Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34l-.83.83H.83l-.83-.83V.83L.83 0h53.797zm-1.66 1.66H2.49v56.68h50.477V1.66zM28.34 28.34v-2.49h3.32v2.49h-3.32zm0 5.81v-2.49h3.32v2.49h-3.32zm0-11.62v-2.49h3.32v2.49h-3.32z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[var(--color-primary-50)]/50 to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between gap-[16px]">
        <div className="pr-[10px]">
          <div className="font-display text-[19px] font-bold text-[var(--text-1)] tracking-[-0.02em]">Welcome, ktech!</div>
          <div className="font-body text-[12.5px] text-[var(--text-2)] mt-[3px] line-clamp-2 leading-relaxed max-w-[280px]">Good morning! Welcome to SwiftNet</div>
          <div className="inline-flex items-center h-[20px] px-[8px] rounded-full bg-white border border-[var(--color-primary-100)] shadow-sm text-[var(--color-primary-600)] font-badge mt-[10px]">WHERE RESELLERS MEET</div>
        </div>

        {/* Official Brand Logo */}
        <div className="flex-shrink-0 w-[48px] h-[48px] rounded-[14px] bg-white border border-slate-200/80 shadow-xs flex items-center justify-center p-[4px] relative">
          <Image
            src="/logo.png"
            alt="SwiftNet Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 mt-[18px] grid grid-cols-2 min-[360px]:grid-cols-3 gap-[8px]">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          if (action.primary) {
            return (
              <button 
                key={idx} 
                onClick={() => handleActionClick(action.label)}
                className="h-[34px] w-full rounded-[9px] bg-[#3B82F6] text-white border border-[#2563EB] border-b-[3px] border-b-[#1D4ED8] shadow-sm flex items-center justify-center gap-[6px] hover:bg-[#2563EB] active:translate-y-[1.5px] active:border-b-[1px] transition-all px-[8px] cursor-pointer"
              >
                <Icon size={13.5} className="text-white flex-shrink-0" />
                <span className="font-label text-[11px] min-[400px]:text-[11.5px] font-semibold text-white truncate">{action.label}</span>
              </button>
            );
          }
          return (
            <button 
              key={idx} 
              onClick={() => handleActionClick(action.label)}
              className="h-[34px] w-full rounded-[9px] bg-white border-[1.5px] border-[var(--border-2)] border-b-[3px] border-b-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-center gap-[6px] hover:bg-slate-50/80 active:translate-y-[1.5px] active:border-b-[1.5px] transition-all group px-[8px] cursor-pointer"
            >
              <Icon size={13.5} className="text-[var(--text-2)] flex-shrink-0 group-hover:text-[var(--color-primary-600)] transition-colors" />
              <span className="font-label text-[11px] min-[400px]:text-[11.5px] font-semibold text-[var(--text-1)] group-hover:text-[var(--color-primary-700)] truncate transition-colors">{action.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
