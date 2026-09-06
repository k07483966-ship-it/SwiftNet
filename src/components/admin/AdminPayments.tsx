'use client';
import { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  Percent, 
  ArrowUpRight, 
  Search,
  Check,
  X
} from 'lucide-react';

export default function AdminPayments() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [search, setSearch] = useState('');

  const [payments, setPayments] = useState([
    { id: 'PAY-8820', user: 'Selikem Junior (KTech)', amount: 'GH₵250.00', gateway: 'MTN Mobile Money', ref: '0244123456', status: 'Pending', date: '2026-09-06 09:14' },
    { id: 'PAY-8821', user: 'Kofi DataHub', amount: 'GH₵1,000.00', gateway: 'Telecel Cash', ref: '0551234567', status: 'Pending', date: '2026-09-06 08:50' },
    { id: 'PAY-8822', user: 'Ama Bundles', amount: 'GH₵500.00', gateway: 'AT Money', ref: '0209876543', status: 'Pending', date: '2026-09-06 08:30' },
    { id: 'PAY-8823', user: 'Yaw SME Hub', amount: 'GH₵300.00', gateway: 'MTN Mobile Money', ref: '0271122334', status: 'Pending', date: '2026-09-06 07:15' },
    { id: 'PAY-8819', user: 'Accra FastNet', amount: 'GH₵150.00', gateway: 'MTN Mobile Money', ref: '0245566778', status: 'Approved', date: '2026-09-05 18:22' },
    { id: 'PAY-8818', user: 'TechBros Kumasi', amount: 'GH₵80.00', gateway: 'Telecel Cash', ref: '0501122334', status: 'Approved', date: '2026-09-05 16:10' },
    { id: 'PAY-8817', user: 'Fake Bot', amount: 'GH₵5,000.00', gateway: 'Invalid Card', ref: '0000000000', status: 'Rejected', date: '2026-09-05 12:00' },
  ]);

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const filtered = payments.filter(p => {
    const matchesSearch = p.user.toLowerCase().includes(search.toLowerCase()) || 
                          p.id.toLowerCase().includes(search.toLowerCase()) ||
                          p.ref.includes(search);
    if (filter === 'all') return matchesSearch;
    return matchesSearch && p.status.toLowerCase() === filter;
  });

  return (
    <div className="space-y-5">
      {/* Top Payments Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Received</span>
            <p className="text-lg font-bold text-slate-900 mt-0.5">$6,486.00 USD</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Pending Payments</span>
            <p className="text-lg font-bold text-amber-600 mt-0.5">4 Pending</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Rejected Requests</span>
            <p className="text-lg font-bold text-rose-600 mt-0.5">4 Rejected</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            <XCircle size={20} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Gateway Fees</span>
            <p className="text-lg font-bold text-purple-600 mt-0.5">$93.86 USD</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <Percent size={20} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto custom-scrollbar">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payments..."
            className="w-full h-[36px] pl-9 pr-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10.5px]">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Gateway & Ref</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Approve / Reject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{pay.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{pay.user}</div>
                    <div className="text-[10px] text-slate-400">{pay.date}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{pay.gateway}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{pay.ref}</div>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-slate-900">{pay.amount}</td>
                  <td className="py-3 px-4">
                    {pay.status === 'Approved' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        Approved
                      </span>
                    )}
                    {pay.status === 'Pending' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200 animate-pulse">
                        Pending
                      </span>
                    )}
                    {pay.status === 'Rejected' && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {pay.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleAction(pay.id, 'Approved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Check size={12} />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleAction(pay.id, 'Rejected')}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <X size={12} />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
