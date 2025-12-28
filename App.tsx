
import React, { useState, useEffect, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Package, ShoppingCart, 
  RefreshCcw, Activity, Waves, ShieldCheck,
  CreditCard, Truck, Search, MapPin, Navigation,
  Calendar, FileText, Download, CheckCircle, FileSpreadsheet,
  Users, ChevronRight, Star, ArrowUpRight, Zap, AlertTriangle,
  LayoutGrid, PlusSquare, History, UserCheck, HardDrive, Shield,
  Wallet, Layers, BarChart3, Receipt, Settings2, MoreHorizontal,
  Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Chatbot } from './components/Chatbot';
import { AlertPanel } from './components/AlertPanel';
import { MaharashtraMap } from './components/MaharashtraMap';
import { Role, KPIData } from './types';
import { 
  INITIAL_KPIS, 
  ORDER_TRENDS, 
  MOCK_INVENTORY,
  MOCK_ORDERS,
  MOCK_PAYMENTS,
  MOCK_PARTNERS,
  MOCK_LOGISTICS
} from './constants';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<Role>('Manufacturer');
  const [darkMode, setDarkMode] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [productionTick, setProductionTick] = useState(1204520);
  const [revenueTick, setRevenueTick] = useState(4500000);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProductionTick(prev => prev + Math.floor(Math.random() * 5));
      setRevenueTick(prev => prev + (Math.random() > 0.7 ? Math.random() * 500 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
      'Delivered': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'In Transit': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'Loading': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      'High': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'Low': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      'Paid': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'Overdue': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    };
    return (
      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border shadow-sm transition-all ${styles[status] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
        {status}
      </span>
    );
  };

  // --- MODULE VIEWS ---

  // Added OrdersView implementation to fix missing name error
  const OrdersView = () => (
    <div className="bg-white dark:bg-slate-950 rounded-[3rem] border border-zinc-200 dark:border-zinc-900 p-8 shadow-sm">
      <h3 className="text-xl font-black mb-8 uppercase tracking-tighter italic">Order Hub Registry</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-zinc-100 dark:border-zinc-800">
              <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Registry ID</th>
              <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Consignee</th>
              <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Quantity/SKU</th>
              <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Gross Val</th>
              <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Flow State</th>
              <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Hub Zone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-900">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="group hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                <td className="py-6 text-sm font-bold text-zinc-400">#{order.id}</td>
                <td className="py-6 font-black text-sm">{order.partner}</td>
                <td className="py-6 text-xs text-zinc-500">{order.items}</td>
                <td className="py-6 font-black text-sm text-zinc-900 dark:text-white">₹{order.amount.toLocaleString()}</td>
                <td className="py-6"><StatusBadge status={order.status} /></td>
                <td className="py-6 text-xs font-bold text-zinc-500 uppercase">{order.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Added InventoryView implementation to fix missing name error
  const InventoryView = () => (
    <div className="bg-white dark:bg-slate-950 rounded-[3rem] border border-zinc-200 dark:border-zinc-900 p-8 shadow-sm">
      <h3 className="text-xl font-black mb-8 uppercase tracking-tighter italic">Strategic Stock Matrix</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_INVENTORY.map((item) => (
          <div key={item.id} className="p-6 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-100 dark:border-zinc-800 group hover:border-blue-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:rotate-12 transition-transform">
                <Package size={20} />
              </div>
              <StatusBadge status={item.status} />
            </div>
            <h4 className="font-black text-sm uppercase mb-1">{item.name}</h4>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">SKU: {item.sku}</p>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500">
                <span>Current Volume</span>
                <span className={item.stock < item.reorderPoint ? 'text-rose-500' : 'text-emerald-500'}>
                  {item.stock.toLocaleString()} L
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${item.stock < item.reorderPoint ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min((item.stock / (item.reorderPoint * 2)) * 100, 100)}%` }}
                />
              </div>
              <div className="flex items-center gap-1.5 pt-2">
                <MapPin size={10} className="text-zinc-500" />
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const LogisticsView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-950 p-8 rounded-[3rem] border border-zinc-200 dark:border-zinc-900 shadow-sm">
          <h3 className="text-xl font-black mb-8 uppercase tracking-tighter italic">Live Fleet Sync</h3>
          <div className="space-y-6">
            {MOCK_LOGISTICS.map((v) => (
              <div key={v.id} className="p-6 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-100 dark:border-zinc-800 group transition-all hover:border-blue-500/30">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/20">
                      <Truck size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase">{v.driver}</h4>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{v.vehicle}</p>
                    </div>
                  </div>
                  <StatusBadge status={v.status} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase text-zinc-400">
                    <span>{v.route}</span>
                    <span className="text-blue-400">{v.progress}% Complete</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${v.progress}%` }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-950 p-8 rounded-[3rem] border border-zinc-200 dark:border-zinc-900 shadow-sm">
          <h3 className="text-xl font-black mb-8 uppercase tracking-tighter italic">Delivery Statistics</h3>
          <div className="h-[300px] flex items-end justify-between gap-4 px-4">
            {[65, 85, 45, 95, 55, 75].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-500/10 rounded-t-2xl relative group cursor-help">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-2xl transition-all group-hover:bg-blue-400"
                />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] p-2 rounded-lg font-black whitespace-nowrap">
                   Day {i+1}: {h} Orders
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>
        </div>
      </div>
    </div>
  );

  const PartnersView = () => (
    <div className="bg-white dark:bg-slate-950 rounded-[3rem] border border-zinc-200 dark:border-zinc-900 p-8 shadow-sm">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tighter italic">Partner Ecosystem</h3>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Verified Wholesalers & Retailers</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white font-black text-xs rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
          ONBOARD NEW PARTNER
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_PARTNERS.map((p) => (
          <motion.div 
            key={p.id}
            whileHover={{ y: -5 }}
            className="p-6 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-blue-500 shadow-xl mb-4">
               <UserCheck size={32} />
            </div>
            <h4 className="font-black text-sm text-zinc-900 dark:text-white uppercase mb-1">{p.name}</h4>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">{p.type} • {p.region}</p>
            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-4" />
            <div className="flex justify-between w-full mb-2 text-[10px] font-bold text-zinc-500 uppercase">
              <span>Reliability</span>
              <span className="text-emerald-500">{p.reliability}%</span>
            </div>
            <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p.reliability}%` }} />
            </div>
            <button className="w-full py-3 bg-white dark:bg-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              VIEW LEDGER
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const PaymentsView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-950 rounded-[3rem] border border-zinc-200 dark:border-zinc-900 p-8 shadow-sm">
          <h3 className="text-xl font-black mb-8 uppercase tracking-tighter italic">Pending Settlements</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-zinc-100 dark:border-zinc-800">
                  <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Invoice</th>
                  <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Partner</th>
                  <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Amount</th>
                  <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Due Date</th>
                  <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Status</th>
                  <th className="pb-5 text-[10px] font-black text-zinc-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-900">
                {MOCK_PAYMENTS.map((pmt) => (
                  <tr key={pmt.id} className="group">
                    <td className="py-6 text-sm font-bold text-zinc-400">#{pmt.id}</td>
                    <td className="py-6 font-black text-sm">{pmt.partner}</td>
                    <td className="py-6 font-black text-sm text-zinc-900 dark:text-white">₹{pmt.amount.toLocaleString()}</td>
                    <td className="py-6 text-xs font-bold text-zinc-500">{pmt.due}</td>
                    <td className="py-6"><StatusBadge status={pmt.status} /></td>
                    <td className="py-6">
                      <button className="p-2 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-900 to-black p-8 rounded-[3rem] border border-white/10 shadow-2xl text-white flex flex-col justify-between overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
          <div className="relative z-10">
            <Wallet className="mb-6 opacity-50" size={32} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Total Receivables</p>
            <h3 className="text-5xl font-black italic tracking-tighter mb-4">₹{(revenueTick / 10).toLocaleString()}</h3>
            <div className="space-y-4 pt-6">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] font-black uppercase text-zinc-500">Credited Today</span>
                <span className="text-sm font-black text-emerald-400">+₹12,400</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] font-black uppercase text-zinc-500">Unpaid Balances</span>
                <span className="text-sm font-black text-rose-400">₹8.2L</span>
              </div>
            </div>
          </div>
          <button className="mt-8 py-5 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all hover:bg-blue-400 hover:text-white shadow-2xl relative z-10">
             DOWNLOAD FINANCIAL AUDIT
          </button>
        </div>
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Conversion Rate', val: '4.2%', icon: <Zap/>, color: 'text-blue-500' },
           { label: 'Retention Score', val: '92', icon: <UserCheck/>, color: 'text-emerald-500' },
           { label: 'Demand Peak', val: '24k L', icon: <Activity/>, color: 'text-indigo-500' },
           { label: 'System Health', val: '99.9', icon: <Shield/>, color: 'text-cyan-500' }
         ].map((stat, i) => (
           <div key={i} className="bg-white dark:bg-slate-950 p-7 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-900 shadow-sm">
             <div className={`${stat.color} mb-4`}>{stat.icon}</div>
             <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">{stat.label}</p>
             <h4 className="text-3xl font-black">{stat.val}</h4>
           </div>
         ))}
      </div>
      <div className="bg-white dark:bg-slate-950 p-10 rounded-[4rem] border border-zinc-200 dark:border-zinc-900 shadow-sm">
         <h3 className="text-xl font-black mb-10 uppercase italic tracking-tighter">Chain-Wide Performance Forecast</h3>
         <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={ORDER_TRENDS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                  <YAxis hide />
                  <ChartTooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '24px', backgroundColor: '#000', color: '#fff', border: 'none'}} />
                  <Bar dataKey="revenue" radius={[10, 10, 10, 10]}>
                     {ORDER_TRENDS.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'} />
                     ))}
                  </Bar>
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );

  const dashboardContent = useMemo(() => {
    const kpis = INITIAL_KPIS['Manufacturer'] || [];
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {[
             { id: 'orders', label: 'New Order', icon: <PlusSquare size={18}/>, color: 'bg-emerald-500' },
             { id: 'logistics', label: 'Fleet Sync', icon: <Navigation size={18}/>, color: 'bg-blue-500' },
             { id: 'payments', label: 'Check Ledger', icon: <History size={18}/>, color: 'bg-amber-500' },
             { id: 'analytics', label: 'View Audit', icon: <HardDrive size={18}/>, color: 'bg-zinc-600' }
           ].map((action, i) => (
             <motion.button 
               key={i}
               onClick={() => setActiveTab(action.id)}
               whileHover={{ y: -4, scale: 1.02 }}
               className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all text-left"
             >
               <div className={`w-12 h-12 ${action.color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-${action.color}/20 flex-shrink-0`}>
                 {action.icon}
               </div>
               <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Owner Mode</p>
                  <p className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-tighter">{action.label}</p>
               </div>
             </motion.button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-950 p-7 rounded-[2.5rem] shadow-sm border border-zinc-200 dark:border-zinc-900 transition-all hover:shadow-xl hover:scale-[1.02] group"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="p-3.5 rounded-2xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  {kpi.icon}
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-black px-2 py-1 rounded-lg ${kpi.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'}`}>
                  {kpi.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(kpi.trend)}%
                </div>
              </div>
              <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">{kpi.label}</p>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight tabular-nums uppercase">
                {kpi.label.includes('Revenue') ? `₹${(revenueTick / 100000).toFixed(1)}L` : kpi.value}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white dark:bg-slate-950 p-10 rounded-[4rem] shadow-sm border border-zinc-200 dark:border-zinc-900 min-h-[500px] w-full min-w-0">
             <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white dark:neon-glow uppercase tracking-tighter italic">Maharashtra Consumption Node</h3>
                <MaharashtraMap />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-blue-900 to-black p-10 rounded-[4rem] shadow-2xl border border-blue-500/10 relative overflow-hidden flex flex-col justify-between group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-10">
                 <Droplets className="text-blue-400 animate-bounce" size={24} />
                 <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">Factory Pulse</h3>
              </div>
              <div className="space-y-10">
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-3">Today's Purified Output (L)</p>
                  <p className="text-6xl font-black text-blue-400 tabular-nums neon-glow tracking-tighter italic">{productionTick.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex items-center gap-4">
                    <ShieldCheck className="text-emerald-400" />
                    <div>
                      <p className="text-[10px] font-black text-zinc-500 uppercase">Quality Grade</p>
                      <p className="text-sm font-black text-white italic">AA+ CERTIFIED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-12 py-6 bg-blue-600 hover:bg-blue-400 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all shadow-2xl italic">
              GENERATE DAILY SUMMARY
            </button>
          </div>
        </div>
      </div>
    );
  }, [revenueTick, productionTick, darkMode, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return dashboardContent;
      case 'orders': return <OrdersView />;
      case 'inventory': return <InventoryView />;
      case 'logistics': return <LogisticsView />;
      case 'partners': return <PartnersView />;
      case 'payments': return <PaymentsView />;
      case 'analytics': return <AnalyticsView />;
      case 'reports': return <div className="p-20 text-center text-zinc-500 font-black uppercase tracking-widest italic">Ledger Generation Active...</div>;
      default: return dashboardContent;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-zinc-900'}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <motion.div 
        animate={{ marginLeft: collapsed ? 88 : 280 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen flex flex-col"
      >
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={() => setDarkMode(!darkMode)} 
          role={role} 
          setRole={setRole} 
          onOpenAlerts={() => setIsAlertOpen(true)} 
        />
        
        <main className="p-6 md:p-10 pb-32 max-w-[1800px] mx-auto w-full flex-1 min-w-0">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-14 gap-8"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_#3b82f6]"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Node Hub: NIKS-AQUA HQ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none mb-4 uppercase italic">
                {activeTab.toUpperCase()} <span className="text-blue-500 dark:neon-glow">HUB</span>
              </h1>
              <p className="text-zinc-500 dark:text-zinc-500 font-bold flex items-center gap-2 text-sm uppercase italic">
                <Calendar size={18} className="text-blue-500" /> ACTIVE OWNER TERMINAL • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${role}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full min-w-0"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>

      <Chatbot role={role} />
      <AlertPanel isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </div>
  );
};

export default App;
