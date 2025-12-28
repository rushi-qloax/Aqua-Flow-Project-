
import React from 'react';
import { 
  TrendingUp, TrendingDown, ShoppingCart, 
  Package, Wallet, Activity, ArrowUpRight,
  Clock, CheckCircle2, AlertCircle, PlusCircle,
  BarChart3, FileSpreadsheet, ShieldCheck, Truck
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useAuthStore } from '../../../store/authStore';
import { ORDER_TRENDS, MOCK_ORDERS, INITIAL_KPIS } from '../../../constants';
import { motion } from 'framer-motion';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const kpis = INITIAL_KPIS[user?.role === 'ADMIN' ? 'ADMIN' : 'STAFF'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200';
      case 'Approved': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200';
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200';
      case 'Overdue': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Node: HQ-MAHARASHTRA</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            {user?.role === 'ADMIN' ? 'Owner Command Center' : 'Operations Terminal'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-3 flex items-center gap-2 italic">
            <Clock size={16} className="text-primary-600" /> System live since {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-black text-xs uppercase tracking-widest rounded-[2rem] shadow-xl shadow-primary-500/30 transition-all active:scale-95 group">
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
            New Order Request
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((card, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm stat-card-glow group transition-all hover:scale-[1.03] cursor-pointer"
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-${card.color}-500/20 transition-transform group-hover:rotate-12 ${
                card.color === 'blue' ? 'bg-blue-600' : 
                card.color === 'red' ? 'bg-rose-600' : 
                card.color === 'emerald' ? 'bg-emerald-600' : 
                card.color === 'amber' ? 'bg-amber-600' : 'bg-indigo-600'
              }`}>
                {card.icon}
              </div>
              {card.trend !== 0 && (
                <div className={`flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-xl border ${card.trend >= 0 ? 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20' : 'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20'}`}>
                  {card.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(card.trend)}%
                </div>
              )}
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{card.label}</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Analytics & Summary Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic">NIKS Sales Pulse</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Weekly Volume Distribution</p>
            </div>
            <div className="flex items-center gap-3 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
               <button className="px-6 py-2.5 bg-white dark:bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white rounded-xl shadow-sm">REVENUE</button>
               <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-colors">ORDERS</button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ORDER_TRENDS}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dy={15} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', backgroundColor: '#020617', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-black p-10 rounded-[4rem] border border-slate-800 text-white flex flex-col justify-between overflow-hidden relative shadow-2xl group">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-600/10 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <CheckCircle2 className="text-primary-500 animate-bounce" size={24} />
              <h3 className="text-lg font-black uppercase tracking-tighter italic">Factory Health</h3>
            </div>
            <div className="space-y-12">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 italic">Purified Water Cycle (L)</p>
                <p className="text-6xl font-black italic tracking-tighter text-white tabular-nums">1.2M <span className="text-2xl font-bold text-slate-600">Liters</span></p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-5 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                   <div className="w-14 h-14 bg-primary-600/20 text-primary-400 flex items-center justify-center rounded-2xl border border-primary-500/20 shadow-lg">
                      <Truck size={28} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Fleet Logistics</p>
                      <p className="text-sm font-black text-white uppercase italic tracking-tight">8 vehicles active</p>
                   </div>
                </div>
                <div className="flex items-center gap-5 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                   <div className="w-14 h-14 bg-emerald-600/20 text-emerald-400 flex items-center justify-center rounded-2xl border border-emerald-500/20 shadow-lg">
                      <ShieldCheck size={28} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Compliance Score</p>
                      <p className="text-sm font-black text-white uppercase italic tracking-tight">Grade AA+ Verified</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-12 py-6 bg-primary-600 hover:bg-primary-500 transition-all rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary-500/20 italic">
            GENERATE DAILY REPORT
          </button>
        </div>
      </div>

      {/* Operations Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic">Recent Chain Movements</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Live Order Ledger • B2B Cluster</p>
          </div>
          <button className="text-xs font-black text-primary-600 hover:text-primary-500 transition-colors uppercase tracking-[0.2em] flex items-center gap-3">
            EXPLORE LEDGER <ArrowUpRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_ORDERS.map((order) => (
            <motion.div 
              key={order.id} 
              whileHover={{ x: 10 }}
              className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center border border-slate-200 dark:border-slate-800 group-hover:bg-primary-600 group-hover:text-white group-hover:rotate-6 transition-all shadow-sm">
                  <ShoppingCart size={28} />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tighter">{order.partner}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{order.id}</p>
                    <div className="w-1 h-1 bg-slate-300 dark:bg-slate-800 rounded-full"></div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{order.region}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-slate-900 dark:text-white mb-2 tabular-nums tracking-tighter italic">₹{(order.amount / 1000).toFixed(1)}K</p>
                <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-xl border-2 tracking-widest ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="text-center py-10 border-t border-slate-100 dark:border-slate-900 opacity-60">
        <div className="flex flex-col items-center gap-4">
           <div className="w-10 h-1 w-12 bg-primary-600 rounded-full mb-2"></div>
           <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">
             NIKS-AQUA | <span className="text-slate-900 dark:text-white">Powered by QLOAX Infotech</span>
           </p>
           <p className="text-[9px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest italic">Professional Enterprise Edition v1.4.0</p>
        </div>
      </footer>
    </div>
  );
};
