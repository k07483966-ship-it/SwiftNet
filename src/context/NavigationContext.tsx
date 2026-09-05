'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageType = 'dashboard' | 'deposit' | 'buy-data' | 'orders' | 'checkers' | 'leaderboard' | 'store';

export interface NavigationParams {
  network?: 'mtn' | 'airteltigo' | 'telecel' | 'waec';
  tab?: string;
  orderId?: string;
}

export interface BreadcrumbItem {
  label: string;
  page?: PageType;
}

interface NavigationContextType {
  currentPage: PageType;
  params: NavigationParams;
  balance: number;
  isNavigating: boolean;
  targetPageTitle: string;
  navigateTo: (page: PageType, newParams?: NavigationParams) => void;
  depositFunds: (amount: number) => void;
  deductFunds: (amount: number) => boolean;
  breadcrumbs: BreadcrumbItem[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [params, setParams] = useState<NavigationParams>({});
  const [balance, setBalance] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [targetPageTitle, setTargetPageTitle] = useState<string>('');

  // Listen to external balance updates from modal if any
  useEffect(() => {
    const handleBalanceEvent = (e: CustomEvent<{ added?: number }>) => {
      if (e.detail?.added) {
        setBalance((prev) => prev + e.detail.added!);
      }
    };
    window.addEventListener('balance-updated', handleBalanceEvent as EventListener);
    return () => {
      window.removeEventListener('balance-updated', handleBalanceEvent as EventListener);
    };
  }, []);

  const navigateTo = (page: PageType, newParams: NavigationParams = {}) => {
    if (page === currentPage && JSON.stringify(newParams) === JSON.stringify(params)) {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const titleMap: Record<PageType, string> = {
      'dashboard': 'Loading Dashboard...',
      'deposit': 'Opening Paystack Deposit...',
      'buy-data': 'Loading Data Bundles...',
      'orders': 'Fetching Orders...',
      'checkers': 'Loading WAEC / BECE Checkers...',
      'leaderboard': 'Loading Leaderboard...',
      'store': 'Opening Agent Store...'
    };

    setTargetPageTitle(titleMap[page] || 'Navigating...');
    setIsNavigating(true);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    setTimeout(() => {
      setCurrentPage(page);
      setParams(newParams);
      setTimeout(() => {
        setIsNavigating(false);
      }, 80);
    }, 280);
  };

  const depositFunds = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  const deductFunds = (amount: number): boolean => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      return true;
    }
    return false;
  };

  // Derive compact, professional breadcrumbs
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    switch (currentPage) {
      case 'deposit':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Deposit Funds' }
        ];
      case 'buy-data': {
        const netName = params.network ? params.network.toUpperCase() : 'All Networks';
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Buy Data', page: 'buy-data' },
          { label: netName }
        ];
      }
      case 'orders':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Orders & History' }
        ];
      case 'checkers':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Results Checkers' }
        ];
      case 'leaderboard':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Leaderboard' }
        ];
      case 'store':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Agent Store' }
        ];
      case 'dashboard':
      default:
        return [
          { label: 'Home' },
          { label: 'Dashboard' }
        ];
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        params,
        balance,
        isNavigating,
        targetPageTitle,
        navigateTo,
        depositFunds,
        deductFunds,
        breadcrumbs: getBreadcrumbs(),
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
