'use client';
import { Network } from '@/src/data/networks';
import { useNavigation } from '@/src/context/NavigationContext';

export default function NetworkTile({ network }: { network: Network }) {
  const { navigateTo } = useNavigation();
  
  const renderLogo = () => {
    switch (network.brandType) {
      case 'mtn':
        return (
          <div className="w-full h-full bg-[#FFCC00] flex items-center justify-center rounded-[5px]">
            <span className="text-black font-bold text-[12px] tracking-tighter">MTN</span>
          </div>
        );
      case 'airteltigo':
        return (
          <div className="w-full h-full bg-[#001D4A] relative overflow-hidden flex items-center justify-center rounded-[5px]">
             <div className="absolute bottom-0 w-full h-[40%] bg-[#E21B22]" />
             <span className="text-white font-bold text-[10px] relative z-10 italic">AirtelTigo</span>
          </div>
        );
      case 'telecel':
        return (
          <div className="w-full h-full bg-white border border-[#E21B22] flex items-center justify-center rounded-[5px]">
            <span className="text-[#E21B22] font-bold text-[18px]">t</span>
          </div>
        );
      case 'waec':
        return (
          <div className="w-full h-full bg-[#1F3E7C] flex items-center justify-center rounded-[5px]">
            <span className="text-[#FBB03B] font-bold text-[11px] text-center leading-tight">WAEC<br/>Crest</span>
          </div>
        );
    }
  };

  return (
    <button 
      onClick={() => {
        if (network.brandType === 'waec') {
          navigateTo('checkers');
        } else {
          navigateTo('buy-data', { network: network.brandType });
        }
      }}
      className="bg-[var(--surface-2)] border border-[var(--border)] rounded-[10px] p-[8px] flex flex-col items-center justify-center h-[72px] hover:border-[var(--color-primary-500)] hover:bg-white hover:-translate-y-[2px] shadow-[var(--shadow-card)] dark:shadow-none hover:shadow-[var(--shadow-hover)] dark:hover:shadow-none active:scale-[0.97] transition-all duration-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 cursor-pointer"
    >
      <div className="w-[32px] h-[32px] rounded-[8px] bg-white border border-[var(--border-2)] p-[4px] flex-shrink-0">
        {renderLogo()}
      </div>
      <div className="font-label text-[11px] text-[var(--text-1)] mt-[4px] text-center w-full truncate h-[16px]">
        {network.name}
      </div>
    </button>
  );
}
