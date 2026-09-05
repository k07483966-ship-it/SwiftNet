'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, CheckCircle2, ArrowRight, ShieldCheck, Smartphone, CreditCard, Sparkles, Building2 } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepositSuccess?: (amount: number) => void;
}

const quickAmounts = [20, 50, 100, 200, 500];

export default function DepositModal({ isOpen, onClose, onDepositSuccess }: DepositModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'mtn' | 'telecel' | 'at' | 'card'>('mtn');
  const [amount, setAmount] = useState<number | string>(50);
  const [phone, setPhone] = useState('0244123456');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [refId, setRefId] = useState('SWF-728193');

  const handleClose = useCallback(() => {
    setSuccess(false);
    setLoading(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      if (window.innerWidth < 1024) {
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
  }, [isOpen, handleClose]);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRefId(`SWF-${Math.floor(100000 + Math.random() * 900000)}`);
      setSuccess(true);
      onDepositSuccess?.(numAmount);
      window.dispatchEvent(new CustomEvent('balance-updated', { detail: { added: numAmount } }));
    }, 900);
  };

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
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] bg-white rounded-[18px] border border-slate-200 shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden z-10 flex flex-col"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-[16px] border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-[10px] bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
                  <Wallet size={18} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-slate-800 leading-tight">
                    Deposit / Fund Wallet
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Instant automated wallet top-up (0% fee)
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-[28px] h-[28px] rounded-full bg-slate-200/70 hover:bg-slate-300 active:scale-[0.95] flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <div className="p-[16px] max-h-[75vh] overflow-y-auto custom-scrollbar">
              {success ? (
                <div className="py-[24px] flex flex-col items-center text-center">
                  <div className="w-[54px] h-[54px] rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-[12px]">
                    <CheckCircle2 size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-800">
                    Deposit Successful!
                  </h3>
                  <p className="text-[12px] text-slate-600 mt-[4px] max-w-[280px]">
                    GH₵{Number(amount).toFixed(2)} has been credited to your main wallet balance.
                  </p>
                  <div className="mt-[14px] p-[8px_14px] rounded-[8px] bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    Ref ID: {refId} • Method: {selectedMethod.toUpperCase()}
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-[18px] h-[36px] px-[22px] rounded-[9px] bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[12px] transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDeposit} className="space-y-[14px]">
                  {/* Select Payment Method */}
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-[6px]">
                      Select Payment Channel
                    </label>
                    <div className="grid grid-cols-4 gap-[6px]">
                      <button
                        type="button"
                        onClick={() => setSelectedMethod('mtn')}
                        className={`p-[8px_4px] rounded-[10px] border flex flex-col items-center justify-center gap-[4px] transition-all cursor-pointer ${
                          selectedMethod === 'mtn'
                            ? 'bg-[#FFCC00]/15 border-[#FFCC00] ring-1 ring-[#FFCC00]'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="w-[24px] h-[24px] rounded-[6px] bg-[#FFCC00] flex items-center justify-center text-black font-extrabold text-[9px]">
                          MTN
                        </div>
                        <span className="text-[10px] font-semibold text-slate-800">MoMo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMethod('telecel')}
                        className={`p-[8px_4px] rounded-[10px] border flex flex-col items-center justify-center gap-[4px] transition-all cursor-pointer ${
                          selectedMethod === 'telecel'
                            ? 'bg-rose-50 border-rose-500 ring-1 ring-rose-500'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="w-[24px] h-[24px] rounded-[6px] bg-rose-600 flex items-center justify-center text-white font-bold text-[11px]">
                          t
                        </div>
                        <span className="text-[10px] font-semibold text-slate-800">Telecel</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMethod('at')}
                        className={`p-[8px_4px] rounded-[10px] border flex flex-col items-center justify-center gap-[4px] transition-all cursor-pointer ${
                          selectedMethod === 'at'
                            ? 'bg-blue-50 border-blue-600 ring-1 ring-blue-600'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="w-[24px] h-[24px] rounded-[6px] bg-[#001D4A] flex items-center justify-center text-white font-bold text-[9px]">
                          AT
                        </div>
                        <span className="text-[10px] font-semibold text-slate-800">AT Money</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMethod('card')}
                        className={`p-[8px_4px] rounded-[10px] border flex flex-col items-center justify-center gap-[4px] transition-all cursor-pointer ${
                          selectedMethod === 'card'
                            ? 'bg-indigo-50 border-indigo-600 ring-1 ring-indigo-600'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="w-[24px] h-[24px] rounded-[6px] bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px]">
                          <CreditCard size={12} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-800">Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Amount Section */}
                  <div>
                    <div className="flex justify-between items-center mb-[4px]">
                      <label className="text-[11.5px] font-bold text-slate-700">
                        Deposit Amount (GH₵)
                      </label>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        0% Processing Fee
                      </span>
                    </div>

                    <div className="relative">
                      <span className="absolute left-[12px] top-[9px] text-[13px] font-bold text-slate-400">
                        GH₵
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-[38px] pl-[46px] pr-[12px] rounded-[9px] border border-slate-200 bg-white text-[14px] font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>

                    {/* Quick chips */}
                    <div className="flex gap-[6px] mt-[6px]">
                      {quickAmounts.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setAmount(q)}
                          className={`flex-1 h-[26px] rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                            Number(amount) === q
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          +₵{q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Money Number */}
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-[4px]">
                      {selectedMethod === 'card' ? 'Cardholder Phone' : 'MoMo Wallet Number'}
                    </label>
                    <div className="relative">
                      <Smartphone size={14} className="absolute left-[12px] top-[12px] text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="024 XXX XXXX"
                        className="w-full h-[38px] pl-[34px] pr-[12px] rounded-[9px] border border-slate-200 bg-white text-[13px] text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-[4px]">
                      An approval prompt will be dispatched instantly to your phone.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-[6px]">
                    <button
                      type="submit"
                      disabled={loading || !amount}
                      className="w-full h-[40px] rounded-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] flex items-center justify-center gap-[6px] shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="inline-block animate-spin">⏳</span>
                      ) : (
                        <>
                          <span>Pay GH₵{Number(amount || 0).toFixed(2)} Now</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-[4px] text-[10px] text-slate-400 mt-[8px]">
                      <ShieldCheck size={12} className="text-emerald-500" />
                      <span>Secured 256-Bit SSL Telecom Gateway</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
