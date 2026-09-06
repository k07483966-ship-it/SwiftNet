'use client';
import { useState } from 'react';
import { 
  Store, 
  ArrowLeft, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Layers,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';
import toast from 'react-hot-toast';

export default function CreateStorePage() {
  const { storeSettings, updateStoreSettings, navigateTo } = useNavigation();

  const [storeName, setStoreName] = useState(storeSettings.storeName || 'Primedata');
  const [storeSlug, setStoreSlug] = useState(storeSettings.storeSlug || 'primedata');
  const [subtitle, setSubtitle] = useState(storeSettings.subtitle || 'Get the best data deals. Fast, reliable, and available 24/7');
  const [supportPhone, setSupportPhone] = useState(storeSettings.supportPhone || '0244123456');
  const [logoUrl, setLogoUrl] = useState(storeSettings.logoUrl || '/logo.png');
  const [bannerUrl, setBannerUrl] = useState(
    storeSettings.bannerUrl || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80'
  );
  const [themeColor, setThemeColor] = useState<'blue' | 'indigo' | 'emerald' | 'amber'>(storeSettings.themeColor || 'blue');

  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fullUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/s/${storeSlug.toLowerCase() || 'primedata'}` 
    : `https://swiftnet.gh/s/${storeSlug.toLowerCase() || 'primedata'}`;

  // Banner presets
  const bannerPresets = [
    { label: 'Stadium & Crowd', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Modern Cyber Grid', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Sunset Gradient', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Dark Abstract', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80' },
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setLogoUrl(reader.result as string);
          toast.success('Store logo uploaded!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setBannerUrl(reader.result as string);
          toast.success('Hero banner uploaded!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
      storeName,
      storeSlug,
      subtitle,
      supportPhone,
      whatsappNumber: supportPhone,
      logoUrl,
      bannerUrl,
      themeColor
    });

    setIsSaved(true);
    toast.success('Storefront saved & published live!');
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopiedLink(true);
      toast.success('Store URL copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="pt-1 pb-10 max-w-2xl mx-auto px-2 sm:px-0">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => navigateTo('store')}
          className="w-[34px] h-[34px] rounded-[10px] bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title="Back to Store Manager"
        >
          <ArrowLeft size={15} />
        </button>

        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-bold text-slate-900">Create & Customize Storefront</span>
        </div>

        <button
          onClick={() => navigateTo('public-storefront')}
          className="h-[32px] px-2.5 rounded-[8px] bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-[11.5px] flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
        >
          <span>View Live Store</span>
          <ExternalLink size={12} />
        </button>
      </div>

      {/* Main Studio Card */}
      <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-2xs mb-3.5">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div>
            <h1 className="text-[14px] font-bold text-slate-900">Storefront Customization Studio</h1>
            <p className="text-[11px] text-slate-500">Customize your public branding, logo, banner & WhatsApp support</p>
          </div>

          {isSaved && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10.5px] font-bold">
              <CheckCircle2 size={12} />
              <span>Published Live</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-3.5">
          {/* Store Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Storefront Name
              </label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="e.g. Primedata"
                className="w-full h-[38px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Storefront URL Slug
              </label>
              <div className="flex items-center">
                <span className="h-[38px] px-2 bg-slate-100 border border-r-0 border-slate-200 text-[11px] text-slate-500 rounded-l-[8px] flex items-center font-mono">
                  /s/
                </span>
                <input
                  type="text"
                  required
                  value={storeSlug}
                  onChange={(e) => setStoreSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                  placeholder="primedata"
                  className="w-full h-[38px] px-2.5 rounded-r-[8px] border border-slate-200 text-[12px] font-mono text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Subtitle / Tagline */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Storefront Subtitle / Tagline
            </label>
            <input
              type="text"
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Get the best data deals. Fast, reliable, and available 24/7"
              className="w-full h-[38px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* WhatsApp Support Number */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Customer WhatsApp Support Line
            </label>
            <input
              type="tel"
              required
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              placeholder="e.g. 0244123456"
              className="w-full h-[38px] px-2.5 rounded-[8px] border border-slate-200 text-[12px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Store Logo Upload & Preview */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Storefront Brand Logo
            </label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-2xs">
                {logoUrl && logoUrl !== '/logo.png' ? (
                  <img src={logoUrl} alt="Store Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-900 text-amber-400 font-black text-lg flex items-center justify-center">
                    ★
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <label className="h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border border-slate-200 transition-all">
                    <Upload size={13} />
                    <span>Upload Logo Image</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="Or paste Logo Image URL"
                  className="w-full h-7 px-2 rounded-md border border-slate-200 text-[11px] font-mono text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Hero Banner Upload & Presets */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Hero Banner Image
            </label>
            
            {/* Current Banner Preview */}
            <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-200 mb-2 shadow-2xs">
              <img src={bannerUrl} alt="Hero Banner Preview" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9.5px] font-bold">
                Banner Preview
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <label className="h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border border-slate-200 transition-all">
                  <Upload size={13} />
                  <span>Upload Custom Banner</span>
                  <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                </label>
                <span className="text-[10.5px] text-slate-400">or select a preset below:</span>
              </div>

              {/* Banner Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {bannerPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setBannerUrl(preset.url)}
                    className={`p-1 rounded-lg border text-left cursor-pointer transition-all ${
                      bannerUrl === preset.url ? 'border-amber-500 ring-2 ring-amber-400/30' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-full h-10 rounded overflow-hidden mb-1">
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 block truncate">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="h-10 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[12px] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedLink ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>

            <button
              type="submit"
              className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <CheckCircle2 size={15} />
              <span>Save & Publish Storefront</span>
            </button>
          </div>
        </form>
      </div>

      {/* Live Direct Store Link Card */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Your Live Storefront Link</div>
          <div className="text-[13px] font-mono font-bold text-slate-200 mt-0.5 truncate max-w-xs">{fullUrl}</div>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('public-storefront')}
          className="h-9 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-[12px] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all whitespace-nowrap"
        >
          <span>Visit Store</span>
          <ExternalLink size={13} />
        </button>
      </div>
    </div>
  );
}
