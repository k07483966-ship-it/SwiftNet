'use client';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  FileCheck
} from 'lucide-react';
import { useNavigation, CheckerPin } from '@/src/context/NavigationContext';

export default function CheckersPage() {
  const { checkers, toggleCheckerUsed, navigateTo } = useNavigation();
  const [filter, setFilter] = useState<'all' | 'unused' | 'used'>('all');
  const [revealedPins, setRevealedPins] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    setRevealedPins((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  const filteredCheckers = checkers.filter((checker) => {
    if (filter === 'unused') return !checker.isUsed;
    if (filter === 'used') return checker.isUsed;
    return true;
  });

  return (
    <div className="pt-[4px] pb-[36px] max-w-[560px] mx-auto">
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
        <div className="h-[3px] w-[46px] rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-slate-900" />
      </div>

      {/* Hero Header Card */}
      <div className="rounded-[16px] bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 p-[18px] text-white shadow-[0_4px_20px_rgba(15,23,42,0.14)] mb-[14px] border border-teal-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="w-[46px] h-[46px] rounded-[14px] bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-[17px] font-bold text-white tracking-tight leading-tight">
                My Results Checkers
              </h1>
              <p className="text-[11.5px] text-emerald-200/80 mt-[2px]">
                Instant WAEC, BECE, WASSCE & Placement Cards
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('buy-data', { network: 'waec' })}
            className="h-[34px] px-[12px] rounded-[9px] bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-[11.5px] flex items-center gap-[5px] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
          >
            <Plus size={13} />
            <span>Buy Checkers</span>
          </button>
        </div>
      </div>

      {/* Official WAEC Portal Notice */}
      <div className="rounded-[12px] bg-emerald-50/90 border border-emerald-200 p-[12px] mb-[12px] flex items-center justify-between gap-[10px]">
        <div className="flex items-center gap-[8px]">
          <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0" />
          <p className="text-[11.5px] text-emerald-900 font-medium">
            100% Genuine WAEC & CSSPS Placement PINs. Valid on official portals.
          </p>
        </div>
        <a
          href="https://ghana.waecdirect.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[4px] px-[9px] py-[4px] rounded-[6px] bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 transition-colors flex-shrink-0"
        >
          <span>WAEC Portal</span>
          <ExternalLink size={10} />
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-[12px]">
        <div className="flex gap-[4px] bg-slate-100 p-[3px] rounded-[10px]">
          <button
            onClick={() => setFilter('all')}
            className={`px-[10px] py-[4px] rounded-[7px] text-[11.5px] font-semibold transition-all cursor-pointer ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({checkers.length})
          </button>
          <button
            onClick={() => setFilter('unused')}
            className={`px-[10px] py-[4px] rounded-[7px] text-[11.5px] font-semibold transition-all cursor-pointer ${
              filter === 'unused' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Unused ({checkers.filter(c => !c.isUsed).length})
          </button>
          <button
            onClick={() => setFilter('used')}
            className={`px-[10px] py-[4px] rounded-[7px] text-[11.5px] font-semibold transition-all cursor-pointer ${
              filter === 'used' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Used ({checkers.filter(c => c.isUsed).length})
          </button>
        </div>

        <span className="text-[11px] text-slate-500 font-medium">
          Showing {filteredCheckers.length} {filteredCheckers.length === 1 ? 'card' : 'cards'}
        </span>
      </div>

      {/* Checkers List or Empty State */}
      {filteredCheckers.length === 0 ? (
        <div className="bg-white rounded-[16px] border border-slate-200 p-[28px] text-center shadow-2xs">
          <div className="w-[52px] h-[52px] rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-[10px] text-emerald-600">
            <FileCheck size={24} />
          </div>
          <h3 className="text-[14px] font-bold text-slate-900">
            {filter === 'all' ? 'No Checkers in Wallet' : `No ${filter} Checkers`}
          </h3>
          <p className="text-[11.5px] text-slate-500 mt-[2px] max-w-[280px] mx-auto leading-relaxed">
            Purchase WASSCE, BECE, NOV/DEC or Placement cards instantly with your wallet balance.
          </p>
          <button
            onClick={() => navigateTo('buy-data', { network: 'waec' })}
            className="mt-[14px] h-[34px] px-[16px] rounded-[8px] bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold inline-flex items-center gap-[6px] active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
          >
            <Plus size={13} />
            <span>Buy Results Checker</span>
          </button>
        </div>
      ) : (
        <div className="space-y-[10px]">
          {filteredCheckers.map((checker) => {
            const isRevealed = !!revealedPins[checker.id];
            const isCopied = copiedId === checker.id;

            return (
              <div
                key={checker.id}
                className="bg-white rounded-[14px] border border-slate-200 p-[14px] shadow-2xs transition-all hover:border-slate-300"
              >
                <div className="flex items-center justify-between pb-[10px] border-b border-slate-100">
                  <div className="flex items-center gap-[8px]">
                    <span className="px-[8px] py-[2px] rounded-[6px] bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                      {checker.type} CHECKER
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {checker.purchaseDate}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleCheckerUsed(checker.id)}
                    className={`px-[8px] py-[2px] rounded-[6px] text-[10.5px] font-bold flex items-center gap-[4px] cursor-pointer transition-colors ${
                      checker.isUsed
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    {checker.isUsed ? (
                      <span>Used</span>
                    ) : (
                      <>
                        <CheckCircle2 size={11} />
                        <span>Fresh / Unused</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] pt-[10px]">
                  {/* Serial Number */}
                  <div className="bg-slate-50 rounded-[8px] p-[10px] border border-slate-200/80">
                    <div className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider">
                      Serial Number
                    </div>
                    <div className="text-[13px] font-mono font-bold text-slate-900 mt-[2px] select-all">
                      {checker.serialNumber}
                    </div>
                  </div>

                  {/* Secret PIN with reveal & copy */}
                  <div className="bg-slate-50 rounded-[8px] p-[10px] border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider">
                        Secret PIN
                      </div>
                      <div className="text-[13px] font-mono font-bold text-slate-900 mt-[2px]">
                        {isRevealed ? checker.pin : '•••• •••• ••••'}
                      </div>
                    </div>

                    <div className="flex items-center gap-[4px]">
                      <button
                        onClick={() => toggleReveal(checker.id)}
                        className="w-[28px] h-[28px] rounded-[6px] bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        title={isRevealed ? 'Hide PIN' : 'Reveal PIN'}
                      >
                        {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>

                      <button
                        onClick={() => copyToClipboard(checker.pin, checker.id)}
                        className="h-[28px] px-[8px] rounded-[6px] bg-blue-600 text-white flex items-center gap-[3px] text-[11px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                        title="Copy PIN"
                      >
                        {isCopied ? <Check size={12} /> : <Copy size={12} />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
