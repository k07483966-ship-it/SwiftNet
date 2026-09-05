'use client';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: 'easeOut', delay: 0.08 }}
      className="mt-[12px] rounded-[14px] border border-[var(--color-green-200)] p-[12px] flex flex-row items-center gap-[10px]"
      style={{ background: 'linear-gradient(100deg, #F0FDF4 0%, #FFFFFF 62%)' }}
    >
      <div className="w-[36px] h-[36px] rounded-[10px] bg-[var(--color-green-500)] shadow-[0_2px_6px_rgba(34,197,94,0.28)] flex items-center justify-center flex-shrink-0">
        <MessageCircle size={18} className="text-white" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="font-overline text-[var(--color-teal-600)]">OFFICIAL CHANNEL</div>
        <div className="font-h2 text-[13.5px] text-[var(--text-1)] mt-[2px]">Join us on WhatsApp</div>
        <div className="font-caption text-[11px] text-[var(--text-3)] mt-[1px] truncate">Updates, promos & support</div>
      </div>

      <button className="h-[30px] px-[12px] rounded-[9px] bg-[var(--color-green-500)] hover:bg-[var(--color-green-600)] shadow-[0_2px_6px_rgba(34,197,94,0.25)] flex items-center gap-[4px] text-white flex-shrink-0 active:scale-[0.985] transition-all">
        <span className="font-label text-[12px] font-semibold">Follow</span>
        <ArrowRight size={13} />
      </button>
    </motion.div>
  );
}
