'use client';
import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useNavigation, SiteOrder } from '@/src/context/NavigationContext';
import { MTNLogo, TelecelLogo, AirtelTigoLogo } from '@/src/components/common/NetworkLogos';

export default function OrdersPage() {
  const { orders, navigateTo } = useNavigation();
  const [sourceFilter, setSourceFilter] = useState<'all' | 'my' | 'agent'>('all');
  const [networkFilter, setNetworkFilter] = useState<'all' | 'MTN' | 'AirtelTigo' | 'Telecel'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<SiteOrder | null>(null);

  // Prevent background scrolling when receipt popup is open
  useEffect(() => {
    if (selectedReceipt) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedReceipt]);

  // Count metrics dynamically from live site orders
  const totalCount = orders.length;
  const processingCount = orders.filter(o => o.status === 'Processing').length;
  const deliveredCount = orders.filter(o => o.status === 'Completed').length;
  const failedCount = orders.filter(o => o.status === 'Failed').length;

  const filteredOrders = orders.filter((o) => {
    const matchesSource =
      sourceFilter === 'all' ||
      (sourceFilter === 'my' && o.source === 'my') ||
      (sourceFilter === 'agent' && o.source === 'agent');

    const matchesNetwork =
      networkFilter === 'all' || o.network === networkFilter;

    const matchesSearch =
      searchQuery.trim() === '' ||
      o.phone.includes(searchQuery) ||
      o.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.bundle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSource && matchesNetwork && matchesSearch;
  });

  return (
    <div className="pt-[4px] pb-[32px] max-w-[440px] mx-auto">
      {/* Top Header Row with Back Button */}
      <div className="flex items-center justify-between mb-[12px]">
        <button
          onClick={() => navigateTo('dashboard')}
          className="w-[34px] h-[34px] rounded-[10px] bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={15} />
        </button>
        <div className="h-[3px] w-[46px] rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-900" />
      </div>

      {/* Card 1: History Header, Buy Data CTA & 2x2 Metric Counters */}
      <div className="bg-white rounded-[16px] border border-slate-200/90 p-[16px] shadow-2xs">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-[10px]">
          <div className="w-[42px] h-[42px] rounded-[12px] bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 flex-shrink-0 shadow-2xs">
            <ShoppingBag size={20} strokeWidth={1.9} />
          </div>
          <div>
            <div className="font-overline text-[9.5px] font-bold text-sky-600 tracking-[0.14em] uppercase">
              HISTORY
            </div>
            <h1 className="text-[16px] font-bold text-slate-900 tracking-[-0.01em] leading-tight">
              Orders
            </h1>
          </div>
        </div>

        {/* Subtitle description */}
        <p className="text-[11.5px] text-slate-500 leading-relaxed mt-[10px]">
          Search by reference or phone. Newest orders first. Agent sales are in the Agent sales tab.
        </p>

        {/* Clean Buy Data CTA Button */}
        <button
          onClick={() => navigateTo('buy-data')}
          className="w-full mt-[14px] mb-[14px] h-[40px] rounded-[11px] bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer shadow-xs"
        >
          Buy data
        </button>

        {/* 2x2 Metric Count Cards */}
        <div className="grid grid-cols-2 gap-[8px]">
          {/* TOTAL */}
          <div className="rounded-[10px] bg-[#F0F9FF] border border-sky-200/80 p-[9px_12px]">
            <div className="text-[9.5px] font-bold text-sky-600 tracking-[0.08em] uppercase">
              TOTAL
            </div>
            <div className="text-[17px] font-bold text-sky-700 mt-[1px] tabular-nums leading-tight">
              {totalCount}
            </div>
          </div>

          {/* PROCESSING */}
          <div className="rounded-[10px] bg-[#FEFDF0] border border-amber-200/80 p-[9px_12px]">
            <div className="text-[9.5px] font-bold text-amber-700/80 tracking-[0.08em] uppercase">
              PROCESSING
            </div>
            <div className="text-[17px] font-bold text-amber-700 mt-[1px] tabular-nums leading-tight">
              {processingCount}
            </div>
          </div>

          {/* DELIVERED */}
          <div className="rounded-[10px] bg-[#F0FDF4] border border-emerald-200/80 p-[9px_12px]">
            <div className="text-[9.5px] font-bold text-emerald-600 tracking-[0.08em] uppercase">
              DELIVERED
            </div>
            <div className="text-[17px] font-bold text-emerald-600 mt-[1px] tabular-nums leading-tight">
              {deliveredCount}
            </div>
          </div>

          {/* FAILED */}
          <div className="rounded-[10px] bg-[#FFF1F2] border border-rose-200/70 p-[9px_12px]">
            <div className="text-[9.5px] font-bold text-rose-500 tracking-[0.08em] uppercase">
              FAILED
            </div>
            <div className="text-[17px] font-bold text-rose-600 mt-[1px] tabular-nums leading-tight">
              {failedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Search Box & Filter Chips */}
      <div className="bg-white rounded-[16px] border border-slate-200/90 p-[16px] shadow-2xs mt-[12px]">
        {/* Search Input Box */}
        <div className="rounded-[10px] border border-slate-200 bg-white px-[12px] py-[8px] flex items-center focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 transition-all mb-[14px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reference or phone..."
            className="w-full text-[12px] text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
          />
        </div>

        {/* SOURCE Filter Group */}
        <div>
          <div className="font-overline text-[9.5px] font-bold text-slate-500 tracking-[0.1em] uppercase mb-[6px]">
            SOURCE
          </div>
          <div className="flex flex-wrap gap-[6px]">
            <button
              onClick={() => setSourceFilter('all')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                sourceFilter === 'all'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              All purchases
            </button>
            <button
              onClick={() => setSourceFilter('my')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                sourceFilter === 'my'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              My purchases
            </button>
            <button
              onClick={() => setSourceFilter('agent')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                sourceFilter === 'agent'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              Agent sales
            </button>
          </div>
        </div>

        {/* NETWORK Filter Group */}
        <div className="mt-[12px]">
          <div className="font-overline text-[9.5px] font-bold text-slate-500 tracking-[0.1em] uppercase mb-[6px]">
            NETWORK
          </div>
          <div className="flex flex-wrap gap-[6px]">
            <button
              onClick={() => setNetworkFilter('all')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                networkFilter === 'all'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              All networks
            </button>
            <button
              onClick={() => setNetworkFilter('MTN')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                networkFilter === 'MTN'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              MTN
            </button>
            <button
              onClick={() => setNetworkFilter('AirtelTigo')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                networkFilter === 'AirtelTigo'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              AirtelTigo
            </button>
            <button
              onClick={() => setNetworkFilter('Telecel')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                networkFilter === 'Telecel'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              Telecel
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Orders List or Empty State */}
      <div className="bg-white rounded-[16px] border border-slate-200/90 p-[20px] shadow-2xs mt-[12px]">
        {filteredOrders.length === 0 ? (
          <div className="py-[28px] text-center">
            {/* Sky Blue Shopping Bag Icon Badge */}
            <div className="w-[50px] h-[50px] rounded-full bg-sky-50/90 border border-sky-100 flex items-center justify-center text-sky-600 mx-auto mb-[12px] shadow-2xs">
              <ShoppingBag size={22} strokeWidth={1.8} />
            </div>
            <h3 className="text-[14.5px] font-bold text-slate-900 leading-tight">
              No orders to show
            </h3>
            <p className="text-[11.5px] text-slate-500 mt-[4px]">
              No orders match your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-[8px]">
            {filteredOrders.map((order) => {
              const statusConfig = {
                Completed: { icon: CheckCircle2, text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
                Processing: { icon: Clock, text: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
                Failed: { icon: XCircle, text: 'text-red-700', bg: 'bg-red-50 border-red-200' },
              }[order.status];
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedReceipt(order)}
                  className="rounded-[10px] border border-slate-200 p-[10px] hover:border-slate-300 hover:bg-slate-50/70 transition-all flex items-center justify-between gap-[8px] cursor-pointer"
                >
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[32px] h-[32px] flex items-center justify-center flex-shrink-0">
                      {order.network === 'MTN' ? <MTNLogo className="w-8 h-8" /> :
                       order.network === 'Telecel' ? <TelecelLogo className="w-8 h-8" /> :
                       <AirtelTigoLogo className="w-8 h-8" />}
                    </div>

                    <div>
                      <div className="text-[12px] font-bold text-slate-900">
                        {order.bundle}
                      </div>
                      <div className="text-[10.5px] text-slate-500">
                        {order.phone} • {order.date}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[12.5px] font-bold text-slate-900 tabular-nums">
                      ₵{order.price.toFixed(2)}
                    </div>
                    <span className={`inline-flex items-center gap-[2px] px-[5px] py-[1px] rounded-full border text-[9px] font-bold mt-[1px] ${statusConfig.bg} ${statusConfig.text}`}>
                      <StatusIcon size={9} />
                      <span>{order.status}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-[340px] bg-white rounded-[14px] p-[18px] shadow-xl border border-slate-200 text-slate-800">
            <div className="flex justify-between items-start pb-[8px] border-b border-slate-100">
              <div>
                <h3 className="text-[13.5px] font-bold text-slate-900">Transaction Receipt</h3>
                <p className="text-[10px] text-slate-400">SwiftNet Automated Service</p>
              </div>
              <span className="text-[9.5px] font-mono text-slate-500">{selectedReceipt.ref}</span>
            </div>

            <div className="py-[12px] space-y-[6px] text-[11.5px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Service</span>
                <span className="font-semibold text-slate-800">{selectedReceipt.network} Bundle</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Package</span>
                <span className="font-semibold text-slate-800">{selectedReceipt.bundle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient</span>
                <span className="font-mono text-slate-800">{selectedReceipt.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span className="text-slate-800">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-bold text-emerald-600">{selectedReceipt.status}</span>
              </div>
              <div className="border-t border-slate-100 pt-[6px] flex justify-between font-bold text-[12.5px]">
                <span>Amount Paid</span>
                <span className="text-blue-700">₵{selectedReceipt.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-[10px] flex gap-[6px]">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex-1 h-[36px] rounded-[9px] bg-slate-900 hover:bg-slate-950 text-white text-[12px] font-bold active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

