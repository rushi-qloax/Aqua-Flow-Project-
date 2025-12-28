
import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Gift,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activePath: string;
  setActivePath: (v: string) => void;
}

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} />, roles: ["ADMIN", "STAFF", "DRIVER"] },
  { label: "Orders", path: "/orders/all", icon: <ShoppingCart size={20} />, roles: ["ADMIN", "STAFF"] },
  { label: "Inventory", path: "/inventory/manufacturer", icon: <Package size={20} />, roles: ["ADMIN", "STAFF"] },
  {
    label: "Smart Load",
    path: "/smart-load-offers",
    icon: <Gift size={20} />,
    roles: ["ADMIN", "STAFF", "DRIVER"],
    subItems: [
      { label: "Engine Overview", path: "/smart-load-offers" },
      { label: "Live Opportunities", path: "/smart-load-offers/active" },
      { label: "Offer Generator", path: "/smart-load-offers/generate" },
      { label: "Optimization Ledger", path: "/smart-load-offers/accepted" },
      { label: "Discount Rules", path: "/smart-load-offers/rules" },
      { label: "Yield Reports", path: "/smart-load-offers/reports" },
    ]
  },
  { label: "Settlements", path: "/payments/ledger", icon: <Wallet size={20} />, roles: ["ADMIN"] },
  { label: "Partner Hub", path: "/partners/wholesalers", icon: <Users size={20} />, roles: ["ADMIN"] },
  { label: "Fleet Sync", path: "/logistics/deliveries", icon: <Truck size={20} />, roles: ["ADMIN", "DRIVER"] },
  { label: "Intelligence", path: "/reports/sales", icon: <BarChart3 size={20} />, roles: ["ADMIN"] },
  { label: "System Config", path: "/settings/company", icon: <Settings size={20} />, roles: ["ADMIN"] },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, activePath, setActivePath }) => {
  const { user } = useAuthStore();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // Auto-expand group if activePath is a subItem
  useEffect(() => {
    const parent = menuItems.find(item => 
      item.subItems?.some(sub => sub.path === activePath)
    );
    if (parent && !expandedGroups.includes(parent.path)) {
      setExpandedGroups(prev => [...prev, parent.path]);
    }
  }, [activePath]);

  const filteredMenu = menuItems.filter(m => m.roles.includes(user?.role || ""));

  const toggleGroup = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedGroups(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const handleItemClick = (item: any) => {
    if (item.subItems && collapsed) {
      setCollapsed(false);
      setExpandedGroups([item.path]);
    }
    setActivePath(item.path);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 88 : 280 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-50 flex flex-col transition-all shadow-2xl"
    >
      <div className="h-24 flex items-center px-7 gap-4 flex-shrink-0 border-b border-slate-50 dark:border-slate-900/50">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-500/30 flex-shrink-0"
        >
          <Droplets size={26} />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col overflow-hidden"
            >
              <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white leading-none italic uppercase">NIKS-AQUA</span>
              <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest mt-1">Enterprise SCM</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {filteredMenu.map((item) => {
          const isGroup = !!item.subItems;
          const isExpanded = expandedGroups.includes(item.path);
          const isChildActive = item.subItems?.some(s => activePath === s.path);
          const isActive = activePath === item.path || isChildActive;

          return (
            <div key={item.path} className="space-y-1">
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all relative group ${
                  isActive && !isGroup
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : isActive && isGroup
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-primary-600'
                }`}
              >
                <div className={`${isActive && !isGroup ? 'text-white' : isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-600'} flex-shrink-0`}>
                  {item.icon}
                </div>
                {!collapsed && (
                  <>
                    <span className={`text-[11px] tracking-widest flex-1 text-left uppercase font-black whitespace-nowrap ${isActive ? 'italic' : ''}`}>
                      {item.label}
                    </span>
                    {isGroup && (
                      <div 
                        onClick={(e) => toggleGroup(item.path, e)}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    )}
                  </>
                )}
                {isActive && collapsed && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary-600 rounded-l-full" />
                )}
              </button>

              <AnimatePresence>
                {isGroup && isExpanded && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-9 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-4"
                  >
                    {item.subItems?.map(sub => (
                      <button
                        key={sub.path}
                        onClick={() => setActivePath(sub.path)}
                        className={`w-full text-left p-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          activePath === sub.path 
                            ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/10 italic' 
                            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-100 dark:border-slate-900">
        <AnimatePresence>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-6 p-4 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-slate-800/50"
            >
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Dev: QLOAX Infotech</p>
              <p className="text-[10px] font-black text-slate-900 dark:text-white flex items-center gap-2 italic">
                <Award size={14} className="text-amber-500" /> Platform Gold v2.1
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-primary-600 transition-all border border-slate-200 dark:border-slate-800"
        >
          {collapsed ? <ChevronRight size={22} /> : <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest"><ChevronLeft size={18} /> System Dock</div>}
        </button>
      </div>
    </motion.aside>
  );
};
