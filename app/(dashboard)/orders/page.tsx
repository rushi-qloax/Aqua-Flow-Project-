
import React, { useState } from 'react';
import { 
  Search, Filter, Download, 
  MoreHorizontal, ArrowUpDown, Calendar,
  MapPin, Package, Trash2, Check, X
} from 'lucide-react';
import { useAppStore } from '../../../store/appStore';
import { motion, AnimatePresence } from 'framer-motion';

export const OrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, addToast } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter ? o.status === activeFilter : true;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Approved': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Cancelled': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none italic uppercase">Order Registry</h1>
          <p className="text-slate-500 font-bold text-sm mt-3 flex items-center gap-2">
            <Package size={16} className="text-primary-600" /> Managing {orders.length} active nodes in supply-chain
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => addToast("Export sequence engaged...", "info")}
            className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
          >
            <Download size={18} /> Export Registry
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-wrap items-center gap-6">
          <div className="relative flex-1 min-w-[300px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search ID, Partner or Region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-bold outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            {['Pending', 'Approved', 'Delivered'].map(status => (
              <button 
                key={status}
                onClick={() => setActiveFilter(activeFilter === status ? null : status)}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                  activeFilter === status 
                  ? 'bg-primary-600 text-white border-primary-600 shadow-lg' 
                  : 'bg-slate-50 dark:bg-slate-950 text-slate-400 border-slate-100 dark:border-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6">Identity</th>
                <th className="px-6 py-6">Partner Details</th>
                <th className="px-6 py-6">Items / Units</th>
                <th className="px-6 py-6">Valuation</th>
                <th className="px-6 py-6">Status Node</th>
                <th className="px-8 py-6 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <motion.tr 
                    key={order.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all"
                  >
                    <td className="px-8 py-8">
                      <span className="text-xs font-black text-primary-600 bg-primary-50 dark:bg-primary-950/50 px-3 py-1.5 rounded-xl">#{order.id}</span>
                    </td>
                    <td className="px-6 py-8">
                      <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1">{order.partnerName}</p>
                      <p className="text-[9px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest"><MapPin size={10} /> {order.region}</p>
                    </td>
                    <td className="px-6 py-8">
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase italic">{order.items}</p>
                    </td>
                    <td className="px-6 py-8">
                      <p className="text-sm font-black text-slate-900 dark:text-white tabular-nums italic">₹{order.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-8">
                      <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full border tracking-widest ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        {order.status === 'Pending' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Approved')}
                            className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => deleteOrder(order.id)}
                          className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-20 text-center text-slate-400 italic font-bold">Registry synchronize complete. No entries found for this query.</div>
          )}
        </div>
      </div>
    </div>
  );
};
