'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, CheckCircle2, ArrowRight, ShieldCheck, Smartphone, Sparkles, Award } from 'lucide-react';

export type NetworkType = 'mtn' | 'telecel' | 'airteltigo' | 'waec';

interface BuyDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNetwork?: NetworkType;
}

interface Bundle {
  id: string;
  size: string;
  price: number;
  validity: string;
}

const bundlesByNetwork: Record<NetworkType, Bundle[]> = {
  mtn: [
    { id: 'm1', size: '1GB SME', price: 4.50, validity: 'Non-expiry' },
    { id: 'm2', size: '2GB SME', price: 9.00, validity: 'Non-expiry' },
    { id: 'm3', size: '3GB SME', price: 13.50, validity: 'Non-expiry' },
    { id: 'm5', size: '5GB SME', price: 22.00, validity: 'Non-expiry' },
    { id: 'm10', size: '10GB SME', price: 44.00, validity: 'Non-expiry' },
    { id: 'm20', size: '20GB SME', price: 85.00, validity: 'Non-expiry' },
    { id: 'm50', size: '50GB SME', price: 210.00, validity: 'Non-expiry' },
  ],
  telecel: [
    { id: 't1', size: '1GB Data', price: 4.80, validity: '30 Days' },
    { id: 't2', size: '2GB Data', price: 9.50, validity: '30 Days' },
    { id: 't5', size: '5GB Data', price: 23.00, validity: '30 Days' },
    { id: 't10', size: '10GB Data', price: 46.00, validity: '30 Days' },
    { id: 't20', size: '20GB Data', price: 90.00, validity: '30 Days' },
  ],
  airteltigo: [
    { id: 'a1', size: '1.5GB Big Time', price: 5.00, validity: 'Non-expiry' },
    { id: 'a3', size: '3.5GB Big Time', price: 12.00, validity: 'Non-expiry' },
    { id: 'a6', size: '6GB Big Time', price: 24.00, validity: 'Non-expiry' },
    { id: 'a10', size: '10GB Big Time', price: 42.00, validity: 'Non-expiry' },
    { id: 'a20', size: '20GB Big Time', price: 80.00, validity: 'Non-expiry' },
  ],
  waec: [
    { id: 'w1', size: '1x BECE 2026 PIN', price: 25.00, validity: 'Instant Delivery' },
    { id: 'w2', size: '1x WASSCE 2026 PIN', price: 25.00, validity: 'Instant Delivery' },
    { id: 'w3', size: '3x WAEC Checker Bundle', price: 72.00, validity: 'Instant Delivery' },
    { id: 'w4', size: '5x Wholesale Pins Pack', price: 115.00, validity: 'Instant Delivery' },
  ],
};

