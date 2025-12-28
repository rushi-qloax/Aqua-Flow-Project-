
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderContent = () => {
    if (!user) return <div className="p-20 text-center font-bold">Please log in.</div>;

    // Check permissions
    const restrictedPaths = ['/payments/ledger', '/partners/wholesalers', '/settings/company'];
    if (user.role !== 'ADMIN' && restrictedPaths.includes(activePath)) {
      return (
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <h2 className="text-2xl font-black text-rose-500 uppercase tracking-tighter">Access Denied</h2>
          <p className="text-slate-500 mt-2">Your role ({user.role}) does not have permission to view this module.</p>
        </div>
      );
    }

    switch (activePath) {
      case '/dashboard':
        return <DashboardPage />;
      default:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">
               {activePath.split('/').pop()?.toUpperCase()} HUB
             </h2>
             <div className="p-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 text-center font-black text-slate-400 uppercase tracking-[0.3em] italic animate-pulse">
               Connecting to Secure Node...
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary-500/30">
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

        <footer className="w-full py-6 text-center border-t border-slate-100 dark:border-slate-900 opacity-60">
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
