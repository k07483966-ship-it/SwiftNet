'use client';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Gem, 
  Users, 
  CreditCard, 
  Ticket, 
  FileText, 
  Settings, 
  Layers, 
  Bug, 
  ChevronDown, 
  ChevronRight, 
  X,
  Mail,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({ isOpen, onClose, activeTab, setActiveTab }: AdminSidebarProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'plans', label: 'Pricing Plans', icon: Gem },
    { 
      id: 'users', 
      label: 'Manage Users', 
      icon: Users, 
      hasWarning: true,
      subItems: [
        { id: 'all-users', label: 'All Users' },
        { id: 'active-users', label: 'Active Users' },
        { id: 'unverified-email', label: 'Email Unverified' },
        { id: 'unverified-mobile', label: 'Mobile Unverified' },
        { id: 'banned-users', label: 'Banned Users' },
      ]
    },
    { 
      id: 'payments', 
      label: 'Payments', 
      icon: CreditCard, 
      hasWarning: true,
      subItems: [
        { id: 'all-payments', label: 'All Payments' },
        { id: 'pending-payments', label: 'Pending Payments' },
        { id: 'approved-payments', label: 'Approved Payments' },
        { id: 'rejected-payments', label: 'Rejected Payments' },
      ]
    },
    { 
      id: 'tickets', 
      label: 'Support Ticket', 
      icon: Ticket, 
      hasWarning: true,
      subItems: [
        { id: 'all-tickets', label: 'All Tickets' },
        { id: 'pending-tickets', label: 'Pending Tickets' },
        { id: 'closed-tickets', label: 'Closed Tickets' },
      ]
    },
    { 
      id: 'report', 
      label: 'Report', 
      icon: FileText,
      subItems: [
        { id: 'transaction-log', label: 'Transaction Logs' },
        { id: 'login-history', label: 'Login History' },
        { id: 'notification-history', label: 'Notification History' },
      ]
    },
    { id: 'settings', label: 'System Setting', icon: Settings },
    { 
      id: 'extra', 
      label: 'Extra', 
      icon: Layers,
      subItems: [
        { id: 'cron-job', label: 'Cron Job Setting' },
        { id: 'system-info', label: 'System Information' },
        { id: 'clear-cache', label: 'Clear Cache' },
      ]
    },
    { id: 'report-request', label: 'Report & Request', icon: Bug },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-[260px] bg-[#090d23] text-slate-300 z-50
        border-r border-[#1b264f] flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Logo Header */}
          <div className="h-[64px] px-5 flex items-center justify-between border-b border-[#19244d] bg-[#0a0f2a]">
            <div className="flex items-center gap-2.5">
              <div className="w-[36px] h-[36px] rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-900/30">
                <Mail size={20} className="stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[17px] text-white tracking-tight leading-none font-display">
                  AutoMail<span className="text-blue-400">.</span>
                </span>
                <span className="text-[10px] text-blue-300/80 font-medium tracking-wider uppercase mt-0.5">
                  MasterGate Admin
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a2550] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Menu Links */}
          <div className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeTab));
              const isSubOpen = openSubmenu === item.id;

              if (item.subItems) {
                return (
                  <div key={item.id} className="space-y-0.5">
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`
                        w-full h-[42px] px-3.5 rounded-lg flex items-center justify-between text-[13px] font-medium transition-all cursor-pointer
                        ${isActive 
                          ? 'bg-[#1e2a5a] text-white' 
                          : 'text-slate-300 hover:bg-[#121c42] hover:text-white'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={17} className={isActive ? 'text-blue-400' : 'text-slate-400'} />
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.hasWarning && (
                          <span className="w-4 h-4 rounded-full bg-amber-500 text-[#090d23] font-black text-[10px] flex items-center justify-center shadow-xs">
                            !
                          </span>
                        )}
                        {isSubOpen ? (
                          <ChevronDown size={14} className="text-slate-400" />
                        ) : (
                          <ChevronRight size={14} className="text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Submenu Drawer */}
                    {isSubOpen && (
                      <div className="ml-7 pl-3 border-l border-[#202f66] space-y-1 py-1">
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveTab(sub.id);
                              if (window.innerWidth < 1024) onClose();
                            }}
                            className={`
                              w-full h-[34px] px-3 rounded-md text-[12px] font-medium flex items-center transition-all cursor-pointer text-left
                              ${activeTab === sub.id
                                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                                : 'text-slate-300 hover:text-white hover:bg-[#162252]'}
                            `}
                          >
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`
                    w-full h-[42px] px-3.5 rounded-lg flex items-center justify-between text-[13px] font-medium transition-all cursor-pointer
                    ${isActive 
                      ? 'bg-[#3c3beb] text-white shadow-md shadow-blue-900/40 font-semibold' 
                      : 'text-slate-300 hover:bg-[#121c42] hover:text-white'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} className={isActive ? 'text-white' : 'text-slate-400'} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info badge */}
        <div className="p-3.5 border-t border-[#19244d] bg-[#070b1e] text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>v3.8.5 MasterGate</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Build #2026</span>
        </div>
      </aside>
    </>
  );
}
