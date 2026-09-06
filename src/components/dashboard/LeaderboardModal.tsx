'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Medal, Flame, Star, Award, ChevronRight } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const topResellers = [
  { rank: 1, name: 'ktech (You)', sales: '₵14,820', orders: 342, badge: 'Diamond Reseller', isUser: true },
  { rank: 2, name: 'ApexData Gh', sales: '₵12,450', orders: 289, badge: 'Gold Reseller' },
  { rank: 3, name: 'FastByte Telecom', sales: '₵10,910', orders: 254, badge: 'Gold Reseller' },
  { rank: 4, name: 'Kumasi Bundles Hub', sales: '₵8,620', orders: 198, badge: 'Silver Reseller' },
  { rank: 5, name: 'Accra Connect Store', sales: '₵7,340', orders: 172, badge: 'Silver Reseller' },
];

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-[14px]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[460px] bg-white rounded-[18px] border border-slate-200 shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden z-10 flex flex-col"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Trophy Accent */}
            <div className="p-[16px] border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center gap-[10px]">
                <div className="w-[34px] h-[34px] rounded-[10px] bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs">
                  <Trophy size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-slate-900 leading-tight">
                    Reseller Leaderboard
                  </h2>
                  <p className="text-[11px] text-amber-800 font-medium">
                    September 2026 Top Volume Resellers
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-[28px] h-[28px] rounded-full bg-white/80 hover:bg-white active:scale-[0.95] flex items-center justify-center text-slate-600 shadow-2xs transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content List */}
            <div className="p-[14px] max-h-[70vh] overflow-y-auto custom-scrollbar space-y-[8px]">
              <div className="p-[10px_12px] rounded-[10px] bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <Flame size={16} className="text-blue-600 animate-pulse" />
                  <span className="text-[11.5px] font-semibold text-blue-900">
                    Your Reseller Rank: #1
                  </span>
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-white px-[8px] py-[2px] rounded-full shadow-2xs">
                  ₵14,820 Sold
                </span>
              </div>

              <div className="divide-y divide-slate-100 mt-[6px]">
                {topResellers.map((item) => (
                  <div
                    key={item.rank}
                    className={`py-[10px] px-[8px] flex items-center justify-between rounded-[8px] transition-colors ${
                      item.isUser ? 'bg-amber-50/60 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-[10px]">
                      <div
                        className={`w-[24px] h-[24px] rounded-full flex items-center justify-center text-[11px] font-bold ${
                          item.rank === 1
                            ? 'bg-amber-400 text-amber-950 shadow-2xs'
                            : item.rank === 2
                            ? 'bg-slate-300 text-slate-800'
                            : item.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.rank}
                      </div>

                      <div>
                        <div className="flex items-center gap-[6px]">
                          <span className="text-[12.5px] text-slate-800 font-medium">
                            {item.name}
                          </span>
                          {item.rank === 1 && (
                            <Star size={12} className="text-amber-500 fill-amber-500" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.orders} orders fulfilled • {item.badge}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[12.5px] font-bold text-slate-800">
                        {item.sales}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-[12px_16px] bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Reseller rewards distributed every Monday
              </span>
              <button
                onClick={onClose}
                className="h-[30px] px-[14px] rounded-[7px] bg-slate-900 hover:bg-slate-800 text-white text-[11.5px] font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
