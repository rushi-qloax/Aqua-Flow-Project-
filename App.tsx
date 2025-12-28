
import React, { useState, useEffect } from 'react';
// Added ShieldCheck import to fix "Cannot find name 'ShieldCheck'" error
import { ShieldCheck } from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { DashboardPage } from './app/(dashboard)/dashboard/page';
import { OrdersPage } from './app/(dashboard)/orders/page';
import { SmartLoadOffersPage } from './app/smart-load-offers/page';
import { ActiveOffersPage } from './app/smart-load-offers/active/page';
import { GenerateOffersPage } from './app/smart-load-offers/generate/page';
import { AcceptedOffersPage } from './app/smart-load-offers/accepted/page';
import { OfferRulesPage } from './app/smart-load-offers/rules/page';
import { OfferReportsPage } from './app/smart-load-offers/reports/page';
import { AlertPanel } from './components/AlertPanel';
import { Chatbot } from './components/Chatbot';
import { useAuthStore } from './store/authStore';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activePath, setActivePath] = useState('/dashboard');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderContent = () => {
    if (!user) return <div className="p-20 text-center font-bold text-slate-500">System Offline. Please re-authenticate.</div>;

    // Permissions check
    const restrictedPaths = ['/payments/ledger', '/partners/wholesalers', '/settings/company', '/smart-load-offers/rules'];
    if (user.role !== 'ADMIN' && restrictedPaths.includes(activePath)) {
      return (
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center text-rose-500 mb-6">
             <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-black text-rose-500 uppercase tracking-tighter">Access Node Denied</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Your authorization level ({user.role}) is insufficient for this command center.</p>
        </div>
      );
    }

    switch (activePath) {
      case '/dashboard':
        return <DashboardPage />;
      case '/orders/all':
        return <OrdersPage />;
      case '/smart-load-offers':
        return <SmartLoadOffersPage />;
      case '/smart-load-offers/active':
        return <ActiveOffersPage />;
      case '/smart-load-offers/generate':
        return <GenerateOffersPage />;
      case '/smart-load-offers/accepted':
        return <AcceptedOffersPage />;
      case '/smart-load-offers/rules':
        return <OfferRulesPage />;
      case '/smart-load-offers/reports':
        return <OfferReportsPage />;
      default:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">
               {activePath.split('/').pop()?.replace('-', ' ').toUpperCase()} HUB
             </h2>
             <div className="p-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 text-center font-black text-slate-400 uppercase tracking-[0.3em] italic animate-pulse">
               Connecting to Secure Node...
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary-500/30 bg-slate-50 dark:bg-black transition-colors duration-500">
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        activePath={activePath} 
        setActivePath={setActivePath} 
      />
      
      <div 
        className={`min-h-screen flex flex-col transition-all duration-500 ease-in-out ${collapsed ? 'ml-20' : 'ml-[280px]'}`}
      >
        <Topbar 
          darkMode={darkMode} 
          toggleDarkMode={() => setDarkMode(!darkMode)} 
          onOpenAlerts={() => setIsAlertOpen(true)} 
        />
        
        <main className="p-10 max-w-[1600px] mx-auto w-full flex-1 min-w-0">
          {renderContent()}
        </main>

        <footer className="w-full py-8 text-center border-t border-slate-100 dark:border-slate-900 opacity-60">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
            NIKS-AQUA | <span className="text-slate-900 dark:text-white">Powered by QLOAX Infotech</span>
          </p>
        </footer>
      </div>

      {user && <Chatbot role={user.role} />}
      <AlertPanel isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </div>
  );
};

export default App;
