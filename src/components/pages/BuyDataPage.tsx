'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Loader2, Sparkles, Smartphone, Check } from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

interface Bundle {
  id: string;
  size: string;
  validity: string;
  price: number;
  originalPrice: number;
  popular?: boolean;
}

const bundlesData: Record<'mtn' | 'airteltigo' | 'telecel' | 'waec', Bundle[]> = {
  mtn: [
    { id: 'm1', size: '1 GB', validity: 'Non-Expiry', price: 5.50, originalPrice: 6.00 },
    { id: 'm2', size: '2 GB', validity: 'Non-Expiry', price: 11.00, originalPrice: 12.00 },
    { id: 'm3', size: '3 GB', validity: 'Non-Expiry', price: 16.50, originalPrice: 18.00 },
    { id: 'm4', size: '5 GB', validity: 'Non-Expiry', price: 27.50, originalPrice: 30.00, popular: true },
    { id: 'm5', size: '10 GB', validity: 'Non-Expiry', price: 54.00, originalPrice: 60.00 },
    { id: 'm6', size: '20 GB', validity: 'Non-Expiry', price: 105.00, originalPrice: 120.00 },
    { id: 'm7', size: '50 GB', validity: 'Non-Expiry', price: 260.00, originalPrice: 290.00 },
    { id: 'm8', size: '100 GB', validity: 'Non-Expiry', price: 510.00, originalPrice: 580.00 },
  ],
  telecel: [
    { id: 't1', size: '1.5 GB', validity: '30 Days', price: 6.00, originalPrice: 7.00 },
    { id: 't2', size: '3 GB', validity: '30 Days', price: 12.50, originalPrice: 14.00 },
    { id: 't3', size: '6 GB', validity: '30 Days', price: 25.00, originalPrice: 28.00, popular: true },
    { id: 't4', size: '12 GB', validity: '30 Days', price: 48.00, originalPrice: 55.00 },
    { id: 't5', size: '25 GB', validity: '30 Days', price: 95.00, originalPrice: 110.00 },
    { id: 't6', size: '50 GB', validity: '30 Days', price: 190.00, originalPrice: 220.00 },
  ],
  airteltigo: [
    { id: 'a1', size: '2 GB', validity: 'Big Time Non-Expiry', price: 8.50, originalPrice: 10.00 },
    { id: 'a2', size: '4.5 GB', validity: 'Big Time Non-Expiry', price: 18.00, originalPrice: 20.00 },
    { id: 'a3', size: '10 GB', validity: 'Big Time Non-Expiry', price: 38.00, originalPrice: 45.00, popular: true },
    { id: 'a4', size: '20 GB', validity: 'Big Time Non-Expiry', price: 75.00, originalPrice: 85.00 },
    { id: 'a5', size: '50 GB', validity: 'Big Time Non-Expiry', price: 180.00, originalPrice: 210.00 },
  ],
  waec: [
    { id: 'w1', size: '1 WAEC Checker', validity: 'BECE / WASSCE Serial & PIN', price: 20.00, originalPrice: 25.00, popular: true },
    { id: 'w2', size: '3 WAEC Checkers', validity: 'Pack of 3 PINs', price: 58.00, originalPrice: 75.00 },
    { id: 'w3', size: '5 WAEC Checkers', validity: 'Pack of 5 PINs', price: 95.00, originalPrice: 125.00 },
    { id: 'w4', size: '10 WAEC Checkers', validity: 'Bulk School Agent Pack', price: 185.00, originalPrice: 250.00 },
  ],
};

