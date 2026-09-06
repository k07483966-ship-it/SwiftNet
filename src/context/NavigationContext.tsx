'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export type PageType = 
  | 'dashboard' 
  | 'deposit' 
  | 'buy-data' 
  | 'orders' 
  | 'transactions' 
  | 'checkers' 
  | 'leaderboard' 
  | 'store'
  | 'create-store'
  | 'store-packages'
  | 'store-orders'
  | 'store-earnings'
  | 'support'
  | 'account'
  | 'reset-password'
  | 'public-storefront';

export interface StoreSettings {
  storeName: string;
  storeSlug: string;
  logoUrl: string;
  bannerUrl: string;
  supportPhone: string;
  whatsappNumber: string;
  verified: boolean;
  themeColor: 'blue' | 'indigo' | 'emerald' | 'amber';
  subtitle: string;
  enabledNetworks: {
    mtn: boolean;
    telecel: boolean;
    airteltigo: boolean;
    waec: boolean;
  };
}

export const defaultStoreSettings: StoreSettings = {
  storeName: 'Primedata',
  storeSlug: 'primedata',
  logoUrl: '/logo.png',
  bannerUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
  supportPhone: '0244123456',
  whatsappNumber: '233244123456',
  verified: true,
  themeColor: 'blue',
  subtitle: 'Get the best data deals. Fast, reliable, and available 24/7',
  enabledNetworks: {
    mtn: true,
    telecel: true,
    airteltigo: true,
    waec: true,
  },
};

export interface StorePackageItem {
  id: string;
  network: 'MTN' | 'Telecel' | 'AirtelTigo' | 'WAEC';
  name: string;
  size: string;
  sublabel: string;
  wholesalePrice: number;
  sellingPrice: number;
  enabled: boolean;
}

