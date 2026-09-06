'use client';
import { useState } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Headphones
} from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

const faqs = [
  {
    q: 'How long does MTN SME data delivery take?',
    a: 'MTN SME and Non-Expiry bundles are delivered automatically within 1 to 5 minutes via direct telecom API gateway. If a network outage occurs at MTN, delivery can take up to 15 minutes.'
  },
  {
    q: 'My deposit did not reflect immediately, what should I do?',
    a: 'Paystack deposits are confirmed in real-time. If network delays occur on your MoMo provider, tap "Refresh" or send your transaction reference (PSTK-XXXXX) to our 24/7 WhatsApp desk for immediate auto-credit.'
  },
  {
    q: 'How do I check BECE & WASSCE results with my PIN?',
    a: 'Go to "My Checkers" in your SwiftNet dashboard, copy your Serial Number and PIN, then click "Open WAEC Portal" (ghana.waecdirect.org) and paste the credentials.'
  },
  {
    q: 'How do I withdraw earnings from my Agent Store?',
    a: 'Open the "Agent Store" tab, select "Store Earnings & Payouts", choose your Mobile Money network (MTN, Telecel, or AirtelTigo), enter your payout number, and tap "Withdraw Profit". Payouts are processed in real-time.'
  }
];

export default function SupportPage() {
  const { navigateTo } = useNavigation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [ticketCategory, setTicketCategory] = useState('Data Delivery Delay');
  const [phoneOrRef, setPhoneOrRef] = useState('');
  const [message, setMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const generatedId = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(generatedId);
    setTicketSubmitted(true);
  };

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
        <div className="h-[3px] w-[46px] rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-900" />
      </div>

      {/* Hero Card with Custom Illustration */}
      <div className="rounded-[16px] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E3A8A] p-[20px] text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)] relative overflow-hidden mb-[14px]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-[16px]">
          {/* Custom SVG Illustration for SwiftNet Support Desk */}
          <div className="w-[84px] h-[84px] flex-shrink-0 relative flex items-center justify-center bg-white/10 rounded-[20px] border border-white/15 backdrop-blur-xs p-[10px]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="42" fill="#3B82F6" fillOpacity="0.2" />
              {/* Headset arc */}
              <path d="M25 50 A25 25 0 0 1 75 50" fill="none" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" />
              {/* Earcups */}
              <rect x="20" y="44" width="10" height="18" rx="4" fill="#93C5FD" />
              <rect x="70" y="44" width="10" height="18" rx="4" fill="#93C5FD" />
              {/* Microphone */}
              <path d="M72 58 A18 18 0 0 1 54 74 L46 74" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
              <circle cx="44" cy="74" r="4" fill="#38BDF8" />
              {/* Sparkle */}
              <path d="M50 22 L52 28 L58 30 L52 32 L50 38 L48 32 L42 30 L48 28 Z" fill="#FDE047" />
            </svg>
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-[5px] px-[8px] py-[2px] rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-[6px]">
              <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse" />
              <span>24/7 Live Desk Active</span>
            </div>
            <h1 className="text-[18px] sm:text-[20px] font-bold text-white tracking-tight leading-snug">
              SwiftNet Support Center
            </h1>
            <p className="text-[12px] text-slate-300 mt-[2px] leading-relaxed">
              Fast resolution for bundle orders, wallet deposits, and agent reseller queries.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Contact Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px] mb-[14px]">
        {/* WhatsApp Channel */}
        <a
          href="https://chat.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-[12px] border border-slate-200 p-[12px] flex items-center gap-[10px] hover:border-emerald-400 hover:shadow-xs transition-all group cursor-pointer"
        >
          <div className="w-[36px] h-[36px] rounded-[10px] bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <MessageSquare size={17} />
          </div>
          <div className="truncate">
            <div className="text-[12px] font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">WhatsApp Desk</div>
            <div className="text-[10px] text-slate-500 truncate">Join Reseller Group</div>
          </div>
        </a>

        {/* Telegram Hotline */}
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-[12px] border border-slate-200 p-[12px] flex items-center gap-[10px] hover:border-sky-400 hover:shadow-xs transition-all group cursor-pointer"
        >
          <div className="w-[36px] h-[36px] rounded-[10px] bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
            <Zap size={17} />
          </div>
          <div className="truncate">
            <div className="text-[12px] font-bold text-slate-900 group-hover:text-sky-700 transition-colors">Telegram Alert</div>
            <div className="text-[10px] text-slate-500 truncate">Instant Announcements</div>
          </div>
        </a>

        {/* Direct Call / Hotline */}
        <a
          href="tel:+233240000000"
          className="bg-white rounded-[12px] border border-slate-200 p-[12px] flex items-center gap-[10px] hover:border-blue-400 hover:shadow-xs transition-all group cursor-pointer"
        >
          <div className="w-[36px] h-[36px] rounded-[10px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Phone size={17} />
          </div>
          <div className="truncate">
            <div className="text-[12px] font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Direct Dial</div>
            <div className="text-[10px] text-slate-500 truncate">024 000 0000</div>
          </div>
        </a>
      </div>

      {/* Ticket / Query Submission Form */}
      <div className="bg-white rounded-[16px] border border-slate-200 p-[16px] shadow-2xs mb-[14px]">
        <div className="flex items-center gap-[8px] mb-[12px]">
          <div className="w-[28px] h-[28px] rounded-[8px] bg-blue-50 text-blue-600 flex items-center justify-center">
            <Headphones size={15} />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-slate-900 leading-tight">Submit a Priority Ticket</h2>
            <p className="text-[11px] text-slate-500">Our automated engineering desk responds within 5 minutes</p>
          </div>
        </div>

        {ticketSubmitted ? (
          <div className="p-[16px] rounded-[12px] bg-emerald-50/80 border border-emerald-200 text-center">
            <div className="w-[42px] h-[42px] rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-[8px]">
              <CheckCircle2 size={22} />
            </div>
            <h3 className="text-[14px] font-bold text-emerald-950">Ticket Dispatched</h3>
            <p className="text-[11.5px] text-emerald-800 mt-[2px]">
              Ticket Ref: <span className="font-mono font-bold text-emerald-900">{ticketId}</span>
            </p>
            <p className="text-[11px] text-emerald-700 mt-[4px]">
              Our live desk officer is reviewing your query. You will receive an SMS response shortly.
            </p>
            <button
              onClick={() => {
                setTicketSubmitted(false);
                setMessage('');
                setPhoneOrRef('');
              }}
              className="mt-[12px] h-[32px] px-[14px] rounded-[8px] bg-white border border-emerald-300 text-emerald-800 text-[11.5px] font-semibold hover:bg-emerald-100 transition-all cursor-pointer"
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-[10px]">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-[4px]">Issue Category</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full h-[38px] px-[10px] rounded-[8px] border border-slate-200 bg-slate-50/50 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="Data Delivery Delay">Data Delivery Delay (MTN / Telecel / AT)</option>
                <option value="Deposit / Top-up Not Credited">Deposit / Paystack MoMo Top-up Not Credited</option>
                <option value="WAEC / BECE Checker Pin Issue">WAEC / BECE Results Checker Pin Issue</option>
                <option value="Agent Store & Commission Payout">Agent Store & Commission Payout</option>
                <option value="API & Reseller Integration">API Bot & Reseller Integration</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-[4px]">
                Phone Number or Transaction Reference (Optional)
              </label>
              <input
                type="text"
                value={phoneOrRef}
                onChange={(e) => setPhoneOrRef(e.target.value)}
                placeholder="e.g. 0244123456 or ORD-98421"
                className="w-full h-[38px] px-[10px] rounded-[8px] border border-slate-200 bg-white text-[12px] font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-[4px]">
                Describe your issue <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide details so we can resolve this instantly..."
                className="w-full p-[10px] rounded-[8px] border border-slate-200 bg-white text-[12px] font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-[38px] rounded-[9px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12.5px] flex items-center justify-center gap-[6px] shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <Send size={13} />
              <span>Send Ticket to Live Desk</span>
            </button>
          </form>
        )}
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-[16px] border border-slate-200 p-[16px] shadow-2xs">
        <div className="flex items-center gap-[8px] mb-[10px]">
          <HelpCircle size={16} className="text-blue-600" />
          <h2 className="text-[14px] font-bold text-slate-900">Frequently Answered Questions</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-[8px]">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-[10px] py-[4px] cursor-pointer group"
                >
                  <span className="text-[12px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-[11.5px] text-slate-600 leading-relaxed mt-[4px] pl-[2px]">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
