'use client';
import { useState } from 'react';
import { ArrowLeft, Search, Filter, CheckCircle2, Clock, XCircle, Download, ExternalLink } from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

interface OrderItem {
  id: string;
  network: 'MTN' | 'Telecel' | 'AirtelTigo' | 'WAEC';
  phone: string;
  bundle: string;
  price: number;
  date: string;
  status: 'Completed' | 'Processing' | 'Failed';
  ref: string;
}

const initialOrders: OrderItem[] = [
  { id: '1', network: 'MTN', phone: '0244123456', bundle: '5 GB Non-Expiry', price: 27.50, date: 'Today, 11:20 AM', status: 'Completed', ref: 'ORD-98421' },
  { id: '2', network: 'Telecel', phone: '0205839201', bundle: '12 GB 30 Days', price: 48.00, date: 'Yesterday, 04:15 PM', status: 'Completed', ref: 'ORD-87123' },
  { id: '3', network: 'MTN', phone: '0551928374', bundle: '10 GB Non-Expiry', price: 54.00, date: 'Sep 03, 08:30 PM', status: 'Completed', ref: 'ORD-76512' },
  { id: '4', network: 'WAEC', phone: 'Direct Pin', bundle: '2x WASSCE Checkers', price: 40.00, date: 'Sep 02, 01:10 PM', status: 'Completed', ref: 'ORD-65432' },
  { id: '5', network: 'AirtelTigo', phone: '0261928475', bundle: '4.5 GB Big Time', price: 18.00, date: 'Sep 01, 10:45 AM', status: 'Processing', ref: 'ORD-54321' },
  { id: '6', network: 'MTN', phone: '0249876543', bundle: '20 GB Non-Expiry', price: 105.00, date: 'Aug 29, 05:22 PM', status: 'Completed', ref: 'ORD-43210' },
];

export default function OrdersPage() {
  const { navigateTo } = useNavigation();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Completed' | 'Processing' | 'Failed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<OrderItem | null>(null);

  const filteredOrders = initialOrders.filter((o) => {
    const matchesFilter = filterStatus === 'All' || o.status === filterStatus;
    const matchesSearch =
      o.phone.includes(searchQuery) ||
      o.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.network.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-[10px] pb-[36px] max-w-[860px] mx-auto">
      {/* Top Accent Line */}
      <div className="h-[3px] w-[56px] rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-900 mb-[12px]" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[10px] mb-[14px]">
        <div>
          <h1 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-1)] tracking-[-0.02em] leading-tight">
            Orders & History
          </h1>
          <p className="text-[12.5px] text-[var(--text-3)] mt-[2px]">
            Track all data bundle purchases, recipient dispatches, and transaction receipts.
          </p>
        </div>

        <button
          onClick={() => navigateTo('buy-data')}
          className="h-[32px] px-[12px] rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11.5px] flex items-center gap-[6px] shadow-2xs self-start sm:self-auto cursor-pointer transition-all active:scale-[0.98]"
        >
          <span>New Order</span>
        </button>
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

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-[12px] border border-slate-200/90 p-[12px] mb-[16px] shadow-2xs flex flex-col sm:flex-row gap-[10px] sm:items-center justify-between">
        <div className="flex items-center gap-[6px] overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Completed', 'Processing', 'Failed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`h-[28px] px-[10px] rounded-[6px] text-[11.5px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === tab
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-[8px] px-[10px] py-[6px] rounded-[8px] border border-slate-200 bg-white sm:w-[240px]">
          <Search size={13} className="text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phone or Ref..."
            className="w-full text-[11.5px] text-slate-800 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-[8px]">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-[12px] border border-slate-200/90 p-[32px] text-center">
            <p className="text-[13px] font-medium text-slate-600">No orders found</p>
            <p className="text-[11px] text-slate-400 mt-[4px]">Try adjusting your search query or filter criteria.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusConfig = {
              Completed: { icon: CheckCircle2, text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
              Processing: { icon: Clock, text: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
              Failed: { icon: XCircle, text: 'text-red-700', bg: 'bg-red-50 border-red-200' },
            }[order.status];
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order.id}
                className="bg-white rounded-[12px] border border-slate-200/90 p-[12px] sm:p-[14px] shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-[10px]"
              >
                <div className="flex items-start gap-[10px]">
                  <div className={`w-[36px] h-[36px] rounded-[8px] flex items-center justify-center font-bold text-[10px] flex-shrink-0 border ${
                    order.network === 'MTN' ? 'bg-amber-400 text-slate-900 border-amber-500' :
                    order.network === 'Telecel' ? 'bg-red-500 text-white border-red-600' :
                    order.network === 'AirtelTigo' ? 'bg-blue-600 text-white border-blue-700' :
                    'bg-emerald-600 text-white border-emerald-700'
                  }`}>
                    {order.network.substring(0, 3).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-[6px]">
                      <span className="text-[13px] font-bold text-slate-900">{order.bundle}</span>
                      <span className="text-[11px] text-slate-500">• {order.phone}</span>
                    </div>
                    <div className="flex items-center gap-[8px] text-[11px] text-slate-400 mt-[2px]">
                      <span>{order.date}</span>
                      <span>Ref: {order.ref}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-[12px] border-t sm:border-t-0 pt-[8px] sm:pt-0">
                  <div className="text-right">
                    <div className="text-[13.5px] font-bold text-slate-900 tabular-nums">
                      ₵{order.price.toFixed(2)}
                    </div>
                    <span className={`inline-flex items-center gap-[3px] px-[6px] py-[1px] rounded-full border text-[9.5px] font-bold mt-[2px] ${statusConfig.bg} ${statusConfig.text}`}>
                      <StatusIcon size={10} />
                      <span>{order.status}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedReceipt(order)}
                    className="h-[28px] px-[10px] rounded-[6px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-all cursor-pointer"
                  >
                    Receipt
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-[360px] bg-white rounded-[16px] p-[20px] shadow-xl border border-slate-200 text-slate-800">
            <div className="flex justify-between items-start pb-[10px] border-b border-slate-100">
              <div>
                <h3 className="text-[14px] font-bold text-slate-900">Transaction Receipt</h3>
                <p className="text-[10.5px] text-slate-400">SwiftNet Automated Service</p>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{selectedReceipt.ref}</span>
            </div>

            <div className="py-[14px] space-y-[8px] text-[12px]">
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
              <div className="border-t border-slate-100 pt-[8px] flex justify-between font-bold text-[13.5px]">
                <span>Amount Paid</span>
                <span className="text-blue-700">₵{selectedReceipt.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-[10px] flex gap-[8px]">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex-1 h-[34px] rounded-[8px] bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-800 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
