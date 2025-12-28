
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Target, Zap, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ORDER_TRENDS } from '../../constants';

export const IntelligencePage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none">Intelligence Hub</h1>
          <p className="text-slate-500 font-bold text-sm mt-3 flex items-center gap-2">
            <BarChart3 size={16} className="text-primary-600" /> Deep-layer sales analytics and predictive nodes
          </p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all italic">
          <Download size={18} /> Export Analytics Node
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-black uppercase tracking-tighter italic mb-10">Historical Sales Matrix</h3>
          <div className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={ORDER_TRENDS}>
                 <defs>
                   <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                     <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                 <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', backgroundColor: '#000', color: '#fff' }} />
                 <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={4} fill="url(#colorInt)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 p-10 rounded-[4rem] text-white border border-slate-800 shadow-2xl group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform"><Target size={120} /></div>
              <h4 className="text-sm font-black uppercase tracking-widest italic text-primary-500 mb-8">Predictive Yield</h4>
              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Est. Revenue (W12)</span>
                    <span className="text-2xl font-black italic">₹12.4L</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Growth Factor</span>
                    <span className="text-2xl font-black text-emerald-500 italic">+14.2%</span>
                 </div>
                 <p className="text-[10px] font-bold text-slate-400 italic">Predictive model based on historic heat zones and partner reliability matrix.</p>
              </div>
           </div>
           
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex items-center gap-6">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-2xl flex items-center justify-center"><Zap size={28} /></div>
              <div>
                 <h4 className="text-sm font-black uppercase tracking-widest italic leading-none">AI Optimized</h4>
                 <p className="text-[10px] font-bold text-slate-400 mt-2">All data points verified by NIKS-AI Core.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
