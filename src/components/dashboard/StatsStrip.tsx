'use client';
import { motion } from 'motion/react';
import { Wallet, ShoppingBag } from 'lucide-react';
import { useCountUp } from '@/src/hooks/useCountUp';
import { useNavigation } from '@/src/context/NavigationContext';

export default function StatsStrip() {
  const ordersCount = useCountUp(0, 600); // 0 for empty state
  const { balance, navigateTo } = useNavigation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: 'easeOut', delay: 0.16 }}
      className="mt-[12px] rounded-[14px] h-[74px] relative flex border border-[#BAE6FD] dark:border-[rgba(14,165,233,0.18)]"
      style={{
        background: 'var(--bg-stats, linear-gradient(180deg,#F0F9FF,#E0F2FE))',
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .dark {
          --bg-stats: rgba(14,165,233,0.07);
        }
      `}} />
      
      <div className="absolute top-[12px] bottom-[12px] left-1/2 w-[1px] bg-[#BAE6FD] dark:bg-[rgba(14,165,233,0.18)] -translate-x-1/2" />

      {/* Left Cell */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-[30px] h-[30px] rounded-full bg-[var(--color-ink-900)] flex items-center justify-center">
            <Wallet size={14} className="text-[var(--color-primary-500)]" />
          </div>
          <div className="font-caption text-[11px] text-[var(--text-2)] mt-[5px] leading-none">Balance</div>
          <div className="font-h2 text-[15px] text-[var(--text-1)] font-semibold tabular-nums mt-[3px] leading-none">
            GH₵{balance.toFixed(2)}
          </div>
          <button 
            onClick={() => navigateTo('deposit')}
            className="h-[26px] px-[12px] rounded-[8px] bg-[var(--color-ink-900)] hover:bg-[var(--color-ink-800)] text-white font-caption text-[11px] font-semibold mt-[5px] active:scale-[0.985] transition-all cursor-pointer"
          >
            Deposit
          </button>
        </div>
      </div>

      {/* Right Cell */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-[30px] h-[30px] rounded-full bg-[var(--color-ink-900)] flex items-center justify-center">
            <ShoppingBag size={14} className="text-[var(--color-primary-500)]" />
          </div>
          <div className="font-caption text-[11px] text-[var(--text-2)] mt-[5px] leading-none">Orders today</div>
          <div className="font-h2 text-[15px] text-[var(--text-1)] font-semibold tabular-nums mt-[3px] leading-none">{ordersCount}</div>
          {/* Invisible spacer to match left cell button height so icons align horizontally when both blocks are vertically centered */}
          <div className="h-[26px] mt-[5px] pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}
