'use client';
import { useState, useEffect } from 'react';
import AdminLoginPage from './AdminLoginPage';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminManageUsers from './AdminManageUsers';
import AdminPayments from './AdminPayments';
import AdminPricingPlans from './AdminPricingPlans';
import AdminSupportTickets from './AdminSupportTickets';
import AdminSystemSettings from './AdminSystemSettings';
import AdminCronModal from './AdminCronModal';

export default function AdminMasterPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mastergate_admin_auth_v1') === 'true';
    }
    return false;
  });
  const [adminUsername, setAdminUsername] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mastergate_admin_username_v1') || 'admin';
    }
    return 'admin';
  });
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [cronModalOpen, setCronModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoginSuccess = (user: string) => {
    setAdminUsername(user);
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mastergate_admin_auth_v1', 'true');
      localStorage.setItem('mastergate_admin_username_v1', user);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mastergate_admin_auth_v1');
      localStorage.removeItem('mastergate_admin_username_v1');
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#080d26] flex items-center justify-center text-white p-6 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-300">Loading MasterGate Admin...</span>
        </div>
      </div>
    );
  }

  // Render Login Page if Unauthenticated
  if (!isAuthenticated) {
    return <AdminLoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Render Admin Workspace
  return (
    <div className="min-h-screen bg-[#f4f6fa] font-sans text-slate-800 flex flex-col">
      {/* Admin Top Header Bar */}
      <AdminHeader
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
        adminUsername={adminUsername}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex relative">
        {/* Admin Navigation Sidebar Drawer */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false);
          }}
        />

        {/* Main Workspace Body Content */}
        <main className="flex-1 lg:ml-[260px] p-4 sm:p-6 md:p-8 max-w-[1400px] w-full mx-auto transition-all">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              onOpenCronModal={() => setCronModalOpen(true)}
              setActiveTab={setActiveTab}
            />
          )}

          {(activeTab === 'users' || activeTab.includes('user') || activeTab.includes('unverified') || activeTab.includes('banned')) && (
            <AdminManageUsers />
          )}

          {(activeTab === 'payments' || activeTab.includes('payment')) && (
            <AdminPayments />
          )}

          {(activeTab === 'plans') && (
            <AdminPricingPlans />
          )}

          {(activeTab === 'tickets') && (
            <AdminSupportTickets />
          )}

          {(activeTab === 'settings' || activeTab === 'extra' || activeTab.includes('cron') || activeTab === 'report-request') && (
            <AdminSystemSettings />
          )}
        </main>
      </div>

      {/* Cron Setup Modal */}
      <AdminCronModal
        isOpen={cronModalOpen}
        onClose={() => setCronModalOpen(false)}
      />
    </div>
  );
}
