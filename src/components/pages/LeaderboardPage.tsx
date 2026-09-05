'use client';
import { ArrowLeft, Trophy, Medal, Award, Flame, TrendingUp } from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

interface ResellerRank {
  rank: number;
  name: string;
  avatar: string;
  volume: string;
  reward: string;
  isCurrentUser?: boolean;
}

const topResellers: ResellerRank[] = [
  { rank: 1, name: 'Kofi DataHub', avatar: 'K', volume: '1,420 GB', reward: 'GH₵1,000 Cash' },
  { rank: 2, name: 'Ama Bundles', avatar: 'A', volume: '1,180 GB', reward: 'GH₵500 Cash' },
  { rank: 3, name: 'Yaw SME Hub', avatar: 'Y', volume: '950 GB', reward: 'GH₵250 Cash' },
  { rank: 4, name: 'Accra FastNet', avatar: 'A', volume: '810 GB', reward: 'GH₵100 Wallet' },
  { rank: 5, name: 'TechBros Kumasi', avatar: 'T', volume: '720 GB', reward: 'GH₵100 Wallet' },
  { rank: 6, name: 'Esi Connect', avatar: 'E', volume: '640 GB', reward: 'GH₵50 Wallet' },
  { rank: 7, name: 'Cape Coast Gig', avatar: 'C', volume: '590 GB', reward: 'GH₵50 Wallet' },
  { rank: 14, name: 'ktech (You)', avatar: 'U', volume: '340 GB', reward: 'Top 15 Badge', isCurrentUser: true },
];

export default function LeaderboardPage() {
  const { navigateTo } = useNavigation();

  return (
    <div className="pt-[10px] pb-[36px] max-w-[800px] mx-auto">
      {/* Top Accent Line */}
      <div className="h-[3px] w-[56px] rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 mb-[12px]" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[10px] mb-[14px]">
        <div>
          <h1 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-1)] tracking-[-0.02em] leading-tight">
            Reseller Leaderboard
          </h1>
          <p className="text-[12.5px] text-[var(--text-3)] mt-[2px]">
            Top data agents this month. Compete for GH₵2,000+ monthly cash prizes!
          </p>
        </div>

        {/* Current Month Badge */}
        <div className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold self-start sm:self-auto">
          <Flame size={12} className="text-orange-500" />
          <span>September Season Live</span>
        </div>
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

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-[8px] sm:gap-[12px] mb-[16px]">
        {/* 2nd Place */}
        <div className="bg-white rounded-[14px] border border-slate-200 p-[12px] text-center flex flex-col items-center justify-end shadow-2xs">
          <div className="w-[36px] h-[36px] rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-700 text-[13px] mb-[6px]">
            2
          </div>
          <div className="text-[12px] font-bold text-slate-900 truncate w-full">{topResellers[1].name}</div>
          <div className="text-[11px] font-semibold text-blue-600 mt-[2px]">{topResellers[1].volume}</div>
          <span className="mt-[6px] text-[9.5px] font-bold px-[6px] py-[2px] rounded bg-slate-100 text-slate-700">
            {topResellers[1].reward}
          </span>
        </div>

        {/* 1st Place */}
        <div className="bg-gradient-to-b from-amber-50/70 to-white rounded-[14px] border-2 border-amber-300 p-[14px] text-center flex flex-col items-center justify-end shadow-xs relative">
          <div className="absolute -top-[10px] bg-amber-500 text-white rounded-full p-[4px] shadow-sm">
            <Trophy size={14} />
          </div>
          <div className="w-[42px] h-[42px] rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-800 text-[15px] mb-[6px]">
            1
          </div>
          <div className="text-[13px] font-bold text-slate-900 truncate w-full">{topResellers[0].name}</div>
          <div className="text-[12px] font-bold text-amber-700 mt-[2px]">{topResellers[0].volume}</div>
          <span className="mt-[6px] text-[10px] font-bold px-[8px] py-[2px] rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            {topResellers[0].reward}
          </span>
        </div>

        {/* 3rd Place */}
        <div className="bg-white rounded-[14px] border border-slate-200 p-[12px] text-center flex flex-col items-center justify-end shadow-2xs">
          <div className="w-[36px] h-[36px] rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center font-bold text-amber-700 text-[13px] mb-[6px]">
            3
          </div>
          <div className="text-[12px] font-bold text-slate-900 truncate w-full">{topResellers[2].name}</div>
          <div className="text-[11px] font-semibold text-blue-600 mt-[2px]">{topResellers[2].volume}</div>
          <span className="mt-[6px] text-[9.5px] font-bold px-[6px] py-[2px] rounded bg-amber-50 text-amber-700">
            {topResellers[2].reward}
          </span>
        </div>
      </div>

      {/* User Current Position Callout */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-[12px] p-[12px] mb-[16px] flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div className="w-[32px] h-[32px] rounded-[8px] bg-blue-600 text-white font-bold flex items-center justify-center text-[12px]">
            #14
          </div>
          <div>
            <div className="text-[12.5px] font-bold text-slate-900">Your Current Rank: #14 (340 GB)</div>
            <div className="text-[11px] text-slate-500">Sell 12 more 10GB bundles to enter the Top 10 prize pool!</div>
          </div>
        </div>
        <button
          onClick={() => navigateTo('buy-data')}
          className="h-[28px] px-[10px] rounded-[6px] bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Sell Data
        </button>
      </div>

      {/* Ranked Table */}
      <div className="bg-white rounded-[14px] border border-slate-200/90 overflow-hidden shadow-2xs">
        <div className="px-[14px] py-[10px] bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Reseller</span>
          <div className="flex gap-[28px]">
            <span>Volume</span>
            <span>Est. Reward</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {topResellers.map((item) => (
            <div
              key={item.rank}
              className={`px-[14px] py-[10px] flex items-center justify-between text-[12px] ${
                item.isCurrentUser ? 'bg-blue-50/40 font-semibold' : 'hover:bg-slate-50/70'
              }`}
            >
              <div className="flex items-center gap-[10px]">
                <span className="w-[20px] text-slate-400 font-mono text-[11px] font-bold">#{item.rank}</span>
                <div className="w-[28px] h-[28px] rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-[11px]">
                  {item.avatar}
                </div>
                <span className="text-slate-900 font-medium">{item.name}</span>
              </div>

              <div className="flex items-center gap-[24px]">
                <span className="font-bold text-blue-700 tabular-nums">{item.volume}</span>
                <span className="text-[11px] text-slate-500 w-[90px] text-right">{item.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
