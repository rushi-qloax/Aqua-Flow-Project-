
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Minus, Search, X, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const InventoryPage: React.FC = () => {
  const { inventory, updateInventory, addInventoryItem } = useAppStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [skuSearch, setSkuSearch] = useState('');

  const filteredItems = inventory.filter(i => 
    i.name.toLowerCase().includes(skuSearch.toLowerCase()) || 
    i.sku.toLowerCase().includes(skuSearch.toLowerCase())
  );

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addInventoryItem({
      sku: formData.get('sku') as string,
      name: formData.get('name') as string,
      stock: Number(formData.get('stock')),
      reorderPoint: Number(formData.get('reorder')),
      location: formData.get('location') as string,
      price: Number(formData.get('price'))
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Stock Matrix</h1>
          <p className="text-slate-500 font-bold text-sm mt-3 flex items-center gap-2 uppercase tracking-widest">
            <Package size={16} className="text-primary-600" /> Tracking {inventory.length} global SKU nodes
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-8 py-5 bg-primary-600 text-white font-black text-xs uppercase tracking-widest rounded-[2.5rem] shadow-xl shadow-primary-500/20 active:scale-95 transition-all"
        >
          <Plus size={18} /> Register New SKU
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800">
          <div className="relative max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search SKU identity..."
              value={skuSearch}
              onChange={(e) => setSkuSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-bold outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th className="px-10 py-6">Intelligence Node</th>
                <th className="px-8 py-6">Saturation Level</th>
                <th className="px-8 py-6">Status Node</th>
                <th className="px-8 py-6">Node Location</th>
                <th className="px-10 py-6 text-right">Control Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.tr key={item.id} layout className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
                           <Package size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1">{item.name}</p>
                          <p className="text-[10px] font-bold text-primary-600 italic tracking-widest">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-xl font-black tabular-nums italic text-slate-900 dark:text-white">{item.stock.toLocaleString()}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Units</span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                        item.status === 'High' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        item.status === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-rose-50 text-rose-600 border-rose-100 animate-pulse'
                      }`}>
                        {item.status === 'Low' && <ShieldAlert size={10} />}
                        {item.status} SATURATION
                      </span>
                    </td>
                    <td className="px-8 py-8 text-[10px] font-black uppercase text-slate-500 italic tracking-wider">{item.location}</td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                         <button onClick={() => updateInventory(item.id, -100)} className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"><Minus size={16} /></button>
                         <button onClick={() => updateInventory(item.id, 100)} className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm active:scale-90"><Plus size={16} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* SKU Registration Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between mb-8 border-b border-slate-50 dark:border-slate-800 pb-6">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">SKU Matrix Registration</h3>
                <button onClick={() => setShowAddModal(false)}><X size={24} className="text-slate-400" /></button>
              </div>
              <form onSubmit={handleRegister} className="space-y-4">
                <input required name="name" placeholder="SKU Descriptor (e.g. 500ml Classic)" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-bold outline-none border border-slate-100 dark:border-slate-800 focus:border-primary-500" />
                <input required name="sku" placeholder="SKU HASH / CODE" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-bold outline-none border border-slate-100 dark:border-slate-800 focus:border-primary-500" />
                <div className="grid grid-cols-2 gap-4">
                  <input required name="stock" type="number" placeholder="Initial Saturation" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-bold outline-none border border-slate-100 dark:border-slate-800 focus:border-primary-500" />
                  <input required name="reorder" type="number" placeholder="Reorder Point" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-bold outline-none border border-slate-100 dark:border-slate-800 focus:border-primary-500" />
                </div>
                <input required name="location" placeholder="Inventory Node Hub" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-bold outline-none border border-slate-100 dark:border-slate-800 focus:border-primary-500" />
                <button className="w-full py-6 bg-primary-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest italic shadow-xl shadow-primary-500/20 mt-6 active:scale-95 transition-all">COMMIT SKU TO GLOBAL MATRIX</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="text-center py-10 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">NIKS-AQUA | Powered by QLOAX Infotech</p>
      </footer>
    </div>
  );
};