export const defaultStorePackages: StorePackageItem[] = [
  // MTN
  { id: 'sp-m-1', network: 'MTN', name: 'MTN 1GB Data', size: '1GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 4.50, sellingPrice: 6.00, enabled: true },
  { id: 'sp-m-2', network: 'MTN', name: 'MTN 2GB Data', size: '2GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 9.00, sellingPrice: 11.50, enabled: true },
  { id: 'sp-m-3', network: 'MTN', name: 'MTN 3GB Data', size: '3GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 13.00, sellingPrice: 16.00, enabled: true },
  { id: 'sp-m-4', network: 'MTN', name: 'MTN 4GB Data', size: '4GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 18.00, sellingPrice: 22.00, enabled: true },
  { id: 'sp-m-5', network: 'MTN', name: 'MTN 5GB Data', size: '5GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 22.00, sellingPrice: 26.50, enabled: true },
  { id: 'sp-m-6', network: 'MTN', name: 'MTN 6GB Data', size: '6GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 28.00, sellingPrice: 33.00, enabled: true },
  { id: 'sp-m-8', network: 'MTN', name: 'MTN 8GB Data', size: '8GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 35.00, sellingPrice: 41.00, enabled: true },
  { id: 'sp-m-10', network: 'MTN', name: 'MTN 10GB Data', size: '10GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 42.00, sellingPrice: 49.00, enabled: true },
  { id: 'sp-m-15', network: 'MTN', name: 'MTN 15GB Data', size: '15GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 62.00, sellingPrice: 72.00, enabled: true },
  { id: 'sp-m-20', network: 'MTN', name: 'MTN 20GB Data', size: '20GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 82.00, sellingPrice: 94.00, enabled: true },
  { id: 'sp-m-50', network: 'MTN', name: 'MTN 50GB Data', size: '50GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 205.00, sellingPrice: 230.00, enabled: true },
  { id: 'sp-m-100', network: 'MTN', name: 'MTN 100GB Data', size: '100GB', sublabel: 'Non-Expiry SME Data', wholesalePrice: 400.00, sellingPrice: 440.00, enabled: true },

  // Telecel
  { id: 'sp-t-1', network: 'Telecel', name: 'Telecel 1.5GB Data', size: '1.5GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 6.00, sellingPrice: 8.00, enabled: true },
  { id: 'sp-t-2', network: 'Telecel', name: 'Telecel 3GB Data', size: '3GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 12.00, sellingPrice: 15.00, enabled: true },
  { id: 'sp-t-3', network: 'Telecel', name: 'Telecel 5GB Data', size: '5GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 20.00, sellingPrice: 24.00, enabled: true },
  { id: 'sp-t-4', network: 'Telecel', name: 'Telecel 6GB Data', size: '6GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 24.00, sellingPrice: 29.00, enabled: true },
  { id: 'sp-t-5', network: 'Telecel', name: 'Telecel 10GB Data', size: '10GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 38.00, sellingPrice: 45.00, enabled: true },
  { id: 'sp-t-6', network: 'Telecel', name: 'Telecel 12GB Data', size: '12GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 46.00, sellingPrice: 54.00, enabled: true },
  { id: 'sp-t-7', network: 'Telecel', name: 'Telecel 20GB Data', size: '20GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 75.00, sellingPrice: 87.00, enabled: true },
  { id: 'sp-t-8', network: 'Telecel', name: 'Telecel 25GB Data', size: '25GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 95.00, sellingPrice: 108.00, enabled: true },
  { id: 'sp-t-9', network: 'Telecel', name: 'Telecel 50GB Data', size: '50GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 185.00, sellingPrice: 210.00, enabled: true },
  { id: 'sp-t-10', network: 'Telecel', name: 'Telecel 100GB Data', size: '100GB', sublabel: 'Instant Telecel Bundle', wholesalePrice: 360.00, sellingPrice: 400.00, enabled: true },

  // AirtelTigo
  { id: 'sp-a-1', network: 'AirtelTigo', name: 'AT 2GB Big Time', size: '2GB', sublabel: 'Non-Expiry Big Time', wholesalePrice: 8.00, sellingPrice: 10.50, enabled: true },
  { id: 'sp-a-2', network: 'AirtelTigo', name: 'AT 4.5GB Big Time', size: '4.5GB', sublabel: 'Non-Expiry Big Time', wholesalePrice: 16.00, sellingPrice: 19.50, enabled: true },
  { id: 'sp-a-3', network: 'AirtelTigo', name: 'AT 7GB Big Time', size: '7GB', sublabel: 'Non-Expiry Big Time', wholesalePrice: 25.00, sellingPrice: 29.50, enabled: true },
  { id: 'sp-a-4', network: 'AirtelTigo', name: 'AT 10GB Big Time', size: '10GB', sublabel: 'Non-Expiry Big Time', wholesalePrice: 35.00, sellingPrice: 41.00, enabled: true },
  { id: 'sp-a-5', network: 'AirtelTigo', name: 'AT 15GB Big Time', size: '15GB', sublabel: 'Non-Expiry Big Time', wholesalePrice: 52.00, sellingPrice: 60.00, enabled: true },
  { id: 'sp-a-6', network: 'AirtelTigo', name: 'AT 20GB Big Time', size: '20GB', sublabel: 'Non-Expiry Big Time', wholesalePrice: 68.00, sellingPrice: 78.00, enabled: true },
  { id: 'sp-a-7', network: 'AirtelTigo', name: 'AT 50GB Big Time', size: '50GB', sublabel: 'Non-Expiry Big Time', wholesalePrice: 165.00, sellingPrice: 188.00, enabled: true },
  { id: 'sp-a-8', network: 'AirtelTigo', name: 'AT 100GB Big Time', size: '100GB', sublabel: 'Non-Expiry Big Time', wholesalePrice: 320.00, sellingPrice: 355.00, enabled: true },

  // WAEC
  { id: 'sp-w-1', network: 'WAEC', name: '1 WAEC / BECE Checker', size: '1 Checker', sublabel: 'BECE / WASSCE PIN', wholesalePrice: 20.00, sellingPrice: 25.00, enabled: true },
  { id: 'sp-w-2', network: 'WAEC', name: '3 WAEC / BECE Checkers', size: '3 Checkers', sublabel: 'Pack of 3 PINs', wholesalePrice: 58.00, sellingPrice: 70.00, enabled: true },
  { id: 'sp-w-3', network: 'WAEC', name: '5 WAEC / BECE Checkers', size: '5 Checkers', sublabel: 'Pack of 5 PINs', wholesalePrice: 95.00, sellingPrice: 115.00, enabled: true },
  { id: 'sp-w-4', network: 'WAEC', name: '10 WAEC / BECE Checkers', size: '10 Checkers', sublabel: 'School Bulk PINs', wholesalePrice: 185.00, sellingPrice: 220.00, enabled: true },
];

export interface SiteOrder {
  id: string;
  network: 'MTN' | 'AirtelTigo' | 'Telecel' | 'WAEC';
  phone: string;
  bundle: string;
  price: number;
  date: string;
  timestamp: number;
  status: 'Completed' | 'Processing' | 'Failed';
  source: 'my' | 'agent';
  ref: string;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'purchase_data' | 'purchase_checker' | 'agent_commission' | 'payout_withdrawal';
  title: string;
  description: string;
  amount: number;
  direction: 'credit' | 'debit';
  date: string;
  timestamp: number;
  ref: string;
  status: 'Success' | 'Pending' | 'Failed';
  channel?: string;
}

export interface CheckerPin {
  id: string;
  type: 'WASSCE' | 'BECE' | 'NOV/DEC' | 'PLACEMENT';
  serialNumber: string;
  pin: string;
  purchaseDate: string;
  timestamp: number;
  isUsed: boolean;
  phone?: string;
  ref: string;
  price: number;
}

export interface StoreStaff {
  id: string;
  name: string;
  phone: string;
  role: 'Order Assistant' | 'Sales Clerk' | 'Store Manager';
  status: 'Active' | 'Suspended';
  dateAdded: string;
  salesCount: number;
}

export interface StorePayout {
  id: string;
  amount: number;
  method: 'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Bank Transfer';
  accountNumber: string;
  accountName: string;
  date: string;
  status: 'Completed' | 'Processing';
  ref: string;
}

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
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  currentUser: UserProfile;
  loginUser: (userData: UserProfile) => void;
  logoutUser: () => void;
  currentPage: PageType;
  params: NavigationParams;
  balance: number;
  orders: SiteOrder[];
  transactions: WalletTransaction[];
  checkers: CheckerPin[];
  storeEarnings: number;
  storeStaff: StoreStaff[];
  storePayouts: StorePayout[];
  storePackages: StorePackageItem[];
  storeSettings: StoreSettings;
  updateStoreSettings: (newSettings: Partial<StoreSettings>) => void;
  isNavigating: boolean;
  targetPageTitle: string;
  navigateTo: (page: PageType, newParams?: NavigationParams) => void;
  depositFunds: (amount: number, channel?: string) => void;
  deductFunds: (amount: number) => boolean;
  addOrder: (orderData: {
    network: 'MTN' | 'AirtelTigo' | 'Telecel' | 'WAEC';
    phone: string;
    bundle: string;
    price: number;
    status?: 'Completed' | 'Processing' | 'Failed';
    source?: 'my' | 'agent';
    ref?: string;
  }) => SiteOrder;
  addTransaction: (tx: Omit<WalletTransaction, 'id' | 'timestamp' | 'date'>) => WalletTransaction;
  addCheckerPin: (checker: {
    type: 'WASSCE' | 'BECE' | 'NOV/DEC' | 'PLACEMENT';
    phone: string;
    price: number;
  }) => CheckerPin;
  toggleCheckerUsed: (id: string) => void;
  addStaffMember: (staff: Omit<StoreStaff, 'id' | 'dateAdded' | 'salesCount'>) => void;
  removeStaffMember: (id: string) => void;
  toggleStaffStatus: (id: string) => void;
  withdrawStoreEarnings: (
    amount: number,
    method: 'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Bank Transfer',
    accountNumber: string,
    accountName: string
  ) => boolean;
  updateStorePackagePrice: (id: string, newPrice: number) => void;
  toggleStorePackage: (id: string) => void;
  bulkUpdateStoreMarkup: (markupAddition: number, network?: string) => void;
  resetStorePackages: () => void;
  clearAllHistory: () => void;
  breadcrumbs: BreadcrumbItem[];
}

const pathToPageMap: Record<string, PageType> = {
  '/': 'dashboard',
  '/deposit': 'deposit',
  '/buy-data': 'buy-data',
  '/orders': 'orders',
  '/transactions': 'transactions',
  '/checkers': 'checkers',
  '/leaderboard': 'leaderboard',
  '/store': 'store',
  '/store-earnings': 'store-earnings',
  '/create-store': 'create-store',
  '/store-packages': 'store-packages',
  '/store-orders': 'store-orders',
  '/support': 'support',
  '/account': 'account',
  '/reset-password': 'reset-password',
  '/forgot-password': 'reset-password',
  '/s': 'public-storefront',
};

const pageToPathMap: Record<PageType, string> = {
  'dashboard': '/',
  'deposit': '/deposit',
  'buy-data': '/buy-data',
  'orders': '/orders',
  'transactions': '/transactions',
  'checkers': '/checkers',
  'leaderboard': '/leaderboard',
  'store': '/store',
  'store-earnings': '/store-earnings',
  'create-store': '/create-store',
  'store-packages': '/store-packages',
  'store-orders': '/store-orders',
  'support': '/support',
  'account': '/account',
  'reset-password': '/reset-password',
  'public-storefront': '/s/primedata',
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_auth_active_v1');
        if (saved !== null) return saved === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_user_profile_v1');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return { name: 'KTech Data Express', email: 'ktech@swiftnet.gh', phone: '0244123456' };
  });

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const loginUser = useCallback((userData: UserProfile) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('swiftnet_auth_active_v1', 'true');
      localStorage.setItem('swiftnet_user_profile_v1', JSON.stringify(userData));
    }
  }, []);

  const logoutUser = useCallback(() => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setIsLoggingOut(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_auth_active_v1', 'false');
      }
    }, 850);
  }, []);

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_store_settings_v2');
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return defaultStoreSettings;
  });

  const updateStoreSettings = useCallback((newSettings: Partial<StoreSettings>) => {
    setStoreSettings(prev => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('swiftnet_store_settings_v2', JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
      return updated;
    });
  }, []);

  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
      if (cleanPath.startsWith('/s/') || cleanPath === '/s' || (cleanPath.startsWith('/store/') && !cleanPath.includes('/store-'))) {
        return 'public-storefront';
      }
      if (pathToPageMap[cleanPath]) {
        return pathToPageMap[cleanPath];
      }
    }
    return 'dashboard';
  });
  const [params, setParams] = useState<NavigationParams>({});
  
  // Wallet balance
  const [balance, setBalance] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_wallet_balance_v2');
        if (saved !== null) {
          const parsed = parseFloat(saved);
          if (!isNaN(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return 0;
  });

  // Cleared clean initial state for Orders
  const [orders, setOrders] = useState<SiteOrder[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_orders_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  // Cleared clean initial state for Transactions
  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_transactions_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  // Cleared clean initial state for Checkers
  const [checkers, setCheckers] = useState<CheckerPin[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_checkers_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  // Store Earnings Balance
  const [storeEarnings, setStoreEarnings] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_store_earnings_v2');
        if (saved !== null) {
          const parsed = parseFloat(saved);
          if (!isNaN(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return 485.50; // Starting store profit balance
  });

  // Store Staff members
  const [storeStaff, setStoreStaff] = useState<StoreStaff[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_store_staff_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [
      { id: 'st-1', name: 'Kwame Mensah', phone: '0244987654', role: 'Order Assistant', status: 'Active', dateAdded: 'Aug 14, 2026', salesCount: 42 },
      { id: 'st-2', name: 'Abena Osei', phone: '0551234567', role: 'Sales Clerk', status: 'Active', dateAdded: 'Aug 22, 2026', salesCount: 19 },
    ];
  });

  // Store Payouts
  const [storePayouts, setStorePayouts] = useState<StorePayout[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_store_payouts_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [
      { id: 'po-1', amount: 250.00, method: 'MTN Mobile Money', accountNumber: '0244123456', accountName: 'KTECH VENTURES', date: 'Sep 01, 2026', status: 'Completed', ref: 'PO-89210' }
    ];
  });

  // Store Packages & Selling Prices
  const [storePackages, setStorePackages] = useState<StorePackageItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swiftnet_store_packages_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return defaultStorePackages;
  });

  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [targetPageTitle, setTargetPageTitle] = useState<string>('');

  const addTransaction = useCallback((tx: Omit<WalletTransaction, 'id' | 'timestamp' | 'date'>): WalletTransaction => {
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: tx.type,
      title: tx.title,
      description: tx.description,
      amount: tx.amount,
      direction: tx.direction,
      date: 'Just now',
      timestamp: Date.now(),
      ref: tx.ref || `TX-${Math.floor(10000 + Math.random() * 90000)}`,
      status: tx.status || 'Success',
      channel: tx.channel || 'Wallet',
    };

    setTransactions((prev) => {
      const updated = [newTx, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_transactions_v2', JSON.stringify(updated));
      }
      return updated;
    });

    return newTx;
  }, []);

  const depositFunds = useCallback((amount: number, channel: string = 'Paystack MoMo') => {
    setBalance((prev) => {
      const next = prev + amount;
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_wallet_balance_v2', next.toString());
      }
      return next;
    });

    addTransaction({
      type: 'deposit',
      title: 'Wallet Deposit',
      description: `Instant top-up via ${channel}`,
      amount: amount,
      direction: 'credit',
      ref: `PAY-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Success',
      channel: channel,
    });
  }, [addTransaction]);

  const deductFunds = (amount: number): boolean => {
    if (balance >= amount) {
      setBalance((prev) => {
        const next = prev - amount;
        if (typeof window !== 'undefined') {
          localStorage.setItem('swiftnet_wallet_balance_v2', next.toString());
        }
        return next;
      });
      return true;
    }
    return false;
  };

  const addOrder = (orderData: {
    network: 'MTN' | 'AirtelTigo' | 'Telecel' | 'WAEC';
    phone: string;
    bundle: string;
    price: number;
    status?: 'Completed' | 'Processing' | 'Failed';
    source?: 'my' | 'agent';
    ref?: string;
  }): SiteOrder => {
    const newOrder: SiteOrder = {
      id: `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      network: orderData.network,
      phone: orderData.phone,
      bundle: orderData.bundle,
      price: orderData.price,
      date: 'Just now',
      timestamp: Date.now(),
      status: orderData.status || 'Completed',
      source: orderData.source || 'my',
      ref: orderData.ref || `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_orders_v2', JSON.stringify(updated));
      }
      return updated;
    });

    // Also log to transactions ledger
    addTransaction({
      type: orderData.network === 'WAEC' ? 'purchase_checker' : 'purchase_data',
      title: `${orderData.network} ${orderData.bundle}`,
      description: `Recipient: ${orderData.phone}`,
      amount: orderData.price,
      direction: 'debit',
      ref: newOrder.ref,
      status: 'Success',
      channel: 'Wallet Balance',
    });

    return newOrder;
  };

  const addCheckerPin = (data: {
    type: 'WASSCE' | 'BECE' | 'NOV/DEC' | 'PLACEMENT';
    phone: string;
    price: number;
  }): CheckerPin => {
    const randomSerial = `WGH${Date.now().toString().slice(-6)}${Math.floor(100 + Math.random() * 900)}`;
    const randomPin = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
    const ref = `CHK-${Math.floor(10000 + Math.random() * 90000)}`;

    const newChecker: CheckerPin = {
      id: `chk-${Date.now()}`,
      type: data.type,
      serialNumber: randomSerial,
      pin: randomPin,
      purchaseDate: 'Just now',
      timestamp: Date.now(),
      isUsed: false,
      phone: data.phone,
      ref: ref,
      price: data.price,
    };

    setCheckers((prev) => {
      const updated = [newChecker, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_checkers_v2', JSON.stringify(updated));
      }
      return updated;
    });

    return newChecker;
  };

  const toggleCheckerUsed = (id: string) => {
    setCheckers((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, isUsed: !c.isUsed } : c));
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_checkers_v2', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const addStaffMember = (staff: Omit<StoreStaff, 'id' | 'dateAdded' | 'salesCount'>) => {
    const newStaff: StoreStaff = {
      id: `st-${Date.now()}`,
      name: staff.name,
      phone: staff.phone,
      role: staff.role,
      status: staff.status,
      dateAdded: 'Today',
      salesCount: 0,
    };

    setStoreStaff((prev) => {
      const updated = [newStaff, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_store_staff_v2', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const removeStaffMember = (id: string) => {
    setStoreStaff((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_store_staff_v2', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const toggleStaffStatus = (id: string) => {
    setStoreStaff((prev) => {
      const updated: StoreStaff[] = prev.map((s) => (s.id === id ? { ...s, status: (s.status === 'Active' ? 'Suspended' : 'Active') as 'Active' | 'Suspended' } : s));
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_store_staff_v2', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const withdrawStoreEarnings = (
    amount: number,
    method: 'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Bank Transfer',
    accountNumber: string,
    accountName: string
  ): boolean => {
    if (amount <= 0 || amount > storeEarnings) return false;

    setStoreEarnings((prev) => {
      const next = prev - amount;
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_store_earnings_v2', next.toString());
      }
      return next;
    });

    const newPayout: StorePayout = {
      id: `po-${Date.now()}`,
      amount: amount,
      method: method,
      accountNumber: accountNumber,
      accountName: accountName,
      date: 'Just now',
      status: 'Completed',
      ref: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setStorePayouts((prev) => {
      const updated = [newPayout, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_store_payouts_v2', JSON.stringify(updated));
      }
      return updated;
    });

    addTransaction({
      type: 'payout_withdrawal',
      title: 'Store Profit Withdrawal',
      description: `${method} (${accountNumber}) - ${accountName}`,
      amount: amount,
      direction: 'debit',
      ref: newPayout.ref,
      status: 'Success',
      channel: method,
    });

    return true;
  };

  const updateStorePackagePrice = (id: string, newPrice: number) => {
    setStorePackages((prev) => {
      const updated = prev.map((pkg) => (pkg.id === id ? { ...pkg, sellingPrice: Math.max(0.01, newPrice) } : pkg));
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_store_packages_v3', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const toggleStorePackage = (id: string) => {
    setStorePackages((prev) => {
      const updated = prev.map((pkg) => (pkg.id === id ? { ...pkg, enabled: !pkg.enabled } : pkg));
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_store_packages_v3', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const bulkUpdateStoreMarkup = (markupAddition: number, network?: string) => {
    setStorePackages((prev) => {
      const updated = prev.map((pkg) => {
        if (!network || network === 'ALL' || pkg.network.toLowerCase() === network.toLowerCase()) {
          const newSelling = parseFloat((pkg.wholesalePrice + markupAddition).toFixed(2));
          return { ...pkg, sellingPrice: Math.max(pkg.wholesalePrice, newSelling) };
        }
        return pkg;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('swiftnet_store_packages_v3', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const resetStorePackages = () => {
    setStorePackages(defaultStorePackages);
    if (typeof window !== 'undefined') {
      localStorage.setItem('swiftnet_store_packages_v3', JSON.stringify(defaultStorePackages));
    }
  };

  const clearAllHistory = () => {
    setOrders([]);
    setTransactions([]);
    setCheckers([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('swiftnet_orders_v2');
      localStorage.removeItem('swiftnet_transactions_v2');
      localStorage.removeItem('swiftnet_checkers_v2');
    }
  };

  // Listen to external balance updates & browser URL popstate
  useEffect(() => {
    const handleBalanceEvent = (e: CustomEvent<{ added?: number; channel?: string }>) => {
      if (e.detail?.added) {
        depositFunds(e.detail.added, e.detail.channel || 'Paystack Instant MoMo');
      }
    };
    
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const cPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
        const matched = pathToPageMap[cPath] || 'dashboard';
        setCurrentPage(matched);
      }
    };

    window.addEventListener('balance-updated', handleBalanceEvent as EventListener);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('balance-updated', handleBalanceEvent as EventListener);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [depositFunds]);

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
      'transactions': 'Loading Wallet Movements & Ledger...',
      'checkers': 'Loading WAEC / BECE Checkers...',
      'leaderboard': 'Loading Leaderboard...',
      'store': 'Opening Store Manager...',
      'create-store': 'Opening Create Storefront Studio...',
      'store-packages': 'Loading Store Packages & Pricing Studio...',
      'store-orders': 'Loading Store Customer Orders...',
      'store-earnings': 'Opening Store Earnings & Payouts...',
      'support': 'Opening Live Support & Helpdesk...',
      'account': 'Loading Account Settings & Profile...',
      'reset-password': 'Opening Password Recovery...',
      'public-storefront': 'Opening Storefront...'
    };

    setTargetPageTitle(titleMap[page] || 'Navigating...');
    setIsNavigating(true);

    if (typeof window !== 'undefined') {
      const targetPath = page === 'public-storefront' ? `/s/${storeSettings.storeSlug || 'primedata'}` : (pageToPathMap[page] || '/');
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page, params: newParams }, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    setTimeout(() => {
      setCurrentPage(page);
      setParams(newParams);
      setTimeout(() => {
        setIsNavigating(false);
      }, 80);
    }, 240);
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
      case 'transactions':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Transactions' }
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
      case 'store-earnings':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Agent Store & Earnings' }
        ];
      case 'create-store':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Create Storefront Studio' }
        ];
      case 'store-packages':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Store Packages & Selling Prices' }
        ];
      case 'store-orders':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Store Customer Orders' }
        ];
      case 'support':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'Support & Help Desk' }
        ];
      case 'account':
        return [
          { label: 'Dashboard', page: 'dashboard' },
          { label: 'My Account & Security' }
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
        isAuthenticated,
        isLoggingOut,
        currentUser,
        loginUser,
        logoutUser,
        currentPage,
        params,
        balance,
        orders,
        transactions,
        checkers,
        storeEarnings,
        storeStaff,
        storePayouts,
        storePackages,
        storeSettings,
        updateStoreSettings,
        isNavigating,
        targetPageTitle,
        navigateTo,
        depositFunds,
        deductFunds,
        addOrder,
        addTransaction,
        addCheckerPin,
        toggleCheckerUsed,
        addStaffMember,
        removeStaffMember,
        toggleStaffStatus,
        withdrawStoreEarnings,
        updateStorePackagePrice,
        toggleStorePackage,
        bulkUpdateStoreMarkup,
        resetStorePackages,
        clearAllHistory,
        breadcrumbs: getBreadcrumbs(),
      }}
    >
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      {isLoggingOut && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center p-6 z-[9999] transition-all animate-fadeIn">
          <div className="relative mb-4">
            <div className="w-14 h-14 rounded-full border-4 border-blue-400/20 border-t-blue-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <Image src="/logo.png" alt="SwiftNet" width={26} height={26} className="object-contain animate-pulse" />
            </div>
          </div>
          <h3 className="text-[15px] font-extrabold text-white mb-1 tracking-tight">
            Logging Out...
          </h3>
          <p className="text-[12px] text-slate-300 font-medium">
            Safely closing SwiftNet session
          </p>
        </div>
      )}
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

