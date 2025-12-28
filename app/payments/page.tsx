
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Search, ArrowUpRight, CheckCircle2, AlertCircle, Clock, Download } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const SettlementLedgerPage: React.FC = () => {
  const { payments, addToast } = useAppStore();

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none">Settlement Ledger</h1>
          <p className="text-slate-500 font-bold text-sm mt-3 flex items-center gap-2">
            <Wallet size={16} className="text-primary-600" /> Financial integrity monitoring across B2B cluster
          </p>
        </div>
        <button 
          onClick={() => addToast("Report generation started...", "info")}
          className="flex items-center gap-2 px-6 py-4 bg-primary-600 text-white font-black text-xs uppercase tracking-widest rounded-3xl shadow-xl shadow-primary-500/30 transition-all"
        >
          <Download size={18} /> Download Ledger
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
          <div className="relative max-w-lg flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Trace transaction ID or partner..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-bold outline-none"
            />
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Outstanding</p>
              <p className="text-xl font-black text-rose-500 italic tabular-nums">₹4.2L</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th className="px-10 py-6">Transaction ID</th>
                <th className="px-6 py-6">Counterparty</th>
                <th className="px-6 py-6">Settlement Value</th>
                <th className="px-6 py-6">Status Node</th>
                <th className="px-6 py-6">Due Timeline</th>
                <th className="px-10 py-6 text-right">Audit Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                  <td className="px-10 py-8">
                    <span className="text-xs font-black text-primary-500">#{p.id}</span>
                  </td>
                  <td className="px-6 py-8">
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic">{p.partnerName}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Limit: ₹{(p.creditLimit/100000).toFixed(1)}L</p>
                  </td>
                  <td className="px-6 py-8">
                    <p className="text-lg font-black text-slate-900 dark:text-white tabular-nums">₹{p.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-8">
                    <span className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                      p.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      p.status === 'Overdue' ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {p.status === 'Paid' ? <CheckCircle2 size={12} /> : p.status === 'Overdue' ? <AlertCircle size={12} /> : <Clock size={12} />}
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-8 text-xs font-black text-slate-400 uppercase tracking-widest italic">{p.due}</td>
                  <td className="px-10 py-8 text-right">
                    <button 
                      onClick={() => addToast(`Settlement process for ${p.id} initiated`, "info")}
                      className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary-500 rounded-xl transition-all"
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
