'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Send, MessageCircle, Activity, Bell } from 'lucide-react';

interface Announcement {
  id: string;
  badge: string;
  badgeClass: string;
  title: string;
  date: string;
  content: string;
}

const announcements: Announcement[] = [
  {
    id: '1',
    badge: 'PLATFORM',
    badgeClass: 'bg-blue-100 text-blue-700 border border-blue-200/80',
    title: 'SwiftNet 2.0 Reseller Platform Live! 🚀',
    date: 'Today, 09:30 AM',
    content: 'Welcome to the upgraded SwiftNet digital portal! Enjoy faster automated data bundle dispatch, an integrated reseller store builder, real-time transaction tracking, and 24/7 dedicated support.',
  },
  {
    id: '2',
    badge: 'PRICE DROP',
    badgeClass: 'bg-emerald-100 text-emerald-700 border border-emerald-200/80',
    title: 'Reduced MTN & Telecel Data Rates ⚡',
    date: 'Yesterday',
    content: 'New lower wholesale pricing is now active for all registered resellers on MTN SME and Telecel packages. Enjoy higher profit margins on all 1GB through 50GB bundles.',
  },
  {
    id: '3',
    badge: 'HOT',
    badgeClass: 'bg-amber-100 text-amber-700 border border-amber-200/80',
    title: 'BECE & WASSCE Result Checkers Active 🎓',
    date: 'Sep 03, 2026',
    content: 'WAEC 2026 result checker pins and serial vouchers are fully stocked with instant auto-delivery straight to your SMS or customer dashboard.',
  },
  {
    id: '4',
    badge: 'NEW FEATURE',
    badgeClass: 'bg-purple-100 text-purple-700 border border-purple-200/80',
    title: 'Launch Your Own Reseller Store 🏪',
    date: 'Sep 01, 2026',
    content: 'You can now set up your personal storefront from the sidebar! Choose your store link, customize your profit margins, and accept customer orders automatically.',
  },
  {
    id: '5',
    badge: 'GATEWAY',
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    title: 'Instant Automated MoMo Top-ups Active ✅',
    date: 'Aug 29, 2026',
    content: 'MTN Mobile Money, Telecel Cash, and AT Money auto-deposit channels are running at 100% capacity with 0% fee charges and 5-second wallet funding.',
  },
];

const serviceStatuses = [
  { name: 'MTN SME Data & Airtime', status: 'Operational', uptime: '99.9%', speed: '< 5s' },
  { name: 'Telecel Data Bundles', status: 'Operational', uptime: '99.8%', speed: '< 8s' },
  { name: 'AirtelTigo Big Time', status: 'Operational', uptime: '99.9%', speed: '< 6s' },
  { name: 'WAEC Result Checkers API', status: 'Operational', uptime: '100%', speed: 'Instant' },
  { name: 'MoMo Wallet Auto-Funding', status: 'Operational', uptime: '100%', speed: 'Instant' },
];

