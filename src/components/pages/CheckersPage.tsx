'use client';
import { useState } from 'react';
import { ArrowLeft, Copy, Check, Eye, EyeOff, ExternalLink, ShieldCheck } from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

interface CheckerPin {
  id: string;
  type: 'WASSCE' | 'BECE' | 'NOV/DEC';
  serialNumber: string;
  pin: string;
  purchaseDate: string;
  isUsed: boolean;
}

const initialCheckers: CheckerPin[] = [
  { id: 'c1', type: 'WASSCE', serialNumber: 'WGH240984129', pin: '839201948210', purchaseDate: 'Sep 02, 2026', isUsed: false },
  { id: 'c2', type: 'WASSCE', serialNumber: 'WGH240182947', pin: '192847563029', purchaseDate: 'Aug 28, 2026', isUsed: true },
  { id: 'c3', type: 'BECE', serialNumber: 'BGH240883719', pin: '492018475829', purchaseDate: 'Aug 24, 2026', isUsed: false },
];

export default function CheckersPage() {
  const { navigateTo } = useNavigation();
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

  return (
    <div className="pt-[10px] pb-[36px] max-w-[800px] mx-auto">
      {/* Top Accent Line */}
      <div className="h-[3px] w-[56px] rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-slate-900 mb-[12px]" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[10px] mb-[14px]">
        <div>
          <h1 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-1)] tracking-[-0.02em] leading-tight">
            My Results Checkers
          </h1>
          <p className="text-[12.5px] text-[var(--text-3)] mt-[2px]">
            Instant access to WAEC, BECE, and WASSCE serial numbers and PINs.
          </p>
        </div>

        <button
          onClick={() => navigateTo('buy-data', { network: 'waec' })}
          className="h-[32px] px-[12px] rounded-[8px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11.5px] flex items-center gap-[6px] shadow-2xs self-start sm:self-auto cursor-pointer transition-all active:scale-[0.98]"
        >
          <span>Buy More Checkers</span>
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

      {/* Official Portal Banner */}
      <div className="rounded-[12px] bg-emerald-50/80 border border-emerald-200/90 p-[12px] sm:p-[14px] mb-[16px] flex flex-col sm:flex-row sm:items-center justify-between gap-[10px]">
        <div className="flex items-center gap-[8px]">
          <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0" />
          <p className="text-[11.5px] text-emerald-900 font-medium">
            Pins are verified genuine and valid for checking results on the official WAEC portal.
          </p>
        </div>
        <a
          href="https://ghana.waecdirect.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[4px] px-[10px] py-[5px] rounded-[6px] bg-white border border-emerald-300 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-100/50 transition-colors self-start sm:self-auto"
        >
          <span>Open WAEC Portal</span>
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Checkers List */}
      <div className="space-y-[10px]">
        {initialCheckers.map((checker) => {
          const isRevealed = !!revealedPins[checker.id];
          const isCopied = copiedId === checker.id;

          return (
            <div
              key={checker.id}
              className="bg-white rounded-[14px] border border-slate-200/90 p-[14px] sm:p-[16px] shadow-2xs hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[8px] pb-[10px] border-b border-slate-100">
                <div className="flex items-center gap-[8px]">
                  <span className="px-[8px] py-[2px] rounded-[6px] bg-emerald-50 text-emerald-700 text-[10.5px] font-bold border border-emerald-200">
                    {checker.type}
                  </span>
                  <span className="text-[11px] text-slate-400">Purchased: {checker.purchaseDate}</span>
                </div>
                <span className={`text-[10px] font-semibold px-[6px] py-[1px] rounded-full self-start sm:self-auto ${
                  checker.isUsed ? 'bg-slate-100 text-slate-500' : 'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  {checker.isUsed ? 'Previously Used' : 'Unused / Fresh'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] pt-[12px]">
                {/* Serial Number */}
                <div className="bg-slate-50/80 rounded-[8px] p-[10px] border border-slate-200/70">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    Serial Number
                  </div>
                  <div className="text-[13px] font-mono font-bold text-slate-900 mt-[2px] select-all">
                    {checker.serialNumber}
                  </div>
                </div>

                {/* PIN Code with reveal & copy */}
                <div className="bg-slate-50/80 rounded-[8px] p-[10px] border border-slate-200/70 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
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
    </div>
  );
}
