
import React from 'react';
import { Settings, Shield, Bell, Cloud, Globe, Smartphone, Lock } from 'lucide-react';

export const ConfigPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none">System Config</h1>
          <p className="text-slate-500 font-bold text-sm mt-3 flex items-center gap-2">
            <Settings size={16} className="text-primary-600" /> Platform enterprise settings and security nodes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="space-y-12">
                 <section>
                    <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">Identity & Security</h4>
                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-400"><Lock size={20} /></div>
                             <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Multi-Factor Authentication</p>
                                <p className="text-[10px] font-bold text-slate-400">Secure owner terminal with biometrics</p>
                             </div>
                          </div>
                          <div className="w-12 h-6 bg-primary-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                       </div>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-400"><Shield size={20} /></div>
                             <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">IP Node Lockdown</p>
                                <p className="text-[10px] font-bold text-slate-400">Restrict access to verified HQ IPs</p>
                             </div>
                          </div>
                          <div className="w-12 h-6 bg-slate-200 dark:bg-slate-800 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                       </div>
                    </div>
                 </section>

                 <section>
                    <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">Global Network</h4>
                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-400"><Globe size={20} /></div>
                             <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">CDN Edge Syncing</p>
                                <p className="text-[10px] font-bold text-slate-400">Optimize dashboard latency globally</p>
                             </div>
                          </div>
                          <div className="w-12 h-6 bg-primary-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                       </div>
                    </div>
                 </section>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-primary-600 p-10 rounded-[3rem] text-white shadow-xl shadow-primary-500/20 italic">
              <h4 className="text-lg font-black uppercase tracking-tighter mb-4">Enterprise Edition</h4>
              <p className="text-xs font-bold opacity-80 leading-relaxed mb-8">You are currently running the Platinum Tier of the NIKS-SCM Engine. All modules are synchronized.</p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-[10px] font-black uppercase"><Shield size={14} /> Encrypted Core</div>
                 <div className="flex items-center gap-3 text-[10px] font-black uppercase"><Cloud size={14} /> Cloud Backup Active</div>
                 <div className="flex items-center gap-3 text-[10px] font-black uppercase"><Smartphone size={14} /> Mobile App Linked</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
