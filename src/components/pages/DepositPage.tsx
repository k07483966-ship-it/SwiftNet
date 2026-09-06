'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

export default function DepositPage() {
  const { balance, depositFunds, navigateTo } = useNavigation();
  const [depositAmount, setDepositAmount] = useState<string>('50');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [txnRef, setTxnRef] = useState('PSTK-948201');

  // Prevent background scrolling when success popup is active
  useEffect(() => {
    if (paymentSuccess) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [paymentSuccess]);

  const numericAmount = Math.max(0, parseFloat(depositAmount) || 0);
  const fee = numericAmount > 0 ? +(numericAmount * 0.02).toFixed(2) : 0;
  const totalPayable = +(numericAmount + fee).toFixed(2);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericAmount < 1) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTxnRef(`PSTK-${Math.floor(100000 + Math.random() * 900000)}`);
      setPaymentSuccess(true);
      depositFunds(numericAmount);
      window.dispatchEvent(new CustomEvent('balance-updated', { detail: { added: numericAmount } }));
    }, 1200);
  };

  return (
    <div className="pt-[4px] pb-[28px] max-w-[440px] mx-auto">
      {/* Header with Integrated Back Button and Brand Gradient */}
      <div className="flex items-center justify-between mb-[14px]">
        <div className="flex items-center gap-[10px]">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-[30px] h-[30px] rounded-[8px] bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <h1 className="text-[16px] font-bold text-slate-900 tracking-[-0.01em] leading-tight">
              Deposit Funds
            </h1>
            <p className="text-[11.5px] text-slate-500">
              Add money to wallet securely via Paystack
            </p>
          </div>
        </div>
        <div className="h-[3px] w-[42px] rounded-full bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#431407]" />
      </div>

      {/* Safe Hero Card (Sleek, well-shaped with obsidian gradient and subtle orange edge glow) */}
      <div className="rounded-[14px] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#EA580C] p-[16px] sm:p-[18px] text-white shadow-[0_4px_16px_rgba(15,23,42,0.15)] relative overflow-hidden mb-[14px]">
        <div className="flex items-center justify-between mb-[6px]">
          <span className="font-overline text-[9.5px] font-bold text-slate-300 tracking-[0.14em] uppercase">
            CURRENT BALANCE
          </span>
          <div className="flex items-center gap-[4px] px-[7px] py-[2.5px] rounded-full bg-white/10 text-[9.5px] font-medium text-emerald-300 border border-white/10">
            <ShieldCheck size={10} className="text-emerald-400" />
            <span>Vault</span>
          </div>
        </div>

        <div className="flex items-baseline gap-[2px]">
          <span className="text-[20px] font-bold text-slate-300 select-none">₵</span>
          <span className="text-[26px] sm:text-[28px] font-bold tracking-tight text-white tabular-nums leading-tight">
            {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <p className="text-[11px] text-slate-200/85 mt-[5px] font-normal leading-normal">
          Funds are available for bundles after a successful top-up.
        </p>
      </div>

      {/* Amount to Deposit Card (Clean Paystack Flow) */}
      <div className="bg-white rounded-[14px] border border-slate-200 p-[16px] shadow-2xs">
        <div className="mb-[12px]">
          <h2 className="text-[13px] font-semibold text-slate-800 leading-tight">
            Amount to deposit
          </h2>
          <p className="text-[11px] text-slate-400 mt-[2px]">
            Enter an amount in Ghana Cedis (GHS).
          </p>
        </div>

        <form onSubmit={handlePay}>
          {/* Amount Input Box with GHS badge */}
          <div className="h-[42px] rounded-[9px] border border-slate-200 bg-white px-[12px] flex items-center justify-between focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <div className="flex items-center gap-[6px] flex-1">
              <span className="text-[14px] font-bold text-amber-600 select-none">₵</span>
              <input
                type="number"
                min="1"
                max="10000"
                step="any"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.00"
                className="w-full text-[14px] font-semibold text-slate-800 placeholder:text-slate-300 outline-none bg-transparent tabular-nums"
              />
            </div>
            <span className="px-[6px] py-[2px] rounded-[5px] bg-amber-50 border border-amber-200/70 text-amber-700 text-[10px] font-bold tracking-wide select-none">
              GHS
            </span>
          </div>

          {/* Min & Max Indicators */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-[6px] px-[2px]">
            <span>Min: ₵1.00</span>
            <span>Max: ₵10,000.00</span>
          </div>

          {/* Payment Breakdown (Clean & Proportional) */}
          <div className="rounded-[10px] bg-slate-50 border border-slate-100 p-[12px] mt-[14px]">
            <div className="font-overline text-[9.5px] font-bold text-slate-500 tracking-[0.1em] mb-[6px]">
              PAYMENT BREAKDOWN
            </div>

            <div className="space-y-[5px] text-[11.5px]">
              <div className="flex justify-between items-center text-slate-600">
                <span>Wallet credit</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  ₵{numericAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Paystack charge (2%)</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  ₵{fee.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-slate-200/80 pt-[6px] mt-[4px] flex justify-between items-center text-[12.5px] font-bold text-slate-900">
                <span>Total payable</span>
                <span className="tabular-nums text-blue-700">
                  ₵{totalPayable.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 mt-[8px] leading-normal">
              The Paystack charge is added on top of your deposit. Your wallet will be credited with the full amount you entered (₵{numericAmount.toFixed(2)}).
            </p>
          </div>

          {/* Action CTA Button */}
          <button
            type="submit"
            disabled={numericAmount < 1 || isProcessing}
            className="w-full mt-[14px] h-[38px] rounded-[9px] bg-[#0F172A] hover:bg-[#1E293B] active:scale-[0.99] disabled:opacity-50 text-white font-semibold text-[12.5px] flex items-center justify-center gap-[6px] transition-all cursor-pointer shadow-xs"
          >
            {isProcessing ? (
              <>
                <Loader2 size={14} className="animate-spin text-amber-400" />
                <span>Redirecting to Paystack...</span>
              </>
            ) : (
              <>
                <Lock size={12} className="text-emerald-400" />
                <span>Pay ₵{totalPayable.toFixed(2)} with Paystack</span>
              </>
            )}
          </button>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-[5px] text-[10px] text-slate-400 mt-[10px]">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>Secured by Paystack • 256-bit SSL encrypted • Instant crediting</span>
          </div>
        </form>
      </div>

      {/* Success Modal Simulation */}
      <AnimatePresence>
        {paymentSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-[360px] bg-white rounded-[14px] p-[20px] text-center shadow-xl border border-slate-200"
            >
              <div className="w-[46px] h-[46px] rounded-full bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center text-emerald-600 mb-[10px]">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-[15px] font-bold text-slate-900">
                Deposit Successful!
              </h3>
              <p className="text-[11.5px] text-slate-600 mt-[4px]">
                ₵{numericAmount.toFixed(2)} has been credited to your wallet balance.
              </p>
              <div className="my-[12px] p-[8px] rounded-[6px] bg-slate-50 border border-slate-200 text-[10.5px] text-slate-600 font-mono">
                Ref: {txnRef} • Paystack Live
              </div>
              <div className="flex gap-[8px]">
                <button
                  onClick={() => setPaymentSuccess(false)}
                  className="flex-1 h-[34px] rounded-[7px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11.5px] font-semibold transition-all cursor-pointer"
                >
                  Deposit More
                </button>
                <button
                  onClick={() => {
                    setPaymentSuccess(false);
                    navigateTo('buy-data');
                  }}
                  className="flex-1 h-[34px] rounded-[7px] bg-blue-600 hover:bg-blue-700 text-white text-[11.5px] font-semibold transition-all cursor-pointer"
                >
                  Buy Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
