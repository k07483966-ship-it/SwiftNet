'use client';
import { useState } from 'react';
import { X, Copy, Check, Play, Clock, Zap, Server } from 'lucide-react';

interface AdminCronModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminCronModal({ isOpen, onClose }: AdminCronModalProps) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [lastExecuted, setLastExecuted] = useState('2 mins ago');

  if (!isOpen) return null;

  const cronCommand = 'curl -s https://automail.gh/api/cron/process-orders';

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(cronCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRunNow = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setLastExecuted('Just now');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#11183c] border border-[#23336c] text-white rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#202f63] flex items-center justify-between bg-[#0a0f2b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-400/40 text-indigo-400 flex items-center justify-center">
              <Zap size={18} />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-white">Cron Job Setup & Triggers</h3>
              <p className="text-[11px] text-slate-400">Automated queue processing for bundles & notifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1e2c5d] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4 text-[12.5px]">
          <div className="p-3 rounded-xl bg-[#182452] border border-[#273873] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Cron Command URL</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                Active Schedule
              </span>
            </div>
            <div className="flex items-center justify-between bg-[#0b102c] p-2.5 rounded-lg border border-[#1f2d5e] font-mono text-xs text-indigo-300">
              <span className="truncate mr-2">{cronCommand}</span>
              <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] bg-[#1a2656] px-2 py-1 rounded transition-colors flex-shrink-0"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#16214a] border border-[#23336c]">
              <span className="text-slate-400 text-[11px]">Recommended Interval</span>
              <p className="font-bold text-white text-sm mt-0.5 font-mono">* * * * * (Every 1 min)</p>
            </div>
            <div className="p-3 rounded-xl bg-[#16214a] border border-[#23336c]">
              <span className="text-slate-400 text-[11px]">Last Execution</span>
              <p className="font-bold text-emerald-400 text-sm mt-0.5">{lastExecuted}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0e1533] border border-[#1c2a59] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-indigo-400" />
              <span className="text-slate-300 text-xs font-medium">Test & Run Cron Immediately</span>
            </div>
            <button
              onClick={handleRunNow}
              disabled={isRunning}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Play size={13} className={isRunning ? 'animate-spin' : ''} />
              <span>{isRunning ? 'Processing...' : 'Run Cron'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0f2b] border-t border-[#202f63] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1b2756] hover:bg-[#23336f] text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
