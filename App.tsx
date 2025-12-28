
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { DashboardPage } from './app/(dashboard)/dashboard/page';
import { AlertPanel } from './components/AlertPanel';
import { Chatbot } from './components/Chatbot';
import { useAuthStore } from './store/authStore';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activePath, setActivePath] = useState('/dashboard');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { user } = useAuthStore();

  // Professional font initialization and theme management
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#020617';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    }
  }, [darkMode]);

  const renderContent = () => {
    if (!user) return <div className="p-20 text-center font-black">Unauthorized Access</div>;

    switch (activePath) {
      case '/dashboard':
        return <DashboardPage />;
      case '/orders/all':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Order HUB</h2>
             <div className="p-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 text-center font-black text-slate-400 uppercase tracking-[0.3em] italic animate-pulse">
               Connecting to Central Order Registry...
             </div>
          </div>
        );
      case '/inventory/manufacturer':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Inventory Matrix</h2>
             <div className="p-20 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 text-center font-black text-slate-400 uppercase tracking-[0.3em] italic animate-pulse">
               Synchronizing Global Stock Nodes...
             </div>
          </div>
        );
      case '/payments/ledger':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Financial Ledger</h2>
             <div className="p-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 text-center font-black text-slate-400 uppercase tracking-[0.3em] italic animate-pulse">
               Fetching Real-time Settlement Data...
             </div>
          </div>
        );
      case '/logistics/deliveries':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Fleet Sync</h2>
             <div className="p-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 text-center font-black text-slate-400 uppercase tracking-[0.3em] italic animate-pulse">
               Locating Global Delivery Assets...
             </div>
          </div>
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-primary-500/30`}>
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
        
        <main className="p-10 max-w-[1400px] mx-auto w-full flex-1 min-w-0">
          {renderContent()}
        </main>
      </div>

      {user && <Chatbot role={user.role as any} />}
      <AlertPanel isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </div>
  );
};

export default App;
