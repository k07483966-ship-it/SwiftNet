'use client';
import { useState } from 'react';
import { Settings, Save, Key, ShieldCheck, Database, RefreshCw, AlertTriangle } from 'lucide-react';

export default function AdminSystemSettings() {
  const [siteName, setSiteName] = useState('AutoMail MasterGate Platform');
  const [maintenance, setMaintenance] = useState(false);
  const [mtnApiToken, setMtnApiToken] = useState('sn_live_mtn_9988772211a');
  const [waecApiKey, setWaecApiKey] = useState('waec_checker_secret_883311');
  const [autoApproveDeposits, setAutoApproveDeposits] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-[700px]">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <h2 className="text-lg font-bold text-slate-800 font-display">System Settings & Controls</h2>
        <p className="text-xs text-slate-500 mt-0.5">Configure API keys, gateway webhooks, site status, and security preferences</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
        {saved && (
          <div className="p-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200">
            System Settings Saved Successfully!
          </div>
        )}

        <div>
          <label className="font-bold text-slate-700 block mb-1">Platform Brand Name</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-slate-800 font-medium focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">MTN SME API Token</label>
            <input
              type="password"
              value={mtnApiToken}
              onChange={(e) => setMtnApiToken(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-slate-800 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">WAEC Checker API Key</label>
            <input
              type="password"
              value={waecApiKey}
              onChange={(e) => setWaecApiKey(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-slate-800 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Auto-Approve Mobile Money Deposits</span>
              <span className="text-slate-500 text-[11px]">Automatically credit wallets when MoMo SMS webhook validates reference</span>
            </div>
            <input
              type="checkbox"
              checked={autoApproveDeposits}
              onChange={(e) => setAutoApproveDeposits(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">Site Maintenance Mode</span>
              <span className="text-slate-500 text-[11px]">Temporarily block non-admin order placement</span>
            </div>
            <input
              type="checkbox"
              checked={maintenance}
              onChange={(e) => setMaintenance(e.target.checked)}
              className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Save size={15} />
            <span>Save System Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
