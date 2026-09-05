'use client';
import { useState, useEffect } from 'react';
import Header from '../dashboard/Header';
import Sidebar from './Sidebar';
import AgentUpgradeModal from '../dashboard/AgentUpgradeModal';
import StoreManagerModal, { StoreTab } from '../dashboard/StoreManagerModal';
import DepositModal from '../dashboard/DepositModal';
import BuyDataModal, { NetworkType } from '../dashboard/BuyDataModal';
import LeaderboardModal from '../dashboard/LeaderboardModal';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [storeTab, setStoreTab] = useState<StoreTab>('create');

  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('mtn');
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);

  const handleOpenStore = (tab: StoreTab = 'create') => {
    setStoreTab(tab);
    setStoreModalOpen(true);
  };

  useEffect(() => {
    const handleCustomStoreOpen = (e: CustomEvent<{ tab?: StoreTab }>) => {
      handleOpenStore(e.detail?.tab || 'create');
    };
    const handleCustomAgentOpen = () => {
      setAgentModalOpen(true);
    };
    const handleCustomDepositOpen = () => {
      setDepositModalOpen(true);
    };
    const handleCustomBuyOpen = (e: CustomEvent<{ network?: NetworkType }>) => {
      setSelectedNetwork(e.detail?.network || 'mtn');
      setBuyModalOpen(true);
    };
    const handleCustomLeaderboardOpen = () => {
      setLeaderboardModalOpen(true);
    };

    window.addEventListener('open-store-modal', handleCustomStoreOpen as EventListener);
    window.addEventListener('open-agent-modal', handleCustomAgentOpen as EventListener);
    window.addEventListener('open-deposit-modal', handleCustomDepositOpen as EventListener);
    window.addEventListener('open-buy-modal', handleCustomBuyOpen as EventListener);
    window.addEventListener('open-leaderboard-modal', handleCustomLeaderboardOpen as EventListener);

    return () => {
      window.removeEventListener('open-store-modal', handleCustomStoreOpen as EventListener);
      window.removeEventListener('open-agent-modal', handleCustomAgentOpen as EventListener);
      window.removeEventListener('open-deposit-modal', handleCustomDepositOpen as EventListener);
      window.removeEventListener('open-buy-modal', handleCustomBuyOpen as EventListener);
      window.removeEventListener('open-leaderboard-modal', handleCustomLeaderboardOpen as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[var(--text-2)] flex relative">
      {/* Soft Dashboard Background Blends contained in their own overflow-hidden layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary-400)] opacity-[0.02] blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 opacity-[0.02] blur-[80px] rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      <Sidebar 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        onOpenAgentModal={() => setAgentModalOpen(true)}
        onOpenStoreModal={handleOpenStore}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenMenu={() => setDrawerOpen(true)} />
        <main className="flex-1 lg:max-w-[1120px] lg:mx-auto w-full px-[14px] sm:px-[20px] pb-[20px]">
          {children}
        </main>
      </div>

      {/* Interactive Agent Upgrade Modal */}
      <AgentUpgradeModal 
        isOpen={agentModalOpen} 
        onClose={() => setAgentModalOpen(false)} 
      />

      {/* Interactive Store Manager Modal */}
      <StoreManagerModal 
        isOpen={storeModalOpen} 
        onClose={() => setStoreModalOpen(false)} 
        initialTab={storeTab}
      />

      {/* Interactive Deposit / Fund Wallet Modal */}
      <DepositModal 
        isOpen={depositModalOpen}
        onClose={() => setDepositModalOpen(false)}
      />

      {/* Interactive Buy Data & Checkers Modal */}
      <BuyDataModal 
        isOpen={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        initialNetwork={selectedNetwork}
      />

      {/* Interactive Reseller Leaderboard Modal */}
      <LeaderboardModal 
        isOpen={leaderboardModalOpen}
        onClose={() => setLeaderboardModalOpen(false)}
      />
    </div>
  );
}
