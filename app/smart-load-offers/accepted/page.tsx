
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Truck, ExternalLink } from 'lucide-react';
import { useSmartLoadStore } from '../../../store/smartLoadStore';

export const AcceptedOffersPage: React.FC = () => {
  const { offers } = useSmartLoadStore();
  const acceptedOffers = offers.filter(o => o.status === 'Accepted');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Optimization Ledger</h1>
        <p className="text-slate-500 font-bold text-sm mt-2">Summary of additional orders captured through route-fill incentives.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-950">
            <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th className="px-10 py-6">Partner Details</th>
              <th className="px-10 py-6">Linked Vehicle</th>
              <th className="px-10 py-6">Volume Filled</th>
              <th className="px-10 py-6">Added Revenue</th>
              <th className="px-10 py-6 text-right">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {acceptedOffers.map((offer) => (
              <tr key={offer.id} className="group hover:bg-slate-50 dark:hover:bg-slate-950 transition-all">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl flex items-center justify-center">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{offer.partnerName}</p>
                      <p className="text-[9px] font-bold text-slate-400">{offer.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                     <Truck size={14} className="text-primary-500" />
                     {offer.vehicleId} Corridor
                   </div>
                </td>
                <td className="px-10 py-8">
                   <span className="text-xl font-black text-slate-900 dark:text-white italic tabular-nums">{offer.quantityRequested}L</span>
                </td>
                <td className="px-10 py-8">
                   <span className="text-lg font-black text-emerald-500">₹{(offer.quantityRequested * 15).toLocaleString()}</span>
                </td>
                <td className="px-10 py-8 text-right">
                   <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-primary-600 transition-colors">
                      <ExternalLink size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {acceptedOffers.length === 0 && (
          <div className="py-20 text-center text-slate-400 italic font-bold">
            No conversions recorded yet.
          </div>
        )}
      </div>
      
      <footer className="pt-10 border-t border-slate-100 dark:border-slate-900 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">NIKS-AQUA | Powered by QLOAX Infotech</p>
      </footer>
    </div>
  );
};
