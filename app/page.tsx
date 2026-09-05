'use client';
import { useState, useEffect } from 'react';
import AppShell from '@/src/components/layout/AppShell';
import HeroCard from '@/src/components/dashboard/HeroCard';
import PlaceNewOrder from '@/src/components/dashboard/PlaceNewOrder';
import RecentOrders from '@/src/components/dashboard/RecentOrders';
import StatsStrip from '@/src/components/dashboard/StatsStrip';
import DashboardSkeleton from '@/src/components/dashboard/DashboardSkeleton';
import CommunityUpdates from '@/src/components/dashboard/CommunityUpdates';
import { NavigationProvider, useNavigation } from '@/src/context/NavigationContext';
import DepositPage from '@/src/components/pages/DepositPage';
import BuyDataPage from '@/src/components/pages/BuyDataPage';
import OrdersPage from '@/src/components/pages/OrdersPage';
import CheckersPage from '@/src/components/pages/CheckersPage';
import LeaderboardPage from '@/src/components/pages/LeaderboardPage';
import StorePage from '@/src/components/pages/StorePage';
import BanterLoader from '@/src/components/common/BanterLoader';

function PageContent() {
  const { currentPage, isNavigating, targetPageTitle } = useNavigation();

  if (isNavigating) {
    return (
      <div className="min-h-[440px] flex flex-col items-center justify-center p-[32px]">
        <BanterLoader variant="primary" label={targetPageTitle} />
      </div>
    );
  }

  if (currentPage === 'deposit') {
    return <DepositPage />;
  }

  if (currentPage === 'buy-data') {
    return <BuyDataPage />;
  }

  if (currentPage === 'orders') {
    return <OrdersPage />;
  }

  if (currentPage === 'checkers') {
    return <CheckersPage />;
  }

  if (currentPage === 'leaderboard') {
    return <LeaderboardPage />;
  }

  if (currentPage === 'store') {
    return <StorePage />;
  }

  return (
    <div className="pt-[12px] flex flex-col lg:grid lg:grid-cols-12 gap-[12px] lg:gap-[16px]">
      {/* Full width hero */}
      <div className="lg:col-span-12">
        <HeroCard />
      </div>
      
      {/* Full width Stats Strip right after Hero */}
      <div className="lg:col-span-12">
        <StatsStrip />
      </div>

      {/* Main Content Columns */}
      <div className="lg:col-span-7 flex flex-col gap-[16px]">
        <PlaceNewOrder />
      </div>

      <div className="lg:col-span-5 flex flex-col gap-[16px]">
        <RecentOrders />
        <CommunityUpdates />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationProvider>
      <AppShell>
        {isLoading ? (
          <div className="min-h-[460px] flex flex-col items-center justify-center p-[32px]">
            <BanterLoader variant="primary" label="Loading SwiftNet Dashboard..." />
          </div>
        ) : (
          <PageContent />
        )}
      </AppShell>
    </NavigationProvider>
  );
}
