'use client';
import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Package,
  CheckCircle2,
  RefreshCw,
  ShoppingBag,
  X
} from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';
import { MTNLogo, TelecelLogo, AirtelTigoLogo, WAECLogo } from '@/src/components/common/NetworkLogos';

type NetworkFilter = 'ALL' | 'MTN' | 'Telecel' | 'AirtelTigo' | 'WAEC';

export default function StorePackagesPage() {
  const {
    storePackages,
    updateStorePackagePrice,
    toggleStorePackage,
    resetStorePackages,
    navigateTo
  } = useNavigation();

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return storePackages.filter((pkg) => {
      const matchesNetwork =
        selectedNetwork === 'ALL' ? true : pkg.network.toLowerCase() === selectedNetwork.toLowerCase();
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.network.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesNetwork && matchesSearch;
    });
  }, [storePackages, selectedNetwork, searchQuery]);

  // Aggregate stats
  const avgProfit = useMemo(() => {
    if (storePackages.length === 0) return '0.00';
    const totalMargin = storePackages.reduce((acc, p) => acc + (p.sellingPrice - p.wholesalePrice), 0);
    return (totalMargin / storePackages.length).toFixed(2);
  }, [storePackages]);

  const handlePriceChange = (id: string, newPriceStr: string) => {
    const num = parseFloat(newPriceStr);
    if (!isNaN(num)) {
      updateStorePackagePrice(id, num);
    }
  };

  const getNetworkBadge = (network: string) => {
    switch (network) {
      case 'MTN':
        return 'bg-amber-100 text-amber-900 border-amber-300/80';
      case 'Telecel':
        return 'bg-rose-100 text-rose-900 border-rose-300/80';
      case 'AirtelTigo':
        return 'bg-blue-100 text-blue-900 border-blue-300/80';
      case 'WAEC':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300/80';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300/80';
    }
  };

  return (
    <div className="pt-[4px] pb-[48px] max-w-[560px] mx-auto px-2 sm:px-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-[12px] font-semibold flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => navigateTo('store')}
          className="w-[34px] h-[34px] rounded-[10px] bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title="Back to Store Manager"
          aria-label="Back to Store Manager"
        >
          <ArrowLeft size={15} />
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              resetStorePackages();
              showToast('Reset all package selling prices to standard margins');
            }}
            className="h-[32px] px-2.5 rounded-[8px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
            title="Reset to recommended retail pricing"
          >
            <RefreshCw size={11} className="text-slate-500" />
            <span>Reset Prices</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('store-orders')}
            className="h-[32px] px-2.5 rounded-[8px] bg-blue-50 border border-blue-200/80 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
          >
            <ShoppingBag size={11} className="text-blue-600" />
            <span>Orders</span>
          </button>
        </div>
      </div>

      {/* Clean Compact Header Banner */}
      <div className="rounded-[16px] bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] p-4 text-white shadow-sm mb-3 border border-indigo-900/50 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-[15px] font-bold text-white tracking-tight">Store Packages & Selling Prices</h1>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[9px] font-bold">
              PRICING
            </span>
          </div>
          <p className="text-[11px] text-indigo-200/80 mt-0.5">
            Configure retail prices & toggle visibility in your online store
          </p>
        </div>

        <div className="text-right bg-white/10 px-3 py-1.5 rounded-[10px] border border-white/10 flex-shrink-0">
          <div className="text-[9.5px] font-semibold text-indigo-200 uppercase">Avg Profit</div>
          <div className="text-[14px] font-black text-emerald-300 tabular-nums">+GH₵{avgProfit}</div>
        </div>
      </div>

      {/* Network Filter Pills */}
      <div className="flex p-1 bg-slate-200/70 rounded-[12px] mb-2.5 gap-1 overflow-x-auto no-scrollbar">
        {(['ALL', 'MTN', 'Telecel', 'AirtelTigo', 'WAEC'] as const).map((net) => {
          const isActive = selectedNetwork === net;
          return (
            <button
              key={net}
              type="button"
              onClick={() => setSelectedNetwork(net)}
              className={`flex-1 min-w-[62px] h-[30px] rounded-[8px] font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {net === 'MTN' && <MTNLogo className="w-3.5 h-3.5" />}
              {net === 'Telecel' && <TelecelLogo className="w-3.5 h-3.5" />}
              {net === 'AirtelTigo' && <AirtelTigoLogo className="w-3.5 h-3.5" />}
              {net === 'WAEC' && <WAECLogo className="w-3.5 h-3.5" />}
              <span>{net === 'ALL' ? 'All (34)' : net === 'AirtelTigo' ? 'AT' : net}</span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-[14px] border border-slate-200 p-2.5 mb-3 shadow-2xs">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search packages by name, network or GB..."
            className="w-full h-[34px] pl-8 pr-3 rounded-[8px] border border-slate-200 bg-slate-50/60 focus:bg-white text-[12px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Package List */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          <span>Package & Wholesale Cost</span>
          <span>Selling Price & Margin</span>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-[14px] border border-slate-200 p-8 text-center text-slate-500 text-[12.5px]">
            No packages matched &quot;{searchQuery}&quot;
          </div>
        ) : (
          filteredPackages.map((pkg) => {
            const profit = pkg.sellingPrice - pkg.wholesalePrice;
            const isProfitable = profit >= 0;

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-[12px] border transition-all p-2.5 sm:p-3 flex items-center justify-between gap-2.5 shadow-2xs ${
                  pkg.enabled ? 'border-slate-200' : 'border-slate-200/50 opacity-60 bg-slate-50/50'
                }`}
              >
                {/* Left info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`px-1.5 py-0.5 rounded-[5px] text-[9.5px] font-black border flex-shrink-0 flex items-center gap-1 ${getNetworkBadge(
                      pkg.network
                    )}`}
                  >
                    {pkg.network === 'MTN' && <MTNLogo className="w-3.5 h-3.5" />}
                    {pkg.network === 'Telecel' && <TelecelLogo className="w-3.5 h-3.5" />}
                    {pkg.network === 'AirtelTigo' && <AirtelTigoLogo className="w-3.5 h-3.5" />}
                    {pkg.network === 'WAEC' && <WAECLogo className="w-3.5 h-3.5" />}
                    <span>{pkg.network}</span>
                  </span>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-slate-900 truncate flex items-center gap-1.5">
                      <span>{pkg.name}</span>
                    </div>
                    <div className="text-[10.5px] text-slate-500 font-medium">
                      Cost: <span className="font-mono text-slate-700">GH₵{pkg.wholesalePrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Right controls: Margin + Price Input + Toggle */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`px-1.5 py-0.5 rounded-[5px] text-[10px] font-bold tabular-nums border ${
                      isProfitable
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                        : 'bg-rose-50 text-rose-700 border-rose-200/80'
                    }`}
                  >
                    {isProfitable ? `+GH₵${profit.toFixed(2)}` : `-GH₵${Math.abs(profit).toFixed(2)}`}
                  </span>

                  {/* Price input */}
                  <div className="relative w-[78px]">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10.5px]">
                      ₵
                    </span>
                    <input
                      type="number"
                      step="0.10"
                      min={pkg.wholesalePrice}
                      value={pkg.sellingPrice}
                      onChange={(e) => handlePriceChange(pkg.id, e.target.value)}
                      className="w-full h-[32px] pl-5 pr-1.5 rounded-[7px] border border-slate-300 text-right text-[12px] font-black text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  {/* Enable/Disable Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleStorePackage(pkg.id)}
                    title={pkg.enabled ? 'Enabled in Store' : 'Hidden in Store'}
                    className={`w-[36px] h-[20px] rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${
                      pkg.enabled ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-[16px] h-[16px] rounded-full bg-white absolute top-[2px] transition-transform ${
                        pkg.enabled ? 'left-[18px]' : 'left-[2px]'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
