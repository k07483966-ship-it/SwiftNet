'use client';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Store, 
  Copy, 
  Check, 
  ExternalLink, 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  ArrowDownToLine,
  Smartphone,
  Layers,
  Sparkles,
  ArrowRight,
  Package,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

type StoreTab = 'earnings' | 'settings';

export default function StorePage() {
  const { 
    storeEarnings, 
    storePayouts, 
    storePackages,
    storeSettings,
    updateStoreSettings,
    withdrawStoreEarnings, 
    navigateTo 
  } = useNavigation();

  const [activeTab, setActiveTab] = useState<StoreTab>('earnings');
  const [copiedUrl, setCopiedUrl] = useState(false);
  
  // Store Settings state
  const [storeName, setStoreName] = useState(storeSettings.storeName || 'Primedata');
  const [storeSlug, setStoreSlug] = useState(storeSettings.storeSlug || 'primedata');
  const [supportPhone, setSupportPhone] = useState(storeSettings.supportPhone || '0244123456');
  const [subtitle, setSubtitle] = useState(storeSettings.subtitle || 'Get the best data deals. Fast, reliable, and available 24/7');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const fullStoreUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/s/${storeSettings.storeSlug || 'primedata'}`
    : `https://swiftnet.gh/s/${storeSettings.storeSlug || 'primedata'}`;

  const activePackagesCount = storePackages ? storePackages.filter(p => p.enabled).length : 34;

  // Withdrawal States
  const [withdrawMethod, setWithdrawMethod] = useState<'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Bank Transfer'>('MTN Mobile Money');
  const [withdrawAccount, setWithdrawAccount] = useState('0244123456');
  const [withdrawName, setWithdrawName] = useState('KTECH VENTURES');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('50');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullStoreUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
      storeName,
      storeSlug,
      supportPhone,
      whatsappNumber: supportPhone,
      subtitle
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleExecuteWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError(null);
    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      setWithdrawError('Please enter a valid amount.');
      return;
    }

    if (amountNum > storeEarnings) {
      setWithdrawError(`Withdrawal amount exceeds available profit (GH₵${storeEarnings.toFixed(2)}).`);
      return;
    }

    if (withdrawAccount.trim().length < 8) {
      setWithdrawError('Please enter a valid account or phone number.');
      return;
    }

    setIsWithdrawing(true);
    setTimeout(() => {
      const success = withdrawStoreEarnings(amountNum, withdrawMethod, withdrawAccount, withdrawName);
      setIsWithdrawing(false);
      if (success) {
        setWithdrawSuccess(true);
        setWithdrawAmount('');
        setTimeout(() => setWithdrawSuccess(false), 4000);
      } else {
        setWithdrawError('Failed to process withdrawal. Check your balance.');
      }
    }, 1000);
  };

  return (
    <div className="pt-[4px] pb-[40px] max-w-[540px] mx-auto px-2 sm:px-0">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-3.5">
        <button
          type="button"
          onClick={() => navigateTo('dashboard')}
          className="w-[34px] h-[34px] rounded-[10px] bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={15} />
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => navigateTo('store-packages')}
            className="h-[32px] px-2.5 rounded-[8px] bg-indigo-50 border border-indigo-200/80 hover:bg-indigo-100 text-indigo-700 text-[11.5px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
          >
            <Package size={12} className="text-indigo-600" />
            <span>Store Packages</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('store-orders')}
            className="h-[32px] px-2.5 rounded-[8px] bg-blue-50 border border-blue-200/80 hover:bg-blue-100 text-blue-700 text-[11.5px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
          >
            <ShoppingBag size={12} className="text-blue-600" />
            <span>Orders</span>
          </button>
        </div>
      </div>

      {/* Main Store Earnings Hero Card - Clean & Airy */}
      <div className="rounded-[18px] bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] p-5 text-white shadow-[0_4px_24px_rgba(15,23,42,0.16)] mb-3.5 border border-indigo-900/50">
        {/* Top Header Row in Card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-[38px] h-[38px] rounded-[11px] bg-indigo-500/25 border border-indigo-400/30 text-indigo-200 flex items-center justify-center flex-shrink-0">
              <Store size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-[15px] font-bold text-white tracking-tight">{storeName}</h1>
                <span className="px-1.5 py-0.5 rounded-[4px] bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[9px] font-bold">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-indigo-200/80 font-mono">
                {fullStoreUrl.replace(/^https?:\/\//, '')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyUrl}
            className="h-[30px] px-2.5 rounded-[8px] bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold text-[11px] flex items-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
          >
            {copiedUrl ? <Check size={12} className="text-emerald-300" /> : <Copy size={12} />}
            <span>{copiedUrl ? 'Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Hero Card Metrics Row with Balance, vertical dividers, and clear typography */}
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-indigo-800/40">
          {/* Balance */}
          <div className="flex-1 text-center">
            <div className="text-[10px] font-bold text-indigo-200/90 uppercase tracking-wider">
              Balance
            </div>
            <div className="text-[18px] font-black text-emerald-300 mt-0.5 tabular-nums tracking-tight">
              GH₵{storeEarnings.toFixed(2)}
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="text-indigo-400/30 text-[16px] font-light select-none px-2">
            |
          </div>

          {/* Store Orders */}
          <div 
            onClick={() => navigateTo('store-orders')}
            className="flex-1 text-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="text-[10px] font-bold text-indigo-200/90 uppercase tracking-wider flex items-center justify-center gap-1">
              <span>Orders</span>
              <ArrowRight size={8} className="text-indigo-300" />
            </div>
            <div className="text-[16px] font-extrabold text-white mt-0.5">
              142
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="text-indigo-400/30 text-[16px] font-light select-none px-2">
            |
          </div>

          {/* Store Packages */}
          <div 
            onClick={() => navigateTo('store-packages')}
            className="flex-1 text-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="text-[10px] font-bold text-indigo-200/90 uppercase tracking-wider flex items-center justify-center gap-1">
              <span>Packages</span>
              <ArrowRight size={8} className="text-indigo-300" />
            </div>
            <div className="text-[16px] font-extrabold text-sky-300 mt-0.5">
              {activePackagesCount}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex p-1 bg-slate-200/70 rounded-[12px] mb-3.5 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('earnings')}
          className={`flex-1 h-[34px] rounded-[9px] font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'earnings'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign size={13} className={activeTab === 'earnings' ? 'text-blue-600' : 'text-slate-500'} />
          <span>Earnings & Payouts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex-1 h-[34px] rounded-[9px] font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Settings size={13} className={activeTab === 'settings' ? 'text-blue-600' : 'text-slate-500'} />
          <span>Store Settings</span>
        </button>
      </div>

      {/* TAB 1: Earnings & Payouts */}
      {activeTab === 'earnings' && (
        <div className="space-y-3">
          {/* Withdrawal Form Card */}
          <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-[13.5px] font-bold text-slate-900 leading-tight">Instant Profit Withdrawal</h2>
                <p className="text-[11px] text-slate-500">Payout directly to your Mobile Money wallet</p>
              </div>
              <div className="text-right bg-emerald-50 px-2 py-1 rounded-[8px] border border-emerald-200/60">
                <span className="text-[9.5px] text-emerald-800 uppercase font-bold block leading-none">Available</span>
                <span className="text-[13px] font-black text-emerald-700 tabular-nums">GH₵{storeEarnings.toFixed(2)}</span>
              </div>
            </div>

            {withdrawSuccess && (
              <div className="mb-3 p-2.5 rounded-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11.5px] font-medium flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                <span>Withdrawal completed! Funds dispatched to {withdrawMethod} ({withdrawAccount}).</span>
              </div>
            )}

            {withdrawError && (
              <div className="mb-3 p-2.5 rounded-[10px] bg-rose-50 border border-rose-200 text-rose-800 text-[11.5px] font-medium flex items-center gap-2">
                <AlertCircle size={15} className="text-rose-600 flex-shrink-0" />
                <span>{withdrawError}</span>
              </div>
            )}

            <form onSubmit={handleExecuteWithdrawal} className="space-y-2.5">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Destination</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['MTN Mobile Money', 'Telecel Cash', 'AirtelTigo Money', 'Bank Transfer'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setWithdrawMethod(m)}
                      className={`h-[32px] px-1 rounded-[8px] text-[10.5px] font-bold border flex items-center justify-center transition-all cursor-pointer ${
                        withdrawMethod === m
                          ? 'bg-blue-600 border-blue-600 text-white shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {m === 'MTN Mobile Money' ? 'MTN' : m === 'Telecel Cash' ? 'Telecel' : m === 'AirtelTigo Money' ? 'AT' : 'Bank'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Number & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {withdrawMethod === 'Bank Transfer' ? 'Bank Account No.' : 'MoMo Recipient Number'}
                  </label>
                  <input
                    type="text"
                    required
                    value={withdrawAccount}
                    onChange={(e) => setWithdrawAccount(e.target.value)}
                    placeholder="0244123456"
                    className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    required
                    value={withdrawName}
                    onChange={(e) => setWithdrawName(e.target.value)}
                    placeholder="KTECH VENTURES"
                    className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Amount to Withdraw */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Amount to Withdraw</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[12px]">GH₵</span>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max={storeEarnings}
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full h-[36px] pl-10 pr-14 rounded-[8px] border border-slate-200 text-[13px] font-black text-slate-900 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(storeEarnings.toFixed(2))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-[5px] bg-slate-200 text-slate-700 text-[10px] font-bold hover:bg-slate-300 cursor-pointer"
                  >
                    MAX
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isWithdrawing || storeEarnings <= 0}
                className="w-full h-[38px] rounded-[9px] bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-[12.5px] flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all cursor-pointer mt-1"
              >
                <ArrowDownToLine size={14} />
                <span>{isWithdrawing ? 'Dispatching Payout...' : 'Confirm Withdrawal'}</span>
              </button>
            </form>
          </div>

          {/* Recent Payouts History */}
          <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs">
            <h2 className="text-[12.5px] font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
              <Clock size={13} className="text-slate-500" />
              <span>Recent Payouts History</span>
            </h2>
            {storePayouts.length === 0 ? (
              <div className="text-center py-4 text-slate-400 text-[12px]">No withdrawals yet</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {storePayouts.map((p) => (
                  <div key={p.id} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-bold text-slate-800">{p.method} • {p.accountNumber}</div>
                      <div className="text-[10.5px] text-slate-400">{p.accountName} • {p.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[12.5px] font-black text-slate-900 tabular-nums">GH₵{p.amount.toFixed(2)}</div>
                      <span className="px-1.5 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200/60">
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Store Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[13.5px] font-bold text-slate-900">Storefront Preferences</h2>
              <p className="text-[11px] text-slate-500">Configure your public store name and contact lines</p>
            </div>
            {settingsSaved && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10.5px] font-bold">
                <CheckCircle2 size={11} />
                <span>Saved</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Store Display Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Store URL Slug (/s/slug)</label>
                <input
                  type="text"
                  value={storeSlug}
                  onChange={(e) => setStoreSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                  className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-mono text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Store Subtitle / Headline</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Get the best data deals. Fast, reliable, and available 24/7"
                className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">WhatsApp Customer Support Number</label>
              <input
                type="tel"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                placeholder="0244123456"
                className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            {/* Custom Product Selling Prices Banner */}
            <div className="p-3 rounded-[12px] bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 flex items-center justify-between gap-2.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <Package size={13} className="text-blue-600" />
                  <span className="text-[12px] font-bold text-slate-900">Store Packages & Selling Prices</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Set retail prices & profit margins per bundle across all networks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('store-packages')}
                className="h-[30px] px-2.5 rounded-[7px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs whitespace-nowrap cursor-pointer transition-all flex-shrink-0"
              >
                <span>Edit Prices</span>
                <ArrowRight size={11} />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => navigateTo('public-storefront')}
                className="h-[36px] px-3 rounded-[8px] bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-[11.5px] flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs"
              >
                <span>Visit Live Store</span>
                <ExternalLink size={12} />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('create-store')}
                className="flex-1 h-[36px] rounded-[8px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11.5px] flex items-center justify-center transition-all cursor-pointer"
              >
                Studio
              </button>
              <button
                type="submit"
                className="flex-1 h-[36px] rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
