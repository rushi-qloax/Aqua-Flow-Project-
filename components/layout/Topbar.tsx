
import React, { useState } from 'react';
import { Bell, Search, Moon, Sun, ChevronDown, LogOut, ShieldCheck, UserCog } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Role } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface TopbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAlerts: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ darkMode, toggleDarkMode, onOpenAlerts }) => {
  const { user, setUser } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const switchRole = (role: Role) => {
    const roles: Record<Role, string> = {
      ADMIN: "Sunil Deshmukh",
      STAFF: "Mehul K.",
      DRIVER: "Ramesh P."
    };
    setUser({
      id: role.toLowerCase() + '-1',
      name: roles[role],
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${roles[role]}`
    });
    setDropdownOpen(false);
  };

  return (
    <header className="h-20 glass sticky top-0 z-40 px-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 transition-all">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search orders, stock, or partners..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-transparent focus:border-primary-500/30 focus:bg-white dark:focus:bg-slate-900 outline-none text-sm font-medium transition-all placeholder-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button 
          onClick={toggleDarkMode}
          className="p-3 rounded-2xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
        >
          {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} />}
        </button>

        <button 
          onClick={onOpenAlerts}
          className="p-3 rounded-2xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative group"
        >
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-4 pl-3 pr-2 py-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{user?.name}</p>
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest">{user?.role}</span>
                <ShieldCheck size={10} className="text-primary-500" />
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl border-2 border-slate-100 dark:border-slate-800 p-0.5 group-hover:border-primary-500 transition-all overflow-hidden bg-white">
              <img src={user?.avatar} alt="User" className="w-full h-full rounded-lg object-cover" />
            </div>
            <ChevronDown size={16} className={`text-slate-400 group-hover:text-slate-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 py-4 z-50 overflow-hidden"
              >
                <div className="px-6 pb-3 mb-3 border-b border-slate-50 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Switch Workspace</p>
                </div>
                {(['ADMIN', 'STAFF', 'DRIVER'] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={`w-full text-left px-6 py-3 text-xs font-bold transition-colors flex items-center justify-between group ${
                      user?.role === r 
                      ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <UserCog size={16} />
                      {r} ACCESS
                    </div>
                    {user?.role === r && <div className="w-2 h-2 bg-primary-500 rounded-full"></div>}
                  </button>
                ))}
                <div className="h-px bg-slate-50 dark:bg-slate-800 my-2"></div>
                <button className="w-full text-left px-6 py-3 text-xs font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center gap-3">
                  <LogOut size={16} /> SIGN OUT
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
