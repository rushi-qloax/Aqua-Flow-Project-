
import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { Role } from '../types';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  role: Role;
  setRole: (role: Role) => void;
  onOpenAlerts: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, role, setRole, onOpenAlerts }) => {
  const [roleDropdown, setRoleDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search orders, invoices, or retailers..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-sm dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all transform hover:rotate-12"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          onClick={onOpenAlerts}
          className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        <div className="relative">
          <button 
            onClick={() => setRoleDropdown(!roleDropdown)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">Sameer Kumar</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{role}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <img src="https://picsum.photos/id/64/40/40" alt="Avatar" className="w-full h-full rounded-[10px] object-cover border-2 border-white dark:border-slate-800" />
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${roleDropdown ? 'rotate-180' : ''}`} />
          </button>

          {roleDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 animate-in fade-in slide-in-from-top-2">
              <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Switch Perspective</p>
              {(['Manufacturer', 'Wholesaler', 'Retailer'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setRoleDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${role === r ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
