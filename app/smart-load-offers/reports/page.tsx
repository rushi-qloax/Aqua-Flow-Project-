
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Download, FileText, Package } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CHART_DATA = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 9000 },
  { name: 'Thu', value: 5000 },
  { name: 'Fri', value: 8000 },
  { name: 'Sat', value: 6000 },
  { name: 'Sun', value: 4500 },
];

export const OfferReportsPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none italic uppercase">Optimization Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-3 uppercase tracking-widest flex items-center gap-2">
            <BarChart3 size={16} className="text-primary-600" /> Quantifying Strategic Growth through Load Incentives
          </p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 transition-all">
          <Download size={18} /> Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Cumulative Offer Revenue', value: '₹2.8L', icon: <TrendingUp />, color: 'emerald' },
          { label: 'Avg. Capacity Saved', value: '18%', icon: <Package />, color: 'primary' },
          { label: 'Success Rate', value: '31.2%', icon: <PieChart />, color: 'indigo' },
        ].map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm group"
          >
             <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:rotate-6 ${kpi.color === 'emerald' ? 'bg-emerald-600' : kpi.color === 'primary' ? 'bg-primary-600' : 'bg-indigo-600'}`}>
                   {kpi.icon}
                </div>
                <div className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">+12%</div>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{kpi.label}</p>
             <h3 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter tabular-nums">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm">
           <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-10">Yield Distribution</h4>
           <div className="h-[350px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={CHART_DATA}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                 <YAxis hide />
                 <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', backgroundColor: '#000', color: '#fff' }} />
                 <Area type="monotone" dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} strokeWidth={4} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[4rem] text-white space-y-8">
           <div className="flex items-center gap-4 mb-4">
              <FileText size={24} className="text-primary-500" />
              <h4 className="text-xl font-black uppercase tracking-tighter italic">Strategic Takeaways</h4>
           </div>
           <div className="space-y-6">
              {[
                { label: 'High Demand Node', desc: 'Thane route converted 40% more offers than rural routes.' },
                { label: 'Volume Sweet Spot', desc: 'The 500L Tier (30% Disc) accounts for 65% of all conversions.' },
                { label: 'Logistics Impact', desc: 'Vehicle fuel efficiency improved by 8% due to full-load runs.' },
              ].map(note => (
                <div key={note.label} className="p-6 bg-white/5 rounded-3xl border border-white/10">
                   <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-2">{note.label}</p>
                   <p className="text-xs font-bold leading-relaxed opacity-80">{note.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
