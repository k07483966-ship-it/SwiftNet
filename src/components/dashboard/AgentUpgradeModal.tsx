'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Zap, Award, Percent, Store, Users, Wallet } from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';
import toast from 'react-hot-toast';

interface AgentUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentUpgradeModal({ isOpen, onClose }: AgentUpgradeModalProps) {
  const { balance, deductFunds, addTransaction } = useNavigation();
  const [upgraded, setUpgraded] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleUpgrade = () => {
    const AGENT_PRICE = 30.0;
    if (balance < AGENT_PRICE) {
      toast.error(`Insufficient wallet balance. You need GH₵ ${AGENT_PRICE.toFixed(2)} to upgrade.`);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = deductFunds(AGENT_PRICE);
      setLoading(false);

      if (success) {
        addTransaction({
          type: 'agent_commission',
          title: 'Agent Upgrade Fee',
          description: 'One-time Super Agent Tier Activation',
          amount: AGENT_PRICE,
          direction: 'debit',
          ref: `AGT-${Math.floor(10000 + Math.random() * 90000)}`,
          status: 'Success',
          channel: 'Wallet Balance',
        });
        setUpgraded(true);
        toast.success(`Upgraded to Super Agent! GH₵ ${AGENT_PRICE.toFixed(2)} deducted from wallet.`);
      } else {
        toast.error('Failed to process wallet payment. Please try again.');
      }
    }, 800);
  };

  const perks = [
    {
      icon: Percent,
      title: 'Wholesale Discount Tier',
      desc: 'Get an extra 5% to 8% discount on all MTN, Telecel, and AirtelTigo packages.',
    },
    {
      icon: Store,
      title: 'Personalized Branded Store',
      desc: 'Sell directly to your customers with your own logo, link, and custom profit margin.',
    },
    {
      icon: Zap,
      title: 'Ultra-Priority API Dispatch',
      desc: 'Your customer orders bypass the normal queue and process in under 3 seconds.',
    },
    {
      icon: Users,
      title: 'VIP Support & Reseller Community',
      desc: 'Direct WhatsApp line to SwiftNet core engineers and exclusive wholesale promos.',
    },
  ];

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

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[460px] bg-white rounded-[18px] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient badge */}
            <div className="p-[18px] pb-[14px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                    <Award size={18} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-[4px] px-[6px] py-[1.5px] rounded-full bg-white/20 text-[9.5px] font-bold tracking-wider uppercase">
                      <Sparkles size={10} /> Certified Reseller
                    </div>
                    <h2 className="text-[16px] font-bold tracking-tight leading-tight mt-[2px]">
                      Become a SwiftNet Agent
                    </h2>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-[28px] h-[28px] rounded-full bg-white/15 hover:bg-white/25 active:scale-[0.95] flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X size={15} />
                </button>
              </div>
              <p className="text-[12px] text-blue-100 mt-[8px] leading-relaxed">
                Upgrade your account to unlock maximum profit margins, priority delivery, and custom storefront tools.
              </p>
            </div>

            {/* Content */}
            <div className="p-[16px] max-h-[70vh] overflow-y-auto custom-scrollbar">
              {upgraded ? (
                <div className="py-[24px] flex flex-col items-center text-center">
                  <div className="w-[56px] h-[56px] rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-[14px]">
                    <Check size={28} strokeWidth={2.8} />
                  </div>
                  <h3 className="text-[17px] font-bold text-slate-800">
                    Congratulations, ktech! 🎉
                  </h3>
                  <p className="text-[12.5px] text-slate-600 mt-[4px] max-w-[320px]">
                    Your account has been upgraded to <strong>Super Agent Tier</strong>. Your wholesale discounts and reseller tools are now active.
                  </p>
                  <div className="mt-[16px] p-[10px] px-[14px] rounded-[10px] bg-emerald-50 border border-emerald-200/80 text-[11.5px] text-emerald-800 font-medium">
                    ✓ Wholesale Rates Applied • ✓ Custom Store Ready • ✓ VIP Queue Active
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-[20px] h-[38px] px-[20px] rounded-[10px] bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[12.5px] transition-all cursor-pointer"
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <>
                  {/* Current Status Banner */}
                  <div className="p-[12px] rounded-[12px] bg-slate-50 border border-slate-200 flex items-center justify-between mb-[14px]">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Current Status</div>
                      <div className="text-[13px] font-bold text-slate-700 mt-[1px]">Starter Reseller</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-blue-600">Target Tier</div>
                      <div className="text-[13px] font-bold text-blue-700 mt-[1px]">Master Super Agent</div>
                    </div>
                  </div>

                  {/* Perks list */}
                  <div className="space-y-[10px]">
                    <div className="text-[11.5px] font-bold uppercase text-slate-400 tracking-wider">
                      Agent Privileges
                    </div>
                    {perks.map((perk, idx) => {
                      const Icon = perk.icon;
                      return (
                        <div key={idx} className="flex items-start gap-[10px] p-[10px] rounded-[10px] bg-white border border-slate-200/80 hover:border-blue-200 transition-colors">
                          <div className="w-[28px] h-[28px] rounded-[8px] bg-blue-50 border border-blue-200/70 text-blue-600 flex items-center justify-center flex-shrink-0 mt-[1px]">
                            <Icon size={14} />
                          </div>
                          <div>
                            <h4 className="text-[12.5px] font-bold text-slate-800 leading-tight">
                              {perk.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-[2px] leading-relaxed">
                              {perk.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Upgrade Action */}
                  <div className="mt-[18px] pt-[14px] border-t border-slate-100 flex flex-col gap-[10px]">
                    <div className="p-[10px] rounded-[10px] bg-slate-50 border border-slate-200 flex items-center justify-between text-[11.5px]">
                      <div className="flex items-center gap-[6px] text-slate-700 font-medium">
                        <Wallet size={15} className="text-blue-600" />
                        <span>Wallet Balance:</span>
                        <span className="font-bold text-slate-900">GH₵ {balance.toFixed(2)}</span>
                      </div>
                      <span className="font-black text-blue-700 bg-blue-50 border border-blue-200 px-[8px] py-[2px] rounded-[6px]">
                        Fee: GH₵ 30.00
                      </span>
                    </div>

                    <button
                      onClick={handleUpgrade}
                      disabled={loading}
                      className="h-[42px] w-full rounded-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] flex items-center justify-center gap-[8px] shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
                    >
                      {loading ? (
                        <span className="inline-block animate-spin">⏳</span>
                      ) : (
                        <>
                          <span>Pay GH₵ 30.00 with Wallet</span>
                          <ArrowRight size={14} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-[4px] text-[10.5px] text-slate-400">
                      <ShieldCheck size={12} className="text-emerald-500" />
                      <span>Instant activation via Wallet Balance</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
