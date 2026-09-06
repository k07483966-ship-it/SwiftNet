'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Phone,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  CreditCard,
  Check,
  X,
  Sparkles,
  Zap,
  Copy
} from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';
import { MTNLogo, TelecelLogo, AirtelTigoLogo, WAECLogo } from '@/src/components/common/NetworkLogos';
import DataCardSkeleton from '@/src/components/common/DataCardSkeleton';

interface Bundle {
  id: string;
  size: string;
  sublabel: string;
  badge: string;
  price: number;
}

const networkBundles: Record<'mtn' | 'telecel' | 'airteltigo' | 'waec', {
  title: string;
  brandName: string;
  badgeText: string;
  cardBgClass: string;
  cardTextColor: string;
  badgeBgClass: string;
  bundles: Bundle[];
}> = {
  mtn: {
    title: 'Buy MTN Data',
    brandName: 'MTN',
    badgeText: 'MTN',
    cardBgClass: 'bg-[#FFCC00] text-black border border-amber-300 shadow-xs',
    cardTextColor: 'text-black',
    badgeBgClass: 'bg-black/10 text-black',
    bundles: [
      { id: 'm-1', size: '1GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 4.50 },
      { id: 'm-2', size: '2GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 9.00 },
      { id: 'm-3', size: '3GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 13.00 },
      { id: 'm-4', size: '4GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 18.00 },
      { id: 'm-5', size: '5GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 22.00 },
      { id: 'm-6', size: '6GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 28.00 },
      { id: 'm-8', size: '8GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 35.00 },
      { id: 'm-10', size: '10GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 42.00 },
      { id: 'm-15', size: '15GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 62.00 },
      { id: 'm-20', size: '20GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 82.00 },
      { id: 'm-50', size: '50GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 205.00 },
      { id: 'm-100', size: '100GB', sublabel: 'MTN Bundle', badge: 'MTN BEST DELIVERY', price: 400.00 },
    ],
  },
  telecel: {
    title: 'Buy Telecel Data',
    brandName: 'Telecel',
    badgeText: 'Telecel',
    cardBgClass: 'bg-[#E60000] text-white border border-red-700 shadow-xs',
    cardTextColor: 'text-white',
    badgeBgClass: 'bg-white/20 text-white',
    bundles: [
      { id: 't-1', size: '1.5GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 6.00 },
      { id: 't-2', size: '3GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 12.00 },
      { id: 't-3', size: '5GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 20.00 },
      { id: 't-4', size: '6GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 24.00 },
      { id: 't-5', size: '10GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 38.00 },
      { id: 't-6', size: '12GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 46.00 },
      { id: 't-7', size: '20GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 75.00 },
      { id: 't-8', size: '25GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 95.00 },
      { id: 't-9', size: '50GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 185.00 },
      { id: 't-10', size: '100GB', sublabel: 'Telecel Bundle', badge: 'TELECEL INSTANT DELIVERY', price: 360.00 },
    ],
  },
  airteltigo: {
    title: 'Buy AirtelTigo Data',
    brandName: 'AirtelTigo',
    badgeText: 'AirtelTigo',
    cardBgClass: 'bg-[#0284C7] text-white border border-sky-700 shadow-xs',
    cardTextColor: 'text-white',
    badgeBgClass: 'bg-white/20 text-white',
    bundles: [
      { id: 'a-1', size: '2GB', sublabel: 'AT Big Time Bundle', badge: 'NON-EXPIRY BUNDLE', price: 8.00 },
      { id: 'a-2', size: '4.5GB', sublabel: 'AT Big Time Bundle', badge: 'NON-EXPIRY BUNDLE', price: 16.00 },
      { id: 'a-3', size: '7GB', sublabel: 'AT Big Time Bundle', badge: 'NON-EXPIRY BUNDLE', price: 25.00 },
      { id: 'a-4', size: '10GB', sublabel: 'AT Big Time Bundle', badge: 'NON-EXPIRY BUNDLE', price: 35.00 },
      { id: 'a-5', size: '15GB', sublabel: 'AT Big Time Bundle', badge: 'NON-EXPIRY BUNDLE', price: 52.00 },
      { id: 'a-6', size: '20GB', sublabel: 'AT Big Time Bundle', badge: 'NON-EXPIRY BUNDLE', price: 68.00 },
      { id: 'a-7', size: '50GB', sublabel: 'AT Big Time Bundle', badge: 'NON-EXPIRY BUNDLE', price: 165.00 },
      { id: 'a-8', size: '100GB', sublabel: 'AT Big Time Bundle', badge: 'NON-EXPIRY BUNDLE', price: 320.00 },
    ],
  },
  waec: {
    title: 'Buy WAEC Checkers',
    brandName: 'WAEC',
    badgeText: 'WAEC Checkers',
    cardBgClass: 'bg-[#1F3E7C] text-white border border-blue-900 shadow-xs',
    cardTextColor: 'text-white',
    badgeBgClass: 'bg-white/20 text-white',
    bundles: [
      { id: 'w-1', size: '1 Checker', sublabel: 'BECE / WASSCE PIN', badge: 'INSTANT SERIAL + PIN', price: 20.00 },
      { id: 'w-2', size: '3 Checkers', sublabel: 'Pack of 3 PINs', badge: 'INSTANT SERIAL + PIN', price: 58.00 },
      { id: 'w-3', size: '5 Checkers', sublabel: 'Pack of 5 PINs', badge: 'INSTANT SERIAL + PIN', price: 95.00 },
      { id: 'w-4', size: '10 Checkers', sublabel: 'Bulk School Agent', badge: 'INSTANT SERIAL + PIN', price: 185.00 },
    ],
  },
};

export default function BuyDataPage() {
  const { balance, deductFunds, depositFunds, addOrder, addCheckerPin, navigateTo, params } = useNavigation();
  const [localNetwork, setLocalNetwork] = useState<'mtn' | 'telecel' | 'airteltigo' | 'waec' | null>(null);
  const selectedNetwork = localNetwork ?? params.network ?? 'mtn';

  const [recipientNumber, setRecipientNumber] = useState('');
  const [activeBundle, setActiveBundle] = useState<Bundle | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [lastRef, setLastRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(true);

  // Initial card load simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingCards(false), 350);
    return () => clearTimeout(timer);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showCheckoutModal || showSuccessModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCheckoutModal, showSuccessModal]);

  const currentConfig = networkBundles[selectedNetwork] || networkBundles.mtn;

  const handleSelectNetwork = (net: 'mtn' | 'telecel' | 'airteltigo' | 'waec') => {
    if (net === selectedNetwork) return;
    setIsLoadingCards(true);
    setLocalNetwork(net);
    setErrorMsg(null);
    setTimeout(() => setIsLoadingCards(false), 250);
  };

  const handleInitiatePurchase = (bundle: Bundle) => {
    setErrorMsg(null);

    // Validate phone number
    if (selectedNetwork !== 'waec') {
      const cleanPhone = recipientNumber.replace(/\s+/g, '');
      if (cleanPhone.length < 10) {
        setErrorMsg('Please enter a valid 10-digit Ghanaian recipient phone number (e.g. 0244123456).');
        // Scroll smoothly to phone input
        const inputEl = document.getElementById('recipient-phone-input');
        if (inputEl) {
          inputEl.focus();
          inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }

    setActiveBundle(bundle);
    setShowCheckoutModal(true);
  };

  const handleConfirmWalletPayment = () => {
    if (!activeBundle) return;

    if (balance < activeBundle.price) {
      setErrorMsg(`Insufficient wallet balance (₵${balance.toFixed(2)}). Top up your wallet or use instant Paystack checkout.`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      deductFunds(activeBundle.price);

      const netNameMap: Record<string, 'MTN' | 'Telecel' | 'AirtelTigo' | 'WAEC'> = {
        mtn: 'MTN',
        telecel: 'Telecel',
        airteltigo: 'AirtelTigo',
        waec: 'WAEC',
      };

      const newOrder = addOrder({
        network: netNameMap[selectedNetwork] || 'MTN',
        phone: selectedNetwork === 'waec' ? (recipientNumber || 'Self Wallet') : recipientNumber,
        bundle: `${activeBundle.size} ${activeBundle.sublabel}`,
        price: activeBundle.price,
        status: 'Completed',
        source: 'my',
      });

      if (selectedNetwork === 'waec') {
        // If 1 Checker, add 1. If 3 Checkers, add 3, etc.
        const count = activeBundle.size.startsWith('10') ? 10 : activeBundle.size.startsWith('5') ? 5 : activeBundle.size.startsWith('3') ? 3 : 1;
        for (let i = 0; i < count; i++) {
          addCheckerPin({
            type: 'WASSCE',
            phone: recipientNumber || 'Self',
            price: activeBundle.price / count,
          });
        }
      }

      setIsProcessing(false);
      setShowCheckoutModal(false);
      setLastRef(newOrder.ref);
      setShowSuccessModal(true);
    }, 850);
  };

  const handlePayWithPaystackDirect = () => {
    if (!activeBundle) return;
    setIsProcessing(true);

    setTimeout(() => {
      // Simulate direct Paystack payment completion
      const netNameMap: Record<string, 'MTN' | 'Telecel' | 'AirtelTigo' | 'WAEC'> = {
        mtn: 'MTN',
        telecel: 'Telecel',
        airteltigo: 'AirtelTigo',
        waec: 'WAEC',
      };

      const newOrder = addOrder({
        network: netNameMap[selectedNetwork] || 'MTN',
        phone: selectedNetwork === 'waec' ? (recipientNumber || 'Self Wallet') : recipientNumber,
        bundle: `${activeBundle.size} ${activeBundle.sublabel}`,
        price: activeBundle.price,
        status: 'Completed',
        source: 'my',
      });

      if (selectedNetwork === 'waec') {
        const count = activeBundle.size.startsWith('10') ? 10 : activeBundle.size.startsWith('5') ? 5 : activeBundle.size.startsWith('3') ? 3 : 1;
        for (let i = 0; i < count; i++) {
          addCheckerPin({
            type: 'WASSCE',
            phone: recipientNumber || 'Self',
            price: activeBundle.price / count,
          });
        }
      }

      setIsProcessing(false);
      setShowCheckoutModal(false);
      setLastRef(newOrder.ref);
      setShowSuccessModal(true);
    }, 1200);
  };

  const handleCopyRef = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="pt-[6px] pb-[36px] max-w-[560px] mx-auto">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between mb-[12px]">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('dashboard');
          }}
          className="w-[34px] h-[34px] rounded-[10px] bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={15} />
        </a>
        <div className="h-[3px] w-[46px] rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-900" />
      </div>

      {/* Card 1: YOUR WALLET TOP CARD */}
      <div className="bg-white rounded-[16px] border border-slate-200/90 p-[16px] shadow-2xs mb-[12px]">
        <div className="flex items-center justify-between mb-[6px]">
          <div>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.08em] uppercase block">
              YOUR WALLET
            </span>
            <div className="text-[20px] font-extrabold text-slate-900 tracking-tight mt-[1px] tabular-nums">
              ₵{balance.toFixed(2)}
            </div>
          </div>

          {/* Clean Top Up Wallet Button */}
          <a
            href="/deposit"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('deposit');
            }}
            className="h-[36px] px-[16px] rounded-[10px] bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-[12px] flex items-center justify-center transition-all cursor-pointer shadow-xs"
          >
            Top up wallet
          </a>
        </div>

        <p className="text-[11px] text-slate-500 mt-[8px] leading-relaxed">
          At checkout you can pay from your wallet or with <strong className="text-slate-700">Paystack</strong> (card, bank, MoMo) if your balance is not enough.
        </p>
      </div>

      {/* Card 2: MAIN BUY DATA CARD */}
      <div className="bg-white rounded-[16px] border border-slate-200/90 p-[16px] shadow-2xs">
        {/* Title and Subtitle */}
        <h2 className="text-[16px] font-bold text-slate-900 tracking-[-0.01em]">
          {currentConfig.title}
        </h2>
        <p className="text-[11.5px] text-slate-500 mt-[2px]">
          Select a bundle to purchase.
        </p>

        {/* Network Selector Badges / Pills */}
        <div className="flex flex-wrap gap-[6px] my-[14px]">
          {/* MTN */}
          <button
            onClick={() => handleSelectNetwork('mtn')}
            className={`px-[12px] py-[6px] rounded-full text-[11px] font-bold transition-all flex items-center gap-[6px] cursor-pointer ${
              selectedNetwork === 'mtn'
                ? 'bg-[#FFCC00] text-black shadow-xs ring-1 ring-amber-400'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MTNLogo className="w-[14px] h-[14px]" />
            <span>MTN</span>
          </button>

          {/* Telecel */}
          <button
            onClick={() => handleSelectNetwork('telecel')}
            className={`px-[12px] py-[6px] rounded-full text-[11px] font-bold transition-all flex items-center gap-[6px] cursor-pointer ${
              selectedNetwork === 'telecel'
                ? 'bg-[#E60000] text-white shadow-xs ring-1 ring-red-600'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <TelecelLogo className="w-[14px] h-[14px]" variant={selectedNetwork === 'telecel' ? 'white' : 'red'} />
            <span>Telecel</span>
          </button>

          {/* AirtelTigo */}
          <button
            onClick={() => handleSelectNetwork('airteltigo')}
            className={`px-[12px] py-[6px] rounded-full text-[11px] font-bold transition-all flex items-center gap-[6px] cursor-pointer ${
              selectedNetwork === 'airteltigo'
                ? 'bg-[#0284C7] text-white shadow-xs ring-1 ring-sky-600'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <AirtelTigoLogo className="w-[14px] h-[14px]" />
            <span>AirtelTigo</span>
          </button>

          {/* WAEC Checkers */}
          <button
            onClick={() => handleSelectNetwork('waec')}
            className={`px-[12px] py-[6px] rounded-full text-[11px] font-bold transition-all flex items-center gap-[6px] cursor-pointer ${
              selectedNetwork === 'waec'
                ? 'bg-[#1F3E7C] text-[#FBB03B] shadow-xs ring-1 ring-blue-900'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <WAECLogo className="w-[14px] h-[14px]" />
            <span>Checkers</span>
          </button>
        </div>

        {/* Recipient Number Input */}
        <div className="mb-[18px]">
          <label className="block text-[11px] font-bold text-slate-700 mb-[4px]">
            Recipient Number
          </label>
          <div
            id="recipient-phone-container"
            className="rounded-[12px] border border-slate-200 bg-white px-[12px] py-[9px] flex items-center gap-[8px] focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 transition-all shadow-2xs"
          >
            <Phone size={15} className="text-slate-400 flex-shrink-0" />
            <input
              id="recipient-phone-input"
              type="tel"
              value={recipientNumber}
              onChange={(e) => {
                setRecipientNumber(e.target.value);
                setErrorMsg(null);
              }}
              placeholder="0XXXXXXXXX"
              className="w-full text-[13px] font-medium text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
            />
          </div>
          {errorMsg && (
            <p className="text-[11px] text-red-600 font-semibold mt-[5px] flex items-center gap-[4px]">
              <span>⚠️</span> {errorMsg}
            </p>
          )}
        </div>

        {/* Section Heading: Select Bundle */}
        <div className="mb-[12px]">
          <h3 className="text-[12.5px] font-bold text-slate-800">
            Select Bundle
          </h3>
        </div>

        {/* 2-Column Grid of Network Cards with pristine shaping / Skeleton */}
        {isLoadingCards ? (
          <DataCardSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-2 gap-[10px]">
            {currentConfig.bundles.map((bundle) => {
              return (
                <div
                  key={bundle.id}
                  className={`rounded-[16px] p-[14px] flex flex-col justify-between transition-all relative overflow-hidden min-h-[174px] shadow-2xs ${
                    selectedNetwork === 'mtn'
                      ? 'bg-[#FFCC00] text-slate-950 border border-amber-400/60'
                      : selectedNetwork === 'telecel'
                      ? 'bg-[#E60000] text-white border border-red-700/60'
                      : selectedNetwork === 'airteltigo'
                      ? 'bg-[#0284C7] text-white border border-sky-700/60'
                      : 'bg-[#1F3E7C] text-white border border-blue-900/60'
                  }`}
                >
                  <div>
                    {/* Top Row: Network Logo Icon Pill */}
                    <div className="mb-[6px] flex items-center justify-between">
                      <div>
                        {selectedNetwork === 'mtn' && <MTNLogo className="w-[28px] h-[28px]" />}
                        {selectedNetwork === 'telecel' && <TelecelLogo className="w-[28px] h-[28px]" variant="white" />}
                        {selectedNetwork === 'airteltigo' && <AirtelTigoLogo className="w-[28px] h-[28px]" />}
                        {selectedNetwork === 'waec' && <WAECLogo className="w-[28px] h-[28px]" />}
                      </div>
                    </div>

                    {/* Bundle Size */}
                    <div className="text-[19px] font-extrabold tracking-tight leading-none mt-[6px]">
                      {bundle.size}
                    </div>

                    {/* Subtitle */}
                    <div className="text-[11px] font-medium opacity-90 mt-[3px]">
                      {bundle.sublabel}
                    </div>

                    {/* Delivery Badge Pill */}
                    <div className="mt-[6px]">
                      <span
                        className={`inline-block px-[6px] py-[2px] rounded-[4px] text-[8px] font-black tracking-wide uppercase ${
                          selectedNetwork === 'mtn'
                            ? 'bg-black/90 text-white'
                            : selectedNetwork === 'telecel' || selectedNetwork === 'airteltigo'
                            ? 'bg-white/20 text-white backdrop-blur-xs border border-white/20'
                            : 'bg-amber-400 text-slate-950'
                        }`}
                      >
                        {bundle.badge}
                      </span>
                    </div>
                  </div>

                  <div>
                    {/* Price */}
                    <div className="text-[16px] font-black tracking-tight mt-[12px] mb-[8px] tabular-nums">
                      ₵{bundle.price.toFixed(2)}
                    </div>

                    {/* Clean, perfectly-shaped Buy Bundle Button */}
                    <button
                      onClick={() => handleInitiatePurchase(bundle)}
                      className="w-full h-[36px] rounded-[10px] bg-slate-950 hover:bg-black text-white font-bold text-[12px] active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer shadow-xs"
                    >
                      Buy bundle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Checkout Confirmation Modal */}
      <AnimatePresence>
        {showCheckoutModal && activeBundle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="w-full max-w-[360px] bg-white rounded-[18px] border border-slate-200 p-[20px] shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-[10px] mb-[12px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Zap size={16} />
                  </div>
                  <h3 className="text-[14px] font-bold text-slate-900">
                    Confirm Purchase
                  </h3>
                </div>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="w-[24px] h-[24px] rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>

              <div className="bg-slate-50 rounded-[12px] p-[12px] space-y-[6px] text-[11.5px] mb-[14px] border border-slate-100">
                <div className="flex justify-between text-slate-500">
                  <span>Network</span>
                  <span className="font-bold text-slate-800 uppercase">{currentConfig.brandName}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Bundle</span>
                  <span className="font-bold text-slate-800">{activeBundle.size}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Recipient</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {selectedNetwork === 'waec' ? 'Direct PINs' : recipientNumber}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-[6px] flex justify-between text-[13px] font-extrabold text-slate-900">
                  <span>Total Due</span>
                  <span className="text-sky-700">₵{activeBundle.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Wallet vs Paystack Options */}
              <div className="space-y-[8px]">
                <button
                  onClick={handleConfirmWalletPayment}
                  disabled={isProcessing}
                  className="w-full h-[40px] rounded-[10px] bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-bold text-[12.5px] flex items-center justify-center gap-[6px] transition-all cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Dispensing Bundle...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Pay from Wallet (₵{balance.toFixed(2)})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePayWithPaystackDirect}
                  disabled={isProcessing}
                  className="w-full h-[38px] rounded-[10px] bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-[12px] flex items-center justify-center gap-[6px] transition-all cursor-pointer shadow-xs disabled:opacity-60"
                >
                  <CreditCard size={14} />
                  <span>Pay with Paystack (MoMo/Card)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="w-full max-w-[360px] bg-white rounded-[18px] border border-slate-200 p-[20px] shadow-2xl text-center"
            >
              <div className="w-[50px] h-[50px] rounded-full bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center text-emerald-600 mb-[10px]">
                <CheckCircle2 size={26} />
              </div>

              <h3 className="text-[16px] font-bold text-slate-900 leading-tight">
                Order Successful!
              </h3>
              <p className="text-[12px] text-slate-600 mt-[4px]">
                Bundle dispatched with zero delay to <strong>{selectedNetwork === 'waec' ? 'your account' : recipientNumber}</strong>.
              </p>

              <div className="my-[12px] p-[10px] rounded-[10px] bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-mono">
                <span>Ref: {lastRef}</span>
                <button
                  onClick={() => handleCopyRef(lastRef)}
                  className="flex items-center gap-[3px] text-sky-600 font-semibold cursor-pointer"
                >
                  {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex gap-[8px]">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setRecipientNumber('');
                  }}
                  className="flex-1 h-[36px] rounded-[9px] bg-white border border-slate-200 text-slate-700 text-[11.5px] font-bold hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
                >
                  Buy Another
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigateTo('orders');
                  }}
                  className="flex-1 h-[36px] rounded-[9px] bg-sky-600 hover:bg-sky-700 text-white text-[11.5px] font-bold active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                >
                  View in Orders
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
