'use client';
import { useState, useEffect } from 'react';
import AppShell from '@/src/components/layout/AppShell';
import HeroCard from '@/src/components/dashboard/HeroCard';
import PlaceNewOrder from '@/src/components/dashboard/PlaceNewOrder';
import RecentOrders from '@/src/components/dashboard/RecentOrders';
import StatsStrip from '@/src/components/dashboard/StatsStrip';
import CommunityUpdates from '@/src/components/dashboard/CommunityUpdates';
import { NavigationProvider, useNavigation } from '@/src/context/NavigationContext';
import DepositPage from '@/src/components/pages/DepositPage';
import BuyDataPage from '@/src/components/pages/BuyDataPage';
import OrdersPage from '@/src/components/pages/OrdersPage';
import TransactionsPage from '@/src/components/pages/TransactionsPage';
import CheckersPage from '@/src/components/pages/CheckersPage';
import LeaderboardPage from '@/src/components/pages/LeaderboardPage';
import StorePage from '@/src/components/pages/StorePage';
import StoreOrdersPage from '@/src/components/pages/StoreOrdersPage';
import CreateStorePage from '@/src/components/pages/CreateStorePage';
import StorePackagesPage from '@/src/components/pages/StorePackagesPage';
import SupportPage from '@/src/components/pages/SupportPage';
import AccountPage from '@/src/components/pages/AccountPage';
import BanterLoader from '@/src/components/common/BanterLoader';
import AuthPage from '@/src/components/auth/AuthPage';
import PublicStorefrontPage from '@/src/components/pages/PublicStorefrontPage';

function PageContent() {
  const { currentPage, isNavigating, targetPageTitle, loginUser } = useNavigation();

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

  if (currentPage === 'transactions') {
    return <TransactionsPage />;
  }

  if (currentPage === 'checkers') {
    return <CheckersPage />;
  }

  if (currentPage === 'leaderboard') {
    return <LeaderboardPage />;
  }

  if (currentPage === 'store' || currentPage === 'store-earnings') {
    return <StorePage />;
  }

  if (currentPage === 'store-orders') {
    return <StoreOrdersPage />;
  }

  if (currentPage === 'create-store') {
    return <CreateStorePage />;
  }

  if (currentPage === 'store-packages') {
    return <StorePackagesPage />;
  }

  if (currentPage === 'support') {
    return <SupportPage />;
  }

  if (currentPage === 'account') {
    return <AccountPage />;
  }

  if (currentPage === 'reset-password') {
    return <AuthPage initialMode="reset-password" onLoginSuccess={(userData) => loginUser(userData)} />;
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

function MainApp() {
  const { isAuthenticated, loginUser, currentPage } = useNavigation();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-center p-[32px]">
        <BanterLoader variant="primary" label="Initializing SwiftNet..." />
      </div>
    );
  }

  if (currentPage === 'public-storefront') {
    return <PublicStorefrontPage />;
  }

  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={(userData) => loginUser(userData)} />;
  }

  return (
    <AppShell>
      {isLoading ? (
        <div className="min-h-[460px] flex flex-col items-center justify-center p-[32px]">
          <BanterLoader variant="primary" label="Loading SwiftNet Dashboard..." />
        </div>
      ) : (
        <PageContent />
      )}
    </AppShell>
  );
}

export default function Dashboard() {
  return (
    <NavigationProvider>
      <MainApp />
    </NavigationProvider>
  );
}
