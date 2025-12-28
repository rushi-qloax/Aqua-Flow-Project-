
import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, ShoppingCart, 
  Package, Activity, ArrowUpRight,
  Clock, CheckCircle2, PlusCircle,
  Truck, ShieldCheck, X, Wallet,
  Search, ExternalLink, Filter, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useAuthStore } from '../../../store/authStore';
import { useAppStore } from '../../../store/appStore';
import { ORDER_TRENDS, INITIAL_KPIS } from '../../../constants';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { orders, payments, inventory, addOrder, addToast } = useAppStore();
  
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [activeKPIDrilldown, setActiveKPIDrilldown] = useState<string | null>(null);

  // Role-specific KPI sets
  const kpiMap: Record<string, string> = {
    'ADMIN': 'ADMIN',
    'STAFF': 'STAFF',
    'DRIVER': 'STAFF' // Drivers see ops KPIs but we could customize further
  };
  const kpiKey = kpiMap[user?.role || 'STAFF'];
  const kpis = INITIAL_KPIS[kpiKey];

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addOrder({
      partnerId: 'P-' + Math.floor(Math.random() * 100),
      partnerName: formData.get('partner') as string,
      items: formData.get('items') as string,
      amount: Number(formData.get('amount')),
      status: 'Pending',
      region: 'Mumbai'
    });
    setShowOrderModal(false);
  };

  const getDrilldownData = () => {
    switch (activeKPIDrilldown) {
      case "Today's Orders": return orders.slice(0, 8);
      case "Pending Payments": return payments.filter(p => p.status === 'Pending');
      case "Stock Health": return inventory.filter(i => i.status !== 'High');
      default: return [];
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Node: {user?.role}-CLUSTER</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none italic uppercase">
            {user?.role === 'ADMIN' ? 'Owner Hub' : user?.role === 'DRIVER' ? 'Logistics Pilot' : 'Operations Terminal'}
          </h1>
          <p className="text-slate-500 font-bold text-sm mt-3 flex items-center gap-2">
            <Clock size={16} className="text-primary-600" /> System Uptime: 99.9% • {new Date().toLocaleDateString()}
          </p>
        </div>
        {(user?.role === 'ADMIN' || user?.role === 'STAFF') && (
          <button 
            onClick={() => setShowOrderModal(true)}
            className="flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-black text-xs uppercase tracking-widest rounded-[2rem] shadow-xl shadow-primary-500/30 transition-all active:scale-95"
          >
            <PlusCircle size={18} /> New Order Request
          </button>
        )}
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((card, i) => (
          <motion.div 
            key={card.key}
            onClick={() => setActiveKPIDrilldown(card.label)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:scale-[1.02] cursor-pointer transition-all"
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                card.color === 'blue' ? 'bg-blue-600' : card.color === 'red' ? 'bg-rose-600' : card.color === 'emerald' ? 'bg-emerald-600' : 'bg-indigo-600'
              }`}>
                {card.icon}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-black px-3 py-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                {card.trend > 0 ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-rose-500" />}
                {Math.abs(card.trend)}%
              </div>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className={`xl:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm ${user?.role === 'DRIVER' ? 'hidden' : ''}`}>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic">Sales Volatility Analysis</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time throughput Monitoring</p>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ORDER_TRENDS}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', backgroundColor: '#000', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={4} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alternative content for Driver */}
        {user?.role === 'DRIVER' && (
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center justify-between mb-12">
                <div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic">Personal Flight Schedule</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Assigned delivery corridor tasks</p>
                </div>
             </div>
             <div className="space-y-6">
                <div className="p-8 bg-primary-50 dark:bg-primary-900/10 rounded-[2.5rem] border border-primary-200 dark:border-primary-800">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1">Current Assignment</p>
                         <h4 className="text-xl font-black italic uppercase">Mumbai Central Node Hub</h4>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-black rounded-lg">LIVE</span>
                   </div>
                   <div className="flex gap-4">
                      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl flex-1 text-center border border-primary-100 dark:border-primary-900/50">
                         <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Est. Completion</p>
                         <p className="text-lg font-black italic">14:30 IST</p>
                      </div>
                      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl flex-1 text-center border border-primary-100 dark:border-primary-900/50">
                         <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Load Stat</p>
                         <p className="text-lg font-black italic">92% FULL</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        <div className="bg-black p-10 rounded-[4rem] border border-zinc-800 text-white flex flex-col justify-between overflow-hidden relative shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-lg font-black uppercase tracking-widest italic mb-10 flex items-center gap-3">
              <ShieldCheck className="text-primary-500" /> Node Integrity
            </h3>
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Platform Authorization</p>
                <p className="text-6xl font-black italic tracking-tighter">{user?.role} <span className="text-xl font-bold text-zinc-700 uppercase">LVL</span></p>
              </div>
              <div className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800">
                <p className="text-[10px] font-black text-primary-500 uppercase mb-2">Fleet Synchronization</p>
                <p className="text-xs font-bold leading-relaxed text-zinc-400">System nodes are optimized for {user?.name}. Operational parity maintained.</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => addToast("Report generation started...", "info")}
            className="mt-12 py-6 bg-white text-black hover:bg-zinc-200 transition-all rounded-[2.5rem] font-black text-xs uppercase tracking-widest italic"
          >
            Request Sync Token
          </button>
        </div>
      </div>

      {/* Activity Table - Limited for Drivers */}
      {(user?.role === 'ADMIN' || user?.role === 'STAFF') && (
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Transaction Pulse</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Live Order stream across Maharashtra clusters</p>
            </div>
            {user?.role === 'ADMIN' && (
              <button onClick={() => setShowLedger(true)} className="text-xs font-black text-primary-600 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2">
                EXPLORE LEDGER <ArrowUpRight size={18} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                    <ShoppingCart size={28} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tighter leading-none">{order.partnerName}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{order.id} • {order.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-slate-900 dark:text-white mb-2 italic tracking-tighter tabular-nums">₹{(order.amount / 1000).toFixed(1)}K</p>
                  <span className="text-[9px] font-black uppercase px-3 py-1 rounded-xl border bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Modals */}
      <AnimatePresence>
        {showOrderModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowOrderModal(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter">New Order Slot</h3>
                  <button onClick={() => setShowOrderModal(false)}><X size={24} className="text-slate-400" /></button>
               </div>
               <form onSubmit={handleCreateOrder} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Partner Node</label>
                    <input name="partner" required className="w-full bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl outline-none border border-slate-100 dark:border-slate-800 font-bold" placeholder="Select Wholesaler..." />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Config SKU / Qty</label>
                    <input name="items" required className="w-full bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl outline-none border border-slate-100 dark:border-slate-800 font-bold" placeholder="e.g. 1000 x 20L Jars" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Commit Amount (INR)</label>
                    <input name="amount" type="number" required className="w-full bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl outline-none border border-slate-100 dark:border-slate-800 font-bold" placeholder="50000" />
                  </div>
                  <button type="submit" className="w-full py-6 bg-primary-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest italic shadow-xl shadow-primary-500/20">
                    PUSH TO CHAIN LEDGER
                  </button>
               </form>
            </motion.div>
          </div>
        )}

        {showLedger && user?.role === 'ADMIN' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowLedger(false)} />
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }} className="relative w-full max-w-6xl h-[85vh] bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800">
               <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
                  <div>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter">Enterprise Ledger Matrix</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Complete immutable transaction stream</p>
                  </div>
                  <button onClick={() => setShowLedger(false)} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400"><X size={24} /></button>
               </div>
               <div className="flex-1 overflow-y-auto p-10 space-y-4 custom-scrollbar">
                  {orders.map((o, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
                       <div className="flex items-center gap-6">
                          <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl font-black italic">TX</div>
                          <div>
                            <p className="font-black uppercase tracking-tight italic">{o.partnerName}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Hash: {Math.random().toString(16).substr(2, 10)} • {o.date}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xl font-black text-emerald-500 tabular-nums">+₹{o.amount.toLocaleString()}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase">Settlement: {o.status}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          </div>
        )}

        {activeKPIDrilldown && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveKPIDrilldown(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl">
               <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Analysis: {activeKPIDrilldown}</h3>
                  <button onClick={() => setActiveKPIDrilldown(null)}><X size={24} className="text-slate-400" /></button>
               </div>
               <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                  {getDrilldownData().map((item: any, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex justify-between items-center group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                        <span className="font-bold text-sm">{'partnerName' in item ? item.partnerName : item.name}</span>
                      </div>
                      <span className="font-black text-xs tabular-nums text-slate-400">
                        {'amount' in item ? `₹${item.amount.toLocaleString()}` : `${item.stock} Units`}
                      </span>
                    </div>
                  ))}
                  {getDrilldownData().length === 0 && <div className="p-20 text-center text-slate-400 italic font-bold">Comprehensive data synchronized. No pending items.</div>}
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
