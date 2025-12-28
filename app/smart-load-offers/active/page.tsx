
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, User, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useAppStore } from '../../../store/appStore';

export const ActiveOffersPage: React.FC = () => {
  const { offers, acceptOffer, vehicles } = useAppStore();
  const activeOffers = offers.filter(o => o.status === 'Active');

  const getVehicleInfo = (id: string) => vehicles.find(v => v.id === id);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Live Load Opportunities</h1>
          <p className="text-slate-500 font-bold text-sm mt-2">Active incentives sent to customers on current delivery routes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {activeOffers.map((offer) => {
            const v = getVehicleInfo(offer.vehicleId);
            const remaining = v ? v.capacity - v.currentLoad : 0;
            const canAccept = remaining >= offer.quantityRequested;

            return (
              <motion.div 
                key={offer.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-xl transition-shadow group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      <User size={20} />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg text-[10px] font-black uppercase">
                      <Clock size={12} className="animate-pulse" /> {offer.expiryTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">{offer.partnerName}</h3>
                  <div className="mt-4 p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                      <span>Reward Incentive</span>
                      <span>Target Fill</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-3xl font-black text-emerald-500 italic">{offer.discount}% OFF</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">{offer.quantityRequested}L</span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                      <Truck size={14} className="text-primary-500" /> 
                      <span className="text-slate-900 dark:text-slate-200">{v?.plateNumber}</span>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-5 italic">
                      {v?.route}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => acceptOffer(offer.id)}
                    disabled={!canAccept}
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
                      canAccept 
                      ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-primary-500/20 border-b-4 border-primary-800' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {canAccept ? <><CheckCircle size={16} /> Link to Load</> : <><XCircle size={16} /> Capacity Check Failed</>}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {activeOffers.length === 0 && (
          <div className="col-span-full py-32 text-center bg-slate-50 dark:bg-slate-950 rounded-[4rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
            <Zap size={48} className="mx-auto text-slate-300 mb-6 opacity-30" />
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest italic">No pending opportunities</h3>
            <p className="text-slate-500 mt-2 font-bold max-w-sm mx-auto">Generate new route-fill offers using the generator tool in the sidebar.</p>
          </div>
        )}
      </div>
      
      <footer className="pt-20 border-t border-slate-100 dark:border-slate-900 text-center opacity-40">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">NIKS-AQUA | Powered by QLOAX Infotech</p>
      </footer>
    </div>
  );
};
