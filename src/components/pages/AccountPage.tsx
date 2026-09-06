'use client';
import { useState } from 'react';
import Image from 'next/image';
import { 
  ArrowLeft, 
  User, 
  Shield, 
  CreditCard, 
  Key, 
  Bell, 
  CheckCircle2, 
  Copy, 
  Check, 
  Smartphone, 
  Lock, 
  RefreshCw, 
  Sparkles,
  ShieldCheck,
  CheckSquare,
  LogOut
} from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

type TabType = 'profile' | 'security' | 'payouts' | 'api' | 'notifications';

export default function AccountPage() {
  const { balance, navigateTo, logoutUser } = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [copiedKey, setCopiedKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('Selikem Junior (KTech)');
  const [businessName, setBusinessName] = useState('KTech Data & Telecom Hub');
  const [phone, setPhone] = useState('0244123456');
  const [email, setEmail] = useState('selikemjunior987@gmail.com');
  const [region, setRegion] = useState('Greater Accra (Accra Central)');
  
  // Security states
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Payout states
  const [primaryMomoNetwork, setPrimaryMomoNetwork] = useState('MTN Mobile Money');
  const [primaryMomoNumber, setPrimaryMomoNumber] = useState('0244123456');
  const [primaryMomoName, setPrimaryMomoName] = useState('SELIKEM JUNIOR');

  // API states
  const [apiKey, setApiKey] = useState('sn_live_9f8a42b109e87ac6d43e2189');
  const [webhookUrl, setWebhookUrl] = useState('https://ktech-bot.com/api/swiftnet-webhook');

  // Notification states
  const [smsReceipts, setSmsReceipts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailInvoices, setEmailInvoices] = useState(false);

  const handleCopyApi = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(apiKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleRegenerateApi = () => {
    const newKey = `sn_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setApiKey(newKey);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="pt-[4px] pb-[44px] max-w-[540px] mx-auto px-2 sm:px-0">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-3.5">
        <button
          type="button"
          onClick={() => navigateTo('dashboard')}
          className="w-[34px] h-[34px] rounded-[10px] bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={15} />
        </button>
        <span className="text-[13px] font-bold text-slate-800">Account & Settings</span>
        <div className="w-[34px]" />
      </div>

      {/* Account Profile Header Card */}
      <div className="rounded-[18px] bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-4 text-white shadow-[0_4px_24px_rgba(15,23,42,0.16)] mb-3.5 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-[44px] h-[44px] rounded-[12px] overflow-hidden bg-slate-800 shadow-md border border-white/20 flex-shrink-0">
              <Image 
                src="https://i.postimg.cc/s2pRY0YM/image-removebg-preview-(38).png"
                alt="Profile avatar"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-[15px] font-bold text-white tracking-tight">{businessName}</h1>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] bg-blue-500/30 border border-blue-400/40 text-[9.5px] font-bold text-sky-300">
                  <Shield size={10} />
                  <span>Tier 2 Reseller</span>
                </span>
              </div>
              <div className="text-[11.5px] text-slate-300 font-medium mt-0.5">
                Agent ID: <span className="font-mono text-sky-300">#104829</span> • {phone}
              </div>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-[9.5px] text-slate-400 uppercase tracking-wider font-semibold">Wallet Balance</div>
            <div className="text-[14px] font-bold text-emerald-300 tabular-nums">GH₵{balance.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Pill Bar */}
      <div className="flex p-1 bg-slate-200/70 rounded-[12px] mb-3.5 gap-1 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex-1 min-w-[70px] h-[32px] rounded-[8px] font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User size={12} className={activeTab === 'profile' ? 'text-blue-600' : 'text-slate-500'} />
          <span>Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex-1 min-w-[70px] h-[32px] rounded-[8px] font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Lock size={12} className={activeTab === 'security' ? 'text-blue-600' : 'text-slate-500'} />
          <span>PIN</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('payouts')}
          className={`flex-1 min-w-[70px] h-[32px] rounded-[8px] font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'payouts'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard size={12} className={activeTab === 'payouts' ? 'text-blue-600' : 'text-slate-500'} />
          <span>Payouts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('api')}
          className={`flex-1 min-w-[65px] h-[32px] rounded-[8px] font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'api'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Key size={12} className={activeTab === 'api' ? 'text-blue-600' : 'text-slate-500'} />
          <span>API</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 min-w-[65px] h-[32px] rounded-[8px] font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell size={12} className={activeTab === 'notifications' ? 'text-blue-600' : 'text-slate-500'} />
          <span>Alerts</span>
        </button>
      </div>

      {/* Tab 1: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[13.5px] font-bold text-slate-900">Personal & Business Details</h2>
              <p className="text-[11px] text-slate-500">Manage your agent profile and verified contact lines</p>
            </div>
            {saveSuccess && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10.5px] font-bold">
                <CheckCircle2 size={11} />
                <span>Saved</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Store / Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Primary WhatsApp Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Region / Operation City</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 bg-slate-50/50 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="Greater Accra (Accra Central)">Greater Accra (Accra Central, Tema, Madina)</option>
                <option value="Ashanti (Kumasi)">Ashanti (Kumasi, Obuasi)</option>
                <option value="Eastern (Koforidua)">Eastern (Koforidua, Nkawkaw)</option>
                <option value="Western (Takoradi)">Western (Takoradi, Tarkwa)</option>
                <option value="Central (Cape Coast)">Central (Cape Coast, Winneba)</option>
                <option value="Volta (Ho)">Volta (Ho, Hohoe, Aflao)</option>
                <option value="Northern (Tamale)">Northern (Tamale, Yendi)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full h-[38px] rounded-[9px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer mt-1"
            >
              <span>Save Profile Changes</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Security & 4-Digit PIN */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs space-y-3.5">
          <div>
            <h2 className="text-[13.5px] font-bold text-slate-900">4-Digit Authorization PIN</h2>
            <p className="text-[11px] text-slate-500">Required when executing data bundle purchases and profit payouts</p>

            <form onSubmit={handleSaveProfile} className="mt-3 space-y-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Current 4-Digit PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  placeholder="••••"
                  className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-center font-mono text-[15px] tracking-widest text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">New PIN</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="••••"
                    className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-center font-mono text-[15px] tracking-widest text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirm New PIN</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    placeholder="••••"
                    className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-center font-mono text-[15px] tracking-widest text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-[36px] rounded-[8px] bg-slate-900 hover:bg-slate-800 text-white font-bold text-[12px] flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer mt-1"
              >
                <span>Update Authorization PIN</span>
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-[12px] font-bold text-slate-900">Two-Factor Authentication (2FA)</div>
              <div className="text-[10.5px] text-slate-500">Require SMS OTP when logging in from new devices</div>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`w-[40px] h-[22px] rounded-full transition-colors relative cursor-pointer ${
                twoFactorEnabled ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full bg-white absolute top-[2px] transition-transform ${
                  twoFactorEnabled ? 'left-[20px]' : 'left-[2px]'
                }`}
              />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-[12px] font-bold text-slate-900">Session Management</div>
              <div className="text-[10.5px] text-slate-500">Log out of your SwiftNet account on this device</div>
            </div>
            <button
              type="button"
              onClick={() => logoutUser()}
              className="h-[30px] px-3 rounded-[8px] bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
            >
              <LogOut size={12} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Payout Accounts */}
      {activeTab === 'payouts' && (
        <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs space-y-3">
          <div>
            <h2 className="text-[13.5px] font-bold text-slate-900">Primary Mobile Money Payout Line</h2>
            <p className="text-[11px] text-slate-500">Where your agent store earnings and commissions are sent</p>
          </div>

          <div className="p-3 rounded-[12px] bg-blue-50/70 border border-blue-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-[34px] h-[34px] rounded-[9px] bg-amber-400 text-slate-900 font-bold text-[10px] flex items-center justify-center border border-amber-500/80">
                MTN
              </div>
              <div>
                <div className="text-[12px] font-bold text-slate-900">{primaryMomoName}</div>
                <div className="text-[11px] text-slate-600 font-mono">{primaryMomoNumber} • MTN MoMo</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9.5px] font-bold border border-emerald-300/80">
              Verified
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Payout Network</label>
              <select
                value={primaryMomoNetwork}
                onChange={(e) => setPrimaryMomoNetwork(e.target.value)}
                className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 bg-slate-50/50 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="MTN Mobile Money">MTN Mobile Money</option>
                <option value="Telecel Cash">Telecel Cash</option>
                <option value="AirtelTigo Money">AirtelTigo Money</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">MoMo Number</label>
                <input
                  type="tel"
                  value={primaryMomoNumber}
                  onChange={(e) => setPrimaryMomoNumber(e.target.value)}
                  className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={primaryMomoName}
                  onChange={(e) => setPrimaryMomoName(e.target.value)}
                  className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[36px] rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer mt-1"
            >
              <span>Save Payout Method</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: API & Bot Keys */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs space-y-3">
          <div>
            <h2 className="text-[13.5px] font-bold text-slate-900">Reseller API & WhatsApp Bot Key</h2>
            <p className="text-[11px] text-slate-500">Connect your automated chatbot or website directly to SwiftNet</p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Live API Secret Key</label>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-700 select-all"
              />
              <button
                type="button"
                onClick={handleCopyApi}
                className="h-[36px] px-3 rounded-[8px] bg-blue-50 border border-blue-200 text-blue-600 font-bold text-[11px] flex items-center gap-1 hover:bg-blue-100 transition-all flex-shrink-0 cursor-pointer"
              >
                {copiedKey ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedKey ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={handleRegenerateApi}
                title="Regenerate API Key"
                className="h-[36px] px-2.5 rounded-[8px] bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-all flex-shrink-0 cursor-pointer"
              >
                <RefreshCw size={12} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Webhook URL</label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full h-[36px] px-2.5 rounded-[8px] border border-slate-200 text-[11.5px] font-mono text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
            />
          </div>

          <div className="p-3 rounded-[10px] bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="text-[11px] text-slate-600">
              Need endpoint documentation for MTN SME & Telecel APIs?
            </div>
            <a
              href="https://swiftnet.gh/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View Docs ›
            </a>
          </div>
        </div>
      )}

      {/* Tab 5: Notification Preferences */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs space-y-3">
          <div>
            <h2 className="text-[13.5px] font-bold text-slate-900">Notification Preferences</h2>
            <p className="text-[11px] text-slate-500">Control how and when SwiftNet delivers transaction receipts</p>
          </div>

          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="pt-2.5 flex items-center justify-between">
              <div>
                <div className="text-[12px] font-semibold text-slate-900">Instant SMS Order Receipts</div>
                <div className="text-[10.5px] text-slate-500">Send an SMS to bundle recipient upon successful dispatch</div>
              </div>
              <button
                type="button"
                onClick={() => setSmsReceipts(!smsReceipts)}
                className={`w-[40px] h-[22px] rounded-full transition-colors relative cursor-pointer ${
                  smsReceipts ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full bg-white absolute top-[2px] transition-transform ${
                    smsReceipts ? 'left-[20px]' : 'left-[2px]'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2.5 flex items-center justify-between">
              <div>
                <div className="text-[12px] font-semibold text-slate-900">WhatsApp Dispatch Alerts</div>
                <div className="text-[10.5px] text-slate-500">Receive instant WhatsApp ping on store sales & staff activity</div>
              </div>
              <button
                type="button"
                onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                className={`w-[40px] h-[22px] rounded-full transition-colors relative cursor-pointer ${
                  whatsappAlerts ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full bg-white absolute top-[2px] transition-transform ${
                    whatsappAlerts ? 'left-[20px]' : 'left-[2px]'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2.5 flex items-center justify-between">
              <div>
                <div className="text-[12px] font-semibold text-slate-900">Weekly Revenue Email Summary</div>
                <div className="text-[10.5px] text-slate-500">Receive comprehensive weekly ledger & profits PDF</div>
              </div>
              <button
                type="button"
                onClick={() => setEmailInvoices(!emailInvoices)}
                className={`w-[40px] h-[22px] rounded-full transition-colors relative cursor-pointer ${
                  emailInvoices ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full bg-white absolute top-[2px] transition-transform ${
                    emailInvoices ? 'left-[20px]' : 'left-[2px]'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Session Sign Out Card */}
      <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs flex items-center justify-between mt-3">
        <div>
          <div className="text-[13px] font-bold text-slate-900">Active Account Session</div>
          <div className="text-[11px] text-slate-500">Log out to protect your reseller wallet and store settings</div>
        </div>
        <button
          type="button"
          onClick={() => logoutUser()}
          className="h-[36px] px-3.5 rounded-[10px] bg-rose-50 hover:bg-rose-100 border border-rose-200/80 text-rose-600 font-bold text-[12px] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
        >
          <LogOut size={13} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
