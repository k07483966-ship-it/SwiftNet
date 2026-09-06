'use client';
import { useState } from 'react';
import { Mail, Check, ShieldCheck, Lock, User, RefreshCw } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (username: string) => void;
}

export default function AdminLoginPage({ onLoginSuccess }: AdminLoginPageProps) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [captchaChecked, setCaptchaChecked] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Username is required');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Password is required');
      return;
    }
    if (!captchaChecked) {
      setErrorMsg('Please confirm reCAPTCHA security verification');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(username);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#080d26] via-[#0e1738] to-[#070b1e] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-white">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Login Card Outer Wrapper */}
      <div className="w-full max-w-[420px] relative z-10 flex flex-col items-center">
        {/* Top Indigo Welcome Banner */}
        <div className="w-full bg-[#3c3beb] rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(60,59,235,0.35)] mb-4 border border-blue-400/30">
          <div className="w-[48px] h-[48px] rounded-2xl bg-white/10 backdrop-blur-md mx-auto mb-3 flex items-center justify-center text-white border border-white/20 shadow-inner">
            <Mail size={24} className="stroke-[2.2]" />
          </div>
          <h1 className="font-extrabold text-[22px] text-white tracking-tight leading-tight font-display">
            Welcome to AutoMail
          </h1>
          <p className="text-[12.5px] text-blue-100/90 font-medium mt-1">
            Admin Login to AutoMail Dashboard
          </p>
        </div>

        {/* Form Container Box */}
        <div className="w-full bg-[#11183c] border border-[#212d5d] rounded-2xl p-6 sm:p-7 shadow-2xl space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold flex items-center gap-2">
              <ShieldCheck size={16} className="text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5 text-left">
              <label className="text-[12px] font-medium text-slate-300 flex items-center gap-1">
                Username <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="enter username"
                  className="w-full h-[42px] px-3.5 rounded-lg bg-[#1a2550] border border-[#2a386b] text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium placeholder-slate-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-medium text-slate-300">
                  Password <span className="text-rose-500 font-bold">*</span>
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset instructions sent to admin recovery email.');
                  }}
                  className="text-[11.5px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[42px] px-3.5 rounded-lg bg-[#1a2550] border border-[#2a386b] text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* reCAPTCHA Checkbox Box */}
            <div 
              onClick={() => setCaptchaChecked(!captchaChecked)}
              className="w-full bg-white text-slate-800 rounded-lg p-3 sm:p-3.5 flex items-center justify-between shadow-xs border border-slate-200 cursor-pointer select-none hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                  captchaChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400 bg-white'
                }`}>
                  {captchaChecked && <Check size={16} strokeWidth={3} />}
                </div>
                <span className="text-xs font-semibold text-slate-800">I&apos;m not a robot</span>
              </div>

              <div className="flex flex-col items-center justify-center text-slate-400 leading-none">
                <RefreshCw size={18} className="text-blue-600 animate-spin-slow mb-0.5" />
                <span className="text-[8.5px] font-bold tracking-tight text-slate-500 uppercase">reCAPTCHA</span>
                <span className="text-[7.5px] text-slate-400">Privacy - Terms</span>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[46px] rounded-xl bg-[#3c3beb] hover:bg-[#3230d4] active:scale-[0.98] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-blue-900/40 cursor-pointer flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>LOGIN</span>
              )}
            </button>
          </form>

          {/* Quick Auto-Fill Demo Button */}
          <div className="pt-2 border-t border-[#1c2854] text-center">
            <button
              type="button"
              onClick={() => {
                setUsername('admin');
                setPassword('admin123');
                setCaptchaChecked(true);
              }}
              className="text-[11px] text-slate-400 hover:text-blue-300 underline font-medium transition-colors"
            >
              Auto-fill Master Gate Admin Credentials
            </button>
          </div>
        </div>

        {/* Footer Brand Credit */}
        <p className="text-[11px] text-slate-500 mt-4 text-center">
          © 2026 AutoMail MasterGate Panel • All Rights Reserved
        </p>
      </div>
    </div>
  );
}
