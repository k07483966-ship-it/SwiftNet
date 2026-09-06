'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Receipt,
  X,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  AlertCircle,
  Coins
} from 'lucide-react';
import { useNavigation, WalletTransaction } from '@/src/context/NavigationContext';

export default function TransactionsPage() {
  const { transactions, balance, navigateTo } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'deposit' | 'purchase_data' | 'purchase_checker' | 'agent_commission'>('all');
  const [selectedTx, setSelectedTx] = useState<WalletTransaction | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Prevent background scrolling when receipt popup is open
  useEffect(() => {
    if (selectedTx) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTx]);

  // Compute live metric summary counts
  const totalCount = transactions.length;
  const depositCount = transactions.filter((t) => t.type === 'deposit').length;
  const dataCount = transactions.filter((t) => t.type === 'purchase_data').length;
  const checkerCount = transactions.filter((t) => t.type === 'purchase_checker').length;

  // Filtered transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (filterType !== 'all' && tx.type !== filterType) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchRef = tx.ref.toLowerCase().includes(q);
      const matchTitle = tx.title.toLowerCase().includes(q);
      const matchDesc = tx.description.toLowerCase().includes(q);
      const matchChannel = (tx.channel || '').toLowerCase().includes(q);
      return matchRef || matchTitle || matchDesc || matchChannel;
    }
    return true;
  });

  const handleCopyRef = (ref: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(ref);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 1500);
    }
  };

  return (
    <div className="pt-[6px] pb-[32px] max-w-[560px] mx-auto">
      {/* Top Bar with Back Navigation */}
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

      {/* Card 1: Transactions Header & 2x2 Metric Counters */}
      <div className="bg-white rounded-[16px] border border-slate-200/90 p-[16px] shadow-2xs">
        {/* Header with Icon and Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-[42px] h-[42px] rounded-[12px] bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 flex-shrink-0 shadow-2xs">
              <Receipt size={20} strokeWidth={1.9} />
            </div>
            <div>
              <div className="font-overline text-[9.5px] font-bold text-sky-600 tracking-[0.14em] uppercase">
                LEDGER
              </div>
              <h1 className="text-[16px] font-bold text-slate-900 tracking-[-0.01em] leading-tight">
                Transactions
              </h1>
            </div>
          </div>

          {/* Quick Wallet Pill */}
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Balance</span>
            <span className="text-[13px] font-bold text-slate-900 tabular-nums">₵{balance.toFixed(2)}</span>
          </div>
        </div>

        {/* Subtitle Description */}
        <p className="text-[11.5px] text-slate-500 mt-[10px] leading-relaxed">
          Your wallet movements and purchase history will show here once connected to your ledger.
        </p>

        {/* 2x2 Metric Count Cards */}
        <div className="grid grid-cols-2 gap-[8px] mt-[14px]">
          {/* TOTAL */}
          <div className="rounded-[10px] bg-[#F0F9FF] border border-sky-200/80 p-[9px_12px]">
            <div className="text-[9.5px] font-bold text-sky-600 tracking-[0.08em] uppercase">
              TOTAL MOVEMENTS
            </div>
            <div className="text-[17px] font-bold text-sky-700 mt-[1px] tabular-nums leading-tight">
              {totalCount}
            </div>
          </div>

          {/* TOP UPS */}
          <div className="rounded-[10px] bg-emerald-50/70 border border-emerald-200/80 p-[9px_12px]">
            <div className="text-[9.5px] font-bold text-emerald-700 tracking-[0.08em] uppercase">
              DEPOSITS / TOPUPS
            </div>
            <div className="text-[17px] font-bold text-emerald-800 mt-[1px] tabular-nums leading-tight">
              {depositCount}
            </div>
          </div>

          {/* DATA PURCHASES */}
          <div className="rounded-[10px] bg-slate-50 border border-slate-200/80 p-[9px_12px]">
            <div className="text-[9.5px] font-bold text-slate-600 tracking-[0.08em] uppercase">
              DATA ORDERS
            </div>
            <div className="text-[17px] font-bold text-slate-800 mt-[1px] tabular-nums leading-tight">
              {dataCount}
            </div>
          </div>

          {/* CHECKERS */}
          <div className="rounded-[10px] bg-amber-50/70 border border-amber-200/80 p-[9px_12px]">
            <div className="text-[9.5px] font-bold text-amber-700 tracking-[0.08em] uppercase">
              CHECKERS / COMM.
            </div>
            <div className="text-[17px] font-bold text-amber-800 mt-[1px] tabular-nums leading-tight">
              {checkerCount}
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
            placeholder="Search by reference, recipient, or channel..."
            className="w-full text-[12px] text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
          />
          <Search size={14} className="text-slate-400 ml-[6px] flex-shrink-0" />
        </div>

        {/* Filter Pills */}
        <div>
          <div className="text-[9.5px] font-bold text-slate-400 tracking-[0.1em] uppercase mb-[6px]">
            TYPE FILTER
          </div>
          <div className="flex flex-wrap gap-[6px]">
            <button
              onClick={() => setFilterType('all')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              All Movements
            </button>
            <button
              onClick={() => setFilterType('deposit')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                filterType === 'deposit'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              Deposits
            </button>
            <button
              onClick={() => setFilterType('purchase_data')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                filterType === 'purchase_data'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              Data Purchases
            </button>
            <button
              onClick={() => setFilterType('purchase_checker')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                filterType === 'purchase_checker'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              Checkers
            </button>
            <button
              onClick={() => setFilterType('agent_commission')}
              className={`px-[12px] py-[5px] rounded-full text-[11px] transition-all cursor-pointer ${
                filterType === 'agent_commission'
                  ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-[2.5px] border-[#0369A1] text-white font-bold shadow-xs active:translate-y-[1px] active:border-b-[1px]'
                  : 'bg-white border border-slate-200 border-b-[2.5px] border-b-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-[1px] active:border-b-[1px] font-medium'
              }`}
            >
              Earnings
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Ledger Transactions List */}
      <div className="bg-white rounded-[16px] border border-slate-200/90 p-[16px] shadow-2xs mt-[12px]">
        {filteredTransactions.length === 0 ? (
          <div className="py-[32px] text-center">
            <div className="w-[50px] h-[50px] rounded-full bg-sky-50/90 border border-sky-100 flex items-center justify-center text-sky-600 mx-auto mb-[12px] shadow-2xs">
              <Receipt size={22} strokeWidth={1.8} />
            </div>
            <h3 className="text-[14.5px] font-bold text-slate-900 leading-tight">
              No transactions found
            </h3>
            <p className="text-[11.5px] text-slate-500 mt-[4px] max-w-[280px] mx-auto">
              {searchQuery
                ? `No wallet movements matching "${searchQuery}".`
                : 'No transactions recorded under this category yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-[8px]">
            {filteredTransactions.map((tx) => {
              const isCredit = tx.direction === 'credit';
              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="p-[12px] rounded-[12px] border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between gap-[10px] group shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center gap-[10px] min-w-0">
                    {/* Direction Icon Chip */}
                    <div
                      className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center flex-shrink-0 ${
                        isCredit
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                          : 'bg-slate-100 border border-slate-200 text-slate-700'
                      }`}
                    >
                      {isCredit ? (
                        <ArrowDownLeft size={16} strokeWidth={2.2} />
                      ) : (
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      )}
                    </div>

                    <div className="min-w-0 truncate">
                      <div className="flex items-center gap-[6px]">
                        <span className="text-[12.5px] font-bold text-slate-900 truncate">
                          {tx.title}
                        </span>
                        <span className="text-[9.5px] font-semibold text-slate-400">
                          {tx.ref}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-[1px]">
                        {tx.description}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-[2px]">
                        {tx.date} • {tx.channel || 'Wallet'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div
                      className={`text-[13.5px] font-bold tabular-nums ${
                        isCredit ? 'text-emerald-600' : 'text-slate-900'
                      }`}
                    >
                      {isCredit ? '+' : '-'}₵{tx.amount.toFixed(2)}
                    </div>
                    <span
                      className={`inline-block mt-[2px] text-[9.5px] font-bold px-[6px] py-[1px] rounded-[4px] ${
                        tx.status === 'Success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                          : tx.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                          : 'bg-red-50 text-red-700 border border-red-200/80'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed Transaction Receipt Modal */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="w-full max-w-[370px] bg-white rounded-[18px] border border-slate-200 p-[20px] shadow-2xl relative overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-[12px] mb-[14px]">
                <div className="flex items-center gap-[8px]">
                  <div
                    className={`w-[32px] h-[32px] rounded-[8px] flex items-center justify-center ${
                      selectedTx.direction === 'credit'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Receipt size={16} />
                  </div>
                  <div>
                    <h3 className="text-[13.5px] font-bold text-slate-900 leading-none">
                      Transaction Receipt
                    </h3>
                    <span className="text-[10.5px] text-slate-400 mt-[2px] block font-mono">
                      {selectedTx.ref}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="w-[26px] h-[26px] rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Amount Display */}
              <div className="text-center py-[10px] bg-slate-50/80 rounded-[12px] border border-slate-100 mb-[14px]">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Amount
                </span>
                <span
                  className={`text-[24px] font-extrabold tracking-tight tabular-nums ${
                    selectedTx.direction === 'credit' ? 'text-emerald-600' : 'text-slate-900'
                  }`}
                >
                  {selectedTx.direction === 'credit' ? '+' : '-'}₵{selectedTx.amount.toFixed(2)}
                </span>
                <div className="inline-flex items-center gap-[4px] mt-[4px] px-[8px] py-[1.5px] rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 size={11} />
                  <span>{selectedTx.status}</span>
                </div>
              </div>

              {/* Breakdown Fields */}
              <div className="space-y-[8px] text-[11.5px] border-b border-slate-100 pb-[14px] mb-[14px]">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Transaction Title</span>
                  <span className="font-semibold text-slate-800">{selectedTx.title}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Description</span>
                  <span className="font-medium text-slate-700 text-right max-w-[200px] truncate">
                    {selectedTx.description}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Channel</span>
                  <span className="font-semibold text-slate-800">{selectedTx.channel || 'Wallet Balance'}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Date & Time</span>
                  <span className="font-medium text-slate-800">{selectedTx.date}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Reference ID</span>
                  <div className="flex items-center gap-[4px]">
                    <span className="font-mono text-slate-800 text-[11px]">{selectedTx.ref}</span>
                    <button
                      onClick={() => handleCopyRef(selectedTx.ref)}
                      className="p-[3px] rounded-[4px] hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      title="Copy Reference"
                    >
                      {copiedRef ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedTx(null)}
                className="w-full h-[36px] rounded-[10px] bg-slate-900 hover:bg-slate-950 text-white text-[12px] font-bold active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                Close Receipt
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
