'use client';
import { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Mail, 
  PhoneOff, 
  ChevronRight, 
  Sliders, 
  DollarSign, 
  Clock, 
  Ban, 
  Percent, 
  MessageSquare, 
  Eye, 
  Ticket, 
  Bell, 
  ListOrdered,
  Calendar,
  Sparkles,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface AdminDashboardProps {
  onOpenCronModal: () => void;
  setActiveTab: (tab: string) => void;
}

export default function AdminDashboard({ onOpenCronModal, setActiveTab }: AdminDashboardProps) {
  const [dateRange, setDateRange] = useState('Aug 23, 2026 - Sep 6, 2026');

  // Interactive Payment Report Data for Recharts
  const paymentReportData = [
    { date: 'Aug 23', amount: 0.85, orders: 42 },
    { date: 'Aug 25', amount: 1.10, orders: 58 },
    { date: 'Aug 27', amount: 0.95, orders: 50 },
    { date: 'Aug 29', amount: 1.45, orders: 74 },
    { date: 'Aug 31', amount: 1.30, orders: 66 },
    { date: 'Sep 02', amount: 1.80, orders: 92 },
    { date: 'Sep 04', amount: 1.65, orders: 84 },
    { date: 'Sep 06', amount: 2.05, orders: 105 },
  ];

  return (
    <div className="space-y-5 text-slate-800">
      {/* Page Title Row + Cron Setup Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight font-display">
          Dashboard
        </h1>

        <button
          onClick={onOpenCronModal}
          className="px-3.5 py-1.5 rounded-lg bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-semibold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Sliders size={14} className="text-indigo-600" />
          <span>Cron Setup</span>
        </button>
      </div>

      {/* Grid 1: Top 4 Main User Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Total Users */}
        <div 
          onClick={() => setActiveTab('users')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[46px] h-[46px] rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Users size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-slate-500">Total Users</p>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 font-display">122</h3>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
        </div>

        {/* Card 2: Active Users */}
        <div 
          onClick={() => setActiveTab('users')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[46px] h-[46px] rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <UserCheck size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-slate-500">Active Users</p>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 font-display">115</h3>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
        </div>

        {/* Card 3: Email Unverified Users */}
        <div 
          onClick={() => setActiveTab('users')}
          className="bg-white rounded-xl p-4 border border-rose-200/60 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[46px] h-[46px] rounded-xl bg-rose-100/80 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Mail size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-slate-500">Email Unverified Users</p>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 font-display">7</h3>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
        </div>

        {/* Card 4: Mobile Unverified Users */}
        <div 
          onClick={() => setActiveTab('users')}
          className="bg-white rounded-xl p-4 border border-amber-200/60 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[46px] h-[46px] rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <PhoneOff size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-slate-500">Mobile Unverified Users</p>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 font-display">0</h3>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
        </div>
      </div>

      {/* Grid 2: Payments Card + Email Controls Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Payments Breakdown Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-800 font-display">Payments</h2>
            <button 
              onClick={() => setActiveTab('payments')} 
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Total Payment */}
            <div 
              onClick={() => setActiveTab('payments')}
              className="py-3 flex items-center justify-between hover:bg-slate-50/80 rounded-xl px-2 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center font-bold">
                  <DollarSign size={19} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">$6,486.00 USD</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium">Total Payment</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>

            {/* Pending Payments */}
            <div 
              onClick={() => setActiveTab('payments')}
              className="py-3 flex items-center justify-between hover:bg-slate-50/80 rounded-xl px-2 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center font-bold">
                  <Clock size={19} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">4</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium">Pending Payments</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>

            {/* Rejected Payments */}
            <div 
              onClick={() => setActiveTab('payments')}
              className="py-3 flex items-center justify-between hover:bg-slate-50/80 rounded-xl px-2 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100/80 text-rose-500 flex items-center justify-center font-bold">
                  <Ban size={19} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">4</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium">Rejected Payments</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
            </div>

            {/* Payment Charge */}
            <div 
              onClick={() => setActiveTab('payments')}
              className="py-3 flex items-center justify-between hover:bg-slate-50/80 rounded-xl px-2 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center font-bold">
                  <Percent size={19} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">$93.86 USD</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium">Payment Charge</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
            </div>
          </div>
        </div>

        {/* Email Controls Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-800 font-display">Email Controls</h2>
            <span className="text-xs text-emerald-600 bg-emerald-50 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              SMTP Active
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Total Emails */}
            <div className="py-3 flex items-center justify-between hover:bg-slate-50/80 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center font-bold">
                  <Mail size={19} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">9363</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium">Total Emails Sent</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>

            {/* Total Replies */}
            <div className="py-3 flex items-center justify-between hover:bg-slate-50/80 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center font-bold">
                  <RotateCcw size={19} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">39</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium">Total Replies Received</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>

            {/* Read Emails */}
            <div className="py-3 flex items-center justify-between hover:bg-slate-50/80 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100/80 text-rose-500 flex items-center justify-center font-bold">
                  <Eye size={19} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">9363</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium">Read Emails</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid 3: Additional 4 Metrics (Screenshot 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Total Plan */}
        <div 
          onClick={() => setActiveTab('plans')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[46px] h-[46px] rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <ListOrdered size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-slate-500">Total Plan</p>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 font-display">3</h3>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
        </div>

        {/* Pending Tickets */}
        <div 
          onClick={() => setActiveTab('tickets')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[46px] h-[46px] rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Ticket size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-slate-500">Pending Tickets</p>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 font-display">47</h3>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
        </div>

        {/* Pending Notification */}
        <div 
          onClick={() => setActiveTab('tickets')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[46px] h-[46px] rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Bell size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-slate-500">Pending Notification</p>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 font-display">156</h3>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
        </div>

        {/* Banned User */}
        <div 
          onClick={() => setActiveTab('users')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[46px] h-[46px] rounded-xl bg-rose-100/80 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Ban size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-slate-500">Banned User</p>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 font-display">0</h3>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
        </div>
      </div>

      {/* Grid 4: Payment Report Recharts Visualizer (Screenshot 4) */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-800 font-display">Payment Report</h2>
            <p className="text-xs text-slate-500">Daily transaction volume and revenue graph</p>
          </div>

          {/* Date Picker Range Dropdown */}
          <div className="relative">
            <div className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
              <Calendar size={14} className="text-slate-500" />
              <span>{dateRange}</span>
              <span className="text-slate-400 text-[10px]">▼</span>
            </div>
          </div>
        </div>

        {/* Recharts Bar Graph Component */}
        <div className="h-[260px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentReportData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} unit="k USD" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0c1433', borderRadius: '12px', borderColor: '#1f2d5e', color: '#fff', fontSize: '12px' }}
                itemStyle={{ color: '#818cf8' }}
              />
              <Bar dataKey="amount" fill="#3c3beb" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
