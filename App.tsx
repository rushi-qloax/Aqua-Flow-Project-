
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Breadcrumbs } from './components/layout/Breadcrumbs';
import { LoginPage } from './app/auth/login';
import { DashboardPage } from './app/(dashboard)/dashboard/page';
import { OrdersPage } from './app/(dashboard)/orders/page';
import { SmartLoadOffersPage } from './app/smart-load-offers/page';
import { ActiveOffersPage } from './app/smart-load-offers/active/page';
import { GenerateOffersPage } from './app/smart-load-offers/generate/page';
import { AcceptedOffersPage } from './app/smart-load-offers/accepted/page';
import { OfferRulesPage } from './app/smart-load-offers/rules/page';
import { OfferReportsPage } from './app/smart-load-offers/reports/page';
import { InventoryPage } from './app/inventory/page';
import { PartnerHubPage } from './app/partners/page';
import { SettlementLedgerPage } from './app/payments/page';
import { FleetSyncPage } from './app/logistics/page';
import { IntelligencePage } from './app/reports/page';
import { ConfigPage } from './app/settings/page';
import { AlertPanel } from './components/AlertPanel';
import { Chatbot } from './components/Chatbot';
import { ToastContainer } from './components/Feedback/Toast';
import { useAuthStore } from './store/authStore';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activePath, setActivePath] = useState('/dashboard');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // If not authenticated, force the login screen
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderContent = () => {
    // Definitive Permissions Matrix
    const permissions: Record<string, string[]> = {
      '/dashboard': ['ADMIN', 'STAFF', 'DRIVER'],
      '/orders/all': ['ADMIN', 'STAFF'],
      '/inventory/manufacturer': ['ADMIN', 'STAFF'],
      '/smart-load-offers': ['ADMIN', 'STAFF', 'DRIVER'],
      '/smart-load-offers/active': ['ADMIN', 'STAFF', 'DRIVER'],
      '/smart-load-offers/generate': ['ADMIN', 'STAFF'],
      '/smart-load-offers/accepted': ['ADMIN', 'STAFF'],
      '/smart-load-offers/rules': ['ADMIN'],
      '/smart-load-offers/reports': ['ADMIN'],
      '/payments/ledger': ['ADMIN'],
      '/partners/wholesalers': ['ADMIN'],
      '/logistics/deliveries': ['ADMIN', 'STAFF', 'DRIVER'],
      '/reports/sales': ['ADMIN'],
      '/settings/company': ['ADMIN'],
    };

    const allowedRoles = permissions[activePath] || ['ADMIN'];
    
    if (user && !allowedRoles.includes(user.role)) {
      return (
        <div className="flex flex-col items-center justify-center p-20 text-center min-h-[60vh]">
          <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-[2rem] flex items-center justify-center text-rose-500 mb-8 shadow-xl shadow-rose-500/10 border border-rose-500/20">
             <Lock size={48} />
          </div>
          <h2 className="text-3xl font-black text-rose-500 uppercase tracking-tighter italic">Security Clearance Required</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-black uppercase tracking-widest text-[10px] max-w-sm">
            Operational node "{activePath}" requires higher clearance than level {user.role}. Access request logged.
          </p>
          <button 
            onClick={() => setActivePath('/dashboard')}
            className="mt-10 px-8 py-4 bg-slate-900 dark:bg-white dark:text-black text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-transform active:scale-95"
          >
            Return to Dashboard
          </button>
        </div>
      );
    }

    switch (activePath) {
      case '/dashboard': return <DashboardPage />;
      case '/orders/all': return <OrdersPage />;
      case '/inventory/manufacturer': return <InventoryPage />;
      case '/partners/wholesalers': return <PartnerHubPage />;
      case '/payments/ledger': return <SettlementLedgerPage />;
      case '/logistics/deliveries': return <FleetSyncPage />;
      case '/reports/sales': return <IntelligencePage />;
      case '/settings/company': return <ConfigPage />;
      case '/smart-load-offers': return <SmartLoadOffersPage />;
      case '/smart-load-offers/active': return <ActiveOffersPage />;
      case '/smart-load-offers/generate': return <GenerateOffersPage />;
      case '/smart-load-offers/accepted': return <AcceptedOffersPage />;
      case '/smart-load-offers/rules': return <OfferRulesPage />;
      case '/smart-load-offers/reports': return <OfferReportsPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center p-32 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 text-center">
             <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl mx-auto mb-8 animate-pulse flex items-center justify-center text-slate-400">
                <ShieldCheck size={32} />
             </div>
             <p className="font-black text-slate-400 uppercase tracking-[0.4em] italic text-sm">Path Synchronizing...</p>
             <button onClick={() => setActivePath('/dashboard')} className="mt-8 text-xs font-black text-primary-500 uppercase tracking-widest italic hover:underline">Reset Navigation</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary-500/30 bg-slate-50 dark:bg-black transition-colors duration-500 overflow-x-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activePath={activePath} setActivePath={setActivePath} />
      <div className={`min-h-screen flex flex-col transition-all duration-500 ease-in-out ${collapsed ? 'ml-[88px]' : 'ml-[280px]'}`}>
        <Topbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} onOpenAlerts={() => setIsAlertOpen(true)} />
        <main className="p-6 md:p-10 max-w-[1600px] mx-auto w-full flex-1 min-w-0">
          <Breadcrumbs path={activePath} onNavigate={setActivePath} />
          {renderContent()}
        </main>
      </div>
      {user && <Chatbot role={user.role} />}
      <AlertPanel isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
      <ToastContainer />
    </div>
  );
};

export default App;
