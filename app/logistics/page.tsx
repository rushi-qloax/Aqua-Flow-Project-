
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Activity, ShieldCheck, Zap, MoreVertical } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const FleetSyncPage: React.FC = () => {
  const { vehicles } = useAppStore();

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none">Fleet Sync</h1>
          <p className="text-slate-500 font-bold text-sm mt-3 flex items-center gap-2">
            <Truck size={16} className="text-primary-600" /> Live operational monitoring of {vehicles.length} active delivery nodes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map(v => {
          const saturation = Math.round((v.currentLoad / v.capacity) * 100);
          return (
            <motion.div 
              key={v.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                    <Truck size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter italic">{v.plateNumber}</h3>
                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest">{v.status}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical size={20} /></button>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                   <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">
                      <span>Route Node</span>
                      <Activity size={12} className="text-primary-500 animate-pulse" />
                   </div>
                   <p className="text-sm font-black text-slate-900 dark:text-white uppercase flex items-center gap-2"><MapPin size={14} className="text-rose-500" /> {v.route}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saturation Matrix</p>
                    <p className="text-xl font-black italic tabular-nums">{saturation}%</p>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${saturation}%` }}
                      className={`h-full ${saturation > 85 ? 'bg-rose-500' : saturation > 60 ? 'bg-primary-500' : 'bg-amber-500'} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <span>{v.currentLoad}L utilized</span>
                    <span>Gap: {v.capacity - v.currentLoad}L</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest italic">
                    <ShieldCheck size={14} /> GPS Lock
                  </div>
                  <div className="p-3 bg-primary-500/10 text-primary-500 rounded-xl border border-primary-500/20 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest italic">
                    <Zap size={14} /> AI Ready
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