export default function BuyDataPage() {
  const { balance, deductFunds, navigateTo, params } = useNavigation();
  const [selectedNetwork, setSelectedNetwork] = useState<'mtn' | 'airteltigo' | 'telecel' | 'waec'>(
    params.network || 'mtn'
  );
  const [selectedBundleId, setSelectedBundleId] = useState<string>('m4');
  const [phone, setPhone] = useState('0244123456');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('ORD-91823');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const bundles = bundlesData[selectedNetwork] || bundlesData.mtn;
  const currentBundle = bundles.find((b) => b.id === selectedBundleId) || bundles[0];

  const handleNetworkChange = (net: 'mtn' | 'airteltigo' | 'telecel' | 'waec') => {
    setSelectedNetwork(net);
    const newBundles = bundlesData[net];
    if (newBundles && newBundles.length > 0) {
      setSelectedBundleId(newBundles[0].id);
    }
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (selectedNetwork !== 'waec' && phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }

    if (balance < currentBundle.price) {
      setErrorMessage(`Insufficient wallet balance (₵${balance.toFixed(2)}). Please deposit funds first.`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      deductFunds(currentBundle.price);
      setIsProcessing(false);
      setOrderRef(`ORD-${Math.floor(10000 + Math.random() * 90000)}`);
      setOrderSuccess(true);
    }, 900);
  };

  return (
    <div className="pt-[10px] pb-[36px] max-w-[800px] mx-auto">
      {/* Top Accent Line */}
      <div className="h-[3px] w-[56px] rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-900 mb-[12px]" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[10px] mb-[14px]">
        <div>
          <h1 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-1)] tracking-[-0.02em] leading-tight">
            Buy Data Bundles
          </h1>
          <p className="text-[12.5px] text-[var(--text-3)] mt-[2px]">
            Instant delivery to any Ghanaian telecom network with zero delay.
          </p>
        </div>

        {/* Small Wallet Indicator */}
        <div className="flex items-center gap-[8px] bg-white border border-slate-200/90 px-[10px] py-[5px] rounded-[8px] shadow-2xs self-start sm:self-auto">
          <span className="text-[11px] text-slate-500 font-medium">Wallet:</span>
          <span className="text-[12.5px] font-bold text-slate-900 tabular-nums">₵{balance.toFixed(2)}</span>
          <button
            onClick={() => navigateTo('deposit')}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 ml-[4px] cursor-pointer"
          >
            + Top Up
          </button>
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <div className="mb-[16px]">
        <button
          onClick={() => navigateTo('dashboard')}
          className="inline-flex items-center gap-[6px] px-[11px] py-[6px] rounded-[8px] bg-white border border-slate-200/90 text-[var(--text-2)] hover:text-[var(--text-1)] text-[12px] font-medium shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
        >
          <ArrowLeft size={13} className="text-slate-500" />
          <span>Dashboard</span>
        </button>
      </div>

      {/* Network Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px] mb-[16px]">
        {[
          { id: 'mtn', label: 'MTN SME', sub: 'Instant & Non-Expiry', color: 'border-amber-400 bg-amber-50/40 text-amber-900', badge: 'MTN' },
          { id: 'telecel', label: 'Telecel', sub: 'Unlimited Fast', color: 'border-red-400 bg-red-50/40 text-red-900', badge: 'TC' },
          { id: 'airteltigo', label: 'AirtelTigo', sub: 'Big Time Bundles', color: 'border-blue-400 bg-blue-50/40 text-blue-900', badge: 'AT' },
          { id: 'waec', label: 'WAEC Checkers', sub: 'BECE & WASSCE', color: 'border-emerald-400 bg-emerald-50/40 text-emerald-900', badge: 'WAEC' },
        ].map((item) => {
          const isSelected = selectedNetwork === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNetworkChange(item.id as any)}
              className={`p-[10px] rounded-[10px] border text-left flex flex-col gap-[3px] transition-all cursor-pointer relative ${
                isSelected
                  ? `${item.color} shadow-xs ring-1 ring-offset-1 ring-blue-500/30`
                  : 'bg-white border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-900">{item.label}</span>
                {isSelected && <Check size={13} className="text-blue-600" />}
              </div>
              <span className="text-[10px] text-slate-500">{item.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Main Bundle Selection Grid & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[16px]">
        {/* Bundles Grid */}
        <div className="lg:col-span-8 bg-white rounded-[14px] border border-slate-200/90 p-[16px] shadow-2xs">
          <div className="flex justify-between items-center mb-[12px]">
            <h2 className="text-[13px] font-semibold text-slate-900">
              Select Bundle Package
            </h2>
            <span className="text-[11px] text-slate-400">
              {bundles.length} options available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-[8px]">
            {bundles.map((bundle) => {
              const isSelected = selectedBundleId === bundle.id;
              return (
                <div
                  key={bundle.id}
                  onClick={() => setSelectedBundleId(bundle.id)}
                  className={`p-[10px] rounded-[10px] border transition-all cursor-pointer relative flex flex-col justify-between h-[84px] ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/30 shadow-xs ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {bundle.popular && (
                    <span className="absolute -top-[7px] right-[8px] bg-blue-600 text-white text-[9px] font-bold px-[6px] py-[1px] rounded-full shadow-2xs">
                      Popular
                    </span>
                  )}
                  <div>
                    <div className="text-[14px] font-bold text-slate-900">{bundle.size}</div>
                    <div className="text-[10px] text-slate-500">{bundle.validity}</div>
                  </div>
                  <div className="flex items-baseline justify-between mt-[6px]">
                    <span className="text-[13px] font-bold text-blue-700 tabular-nums">
                      ₵{bundle.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 line-through tabular-nums">
                      ₵{bundle.originalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Checkout */}
        <div className="lg:col-span-4 bg-white rounded-[14px] border border-slate-200/90 p-[16px] shadow-2xs flex flex-col justify-between">
          <form onSubmit={handleOrder}>
            <h2 className="text-[13px] font-semibold text-slate-900 mb-[12px]">
              Recipient Details
            </h2>

            {selectedNetwork !== 'waec' ? (
              <div className="mb-[12px]">
                <label className="block text-[11px] font-medium text-slate-600 mb-[4px]">
                  Phone Number
                </label>
                <div className="flex items-center gap-[8px] px-[10px] py-[7px] rounded-[8px] border border-slate-200 bg-white">
                  <Smartphone size={13} className="text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="024 XXX XXXX"
                    className="w-full text-[12px] text-slate-900 outline-none bg-transparent"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-[4px]">
                  Carrier is auto-routed to high-speed API gateway.
                </p>
              </div>
            ) : (
              <div className="mb-[12px] p-[10px] rounded-[8px] bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                Pins and Serial Numbers will be saved to your <strong>My Checkers</strong> page instantly.
              </div>
            )}

            {/* Price Summary */}
            <div className="rounded-[8px] bg-slate-50 border border-slate-200 p-[10px] space-y-[4px] text-[11.5px] mb-[12px]">
              <div className="flex justify-between text-slate-500">
                <span>Selected</span>
                <span className="font-semibold text-slate-800">{currentBundle.size}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Network</span>
                <span className="font-semibold text-slate-800 uppercase">{selectedNetwork}</span>
              </div>
              <div className="border-t border-slate-200 pt-[4px] flex justify-between font-bold text-[12.5px] text-slate-900">
                <span>Total Amount</span>
                <span className="text-blue-700">₵{currentBundle.price.toFixed(2)}</span>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-[10px] p-[8px] rounded-[6px] bg-red-50 border border-red-200 text-[11px] text-red-600">
                {errorMessage}
                {balance < currentBundle.price && (
                  <button
                    type="button"
                    onClick={() => navigateTo('deposit')}
                    className="block font-bold underline mt-[2px] cursor-pointer"
                  >
                    Deposit Funds Now →
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-[38px] rounded-[8px] bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 text-white font-semibold text-[12.5px] flex items-center justify-center gap-[6px] transition-all cursor-pointer shadow-xs"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={14} className="animate-spin text-white" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  <span>Purchase Bundle (₵{currentBundle.price.toFixed(2)})</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-[4px] text-[10px] text-slate-400 mt-[12px]">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>Instant delivery within 3 seconds</span>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-[380px] bg-white rounded-[16px] p-[24px] text-center shadow-xl border border-slate-200"
            >
              <div className="w-[50px] h-[50px] rounded-full bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center text-emerald-600 mb-[12px]">
                <CheckCircle2 size={26} />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900">
                Order Completed!
              </h3>
              <p className="text-[12px] text-slate-600 mt-[6px]">
                <strong>{currentBundle.size}</strong> was successfully dispatched to <strong>{phone}</strong>.
              </p>
              <div className="my-[12px] p-[10px] rounded-[8px] bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-mono">
                Order ID: {orderRef} • Status: Active
              </div>
              <div className="flex gap-[8px]">
                <button
                  onClick={() => setOrderSuccess(false)}
                  className="flex-1 h-[36px] rounded-[8px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12px] font-semibold transition-all cursor-pointer"
                >
                  Buy Another
                </button>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    navigateTo('orders');
                  }}
                  className="flex-1 h-[36px] rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold transition-all cursor-pointer"
                >
                  View Orders
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
