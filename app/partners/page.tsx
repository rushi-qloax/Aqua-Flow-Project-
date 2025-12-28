
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, MoreHorizontal, Star, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const PartnerHubPage: React.FC = () => {
  const { partners } = useAppStore();
  const [search, setSearch] = useState('');

  const filtered = partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none">Partner Hub</h1>
          <p className="text-slate-500 font-bold text-sm mt-3 flex items-center gap-2">
            <Users size={16} className="text-primary-600" /> Managing {partners.length} validated nodes across Maharashtra
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800">
          <div className="relative max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter by node name or region..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-bold outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {filtered.map(p => (
            <motion.div 
              key={p.id}
              whileHover={{ y: -5 }}
              className="bg-slate-50 dark:bg-slate-950 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary-500 shadow-sm border border-slate-100 dark:border-slate-800">
                  <Users size={28} />
                </div>
                <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase italic">
                   <ShieldCheck size={12} /> {p.reliability}% Match
                </div>
              </div>
              
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1">{p.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 italic">{p.type} Node • {p.region}</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                   <Phone size={14} className="text-slate-400" /> {p.contact}
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                   <Mail size={14} className="text-slate-400" /> {p.email}
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                   <MapPin size={14} className="text-slate-400" /> {p.address}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
                 <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={12} className={s <= Math.floor(p.rating) ? 'text-amber-500 fill-amber-500' : 'text-slate-300'} />
                    ))}
                    <span className="text-[10px] font-black ml-1 text-slate-400">{p.rating}</span>
                 </div>
                 <button className="text-[10px] font-black text-primary-500 uppercase tracking-widest hover:underline italic">Audit Node</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
