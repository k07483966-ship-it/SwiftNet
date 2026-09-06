'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, Check, ArrowRight, ShieldCheck, Sparkles, AlertCircle, Key, ArrowLeft, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthPageProps {
  onLoginSuccess: (userData: { name: string; email: string; phone: string }) => void;
  initialMode?: 'login' | 'signup' | 'reset-password';
}

export default function AuthPage({ onLoginSuccess, initialMode }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset-password'>(() => {
    if (initialMode) return initialMode;
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/reset-password' || path === '/forgot-password' || window.location.search.includes('reset')) {
        return 'reset-password';
      }
    }
    return 'login';
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Password reset states
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [resetIdentifier, setResetIdentifier] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleResetStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetIdentifier.trim()) {
      toast.error('Please enter your email or phone number');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Verification OTP (849201) sent to ${resetIdentifier}`);
      setResetStep(2);
      setResetOtp('849201');
    }, 1200);
  };

  const handleResetStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetOtp.trim() || resetOtp.length < 6) {
      toast.error('Please enter a valid 6-digit OTP code');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Password updated successfully! Welcome back.');
      onLoginSuccess({
        name: resetIdentifier.split('@')[0] || 'Reseller Agent',
        email: resetIdentifier.includes('@') ? resetIdentifier : `${resetIdentifier}@swiftnet.gh`,
        phone: resetIdentifier.match(/^\d+$/) ? resetIdentifier : '0244123456',
      });
    }, 1400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast.error('Please fill in your email and password');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Login successful! Welcome back.');
      onLoginSuccess({
        name: loginEmail.split('@')[0] || 'Reseller Agent',
        email: loginEmail,
        phone: '0244123456',
      });
    }, 1400);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!signupPhone.trim() || signupPhone.length < 9) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if (!signupPassword || signupPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      toast.error('Please agree to the Terms & Conditions');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Account created successfully! Redirecting...');
      onLoginSuccess({
        name: signupName,
        email: signupEmail,
        phone: signupPhone,
      });
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Google Authentication successful!');
      onLoginSuccess({
        name: 'KTech Google Reseller',
        email: 'agent@swiftnet.gh',
        phone: '0244123456',
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-3 bg-[#F4F6F8] text-slate-800 relative">
      {/* Top Header Row with Logo */}
      <div className="w-full max-w-[380px] flex items-center justify-center mb-3.5 px-1">
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center p-0.5">
            <Image src="/logo.png" alt="SwiftNet Logo" width={20} height={20} className="object-contain" />
          </div>
          <span className="font-black text-[16px] tracking-tight text-slate-900">
            Swift<span className="text-blue-600">Net</span>
          </span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-[380px] rounded-[20px] border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] relative overflow-hidden transition-all">
        {/* Top Gradient Accent Bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

        <div className="p-4 sm:p-5">
          {/* Brand Emblem & Tagline */}
          <div className="flex flex-col items-center text-center mb-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center mb-1.5 shadow-2xs p-1.5">
              <Image src="/logo.png" alt="SwiftNet Logo" width={28} height={28} className="object-contain" />
            </div>
            <p className="text-[11.5px] font-bold text-blue-600 tracking-wide">
              Fast. Reliable. Pocket-friendly.
            </p>
          </div>

          {/* Form Header */}
          <div className="mb-3.5 text-left">
            <h1 className="text-[17px] font-extrabold tracking-tight text-slate-900">
              {mode === 'login' 
                ? 'Welcome back' 
                : mode === 'signup' 
                ? 'Create an account' 
                : resetStep === 1 
                ? 'Reset Password' 
                : 'Set New Password'}
            </h1>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {mode === 'login' 
                ? 'Log in to save your details and speed up checkout.' 
                : mode === 'signup' 
                ? 'Sign up to manage your data sales, orders, and wallet.'
                : resetStep === 1
                ? 'Enter your account email or phone number to receive a 6-digit OTP code.'
                : 'Enter the 6-digit OTP code and choose your new password.'}
            </p>
          </div>

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-2.5">
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-[11px] font-bold text-slate-700">
                    Email
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Used for receipts</span>
                </div>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-[36px] px-3 rounded-[10px] border border-slate-200 bg-white text-slate-900 text-[12px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-[11px] font-bold text-slate-700">
                    Password
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Min 6 characters</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[36px] pl-3 pr-8 rounded-[10px] border border-slate-200 bg-white text-slate-900 text-[12px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-0">
                <button
                  type="button"
                  onClick={() => {
                    setMode('reset-password');
                    setResetStep(1);
                    if (typeof window !== 'undefined' && window.history.pushState) {
                      window.history.pushState(null, '', '/reset-password');
                    }
                  }}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[36px] rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12.5px] transition-all cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-1.5"
              >
                <span>Log in</span>
                <ArrowRight size={13} />
              </button>
            </form>
          ) : mode === 'signup' ? (
            /* SIGN UP FORM (COMPACT) */
            <form onSubmit={handleSignupSubmit} className="space-y-2">
              <div>
                <label className="block text-[10.5px] font-bold text-slate-700 mb-0.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-[34px] px-2.5 rounded-[9px] border border-slate-200 bg-white text-slate-900 text-[11.5px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-[10.5px] font-bold text-slate-700">
                    Email Address
                  </label>
                  <span className="text-[9.5px] text-slate-400">Used for receipts</span>
                </div>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-[34px] px-2.5 rounded-[9px] border border-slate-200 bg-white text-slate-900 text-[11.5px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-slate-700 mb-0.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="024XXXXXXX"
                  className="w-full h-[34px] px-2.5 rounded-[9px] border border-slate-200 bg-white text-slate-900 text-[11.5px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                />
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <label className="block text-[10.5px] font-bold text-slate-700 mb-0.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-[34px] pl-2 pr-7 rounded-[9px] border border-slate-200 bg-white text-slate-900 text-[11.5px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-slate-700 mb-0.5">
                    Confirm
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-[34px] pl-2 pr-7 rounded-[9px] border border-slate-200 bg-white text-slate-900 text-[11.5px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-3 h-3 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-600">
                    I agree to <span className="font-bold text-slate-800">Terms</span> & <span className="font-bold text-slate-800">Privacy</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[34px] mt-0.5 rounded-[9px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-[12px] transition-all cursor-pointer shadow-2xs active:scale-[0.99] flex items-center justify-center gap-1.5"
              >
                <span>Register Account</span>
                <ArrowRight size={13} />
              </button>
            </form>
          ) : (
            /* PASSWORD RESET FORM */
            resetStep === 1 ? (
              <form onSubmit={handleResetStep1Submit} className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-[11px] font-bold text-slate-700">
                      Email or Mobile Number
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">Verification target</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={resetIdentifier}
                    onChange={(e) => setResetIdentifier(e.target.value)}
                    placeholder="024XXXXXXX or name@company.com"
                    className="w-full h-[36px] px-3 rounded-[10px] border border-slate-200 bg-white text-slate-900 text-[12px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[36px] mt-1 rounded-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-[12.5px] transition-all cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-1.5"
                >
                  <span>Send Reset OTP Code</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetStep2Submit} className="space-y-2.5">
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      6-Digit OTP Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setResetOtp('849201')}
                      className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Fill Test (849201)
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={resetOtp}
                    onChange={(e) => setResetOtp(e.target.value)}
                    placeholder="849201"
                    className="w-full h-[36px] px-3 rounded-[10px] border border-slate-200 bg-slate-50 text-slate-900 font-mono tracking-widest text-[14px] text-center font-bold transition-all outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-slate-700 mb-0.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-[34px] pl-3 pr-8 rounded-[9px] border border-slate-200 bg-white text-slate-900 text-[11.5px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-slate-700 mb-0.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-[34px] pl-3 pr-8 rounded-[9px] border border-slate-200 bg-white text-slate-900 text-[11.5px] transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showConfirmPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[36px] mt-1 rounded-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-[12.5px] transition-all cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-1.5"
                >
                  <span>Save Password & Log In</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            )
          )}

          {/* OR DIVIDER */}
          {mode !== 'reset-password' && (
            <>
              <div className="relative my-3 flex items-center justify-center">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white px-2.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  OR
                </span>
              </div>

              {/* GOOGLE SIGN IN */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isSubmitting}
                className="w-full h-[36px] rounded-[10px] border border-slate-200/90 bg-white text-slate-700 hover:bg-slate-50 text-[12px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.1-6.68-4.93H1.23v3.15C3.25 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.23C.44 8.15 0 9.99 0 12s.44 3.85 1.23 5.42l4.09-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.23 6.58l4.09 3.15c.94-2.83 3.57-4.98 6.68-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </>
          )}

          {/* FOOTER SWITCH LINK */}
          <div className="mt-3.5 text-center text-[11.5px] text-slate-500">
            {mode === 'login' ? (
              <p>
                New here?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer ml-0.5 underline underline-offset-2"
                >
                  Create an account
                </button>
              </p>
            ) : mode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer ml-0.5 underline underline-offset-2"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Remembered password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setResetStep(1);
                    if (typeof window !== 'undefined' && window.history.pushState) {
                      window.history.pushState(null, '', '/');
                    }
                  }}
                  className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer ml-0.5 underline underline-offset-2"
                >
                  Return to Log in
                </button>
              </p>
            )}
          </div>
        </div>

        {/* FULL SPIN LOADING OVERLAY */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-5 z-20 transition-all animate-fadeIn">
            <div className="relative mb-2.5">
              <div className="w-10 h-10 rounded-full border-3 border-blue-200 border-t-blue-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
            </div>
            <h3 className="text-[13px] font-extrabold text-slate-900 mb-0.5">
              {mode === 'signup' 
                ? 'Setting up your account...' 
                : mode === 'reset-password' 
                ? (resetStep === 1 ? 'Sending reset code...' : 'Updating password...')
                : 'Authenticating user...'}
            </h3>
            <p className="text-[11px] text-slate-500 text-center max-w-[220px]">
              {mode === 'signup' 
                ? 'Allocating secure reseller space & wallet...' 
                : mode === 'reset-password'
                ? (resetStep === 1 ? 'Dispatching OTP to your email/phone...' : 'Verifying OTP and saving new credentials...')
                : 'Verifying credentials and loading dashboard...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
