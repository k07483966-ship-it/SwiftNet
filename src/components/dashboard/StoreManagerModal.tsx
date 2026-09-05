'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Store, ShoppingBag, Coins, Copy, Check, ExternalLink, ArrowUpRight, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';

export type StoreTab = 'create' | 'orders' | 'earnings';

interface StoreManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: StoreTab;
}

interface StoreOrder {
  id: string;
  customer: string;
  network: string;
  plan: string;
  amount: number;
  profit: number;
  time: string;
  status: 'Completed' | 'Processing';
}

const mockStoreOrders: StoreOrder[] = [
  { id: 'ORD-8921', customer: 'Samuel Mensah', network: 'MTN', plan: '5GB SME', amount: 26.50, profit: 3.50, time: '12 mins ago', status: 'Completed' },
  { id: 'ORD-8919', customer: 'Akua Darko', network: 'Telecel', plan: '10GB Data', amount: 53.00, profit: 6.00, time: '45 mins ago', status: 'Completed' },
  { id: 'ORD-8914', customer: 'Kwesi Boateng', network: 'WAEC', plan: '2026 PIN', amount: 25.00, profit: 4.00, time: '2 hours ago', status: 'Completed' },
  { id: 'ORD-8902', customer: 'Eric Osei', network: 'MTN', plan: '2GB SME', amount: 11.50, profit: 1.80, time: '4 hours ago', status: 'Completed' },
  { id: 'ORD-8889', customer: 'Grace Addo', network: 'AirtelTigo', plan: '6GB Big Time', amount: 28.00, profit: 3.80, time: 'Yesterday', status: 'Completed' },
  { id: 'ORD-8874', customer: 'Kofi Manu', network: 'MTN', plan: '10GB SME', amount: 51.00, profit: 7.00, time: 'Yesterday', status: 'Completed' },
];