export default function CommunityUpdates() {
  const [activeTab, setActiveTab] = useState<'announcements' | 'services'>('announcements');

  return (
    <div className="flex flex-col gap-[16px] mt-[12px]">
      
      {/* Community Card */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: 'easeOut', delay: 0.25 }}
        className="rounded-[16px] bg-white border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden"
      >
        <div className="px-[16px] py-[12px] border-b border-[var(--border)]">
          <h2 className="font-h2 text-[13.5px] text-[var(--text-1)]">Join our Community</h2>
        </div>
        
        <div className="p-[16px] flex flex-col items-center">
          <h3 className="font-h2 text-[14.5px] text-[var(--text-1)] mb-[12px]">Get early access to</h3>
          
          <div className="flex flex-col gap-[8px] w-full max-w-[280px]">
            <div className="flex items-start gap-[8px]">
              <div className="mt-[1px]"><CheckCircle2 size={14} className="text-[#60A5FA] fill-[#EFF6FF]" /></div>
              <span className="text-[12px] text-[var(--text-2)] leading-[1.4]">Special discounts before they go public.</span>
            </div>
            <div className="flex items-start gap-[8px]">
              <div className="mt-[1px]"><CheckCircle2 size={14} className="text-[#60A5FA] fill-[#EFF6FF]" /></div>
              <span className="text-[12px] text-[var(--text-2)] leading-[1.4]">Insider updates on new services.</span>
            </div>
            <div className="flex items-start gap-[8px]">
              <div className="mt-[1px]"><CheckCircle2 size={14} className="text-[#60A5FA] fill-[#EFF6FF]" /></div>
              <span className="text-[12px] text-[var(--text-2)] leading-[1.4]">Private promo codes shared only in the community.</span>
            </div>
          </div>

          <div className="flex w-full gap-[12px] mt-[20px]">
            {/* 3D Telegram Button */}
            <button className="flex-1 h-[42px] rounded-[10px] bg-white border-[1.5px] border-b-[3px] border-[#93C5FD] flex items-center justify-center gap-[6px] hover:-translate-y-[1px] hover:border-b-[4px] active:translate-y-[1px] active:border-b-[1.5px] transition-all group cursor-pointer">
              <Send size={12} className="text-[#3B82F6] group-hover:scale-[1.1] transition-transform" />
              <div className="flex flex-col items-center">
                <span className="font-semibold text-[10.5px] text-[#3B82F6] leading-[1.1]">Join Telegram</span>
                <span className="font-semibold text-[10.5px] text-[#3B82F6] leading-[1.1]">Channel</span>
              </div>
            </button>
            
            {/* 3D WhatsApp Button */}
            <button className="flex-1 h-[42px] rounded-[10px] bg-white border-[1.5px] border-b-[3px] border-[#86EFAC] flex items-center justify-center gap-[6px] hover:-translate-y-[1px] hover:border-b-[4px] active:translate-y-[1px] active:border-b-[1.5px] transition-all group cursor-pointer">
              <MessageCircle size={12} className="text-[#22C55E] group-hover:scale-[1.1] transition-transform" />
              <div className="flex flex-col items-center">
                <span className="font-semibold text-[10.5px] text-[#22C55E] leading-[1.1]">Join WhatsApp</span>
                <span className="font-semibold text-[10.5px] text-[#22C55E] leading-[1.1]">Channel</span>
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* News & Updates Card */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: 'easeOut', delay: 0.30 }}
        className="rounded-[16px] bg-white border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col"
      >
        <div className="px-[16px] py-[12px] border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <Bell size={14} className="text-[var(--color-primary-500)]" />
            <h2 className="font-h2 text-[13.5px] text-[var(--text-1)]">News & Updates</h2>
          </div>
          <span className="text-[10px] font-semibold text-slate-400">
            {announcements.length} updates
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border)] bg-gray-50/50">
          <button 
            onClick={() => setActiveTab('announcements')}
            className={`flex-1 h-[38px] flex items-center justify-center font-semibold text-[11.5px] transition-all relative cursor-pointer ${
              activeTab === 'announcements' 
                ? 'text-[var(--color-primary-600)] border-b-[2px] border-[var(--color-primary-500)] bg-white' 
                : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
            }`}
          >
            Announcements ({announcements.length})
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`flex-1 h-[38px] flex items-center justify-center font-semibold text-[11.5px] transition-all relative cursor-pointer ${
              activeTab === 'services' 
                ? 'text-[var(--color-primary-600)] border-b-[2px] border-[var(--color-primary-500)] bg-white' 
                : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
            }`}
          >
            Services Status
          </button>
        </div>

        {/* Content Box with Scrollable News & Updates List */}
        <div className="p-[12px]">
          {activeTab === 'announcements' ? (
            <div className="max-h-[310px] overflow-y-auto custom-scrollbar pr-[4px] space-y-[10px]">
              {announcements.map((item) => (
                <div 
                  key={item.id}
                  className="rounded-[12px] bg-slate-50/80 hover:bg-[#F0F9FF] border border-slate-200/80 hover:border-[#BAE6FD] p-[12px] relative transition-all duration-150"
                >
                  <div className="flex items-center justify-between gap-[8px] mb-[6px]">
                    <span className={`text-[8.5px] font-bold px-[5px] py-[1px] rounded-[4px] tracking-wider ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-[13px] text-[var(--text-1)] mb-[4px]">
                    {item.title}
                  </h3>

                  <p className="text-[11.5px] text-[var(--text-2)] leading-[1.55] select-text">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-h-[310px] overflow-y-auto custom-scrollbar pr-[4px] space-y-[8px]">
              <div className="p-[10px] rounded-[10px] bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-[8px] mb-[4px]">
                <Activity size={14} className="text-emerald-600 animate-pulse flex-shrink-0" />
                <div className="text-[11px] text-emerald-800 font-medium leading-tight">
                  All SwiftNet transaction queues & telecom gateways operating normally at 100% capacity.
                </div>
              </div>

              {serviceStatuses.map((srv, idx) => (
                <div 
                  key={idx}
                  className="p-[10px] rounded-[10px] bg-white border border-slate-200/80 flex items-center justify-between"
                >
                  <div>
                    <div className="text-[12px] font-semibold text-[var(--text-1)]">{srv.name}</div>
                    <div className="text-[10px] text-slate-400 mt-[1px]">Avg speed: {srv.speed} • Uptime: {srv.uptime}</div>
                  </div>
                  <div className="inline-flex items-center gap-[4px] px-[6px] py-[2px] rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">
                    <span className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse" />
                    <span>{srv.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

    </div>
  );
}
