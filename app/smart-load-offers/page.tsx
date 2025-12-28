
import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Zap, TrendingUp, Users, ArrowUpRight, BarChart3 } from 'lucide-react';
import { useSmartLoadStore } from '../../store/smartLoadStore';
import { VehicleCapacityCard } from '../../components/smart-load/VehicleCapacityCard';

export const SmartLoadOffersPage: React.FC = () => {
  const { vehicles, offers } = useSmartLoadStore();
  const activeOffersCount = offers.filter(o => o.status === 'Active').length;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-primary-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">AI-Driven Logistics Optimization</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none italic uppercase">
            Smart Load Engine
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-3 italic">
            Automating route-fill incentives for maximum vehicle utilization.
          </p>
        </div>
        <div className="flex gap-4">
           <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center rounded-xl">
                 <TrendingUp size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Extra Margin</p>
                 <p className="text-xl font-black text-slate-900 dark:text-white tabular-nums">₹42.5K</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {vehicles.map((v) => (
               <VehicleCapacityCard 
                 key={v.id} 
                 vehicle={v} 
                 onOptimize={(id) => console.log('Optimizing', id)} 
               />
             ))}
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-[3rem] text-white border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                 <BarChart3 size={100} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] italic text-primary-400 mb-6">Pulse Check</h4>
              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Live Offers</span>
                    <span className="text-xl font-black text-white italic">{activeOffersCount} Nodes</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Conversion</span>
                    <span className="text-xl font-black text-white italic">28.4%</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Wasted Space</span>
                    <span className="text-xl font-black text-rose-500 italic">4.2 KL</span>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-sm font-black uppercase tracking-tighter italic">Top Receptive Partners</h4>
                 <Users size={18} className="text-slate-400" />
              </div>
              <div className="space-y-4">
                 {['Ghatkopar Distributors', 'Nashik Wholesale', 'Pune Retail Hub'].map(name => (
                   <div key={name} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{name}</span>
                      <ArrowUpRight size={14} className="text-primary-500" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
