'use client';
import { useState } from 'react';
import { ArrowLeft, Store, Copy, Check, ExternalLink, TrendingUp, Users, DollarSign, Settings } from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

export default function StorePage() {
  const { navigateTo } = useNavigation();
  const [copied, setCopied] = useState(false);
  const [profitMargin, setProfitMargin] = useState<string>('2.00');
  const [storeName, setStoreName] = useState('KTech Data Express');

  const storeUrl = 'https://swiftnet.gh/store/ktech';

  const copyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(storeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="pt-[10px] pb-[36px] max-w-[800px] mx-auto">
      {/* Top Accent Line */}
      <div className="h-[3px] w-[56px] rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 mb-[12px]" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[10px] mb-[14px]">
        <div>
          <h1 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-1)] tracking-[-0.02em] leading-tight">
            Agent Storefront Manager
          </h1>
          <p className="text-[12.5px] text-[var(--text-3)] mt-[2px]">
            Share your storefront, let customers buy directly, and earn automated profit on every gigabyte.
          </p>
        </div>

        <button
          onClick={copyUrl}
          className="h-[32px] px-[12px] rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11.5px] flex items-center gap-[6px] shadow-2xs self-start sm:self-auto cursor-pointer transition-all active:scale-[0.98]"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Link Copied' : 'Share Store Link'}</span>
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

      {/* Store Link Card */}
      <div className="bg-white rounded-[14px] border border-slate-200/90 p-[16px] shadow-2xs mb-[16px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[10px]">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Your Public Storefront URL
            </div>
            <div className="text-[14px] font-bold text-blue-700 font-mono mt-[2px]">
              {storeUrl}
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              onClick={copyUrl}
              className="h-[30px] px-[10px] rounded-[6px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11.5px] font-medium flex items-center gap-[4px] transition-colors cursor-pointer"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[30px] px-[10px] rounded-[6px] bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11.5px] font-medium flex items-center gap-[4px] transition-colors"
            >
              <span>Preview</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Store Metrics Strip */}
      <div className="grid grid-cols-3 gap-[8px] sm:gap-[12px] mb-[16px]">
        <div className="bg-white rounded-[12px] border border-slate-200/90 p-[12px] text-center shadow-2xs">
          <div className="text-[10.5px] text-slate-500 font-medium">Total Customers</div>
          <div className="text-[18px] font-bold text-slate-900 mt-[2px]">48</div>
          <span className="text-[9.5px] text-emerald-600 font-bold">+6 this week</span>
        </div>

        <div className="bg-white rounded-[12px] border border-slate-200/90 p-[12px] text-center shadow-2xs">
          <div className="text-[10.5px] text-slate-500 font-medium">Store Orders</div>
          <div className="text-[18px] font-bold text-slate-900 mt-[2px]">132</div>
          <span className="text-[9.5px] text-emerald-600 font-bold">99.8% Success</span>
        </div>

        <div className="bg-white rounded-[12px] border border-slate-200/90 p-[12px] text-center shadow-2xs">
          <div className="text-[10.5px] text-slate-500 font-medium">Lifetime Profit</div>
          <div className="text-[18px] font-bold text-emerald-600 mt-[2px]">₵264.00</div>
          <span className="text-[9.5px] text-slate-400">Withdrawable</span>
        </div>
      </div>

      {/* Pricing & Profit Settings */}
      <div className="bg-white rounded-[14px] border border-slate-200/90 p-[16px] sm:p-[20px] shadow-2xs">
        <h2 className="text-[13.5px] font-semibold text-slate-900 mb-[12px]">
          Store Settings & Profit Margins
        </h2>

        <div className="space-y-[14px]">
          <div>
            <label className="block text-[11.5px] font-medium text-slate-700 mb-[4px]">
              Store Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full sm:w-[320px] px-[12px] py-[8px] rounded-[8px] border border-slate-200 text-[12.5px] text-slate-900 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11.5px] font-medium text-slate-700 mb-[4px]">
              Profit Margin per Gigabyte (GHS)
            </label>
            <div className="flex items-center gap-[8px]">
              <div className="flex items-center gap-[4px] px-[10px] py-[8px] rounded-[8px] border border-slate-200 bg-slate-50">
                <span className="text-slate-500 text-[12px] font-bold">₵</span>
                <input
                  type="number"
                  step="0.5"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(e.target.value)}
                  className="w-[70px] text-[12.5px] font-bold text-slate-900 bg-transparent outline-none tabular-nums"
                />
              </div>
              <span className="text-[11.5px] text-slate-500">
                You will earn ₵{profitMargin} automatically on every 1GB purchased by your customers.
              </span>
            </div>
          </div>

          <div className="pt-[6px]">
            <button
              onClick={() => alert('Store settings saved successfully!')}
              className="h-[34px] px-[16px] rounded-[8px] bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Save Store Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
