'use client';
import { useState } from 'react';
import { 
  Users, 
  Search, 
  UserCheck, 
  Mail, 
  Phone, 
  Ban, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  CreditCard,
  Filter
} from 'lucide-react';

export default function AdminManageUsers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'unverified-email' | 'unverified-mobile' | 'banned'>('all');

  const initialUsers = [
    { id: 104829, name: 'KTech Data Express (You)', email: 'selikemjunior987@gmail.com', phone: '0244123456', status: 'Active', emailVerified: true, mobileVerified: true, balance: 'GH₵485.50', plan: 'Tier 2 Reseller' },
    { id: 104830, name: 'Kofi DataHub', email: 'kofi@datahub.gh', phone: '0551234567', status: 'Active', emailVerified: true, mobileVerified: true, balance: 'GH₵1,420.00', plan: 'Platinum Agent' },
    { id: 104831, name: 'Ama Bundles', email: 'ama@bundles.com', phone: '0209876543', status: 'Active', emailVerified: true, mobileVerified: true, balance: 'GH₵750.00', plan: 'Gold Reseller' },
    { id: 104832, name: 'Yaw SME Hub', email: 'yaw@smehub.gh', phone: '0271122334', status: 'Active', emailVerified: true, mobileVerified: true, balance: 'GH₵350.00', plan: 'Gold Reseller' },
    { id: 104833, name: 'Accra FastNet', email: 'fastnet@accra.io', phone: '0245566778', status: 'Email Unverified', emailVerified: false, mobileVerified: true, balance: 'GH₵120.00', plan: 'Silver Reseller' },
    { id: 104834, name: 'TechBros Kumasi', email: 'techbros@kumasi.gh', phone: '0501122334', status: 'Email Unverified', emailVerified: false, mobileVerified: true, balance: 'GH₵50.00', plan: 'Silver Reseller' },
    { id: 104835, name: 'Cape Coast Gig', email: 'ccgig@telecom.com', phone: '0249988776', status: 'Mobile Unverified', emailVerified: true, mobileVerified: false, balance: 'GH₵0.00', plan: 'Bronze Agent' },
    { id: 104836, name: 'Fake Spammer Bot', email: 'spam@fakebot.xyz', phone: '0000000000', status: 'Banned', emailVerified: false, mobileVerified: false, balance: 'GH₵0.00', plan: 'Suspended' },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<typeof initialUsers[0] | null>(null);
  const [creditAmount, setCreditAmount] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase()) ||
                          user.phone.includes(search) ||
                          user.id.toString().includes(search);
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && user.status === 'Active';
    if (filter === 'unverified-email') return matchesSearch && !user.emailVerified;
    if (filter === 'unverified-mobile') return matchesSearch && !user.mobileVerified;
    if (filter === 'banned') return matchesSearch && user.status === 'Banned';
    return matchesSearch;
  });

  const handleCreditWallet = (userId: number) => {
    if (!creditAmount || isNaN(Number(creditAmount))) return;
    setUsers(users.map(u => {
      if (u.id === userId) {
        const currentBal = parseFloat(u.balance.replace('GH₵', '').replace(',', '')) || 0;
        const newBal = currentBal + parseFloat(creditAmount);
        return { ...u, balance: `GH₵${newBal.toFixed(2)}` };
      }
      return u;
    }));
    setCreditAmount('');
    setSelectedUser(null);
  };

  const handleToggleBan = (userId: number) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'Banned' ? 'Active' : 'Banned';
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-5">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-800 font-display">Manage User Accounts</h2>
          <p className="text-xs text-slate-500 mt-0.5">View, filter, edit, or adjust user wallet balances</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
          {(['all', 'active', 'unverified-email', 'unverified-mobile', 'banned'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                filter === f 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, phone number, or User ID..."
          className="w-full h-[42px] pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-blue-500 shadow-2xs"
        />
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10.5px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Plan & Status</th>
                <th className="py-3 px-4">Wallet Balance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-[13px]">{user.name}</div>
                        <div className="text-[10.5px] text-slate-400 font-mono">ID: #{user.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 space-y-0.5 text-[11.5px]">
                    <div className="text-slate-700">{user.email}</div>
                    <div className="text-slate-400 font-mono">{user.phone}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/60">
                        {user.plan}
                      </span>
                      <div>
                        {user.status === 'Active' && (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                            <CheckCircle2 size={12} /> Active
                          </span>
                        )}
                        {user.status.includes('Unverified') && (
                          <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                            Unverified
                          </span>
                        )}
                        {user.status === 'Banned' && (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-[11px]">
                            <Ban size={12} /> Banned
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                    {user.balance}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <CreditCard size={12} />
                        <span>Credit</span>
                      </button>

                      <button
                        onClick={() => handleToggleBan(user.id)}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          user.status === 'Banned'
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        }`}
                        title={user.status === 'Banned' ? 'Unban User' : 'Ban User'}
                      >
                        <Ban size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Wallet Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[400px] p-5 shadow-2xl space-y-4 text-slate-800">
            <h3 className="font-bold text-base text-slate-900">Credit User Wallet</h3>
            <p className="text-xs text-slate-500">
              User: <span className="font-bold text-slate-800">{selectedUser.name}</span> (#{selectedUser.id})
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Amount to Add (GH₵)
              </label>
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="e.g. 100.00"
                className="w-full h-[40px] px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCreditWallet(selectedUser.id)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
              >
                Credit Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
