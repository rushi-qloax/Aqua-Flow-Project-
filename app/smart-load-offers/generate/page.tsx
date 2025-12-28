
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Zap, ArrowRight, Activity } from 'lucide-react';
import { useAppStore } from '../../../store/appStore';

export const GenerateOffersPage: React.FC = () => {
  const { vehicles, generateOffers } = useAppStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const selectedVehicle = vehicles.find(v => v.id === selectedId);
  const remaining = selectedVehicle ? selectedVehicle.capacity - selectedVehicle.currentLoad : 0;
  
  const handleGenerate = () => {
    if (!selectedId) return;
    setIsScanning(true);
    setTimeout(() => {
      generateOffers(selectedId);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Offer Generator</h1>
          <p className="text-slate-500 font-bold text-sm mt-2 uppercase tracking-widest">Select a vehicle to scan for nearby route opportunities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Fleet Status</label>
          <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
            {vehicles.map(v => {
              const free = v.capacity - v.currentLoad;
              const percent = Math.round((v.currentLoad / v.capacity) * 100);
              const isActive = selectedId === v.id;
              
              return (
                <button 
                  key={v.id}
                  onClick={() => setSelectedId(v.id)}
                  className={`p-6 rounded-[2.5rem] border-2 text-left transition-all relative overflow-hidden group ${
                    isActive 
                    ? 'border-primary-500 bg-primary-50/10 dark:bg-primary-900/10 shadow-lg' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-primary-200 bg-white dark:bg-slate-900 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isActive ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <Truck size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{v.plateNumber}</p>
                        <p className="text-[10px] font-bold text-slate-400">{v.route}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-black italic transition-colors ${free > 1000 ? 'text-rose-500' : 'text-emerald-500'}`}>{free}L FREE</p>
                      <div className="h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          className="h-full bg-primary-500" 
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          {selectedVehicle ? (
            <motion.div 
              key={selectedVehicle.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900 p-10 rounded-[4rem] text-white flex-1 flex flex-col justify-between shadow-2xl border border-slate-800"
            >
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Zap size={24} className={`text-primary-500 ${isScanning ? 'animate-spin' : 'animate-pulse'}`} />
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">Route Optimizer</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target Route</p>
                    <p className="text-lg font-black italic">{selectedVehicle.route}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Capacity Gap</p>
                      <p className="text-2xl font-black text-rose-500 italic">{remaining}L</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Health Status</p>
                      <p className={`text-lg font-black uppercase ${remaining > 1000 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {remaining > 1000 ? 'Inefficient' : 'Optimized'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-2 justify-center text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                   <Activity size={12} /> Live Scan Radius: 15km
                </div>
                <button 
                  onClick={handleGenerate}
                  disabled={remaining <= 500 || isScanning}
                  className={`w-full py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center justify-center gap-3 italic ${
                    isScanning 
                    ? 'bg-slate-700 text-slate-400' 
                    : remaining <= 500 
                    ? 'bg-emerald-600/20 text-emerald-500 border border-emerald-500/30 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-500 text-white shadow-primary-500/30'
                  }`}
                >
                  {isScanning ? 'Scanning Network...' : remaining <= 500 ? 'Truck Fully Optimized' : <><Zap size={20} /> Blast Route Offers <ArrowRight size={20} /></>}
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-50 dark:bg-slate-950 rounded-[4rem] border-4 border-dashed border-slate-200 dark:border-slate-800 text-slate-400">
               <Truck size={48} className="mb-4 opacity-20" />
               <p className="text-sm font-black uppercase tracking-widest italic">Select a vehicle from the fleet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
