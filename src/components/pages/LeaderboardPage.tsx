'use client';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Trophy, 
  Medal, 
  Crown, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  Gift,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

interface ResellerRank {
  rank: number;
  name: string;
  avatar: string;
  badge: string;
  volume: string;
  growth: string;
  reward: string;
  isCurrentUser?: boolean;
}

const leaderboardData: Record<'monthly' | 'weekly' | 'alltime', ResellerRank[]> = {
  monthly: [
    { rank: 1, name: 'Kofi DataHub', avatar: 'K', badge: 'Platinum Agent', volume: '1,420 GB', growth: '+24%', reward: 'GH₵1,500 Cash' },
    { rank: 2, name: 'Ama Bundles', avatar: 'A', badge: 'Gold Reseller', volume: '1,180 GB', growth: '+18%', reward: 'GH₵750 Cash' },
    { rank: 3, name: 'Yaw SME Hub', avatar: 'Y', badge: 'Gold Reseller', volume: '950 GB', growth: '+15%', reward: 'GH₵350 Cash' },
    { rank: 4, name: 'Accra FastNet', avatar: 'A', badge: 'Silver Reseller', volume: '810 GB', growth: '+12%', reward: 'GH₵100 Wallet' },
    { rank: 5, name: 'TechBros Kumasi', avatar: 'T', badge: 'Silver Reseller', volume: '720 GB', growth: '+9%', reward: 'GH₵100 Wallet' },
    { rank: 6, name: 'Esi Connect', avatar: 'E', badge: 'Silver Reseller', volume: '640 GB', growth: '+11%', reward: 'GH₵50 Wallet' },
    { rank: 7, name: 'Cape Coast Gig', avatar: 'C', badge: 'Bronze Agent', volume: '590 GB', growth: '+7%', reward: 'GH₵50 Wallet' },
    { rank: 8, name: 'Takoradi Express', avatar: 'T', badge: 'Bronze Agent', volume: '520 GB', growth: '+5%', reward: 'GH₵50 Wallet' },
    { rank: 9, name: 'Tema Data Direct', avatar: 'T', badge: 'Bronze Agent', volume: '480 GB', growth: '+8%', reward: 'GH₵50 Wallet' },
    { rank: 10, name: 'Madina Telecom', avatar: 'M', badge: 'Bronze Agent', volume: '410 GB', growth: '+14%', reward: 'GH₵50 Wallet' },
    { rank: 14, name: 'KTech Data (You)', avatar: 'KT', badge: 'Tier 2 Reseller', volume: '340 GB', growth: '+21%', reward: 'Top 15 Badge', isCurrentUser: true },
  ],
  weekly: [
    { rank: 1, name: 'Kofi DataHub', avatar: 'K', badge: 'Platinum Agent', volume: '380 GB', growth: '+32%', reward: 'GH₵400 Cash' },
    { rank: 2, name: 'Accra FastNet', avatar: 'A', badge: 'Silver Reseller', volume: '290 GB', growth: '+28%', reward: 'GH₵200 Cash' },
    { rank: 3, name: 'Ama Bundles', avatar: 'A', badge: 'Gold Reseller', volume: '260 GB', growth: '+14%', reward: 'GH₵100 Cash' },
    { rank: 4, name: 'Yaw SME Hub', avatar: 'Y', badge: 'Gold Reseller', volume: '210 GB', growth: '+10%', reward: 'GH₵50 Wallet' },
    { rank: 10, name: 'KTech Data (You)', avatar: 'KT', badge: 'Tier 2 Reseller', volume: '115 GB', growth: '+25%', reward: 'Weekly Top 10', isCurrentUser: true },
  ],
  alltime: [
    { rank: 1, name: 'Kofi DataHub', avatar: 'K', badge: 'Master Reseller', volume: '14,800 GB', growth: 'Lifetime', reward: 'Hall of Fame' },
    { rank: 2, name: 'Ama Bundles', avatar: 'A', badge: 'Master Reseller', volume: '12,400 GB', growth: 'Lifetime', reward: 'Hall of Fame' },
    { rank: 3, name: 'TechBros Kumasi', avatar: 'T', badge: 'Elite Agent', volume: '9,900 GB', growth: 'Lifetime', reward: 'Hall of Fame' },
    { rank: 18, name: 'KTech Data (You)', avatar: 'KT', badge: 'Tier 2 Reseller', volume: '2,850 GB', growth: 'Lifetime', reward: 'Pro Reseller', isCurrentUser: true },
  ]
};

