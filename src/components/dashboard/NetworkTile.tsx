'use client';
import { Network } from '@/src/data/networks';
import { useNavigation } from '@/src/context/NavigationContext';
import { MTNLogo, TelecelLogo, AirtelTigoLogo, WAECLogo } from '@/src/components/common/NetworkLogos';

export default function NetworkTile({ network }: { network: Network }) {
  const { navigateTo } = useNavigation();
  
  const targetHref = network.brandType === 'waec' ? '/checkers' : `/buy-data?network=${network.brandType}`;

  const renderLogo = () => {
    switch (network.brandType) {
      case 'mtn':
        return <MTNLogo className="w-full h-full" />;
      case 'airteltigo':
        return <AirtelTigoLogo className="w-full h-full" />;
      case 'telecel':
        return <TelecelLogo className="w-full h-full" variant="red" />;
      case 'waec':
        return <WAECLogo className="w-full h-full" />;
    }
  };

  return (
    <a 
      href={targetHref}
      onClick={(e) => {
        e.preventDefault();
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
    </a>
  );
}
