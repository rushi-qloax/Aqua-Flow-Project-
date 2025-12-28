
import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Wallet, 
  Users, 
  Truck, 
  BarChart3, 
  Settings,
  Droplets,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activePath: string;
  setActivePath: (v: string) => void;
}

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} />, roles: ["ADMIN", "STAFF"] },
  { label: "Orders", path: "/orders/all", icon: <ShoppingCart size={20} />, roles: ["ADMIN", "STAFF"] },
  { label: "Inventory", path: "/inventory/manufacturer", icon: <Package size={20} />, roles: ["ADMIN", "STAFF"] },
  { label: "Payments", path: "/payments/ledger", icon: <Wallet size={20} />, roles: ["ADMIN"] },
  { label: "Partners", path: "/partners/wholesalers", icon: <Users size={20} />, roles: ["ADMIN"] },
  { label: "Deliveries", path: "/logistics/deliveries", icon: <Truck size={20} />, roles: ["ADMIN", "DRIVER"] },
  { label: "Reports", path: "/reports/sales", icon: <BarChart3 size={20} />, roles: ["ADMIN"] },
  { label: "Settings", path: "/settings/company", icon: <Settings size={20} />, roles: ["ADMIN"] },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, activePath, setActivePath }) => {
  const { user } = useAuthStore();
  const filteredMenu = menuItems.filter(m => m.roles.includes(user?.role || ""));

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-50 flex flex-col transition-all shadow-xl"
    >
      <div className="h-20 flex items-center px-7 gap-3 flex-shrink-0 border-b border-slate-50 dark:border-slate-900">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
          <Droplets size={24} />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white leading-none">NIKS-AQUA</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Smart SCM System</span>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {filteredMenu.map((item) => (
          <button
            key={item.path}
            onClick={() => setActivePath(item.path)}
            className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all group ${
              activePath === item.path
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
            }`}
          >
            <div className={activePath === item.path ? 'text-white' : 'text-slate-400 group-hover:text-primary-600'}>
              {item.icon}
            </div>
            {!collapsed && (
              <span className={`text-sm tracking-tight ${activePath === item.path ? 'font-bold' : 'font-semibold'}`}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100 dark:border-slate-900">
        {!collapsed && (
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Developer</p>
            <p className="text-[11px] font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award size={14} className="text-primary-500" /> QLOAX Infotech
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-primary-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={22} /> : <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest"><ChevronLeft size={18} /> Collapse</div>}
        </button>
      </div>
    </motion.aside>
  );
};