export default function BuyDataModal({
  isOpen,
  onClose,
  initialNetwork = 'mtn',
}: BuyDataModalProps) {
  const [prevInitial, setPrevInitial] = useState(initialNetwork);
  const [userNetwork, setUserNetwork] = useState<NetworkType | null>(null);

  if (prevInitial !== initialNetwork) {
    setPrevInitial(initialNetwork);
    setUserNetwork(null);
  }

  const network = userNetwork ?? initialNetwork;
  const setNetwork = (net: NetworkType) => setUserNetwork(net);

  const [selectedBundleId, setSelectedBundleId] = useState<string>('');
  const [phone, setPhone] = useState('0244123456');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('ORD-54812');

  const currentBundles = bundlesByNetwork[network] || bundlesByNetwork.mtn;
  const selectedBundle = currentBundles.find((b) => b.id === selectedBundleId) || currentBundles[0];

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
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderRef(`ORD-${Math.floor(10000 + Math.random() * 90000)}`);
      setSuccess(true);
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

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px] bg-white rounded-[18px] border border-slate-200 shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden z-10 flex flex-col"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-[16px] border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-[10px] bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-slate-800 leading-tight">
                    Buy Data & Checkers
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Instant automated telecom dispatch
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

            {/* Network Selector Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/50 p-[6px] gap-[6px]">
              <button
                type="button"
                onClick={() => {
                  setNetwork('mtn');
                  setSelectedBundleId('');
                }}
                className={`flex-1 h-[32px] rounded-[8px] font-semibold text-[11.5px] transition-all cursor-pointer flex items-center justify-center gap-[4px] ${
                  network === 'mtn'
                    ? 'bg-[#FFCC00] text-black shadow-xs font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>MTN SME</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNetwork('telecel');
                  setSelectedBundleId('');
                }}
                className={`flex-1 h-[32px] rounded-[8px] font-semibold text-[11.5px] transition-all cursor-pointer flex items-center justify-center gap-[4px] ${
                  network === 'telecel'
                    ? 'bg-rose-600 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Telecel</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNetwork('airteltigo');
                  setSelectedBundleId('');
                }}
                className={`flex-1 h-[32px] rounded-[8px] font-semibold text-[11.5px] transition-all cursor-pointer flex items-center justify-center gap-[4px] ${
                  network === 'airteltigo'
                    ? 'bg-[#001D4A] text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>AirtelTigo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNetwork('waec');
                  setSelectedBundleId('');
                }}
                className={`flex-1 h-[32px] rounded-[8px] font-semibold text-[11.5px] transition-all cursor-pointer flex items-center justify-center gap-[4px] ${
                  network === 'waec'
                    ? 'bg-amber-500 text-slate-900 shadow-xs font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>WAEC</span>
              </button>
            </div>

            {/* Form */}
            <div className="p-[16px] max-h-[72vh] overflow-y-auto custom-scrollbar">
              {success ? (
                <div className="py-[20px] flex flex-col items-center text-center">
                  <div className="w-[52px] h-[52px] rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-[12px]">
                    <CheckCircle2 size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-800">
                    Order Dispatched!
                  </h3>
                  <p className="text-[12px] text-slate-600 mt-[4px] max-w-[280px]">
                    <strong>{selectedBundle.size}</strong> has been credited to <strong>{phone}</strong> in under 3 seconds.
                  </p>
                  <div className="mt-[14px] p-[8px_14px] rounded-[8px] bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    Order Ref: {orderRef} • Gateway: Automated Live
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-[18px] h-[36px] px-[22px] rounded-[9px] bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[12px] transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitOrder} className="space-y-[14px]">
                  {/* Select Bundle */}
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-[6px]">
                      Select Package Bundle
                    </label>
                    <div className="grid grid-cols-2 gap-[8px]">
                      {currentBundles.map((b) => {
                        const isSelected = selectedBundle.id === b.id;
                        return (
                          <div
                            key={b.id}
                            onClick={() => setSelectedBundleId(b.id)}
                            className={`p-[10px] rounded-[10px] border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                                : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-[12px] font-bold text-slate-800">
                                {b.size}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400">
                                {b.validity}
                              </span>
                            </div>
                            <div className="text-[13px] font-bold text-blue-600 mt-[3px]">
                              GH₵{b.price.toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recipient Phone */}
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-[4px]">
                      {network === 'waec' ? 'SMS Voucher Delivery Number' : 'Recipient Phone Number'}
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
                  </div>

                  {/* Total & Action */}
                  <div className="p-[12px] rounded-[10px] bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Total Price</div>
                      <div className="text-[16px] font-bold text-slate-800">
                        GH₵{selectedBundle.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-emerald-600">Speed</div>
                      <div className="text-[12px] font-semibold text-slate-700">Instant (&lt; 3s)</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[40px] rounded-[10px] bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-[13px] flex items-center justify-center gap-[6px] shadow-sm transition-all cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="inline-block animate-spin">⏳</span>
                    ) : (
                      <>
                        <span>Confirm & Place Order</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-[4px] text-[10px] text-slate-400">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span>Auto-refund warranty if telecom network fails</span>
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
