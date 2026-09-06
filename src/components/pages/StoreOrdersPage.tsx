'use client';
import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  Filter, 
  TrendingUp, 
  Copy, 
  Check, 
  ExternalLink,
  Store,
  X
} from 'lucide-react';
import { useNavigation, SiteOrder } from '@/src/context/NavigationContext';
import { MTNLogo, TelecelLogo, AirtelTigoLogo, WAECLogo } from '@/src/components/common/NetworkLogos';

export default function StoreOrdersPage() {
  const { orders, navigateTo } = useNavigation();
  const [networkFilter, setNetworkFilter] = useState<'all' | 'MTN' | 'AirtelTigo' | 'Telecel' | 'WAEC'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Completed' | 'Processing' | 'Failed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<SiteOrder | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Filter store orders (source === 'agent' or fallback demo store sales)
  const storeOrdersList = orders.filter(o => o.source === 'agent' || orders.length < 5);

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

  const totalStoreOrders = storeOrdersList.length;
  const completedCount = storeOrdersList.filter(o => o.status === 'Completed').length;
  const processingCount = storeOrdersList.filter(o => o.status === 'Processing').length;
  const totalStoreProfit = storeOrdersList.reduce((sum, o) => sum + (o.price * 0.12), 0);

  const filteredOrders = storeOrdersList.filter((o) => {
    const matchesNetwork = networkFilter === 'all' || o.network === networkFilter;
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      o.phone.includes(searchQuery) ||
      o.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.bundle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesNetwork && matchesStatus && matchesSearch;
  });

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="pt-[4px] pb-[36px] max-w-[560px] mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-[12px]">
        <button
          onClick={() => navigateTo('store')}
          className="w-[34px] h-[34px] rounded-[10px] bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title="Back to Store Manager"
          aria-label="Back to Store Manager"
        >
          <ArrowLeft size={15} />
        </button>

        <div className="flex items-center gap-[6px]">
          <span className="text-[14px] font-bold text-slate-900">Store Orders</span>
          <span className="px-[6px] py-[1px] rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">
            {totalStoreOrders} Total
          </span>
        </div>

        <button
          onClick={() => navigateTo('create-store')}
          className="h-[32px] px-[10px] rounded-[8px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11.5px] font-semibold flex items-center gap-[4px] transition-all cursor-pointer shadow-2xs"
        >
          <Store size={12} className="text-slate-500" />
          <span>My Store</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-3 gap-[8px] mb-[12px]">
        <div className="p-[12px] rounded-[12px] bg-white border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Completed</div>
          <div className="text-[16px] font-bold text-emerald-600 mt-[2px]">{completedCount}</div>
        </div>

        <div className="p-[12px] rounded-[12px] bg-white border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Processing</div>
          <div className="text-[16px] font-bold text-amber-600 mt-[2px]">{processingCount}</div>
        </div>

        <div className="p-[12px] rounded-[12px] bg-white border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Est. Profit</div>
          <div className="text-[16px] font-bold text-blue-600 mt-[2px] tabular-nums">GH₵{totalStoreProfit.toFixed(2)}</div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-[10px]">
        <Search size={14} className="absolute left-[12px] top-[12px] text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by customer phone, bundle or reference..."
          className="w-full h-[38px] pl-[34px] pr-[12px] rounded-[10px] bg-white border border-slate-200 text-[12px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-[10px] top-[10px] text-slate-400 hover:text-slate-600 text-[11px]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Network Filters */}
      <div className="flex gap-[4px] overflow-x-auto pb-[4px] mb-[10px] scrollbar-none">
        {(['all', 'MTN', 'Telecel', 'AirtelTigo', 'WAEC'] as const).map((net) => (
          <button
            key={net}
            onClick={() => setNetworkFilter(net)}
            className={`h-[28px] px-[10px] rounded-[6px] text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              networkFilter === net
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {net === 'MTN' && <MTNLogo className="w-3.5 h-3.5" />}
            {net === 'Telecel' && <TelecelLogo className="w-3.5 h-3.5" />}
            {net === 'AirtelTigo' && <AirtelTigoLogo className="w-3.5 h-3.5" />}
            {net === 'WAEC' && <WAECLogo className="w-3.5 h-3.5" />}
            <span>{net === 'all' ? 'All Networks' : net}</span>
          </button>
        ))}
      </div>

      {/* Store Orders List */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-[14px] py-[10px] border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <span className="text-[11.5px] font-bold text-slate-700">Customer Storefront Transactions</span>
          <span className="text-[10.5px] text-slate-500">{filteredOrders.length} records</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="py-[36px] px-[20px] text-center">
            <ShoppingBag size={28} className="mx-auto text-slate-300 mb-[8px]" />
            <div className="text-[13px] font-bold text-slate-700">No Store Orders Found</div>
            <p className="text-[11px] text-slate-500 mt-[2px]">
              Orders placed by customers through your storefront link will automatically show up here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredOrders.map((order) => {
              const estimatedProfit = (order.price * 0.12).toFixed(2);
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedReceipt(order)}
                  className="p-[12px] hover:bg-slate-50/80 transition-colors cursor-pointer flex items-center justify-between gap-[8px]"
                >
                  <div className="flex items-center gap-[10px] min-w-0">
                    <div className="w-[34px] h-[34px] flex items-center justify-center flex-shrink-0">
                      {order.network === 'MTN' && <MTNLogo className="w-8 h-8" />}
                      {order.network === 'Telecel' && <TelecelLogo className="w-8 h-8" />}
                      {order.network === 'AirtelTigo' && <AirtelTigoLogo className="w-8 h-8" />}
                      {order.network === 'WAEC' && <WAECLogo className="w-8 h-8" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-bold text-slate-900 truncate">
                        {order.bundle}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-[1px] truncate">
                        {order.phone} • {order.date}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-[13px] font-bold text-slate-900 tabular-nums">
                      GH₵{order.price.toFixed(2)}
                    </div>
                    <div className="flex items-center justify-end gap-[4px] mt-[1px]">
                      <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-[4px] py-[0.5px] rounded-[3px]">
                        +₵{estimatedProfit}
                      </span>
                      <span className={`text-[9.5px] font-bold px-[5px] py-[0.5px] rounded-[3px] ${
                        order.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Processing'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Store Order Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-[16px]">
          <div 
            className="bg-white rounded-[18px] border border-slate-200 shadow-xl w-full max-w-[380px] p-[18px] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-[12px] border-b border-slate-100">
              <div className="flex items-center gap-[6px]">
                <Store size={15} className="text-blue-600" />
                <h3 className="text-[13.5px] font-bold text-slate-900">Storefront Order Receipt</h3>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="w-[24px] h-[24px] rounded-[6px] bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>

            <div className="py-[14px] space-y-[10px]">
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-500">Customer Phone</span>
                <span className="font-bold text-slate-900 font-mono">{selectedReceipt.phone}</span>
              </div>

              <div className="flex justify-between text-[12px]">
                <span className="text-slate-500">Network & Bundle</span>
                <span className="font-bold text-slate-900">{selectedReceipt.network} • {selectedReceipt.bundle}</span>
              </div>

              <div className="flex justify-between text-[12px]">
                <span className="text-slate-500">Retail Amount Charged</span>
                <span className="font-bold text-slate-900 tabular-nums">GH₵{selectedReceipt.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-[12px]">
                <span className="text-slate-500">Your Agent Profit</span>
                <span className="font-bold text-emerald-600 tabular-nums">+GH₵{(selectedReceipt.price * 0.12).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-[12px]">
                <span className="text-slate-500">Delivery Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-[3px]">
                  <CheckCircle2 size={12} /> {selectedReceipt.status}
                </span>
              </div>

              <div className="flex justify-between text-[12px]">
                <span className="text-slate-500">Date & Time</span>
                <span className="font-medium text-slate-700">{selectedReceipt.date}</span>
              </div>

              <div className="flex items-center justify-between pt-[6px] border-t border-slate-100 text-[11px]">
                <span className="text-slate-500">Ref: {selectedReceipt.ref}</span>
                <button
                  onClick={() => handleCopy(selectedReceipt.ref)}
                  className="px-[6px] py-[2px] rounded-[4px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-[3px] cursor-pointer"
                >
                  {copiedRef ? <Check size={10} /> : <Copy size={10} />}
                  <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="w-full h-[36px] rounded-[9px] bg-slate-900 hover:bg-slate-800 text-white font-bold text-[12px] flex items-center justify-center transition-all cursor-pointer mt-[6px]"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