export default function LeaderboardPage() {
  const { navigateTo } = useNavigation();
  const [tab, setTab] = useState<'monthly' | 'weekly' | 'alltime'>('monthly');

  const list = leaderboardData[tab];
  const top1 = list.find((i) => i.rank === 1) || list[0];
  const top2 = list.find((i) => i.rank === 2) || list[1];
  const top3 = list.find((i) => i.rank === 3) || list[2];

  const userItem = list.find((i) => i.isCurrentUser) || list[list.length - 1];

  return (
    <div className="pt-[4px] pb-[44px] max-w-[540px] mx-auto px-2 sm:px-0">
      {/* Top Header Row with Back Button */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => navigateTo('dashboard')}
          className="w-[34px] h-[34px] rounded-[10px] bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={15} />
        </button>
        <span className="text-[13px] font-bold text-slate-800">Agent Rankings & Rewards</span>
        <div className="w-[34px]" />
      </div>

      {/* Hero Header Banner */}
      <div className="rounded-[18px] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-4 text-white shadow-[0_4px_24px_rgba(15,23,42,0.18)] mb-3.5 border border-amber-500/30 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-[44px] h-[44px] rounded-[12px] bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center shadow-md border border-amber-300">
              <Trophy size={22} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold mb-1">
                <Flame size={11} className="text-amber-400 fill-amber-400" />
                <span>Monthly Prize Pool: GH₵3,500</span>
              </div>
              <h1 className="text-[16px] font-bold text-white tracking-tight leading-tight">
                Top Resellers Leaderboard
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('buy-data')}
            className="h-[34px] px-3 rounded-[9px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11.5px] flex items-center gap-1 active:scale-[0.98] transition-all cursor-pointer shadow-sm flex-shrink-0"
          >
            <span>Sell Data</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Leaderboard Category Tabs */}
      <div className="flex p-1 bg-slate-200/70 rounded-[12px] mb-3.5 gap-1">
        <button
          type="button"
          onClick={() => setTab('monthly')}
          className={`flex-1 h-[32px] rounded-[8px] font-bold text-[11.5px] transition-all cursor-pointer ${
            tab === 'monthly'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Monthly Race
        </button>
        <button
          type="button"
          onClick={() => setTab('weekly')}
          className={`flex-1 h-[32px] rounded-[8px] font-bold text-[11.5px] transition-all cursor-pointer ${
            tab === 'weekly'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Weekly Sprint
        </button>
        <button
          type="button"
          onClick={() => setTab('alltime')}
          className={`flex-1 h-[32px] rounded-[8px] font-bold text-[11.5px] transition-all cursor-pointer ${
            tab === 'alltime'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Hall of Fame
        </button>
      </div>

      {/* TOP 3 PODIUM - Classic 2 - 1 - 3 Position Layout */}
      <div className="grid grid-cols-3 gap-2 items-end mb-3.5">
        {/* 2ND PLACE - SILVER */}
        <div className="bg-white rounded-[16px] border border-slate-200/90 p-3 text-center flex flex-col items-center justify-end shadow-2xs relative pt-5">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[26px] h-[26px] rounded-full bg-slate-200 border-2 border-slate-400 text-slate-800 font-black text-[11px] flex items-center justify-center shadow-xs">
            2
          </div>
          <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-slate-100 to-slate-300 border-2 border-slate-400 flex items-center justify-center font-extrabold text-slate-800 text-[13px] shadow-2xs mb-1.5">
            {top2.avatar}
          </div>
          <div className="text-[11.5px] font-bold text-slate-900 truncate w-full">{top2.name}</div>
          <div className="text-[10.5px] font-extrabold text-blue-600 mt-0.5">{top2.volume}</div>
          <span className="mt-1.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 truncate max-w-full">
            {top2.reward}
          </span>
        </div>

        {/* 1ST PLACE - GOLD (Elevated Center) */}
        <div className="bg-gradient-to-b from-amber-50 to-white rounded-[18px] border-2 border-amber-400 p-3 text-center flex flex-col items-center justify-end shadow-md relative pt-6 -mt-2">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <Crown size={24} className="text-amber-500 fill-amber-400 drop-shadow-xs" />
          </div>
          <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border-2 border-amber-400 flex items-center justify-center font-black text-slate-950 text-[15px] shadow-xs mb-1.5 ring-4 ring-amber-400/20">
            {top1.avatar}
          </div>
          <div className="text-[12px] font-black text-slate-900 truncate w-full">{top1.name}</div>
          <div className="text-[11.5px] font-black text-amber-600 mt-0.5">{top1.volume}</div>
          <span className="mt-1.5 text-[9.5px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 border border-amber-500/80 truncate max-w-full shadow-2xs">
            {top1.reward}
          </span>
        </div>

        {/* 3RD PLACE - BRONZE */}
        <div className="bg-white rounded-[16px] border border-slate-200/90 p-3 text-center flex flex-col items-center justify-end shadow-2xs relative pt-5">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[26px] h-[26px] rounded-full bg-amber-100 border-2 border-amber-600 text-amber-900 font-black text-[11px] flex items-center justify-center shadow-xs">
            3
          </div>
          <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-500/60 flex items-center justify-center font-extrabold text-amber-900 text-[13px] shadow-2xs mb-1.5">
            {top3.avatar}
          </div>
          <div className="text-[11.5px] font-bold text-slate-900 truncate w-full">{top3.name}</div>
          <div className="text-[10.5px] font-extrabold text-blue-600 mt-0.5">{top3.volume}</div>
          <span className="mt-1.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 truncate max-w-full">
            {top3.reward}
          </span>
        </div>
      </div>

      {/* USER STANDING CARD & PROGRESS BAR */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 rounded-[16px] p-3.5 text-white shadow-xs mb-3.5 border border-blue-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-[36px] h-[36px] rounded-[10px] bg-blue-500/30 border border-blue-400/40 text-sky-300 font-extrabold text-[13px] flex items-center justify-center">
              #{userItem.rank}
            </div>
            <div>
              <div className="text-[12.5px] font-bold text-white flex items-center gap-1.5">
                <span>{userItem.name}</span>
                <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 text-[9.5px] font-semibold border border-sky-400/30">
                  {userItem.badge}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                Sales Volume: <span className="font-bold text-sky-300">{userItem.volume}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('buy-data')}
            className="h-[30px] px-2.5 rounded-[7px] bg-sky-500 hover:bg-sky-400 text-slate-950 text-[11px] font-bold transition-all cursor-pointer shadow-2xs flex-shrink-0"
          >
            Boost Rank
          </button>
        </div>

        {/* Progress to Top 10 Target */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-[10.5px] font-semibold text-slate-300 mb-1">
            <span>Progress to Top 10 Target (410 GB)</span>
            <span className="text-sky-300 font-bold">340 / 410 GB (82%)</span>
          </div>
          <div className="w-full h-[6px] rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-sky-300 rounded-full w-[82%]" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <Zap size={11} className="text-amber-400" />
            <span>Dispatch 70 more GB to enter the Cash Rewards Top 10 pool!</span>
          </div>
        </div>
      </div>

      {/* FULL RANKINGS TABLE */}
      <div className="bg-white rounded-[16px] border border-slate-200 overflow-hidden shadow-2xs mb-3.5">
        <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Reseller / Agent</span>
          <div className="flex items-center gap-6">
            <span>Volume</span>
            <span className="w-[85px] text-right">Prize Payout</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {list.map((item) => (
            <div
              key={item.rank}
              className={`px-3.5 py-2.5 flex items-center justify-between text-[12px] transition-colors ${
                item.isCurrentUser
                  ? 'bg-blue-50/70 border-l-4 border-l-blue-600 font-semibold'
                  : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-[20px] text-slate-400 font-mono text-[11px] font-bold flex-shrink-0">
                  #{item.rank}
                </span>
                <div
                  className={`w-[30px] h-[30px] rounded-full flex items-center justify-center font-bold text-[11.5px] flex-shrink-0 ${
                    item.rank === 1
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : item.rank === 2
                      ? 'bg-slate-200 text-slate-800 border border-slate-300'
                      : item.rank === 3
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-slate-900 font-bold truncate flex items-center gap-1">
                    <span>{item.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <span>{item.badge}</span>
                    <span className="text-emerald-600 font-bold">({item.growth})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 flex-shrink-0">
                <span className="font-bold text-slate-900 tabular-nums">{item.volume}</span>
                <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-[5px] w-[85px] text-center truncate">
                  {item.reward}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRIZE BREAKDOWN FOOTER INFO */}
      <div className="p-3.5 rounded-[14px] bg-slate-50 border border-slate-200 space-y-2 text-[11px]">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[12px]">
          <Gift size={14} className="text-amber-500" />
          <span>How Leaderboard Rewards Work</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Top 10 resellers automatically receive their cash rewards directly into their MoMo wallet on the 1st of every month. Ranks 11–20 receive automated wallet credits.
        </p>
      </div>
    </div>
  );
}
