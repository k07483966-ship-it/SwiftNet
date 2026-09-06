'use client';
import { useState } from 'react';
import { 
  Menu, 
  Search, 
  Globe, 
  Bell, 
  Wrench, 
  ChevronDown, 
  CheckCircle2, 
  User, 
  Lock, 
  LogOut, 
  Sliders
} from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  onLogout: () => void;
  adminUsername: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function AdminHeader({
  onToggleSidebar,
  onLogout,
  adminUsername,
  searchQuery,
  setSearchQuery,
  setActiveTab
}: AdminHeaderProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-[64px] bg-[#0c1433] border-b border-[#1b264f] text-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Left Column: Sidebar Toggle & Global Search Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="w-[36px] h-[36px] rounded-lg bg-[#14204c] hover:bg-[#1c2c66] text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#23336c]"
          title="Toggle Navigation Menu"
        >
          <Menu size={19} />
        </button>

        {/* Search Bar */}
        <div className="relative hidden min-[400px]:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
            className="h-[36px] pl-9 pr-4 rounded-lg bg-[#131f47] border border-[#23336c] text-[12.5px] text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 w-[180px] sm:w-[240px] md:w-[300px] transition-all"
          />
        </div>
      </div>

      {/* Right Column: Globe, Bell, Wrench & Admin Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Globe Store / Language Switcher */}
        <button 
          onClick={() => setActiveTab('settings')}
          className="w-[36px] h-[36px] rounded-lg bg-[#14204c] hover:bg-[#1c2c66] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#23336c]"
          title="System Store / Language Options"
        >
          <Globe size={18} />
        </button>

        {/* Bell Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-[36px] h-[36px] rounded-lg bg-[#14204c] hover:bg-[#1c2c66] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#23336c] relative"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black leading-none shadow-xs border border-[#0c1433]">
              9+
            </span>
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[300px] bg-[#11183c] border border-[#23336c] rounded-xl shadow-2xl z-50 p-3 text-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#202d5a] mb-2">
                <span className="font-bold text-[13px] text-white">System Notifications</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full">9 Unread</span>
              </div>
              <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar text-[11.5px]">
                <div className="p-2 rounded-lg bg-[#182352] border border-[#263773]">
                  <p className="font-semibold text-white">4 New Wallet Deposits Pending</p>
                  <p className="text-slate-400 text-[10.5px]">MTN MoMo payments awaiting validation</p>
                </div>
                <div className="p-2 rounded-lg bg-[#182352] border border-[#263773]">
                  <p className="font-semibold text-white">WAEC Checker API Balance High</p>
                  <p className="text-slate-400 text-[10.5px]">API sync updated 5 mins ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wrench Settings Icon */}
        <button 
          onClick={() => setActiveTab('settings')}
          className="w-[36px] h-[36px] rounded-lg bg-[#14204c] hover:bg-[#1c2c66] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#23336c]"
          title="System Configuration"
        >
          <Wrench size={17} />
        </button>

        {/* Profile Pill Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#14204c] hover:bg-[#1c2c66] border border-[#23336c] transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="w-[26px] h-[26px] rounded-full bg-blue-600 flex items-center justify-center text-white text-[12px] font-bold shadow-xs flex-shrink-0">
              ✓
            </div>
            <span className="font-semibold text-[13px] text-white hidden sm:inline">{adminUsername || 'admin'}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Admin Profile Menu */}
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-[200px] bg-[#11183c] border border-[#23336c] rounded-xl shadow-2xl z-50 p-1.5 text-slate-200">
              <div className="p-2.5 border-b border-[#202d5a] mb-1">
                <p className="font-bold text-[13px] text-white flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-blue-400" />
                  <span>Master Admin</span>
                </p>
                <p className="text-[10.5px] text-slate-400 mt-0.5">admin@mastergate.com</p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setShowProfileDropdown(false);
                }}
                className="w-full px-3 py-2 text-left rounded-lg text-[12px] text-slate-200 hover:bg-[#1d2a5d] hover:text-white flex items-center gap-2.5 transition-colors"
              >
                <User size={14} className="text-slate-400" />
                <span>Admin Profile</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setShowProfileDropdown(false);
                }}
                className="w-full px-3 py-2 text-left rounded-lg text-[12px] text-slate-200 hover:bg-[#1d2a5d] hover:text-white flex items-center gap-2.5 transition-colors"
              >
                <Lock size={14} className="text-slate-400" />
                <span>Change Password</span>
              </button>

              <div className="my-1 border-t border-[#202d5a]" />

              <button
                onClick={onLogout}
                className="w-full px-3 py-2 text-left rounded-lg text-[12px] text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 flex items-center gap-2.5 transition-colors font-semibold"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
