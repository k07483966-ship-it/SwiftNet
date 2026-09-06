'use client';
import { useState, useMemo, useEffect } from 'react';
import { 
  Wifi, 
  QrCode, 
  MessageCircle, 
  HelpCircle, 
  ShoppingCart, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Briefcase,
  Package as PackageIcon,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Search,
  Zap,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';
import { useNavigation, StorePackageItem } from '@/src/context/NavigationContext';
import DataCardSkeleton from '@/src/components/common/DataCardSkeleton';
import toast from 'react-hot-toast';

export default function PublicStorefrontPage() {
  const { storeSettings, storePackages, addOrder, orders } = useNavigation();

  const [activeTab, setActiveTab] = useState<'bundles' | 'services' | 'more'>('bundles');
  const [selectedNetworkFilter, setSelectedNetworkFilter] = useState<'ALL' | 'MTN' | 'Telecel' | 'AirtelTigo' | 'WAEC'>('ALL');
  const [isLoadingCards, setIsLoadingCards] = useState(true);

  // Initial card loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingCards(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Filter change with brief skeleton feedback
  const handleNetworkFilterChange = (net: 'ALL' | 'MTN' | 'Telecel' | 'AirtelTigo' | 'WAEC') => {
    if (net === selectedNetworkFilter) return;
    setIsLoadingCards(true);
    setSelectedNetworkFilter(net);
    setTimeout(() => {
      setIsLoadingCards(false);
    }, 300);
  };

  // Image error state handling
  const [bannerError, setBannerError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Modal states
  const [selectedPackage, setSelectedPackage] = useState<StorePackageItem | null>(null);
  const [recipientPhone, setRecipientPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money'>('MTN Mobile Money');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<{ id: string; ref: string; phone: string; bundle: string; price: number; date: string } | null>(null);

  // Track Order Modal
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [trackQuery, setTrackQuery] = useState('');
  const [isTrackSearching, setIsTrackSearching] = useState(false);
  const [trackResults, setTrackResults] = useState<typeof orders | null>(null);

  // Lock background scroll when any modal is open
  useEffect(() => {
    if (selectedPackage || lastCompletedOrder || showTrackModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPackage, lastCompletedOrder, showTrackModal]);

  // Default package list if store custom packages are empty
  const defaultPackagesList: StorePackageItem[] = useMemo(() => {
    if (storePackages && storePackages.length > 0) {
      return storePackages.filter(p => p.enabled);
    }
    return [
      {
        id: 'p1',
        network: 'MTN',
        name: 'MTN Data',
        size: '1GB - 90 Days Expiry',
        sublabel: 'Popular',
        wholesalePrice: 4.50,
        sellingPrice: 4.90,
        enabled: true
      },
      {
        id: 'p2',
        network: 'MTN',
        name: 'MTN Express',
        size: '1GB - Faster Delivery',
        sublabel: 'Express Delivery',
        wholesalePrice: 5.20,
        sellingPrice: 5.60,
        enabled: true
      },
      {
        id: 'p3',
        network: 'Telecel',
        name: 'Telecel Data',
        size: '5GB - 3 Months Expiry',
        sublabel: '3 Months Expiry',
        wholesalePrice: 20.00,
        sellingPrice: 22.50,
        enabled: true
      },
      {
        id: 'p4',
        network: 'AirtelTigo',
        name: 'AT Ishare',
        size: '1GB - Non-Expiry',
        sublabel: 'Non-Expiry',
        wholesalePrice: 4.50,
        sellingPrice: 4.90,
        enabled: true
      },
      {
        id: 'p5',
        network: 'MTN',
        name: 'MTN Data',
        size: '3GB - 90 Days Expiry',
        sublabel: 'Popular',
        wholesalePrice: 13.00,
        sellingPrice: 14.50,
        enabled: true
      },
      {
        id: 'p6',
        network: 'MTN',
        name: 'MTN Data',
        size: '5GB - 90 Days Expiry',
        sublabel: 'Best Value',
        wholesalePrice: 21.00,
        sellingPrice: 23.00,
        enabled: true
      },
      {
        id: 'p7',
        network: 'Telecel',
        name: 'Telecel Data',
        size: '10GB - 3 Months Expiry',
        sublabel: 'High Volume',
        wholesalePrice: 40.00,
        sellingPrice: 43.50,
        enabled: true
      },
      {
        id: 'p8',
        network: 'WAEC',
        name: 'WASSCE Result Checker',
        size: 'Instant Serial & PIN',
        sublabel: '2026/2025 WASSCE',
        wholesalePrice: 20.00,
        sellingPrice: 23.00,
        enabled: true
      }
    ];
  }, [storePackages]);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    if (selectedNetworkFilter === 'ALL') return defaultPackagesList;
    return defaultPackagesList.filter(p => p.network === selectedNetworkFilter);
  }, [defaultPackagesList, selectedNetworkFilter]);

  // Handle WhatsApp Support Chat link
  const openWhatsAppSupport = () => {
    const rawNum = storeSettings.whatsappNumber || storeSettings.supportPhone || '233244123456';
    const cleanNum = rawNum.replace(/[^0-9]/g, '');
    const formattedNum = cleanNum.startsWith('0') ? '233' + cleanNum.slice(1) : cleanNum;
    const msg = encodeURIComponent(`Hello ${storeSettings.storeName}, I need assistance with an order on your storefront.`);
    window.open(`https://wa.me/${formattedNum}?text=${msg}`, '_blank');
  };

  // Purchase Submit
  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;
    if (!recipientPhone.trim() || recipientPhone.length < 9) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const createdOrder = addOrder({
        network: selectedPackage.network,
        phone: recipientPhone,
        bundle: `${selectedPackage.name} (${selectedPackage.size})`,
        price: selectedPackage.sellingPrice,
        status: 'Completed',
        source: 'agent',
      });

      setIsProcessing(false);
      setLastCompletedOrder({
        id: createdOrder.id,
        ref: createdOrder.ref,
        phone: recipientPhone,
        bundle: `${selectedPackage.name} (${selectedPackage.size})`,
        price: selectedPackage.sellingPrice,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today'
      });
      setSelectedPackage(null);
      toast.success('Order placed successfully! Delivery initiated.');
    }, 1200);
  };

  // Track Order Search
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) {
      toast.error('Enter Phone Number or Order ID');
      return;
    }
    setIsTrackSearching(true);
    setTimeout(() => {
      const queryLower = trackQuery.toLowerCase().trim();
      const matches = orders.filter(o => 
        o.phone.includes(queryLower) || 
        o.ref.toLowerCase().includes(queryLower) || 
        o.id.toLowerCase().includes(queryLower)
      );
      setTrackResults(matches);
      setIsTrackSearching(false);
    }, 400);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    toast.success('Order Ref copied!');
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // Helper renderer for authentic Network SVG logos
  const renderNetworkLogo = (network: string) => {
    if (network === 'MTN') {
      return (
        <div className="w-8.5 h-8.5 rounded-xl bg-[#FFCC00] flex items-center justify-center p-1 shadow-md flex-shrink-0 border border-amber-300/80">
          <svg viewBox="0 0 100 50" className="w-full h-auto">
            <ellipse cx="50" cy="25" rx="46" ry="22" fill="#FFCC00" stroke="#000000" strokeWidth="4" />
            <text x="50" y="32" textAnchor="middle" fill="#000000" fontFamily="sans-serif" fontWeight="900" fontSize="24" letterSpacing="-1">MTN</text>
          </svg>
        </div>
      );
    }
    if (network === 'Telecel') {
      return (
        <div className="w-8.5 h-8.5 rounded-xl bg-[#E2001A] flex items-center justify-center p-1 shadow-md flex-shrink-0 border border-rose-500/80">
          <svg viewBox="0 0 100 100" className="w-5.5 h-5.5">
            <path d="M20,20 L80,20 L80,40 L55,40 L55,80 L35,80 L35,40 L20,40 Z" fill="#FFFFFF" />
            <circle cx="75" cy="70" r="10" fill="#FFFFFF" />
          </svg>
        </div>
      );
    }
    if (network === 'AirtelTigo') {
      return (
        <div className="w-8.5 h-8.5 rounded-xl bg-[#003399] flex items-center justify-center p-1 shadow-md flex-shrink-0 relative overflow-hidden border border-blue-500/80">
          <div className="absolute top-0 right-0 w-4 h-8 bg-[#E2001A]" />
          <span className="relative z-10 font-black text-white text-[12.5px] tracking-tighter">at</span>
        </div>
      );
    }
    return (
      <div className="w-8.5 h-8.5 rounded-xl bg-[#064e3b] border border-[#059669] flex items-center justify-center p-1 shadow-md flex-shrink-0 text-amber-300 font-black text-[10px]">
        WAEC
      </div>
    );
  };

  // Helper renderer for Package Tag Pill
  const renderPackageBadge = (sublabel?: string) => {
    if (!sublabel) return null;
    const lower = sublabel.toLowerCase();

    if (lower.includes('express') || lower.includes('faster')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-black bg-amber-400/15 text-amber-300 border border-amber-400/30">
          <Zap size={10} className="fill-amber-300 text-amber-300" />
          <span>{sublabel}</span>
        </span>
      );
    }
    if (lower.includes('popular')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-black bg-amber-400 text-slate-950 shadow-xs">
          <Flame size={10} className="fill-slate-950 text-slate-950" />
          <span>{sublabel}</span>
        </span>
      );
    }
    if (lower.includes('best value') || lower.includes('high volume')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
          <Award size={10} className="text-purple-300" />
          <span>{sublabel}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-black bg-slate-800 text-slate-300 border border-slate-700">
        <ShieldCheck size={10} className="text-slate-400" />
        <span>{sublabel}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pb-24 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. TOP HEADER BAR */}
      <header className="sticky top-0 z-30 bg-[#080c15] border-b border-slate-800/90 px-3.5 py-2.5 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Logo + Store Name + Verified */}
          <div className="flex items-center gap-2.5">
            <div className="w-8.5 h-8.5 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
              {!logoError && storeSettings.logoUrl && storeSettings.logoUrl !== '/logo.png' ? (
                <img 
                  src={storeSettings.logoUrl} 
                  alt={storeSettings.storeName} 
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-slate-950 text-amber-400 font-black text-[15px] flex items-center justify-center">
                  ★
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-black tracking-tight text-white">
                {storeSettings.storeName}
              </span>
              {storeSettings.verified && (
                <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold" title="Verified Storefront">
                  ✓
                </span>
              )}
            </div>
          </div>

          {/* Right Header: Need Help Button */}
          <button
            type="button"
            onClick={openWhatsAppSupport}
            className="h-8 px-3 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-100 text-[11.5px] font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.97]"
          >
            <HelpCircle size={14} className="text-amber-400" />
            <span>Need help?</span>
          </button>
        </div>
      </header>

      {/* 2. HERO BANNER & OVERLAY CARD */}
      <section className="relative w-full max-w-2xl mx-auto px-0 sm:px-3 pt-0 sm:pt-3">
        {/* Hero Banner Frame */}
        <div className="relative w-full h-[180px] sm:h-[220px] sm:rounded-2xl overflow-hidden border-b sm:border border-slate-800 bg-[#080c15]">
          {!bannerError && storeSettings.bannerUrl ? (
            <img
              src={storeSettings.bannerUrl}
              alt="Storefront Hero Banner"
              onError={() => setBannerError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full relative bg-gradient-to-br from-[#030712] via-[#080c15] to-[#111827] flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <div className="relative z-10 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-black">
                  <Sparkles size={13} />
                  <span>24/7 Automated Dispatch</span>
                </div>
                <p className="text-[12px] text-slate-300 font-medium">Instant MoMo Topup & Mobile Data Bundles</p>
              </div>
            </div>
          )}
          {/* Bottom Very Deep Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
        </div>

        {/* Floating Store Card Overlaying Bottom Banner */}
        <div className="relative -mt-14 mx-3 sm:mx-6 z-10">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 sm:p-5 text-white shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-[20px] sm:text-[22px] font-black tracking-tight text-white">
                {storeSettings.storeName}
              </h1>
              {storeSettings.verified && (
                <span className="w-4.5 h-4.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold" title="Verified">
                  ✓
                </span>
              )}
            </div>

            <p className="text-[12.5px] sm:text-[13px] text-slate-300 font-medium mb-4 leading-snug">
              {storeSettings.subtitle || 'Get the best data deals. Fast, reliable, and available 24/7'}
            </p>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2.5">
              <a
                href="#bundle-tabs-section"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('bundles');
                  const targetEl = document.getElementById('bundle-tabs-section');
                  if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 h-[40px] rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[13px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-[0.98]"
              >
                <Wifi size={15} className="stroke-[2.5]" />
                <span>Buy Data</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setShowTrackModal(true);
                  setTrackResults(null);
                  setTrackQuery('');
                }}
                className="flex-1 h-[40px] rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold text-[13px] flex items-center justify-center gap-2 border border-slate-800 transition-all cursor-pointer active:scale-[0.98]"
              >
                <QrCode size={15} />
                <span>Track Order</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY & FILTER NAVIGATION */}
      <main id="bundle-tabs-section" className="max-w-2xl mx-auto px-3 mt-5">
        {/* Category Tabs */}
        <div className="flex border-b border-slate-800/90 mb-4 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setIsLoadingCards(true);
              setActiveTab('bundles');
              setTimeout(() => setIsLoadingCards(false), 250);
            }}
            className={`pb-2.5 px-4 text-[13px] font-black flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bundles'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wifi size={15} />
            <span>Data Bundles</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`pb-2.5 px-4 text-[13px] font-black flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase size={15} />
            <span>Services</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('more')}
            className={`pb-2.5 px-4 text-[13px] font-black flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'more'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <PackageIcon size={15} />
            <span>More Products</span>
          </button>
        </div>

        {/* Network Filter Pills (when Data Bundles active) */}
        {activeTab === 'bundles' && (
          <div className="flex items-center gap-1.5 mb-4 overflow-x-auto no-scrollbar pb-1">
            {(['ALL', 'MTN', 'Telecel', 'AirtelTigo', 'WAEC'] as const).map((net) => (
              <button
                key={net}
                type="button"
                onClick={() => handleNetworkFilterChange(net)}
                className={`h-8 px-3.5 rounded-full text-[11.5px] font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedNetworkFilter === net
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-[#111827] text-slate-200 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {net === 'MTN' && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                {net === 'Telecel' && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                {net === 'AirtelTigo' && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                {net === 'WAEC' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                <span>{net === 'ALL' ? 'All Packages' : net === 'WAEC' ? 'WAEC Checkers' : `${net} Data`}</span>
              </button>
            ))}
          </div>
        )}

        {/* 4. HIGHLY ENHANCED BUNDLE CARDS GRID WITH SKELETON LOADER */}
        {activeTab === 'bundles' ? (
          isLoadingCards ? (
            <DataCardSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {filteredPackages.map((pkg) => {
                const isMTN = pkg.network === 'MTN';
                const isTelecel = pkg.network === 'Telecel';
                const isAT = pkg.network === 'AirtelTigo';

                // Extract data size text for high impact typography (e.g. "1GB", "5GB")
                const sizeParts = pkg.size.split('-');
                const mainCapacity = sizeParts[0]?.trim() || pkg.size;
                const subDetail = sizeParts[1]?.trim() || '';

                return (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl bg-[#0b0f19] border border-slate-800/90 hover:border-slate-700 p-3.5 sm:p-4 shadow-xl transition-all duration-200 flex flex-col justify-between h-full relative overflow-hidden group ${
                      isMTN
                        ? 'border-t-2 border-t-amber-400'
                        : isTelecel
                        ? 'border-t-2 border-t-rose-500'
                        : isAT
                        ? 'border-t-2 border-t-blue-500'
                        : 'border-t-2 border-t-emerald-400'
                    }`}
                  >
                    {/* Subtle Background Radial Ambient Glow */}
                    <div 
                      className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none transition-opacity group-hover:opacity-30 ${
                        isMTN
                          ? 'bg-amber-400'
                          : isTelecel
                          ? 'bg-rose-500'
                          : isAT
                          ? 'bg-blue-500'
                          : 'bg-emerald-400'
                      }`} 
                    />

                    {/* Card Header: Network Logo & Tag Pill */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-3">
                        <div className="flex items-center gap-2">
                          {renderNetworkLogo(pkg.network)}
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                            {pkg.network}
                          </span>
                        </div>

                        {renderPackageBadge(pkg.sublabel)}
                      </div>

                      {/* Data Size Hero Display */}
                      <div className="my-1.5">
                        <div className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                          {mainCapacity}
                        </div>

                        <div className="text-[11px] font-semibold text-slate-300 mt-1 flex items-center gap-1">
                          <Zap size={11} className="text-amber-400 flex-shrink-0" />
                          <span className="truncate">{subDetail || pkg.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Buy Action Footer */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Price</span>
                        <div className="text-[16px] sm:text-[18px] font-black text-amber-400 tabular-nums">
                          GHS {pkg.sellingPrice.toFixed(2)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setRecipientPhone('');
                        }}
                        className={`w-full h-9.5 rounded-xl font-black text-[12px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-[0.97] ${
                          isMTN
                            ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-amber-400/10'
                            : isTelecel
                            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/10'
                            : isAT
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/10'
                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                        }`}
                      >
                        <ShoppingCart size={13} className="stroke-[2.5]" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : activeTab === 'services' ? (
          <div className="bg-[#0b0f19] rounded-2xl border border-slate-800 p-6 text-center space-y-3 shadow-md">
            <div className="w-12 h-12 rounded-full bg-blue-950/80 text-blue-400 flex items-center justify-center mx-auto border border-blue-900/60">
              <Briefcase size={22} />
            </div>
            <h3 className="text-[16px] font-black text-white">Custom Corporate & Bulk Data Services</h3>
            <p className="text-[12.5px] text-slate-300 max-w-sm mx-auto font-medium">
              Need bulk data allocations for offices, schools, or events? Contact {storeSettings.storeName} directly on WhatsApp.
            </p>
            <button
              type="button"
              onClick={openWhatsAppSupport}
              className="h-9.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[12px] inline-flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-[0.97]"
            >
              <MessageCircle size={15} />
              <span>Contact Agent on WhatsApp</span>
            </button>
          </div>
        ) : (
          <div className="bg-[#0b0f19] rounded-2xl border border-slate-800 p-6 text-center space-y-3 shadow-md">
            <div className="w-12 h-12 rounded-full bg-amber-950/80 text-amber-400 flex items-center justify-center mx-auto border border-amber-900/60">
              <PackageIcon size={22} />
            </div>
            <h3 className="text-[16px] font-black text-white">WAEC & School Placement Checkers</h3>
            <p className="text-[12.5px] text-slate-300 max-w-sm mx-auto font-medium">
              Purchase instant WASSCE, BECE, or School Placement serial & PINs delivered to your phone line via SMS.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTab('bundles');
                setSelectedNetworkFilter('WAEC');
              }}
              className="h-9.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[12px] inline-flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-[0.97]"
            >
              <span>View Result Checkers</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </main>

      {/* 5. FLOATING SUPPORT BUTTON */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          type="button"
          onClick={openWhatsAppSupport}
          className="h-11 px-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-[13px] flex items-center gap-2 shadow-2xl transition-all cursor-pointer active:scale-[0.96] border border-white/20"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle size={14} className="text-white" />
          </div>
          <span>Chat for support</span>
        </button>
      </div>

      {/* 6. BUY BUNDLE PURCHASE MODAL - FIXED VIEWPORT FOR MOBILE KEYBOARD */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-[#0b0f19] text-white rounded-2xl border border-slate-800 p-5 shadow-2xl relative my-auto max-h-[92dvh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">
                {selectedPackage.network} Order Checkout
              </span>
              <h2 className="text-[18px] font-black tracking-tight text-white mt-0.5">
                {selectedPackage.name}
              </h2>
              <p className="text-[12px] text-slate-300 font-medium">
                {selectedPackage.size} • Instant Dispatch
              </p>
            </div>

            <form onSubmit={handlePurchaseSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11.5px] font-bold text-slate-200 mb-1">
                  Recipient Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[12px]">
                    🇬🇭 +233
                  </span>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="024XXXXXXX"
                    maxLength={10}
                    className="w-full h-10.5 pl-20 pr-3 rounded-xl border border-slate-700 bg-[#121826] text-white font-mono text-[14px] font-bold outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-slate-200 mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['MTN Mobile Money', 'Telecel Cash', 'AirtelTigo Money'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`h-9 px-2 rounded-xl text-[11px] font-black border flex items-center justify-center transition-all cursor-pointer ${
                        paymentMethod === method
                          ? 'bg-amber-400 border-amber-400 text-slate-950'
                          : 'bg-[#121826] border-slate-800 text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {method.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121826] border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold">Total Amount Payable</div>
                  <div className="text-[17px] font-black text-amber-400 tabular-nums">
                    GHS {selectedPackage.sellingPrice.toFixed(2)}
                  </div>
                </div>
                <div className="text-[10px] text-emerald-400 font-extrabold bg-emerald-950/90 px-2 py-1 rounded-md border border-emerald-800/80">
                  ⚡ 24/7 Automated
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full h-11 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[13px] flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-slate-950" />
                    <span>Initiating MoMo Prompt...</span>
                  </div>
                ) : (
                  <>
                    <span>Pay GHS {selectedPackage.sellingPrice.toFixed(2)} Now</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. ORDER RECEIPT MODAL */}
      {lastCompletedOrder && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-sm bg-[#0b0f19] text-white rounded-2xl border border-slate-800 p-5 shadow-2xl text-center space-y-3.5 relative my-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>

            <div>
              <h3 className="text-[18px] font-black tracking-tight text-white">Order Confirmed!</h3>
              <p className="text-[12px] text-slate-300 font-medium mt-0.5">
                Data dispatch sent to <span className="font-bold text-amber-400">{lastCompletedOrder.phone}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#121826] border border-slate-800 text-left space-y-2 text-[11.5px]">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Order Reference:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-white">{lastCompletedOrder.ref}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(lastCompletedOrder.ref)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    title="Copy Ref"
                  >
                    {copiedRef ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Package:</span>
                <span className="font-bold text-white">{lastCompletedOrder.bundle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-bold text-emerald-400">GHS {lastCompletedOrder.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => setLastCompletedOrder(null)}
                className="w-full h-10 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[13px] cursor-pointer transition-all shadow-md"
              >
                Close & Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. TRACK ORDER MODAL */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-[#0b0f19] text-white rounded-2xl border border-slate-800 p-5 shadow-2xl relative space-y-3.5 my-auto max-h-[90dvh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowTrackModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>

            <div>
              <h3 className="text-[17px] font-black tracking-tight text-white">Track Your Order Status</h3>
              <p className="text-[12px] text-slate-300 font-medium">Enter your phone number or Order Reference ID</p>
            </div>

            <form onSubmit={handleTrackSearch} className="flex gap-2">
              <input
                type="text"
                required
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="024XXXXXXX or Ref ID"
                className="flex-1 h-10 px-3 rounded-xl border border-slate-700 bg-[#121826] text-white text-[12px] font-mono outline-none focus:border-amber-400 placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={isTrackSearching}
                className="h-10 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[12.5px] cursor-pointer transition-all flex items-center gap-1.5"
              >
                {isTrackSearching ? (
                  <Loader2 size={14} className="animate-spin text-slate-950" />
                ) : (
                  <>
                    <Search size={14} />
                    <span>Search</span>
                  </>
                )}
              </button>
            </form>

            {/* Results */}
            {trackResults && (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1 pt-1">
                {trackResults.length === 0 ? (
                  <p className="text-center py-4 text-[12px] text-slate-400">No orders found for &quot;{trackQuery}&quot;</p>
                ) : (
                  trackResults.map((ord) => (
                    <div key={ord.id} className="p-3 rounded-xl border border-slate-800 bg-[#121826] flex items-center justify-between text-[11.5px]">
                      <div>
                        <div className="font-black text-white">{ord.bundle}</div>
                        <div className="text-slate-300 text-[10.5px] font-mono">{ord.phone} • {ord.ref}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                        ord.status === 'Completed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