export default function StoreManagerModal({
  isOpen,
  onClose,
  initialTab = 'create',
}: StoreManagerModalProps) {
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);
  const [userTab, setUserTab] = useState<StoreTab | null>(null);

  if (prevInitialTab !== initialTab) {
    setPrevInitialTab(initialTab);
    setUserTab(null);
  }

  const activeTab = userTab ?? initialTab;
  const setActiveTab = (tab: StoreTab) => setUserTab(tab);

  const [storeName, setStoreName] = useState('ktech Express Data');
  const [subdomain, setSubdomain] = useState('ktech-telecom');
  const [margin, setMargin] = useState(10);
  const [whatsapp, setWhatsapp] = useState('0244123456');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const copyStoreLink = () => {
    navigator.clipboard.writeText(`https://swiftnet.shop/${subdomain}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleWithdraw = () => {
    setWithdrawSuccess(true);
    setTimeout(() => setWithdrawSuccess(false), 3000);
  };

  const filteredOrders = mockStoreOrders.filter(
    (o) =>
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.network.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="relative w-full max-w-[540px] bg-white rounded-[18px] border border-slate-200 shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden z-10 flex flex-col max-h-[85vh]"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-[16px] border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-[10px] bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
                  <Store size={18} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-slate-800 leading-tight">
                    Reseller Store Hub
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Manage your automated digital storefront & customer sales
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-[28px] h-[28px] rounded-full bg-slate-200/70 hover:bg-slate-300 active:scale-[0.95] flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={15} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/40 px-[12px] pt-[6px]">
              <button
                onClick={() => setActiveTab('create')}
                className={`flex items-center gap-[6px] px-[12px] py-[8px] font-semibold text-[12px] border-b-[2px] transition-all cursor-pointer ${
                  activeTab === 'create'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Store size={13} />
                <span>Create Store</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-[6px] px-[12px] py-[8px] font-semibold text-[12px] border-b-[2px] transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <ShoppingBag size={13} />
                <span>Store Orders</span>
                <span className="px-[5px] py-[0.5px] rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                  {mockStoreOrders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('earnings')}
                className={`flex items-center gap-[6px] px-[12px] py-[8px] font-semibold text-[12px] border-b-[2px] transition-all cursor-pointer ${
                  activeTab === 'earnings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Coins size={13} />
                <span>Store Earnings</span>
                <span className="px-[5px] py-[0.5px] rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                  ₵485.50
                </span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-[16px] overflow-y-auto custom-scrollbar flex-1">
              
              {/* TAB 1: CREATE / MANAGE STORE */}
              {activeTab === 'create' && (
                <form onSubmit={handleSaveStore} className="space-y-[14px]">
                  {/* Store Link Live Box */}
                  <div className="p-[12px] rounded-[12px] bg-blue-50/80 border border-blue-200/80 flex items-center justify-between gap-[10px]">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                        Your Public Storefront Link
                      </div>
                      <div className="text-[13px] font-bold text-slate-800 truncate mt-[2px]">
                        https://swiftnet.shop/{subdomain}
                      </div>
                    </div>
                    <div className="flex items-center gap-[6px] flex-shrink-0">
                      <button
                        type="button"
                        onClick={copyStoreLink}
                        className="h-[30px] px-[10px] rounded-[8px] bg-white hover:bg-slate-50 border border-blue-200 text-blue-700 font-semibold text-[11px] flex items-center gap-[4px] shadow-2xs cursor-pointer transition-all active:scale-[0.97]"
                      >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-[4px]">
                      Store Brand Name
                    </label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="e.g. ktech Express Data"
                      className="w-full h-[38px] px-[12px] rounded-[9px] border border-slate-200 bg-white text-[13px] text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-[4px]">
                      Store Subdomain / Slug
                    </label>
                    <div className="flex items-center">
                      <span className="h-[38px] px-[10px] rounded-l-[9px] bg-slate-100 border border-r-0 border-slate-200 flex items-center text-[11.5px] text-slate-500">
                        swiftnet.shop/
                      </span>
                      <input
                        type="text"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                        className="flex-1 h-[38px] px-[12px] rounded-r-[9px] border border-slate-200 bg-white text-[13px] text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                    <div>
                      <label className="block text-[11.5px] font-bold text-slate-700 mb-[4px]">
                        WhatsApp Customer Support
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="e.g. 0244123456"
                        className="w-full h-[38px] px-[12px] rounded-[9px] border border-slate-200 bg-white text-[13px] text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-bold text-slate-700 mb-[4px] flex items-center justify-between">
                        <span>Profit Markup</span>
                        <span className="text-blue-600 font-bold">+{margin}%</span>
                      </label>
                      <div className="flex items-center gap-[10px] h-[38px]">
                        <input
                          type="range"
                          min="3"
                          max="25"
                          step="1"
                          value={margin}
                          onChange={(e) => setMargin(Number(e.target.value))}
                          className="flex-1 accent-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status toggle & save */}
                  <div className="pt-[10px] border-t border-slate-100 flex items-center justify-between gap-[10px]">
                    <div className="flex items-center gap-[6px]">
                      <span className="w-[8px] h-[8px] rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[12px] font-semibold text-slate-700">
                        Store Online & Ready
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="h-[38px] px-[18px] rounded-[9px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[12px] flex items-center gap-[6px] shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                    >
                      {saved ? <Check size={14} /> : null}
                      <span>{saved ? 'Saved Successfully!' : 'Save & Publish Store'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: STORE ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-[12px]">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search size={14} className="absolute left-[10px] top-[12px] text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search customer name, network, or package..."
                      className="w-full h-[36px] pl-[32px] pr-[10px] rounded-[9px] border border-slate-200 bg-slate-50 text-[12px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  {/* Orders List */}
                  <div className="space-y-[8px]">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-[10px] rounded-[10px] bg-slate-50/80 border border-slate-200/80 flex items-center justify-between gap-[8px]"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-[6px]">
                            <span className="text-[12px] font-bold text-slate-800 truncate">
                              {order.customer}
                            </span>
                            <span className="text-[9.5px] font-semibold px-[5px] py-[0.5px] rounded-[4px] bg-slate-200/80 text-slate-600">
                              {order.network}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-[1px]">
                            {order.plan} • {order.time}
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-[12.5px] font-bold text-slate-800">
                            ₵{order.amount.toFixed(2)}
                          </div>
                          <div className="text-[10px] font-bold text-emerald-600 mt-[1px]">
                            +₵{order.profit.toFixed(2)} profit
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center text-[10px] text-slate-400 pt-[6px]">
                    Showing {filteredOrders.length} recent customer store transactions
                  </div>
                </div>
              )}

              {/* TAB 3: STORE EARNINGS */}
              {activeTab === 'earnings' && (
                <div className="space-y-[14px]">
                  {/* Earnings Highlight Cards */}
                  <div className="grid grid-cols-2 gap-[10px]">
                    <div className="p-[12px] rounded-[12px] bg-emerald-50/90 border border-emerald-200/80">
                      <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                        Available Profit Balance
                      </div>
                      <div className="text-[20px] font-bold text-emerald-700 mt-[2px]">
                        ₵485.50
                      </div>
                      <div className="text-[10px] text-emerald-600 mt-[2px]">
                        Ready to withdraw anytime
                      </div>
                    </div>

                    <div className="p-[12px] rounded-[12px] bg-slate-50 border border-slate-200">
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Total Store Revenue
                      </div>
                      <div className="text-[20px] font-bold text-slate-800 mt-[2px]">
                        ₵2,840.00
                      </div>
                      <div className="text-[10px] text-slate-400 mt-[2px]">
                        Over 124 customer orders
                      </div>
                    </div>
                  </div>

                  {/* Instant Withdrawal Box */}
                  <div className="p-[14px] rounded-[12px] bg-white border border-slate-200 shadow-2xs">
                    <h3 className="text-[13px] font-bold text-slate-800 mb-[4px]">
                      Withdraw Store Earnings
                    </h3>
                    <p className="text-[11px] text-slate-500 mb-[12px] leading-relaxed">
                      Transfer accumulated store commission straight to your main SwiftNet wallet or your MoMo number.
                    </p>

                    {withdrawSuccess ? (
                      <div className="p-[10px] rounded-[8px] bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11.5px] font-semibold flex items-center gap-[6px]">
                        <CheckCircle2 size={15} />
                        <span>₵485.50 transferred to your Main Wallet successfully!</span>
                      </div>
                    ) : (
                      <div className="flex gap-[8px]">
                        <button
                          onClick={handleWithdraw}
                          className="flex-1 h-[38px] rounded-[9px] bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-[12px] flex items-center justify-center gap-[6px] shadow-2xs transition-all cursor-pointer"
                        >
                          <Coins size={14} />
                          <span>Withdraw ₵485.50 to Main Wallet</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Commission Breakdown */}
                  <div>
                    <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-[8px]">
                      Commission Breakdown by Category
                    </div>
                    <div className="space-y-[6px]">
                      <div className="flex items-center justify-between p-[8px] rounded-[8px] bg-slate-50 text-[11.5px]">
                        <span className="font-semibold text-slate-700">MTN SME Data</span>
                        <span className="font-bold text-emerald-600">+₵280.50 (58%)</span>
                      </div>
                      <div className="flex items-center justify-between p-[8px] rounded-[8px] bg-slate-50 text-[11.5px]">
                        <span className="font-semibold text-slate-700">Telecel Data & Airtime</span>
                        <span className="font-bold text-emerald-600">+₵132.00 (27%)</span>
                      </div>
                      <div className="flex items-center justify-between p-[8px] rounded-[8px] bg-slate-50 text-[11.5px]">
                        <span className="font-semibold text-slate-700">WAEC Results Checkers</span>
                        <span className="font-bold text-emerald-600">+₵73.00 (15%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
