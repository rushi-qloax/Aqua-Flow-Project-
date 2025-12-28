
import React from 'react';
import { Truck, Zap, AlertCircle } from 'lucide-react';
import { Vehicle } from '../../types';
import { motion } from 'framer-motion';

interface Props {
  vehicle: Vehicle;
  onOptimize?: (id: string) => void;
}

export const VehicleCapacityCard: React.FC<Props> = ({ vehicle, onOptimize }) => {
  const percentage = Math.round((vehicle.currentLoad / vehicle.capacity) * 100);
  const remaining = vehicle.capacity - vehicle.currentLoad;
  const isCritical = remaining > 1000;

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
            <Truck size={28} />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">{vehicle.plateNumber}</h4>
            <p className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest">{vehicle.route}</p>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${
          vehicle.status === 'Loading' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-blue-50 text-blue-600 border-blue-200'
        }`}>
          {vehicle.status}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Load Saturation</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white italic tabular-nums">{percentage}%</p>
        </div>
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full ${isCritical ? 'bg-rose-500' : 'bg-primary-500'} relative`}
          >
             <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </motion.div>
        </div>
        <div className="flex justify-between text-[11px] font-bold">
           <span className="text-slate-500 uppercase">Utilized: {vehicle.currentLoad}L</span>
           <span className={`${isCritical ? 'text-rose-500' : 'text-emerald-500'} uppercase`}>Free Space: {remaining}L</span>
        </div>
      </div>

      {isCritical && onOptimize && (
        <button 
          onClick={() => onOptimize(vehicle.id)}
          className="w-full mt-6 py-4 bg-primary-600 hover:bg-primary-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 italic"
        >
          <Zap size={14} className="animate-pulse" /> Trigger Load Offers
        </button>
      )}

      {!isCritical && (
        <div className="mt-6 flex items-center justify-center gap-2 text-emerald-500 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
          <AlertCircle size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest italic">Optimization Maxed</span>
        </div>
      )}
    </div>
  );
};
