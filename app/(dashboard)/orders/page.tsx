
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  ArrowUpDown,
  Calendar,
  MapPin,
  Package,
  ExternalLink
} from 'lucide-react';
import { MOCK_ORDERS } from '../../../constants';
import { motion } from 'framer-motion';

export const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Dispatched':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Approved':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Packed':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  const filteredOrders = MOCK_ORDERS.filter(order => 
    order.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none italic uppercase">Order Registry</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-3 flex items-center gap-2">
            <Package size={16} className="text-primary-600" /> Managing {MOCK_ORDERS.length} active order nodes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-primary-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-lg shadow-primary-500/20 hover:bg-primary-500 transition-all">
            <Filter size={16} /> Filter List
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID or Partner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold outline-none focus:border-primary-500/50 transition-all text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5">Order ID <ArrowUpDown size={12} className="inline ml-1" /></th>
                <th className="px-6 py-5">Partner Name</th>
                <th className="px-6 py-5">Items / Configuration</th>
                <th className="px-6 py-5">Value (INR)</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Timeline</th>
                <th className="px-6 py-5">Region</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.map((order, idx) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-xl border border-primary-100 dark:border-primary-800">
                      #{order.id}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-black text-[10px]">
                        {order.partner.charAt(0)}
                      </div>
                      <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{order.partner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{order.items}</span>
                      <span className="text-[9px] font-black uppercase text-slate-400 mt-1 tracking-widest italic">Standard Freight</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">
                      ₹{order.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border tracking-widest ${getStatusStyles(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Calendar size={14} />
                      <span className="text-[10px] font-bold uppercase">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <MapPin size={14} className="text-primary-500" />
                      <span className="text-[10px] font-black uppercase tracking-wider">{order.region}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-primary-600 transition-colors">
                        <ExternalLink size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing {filteredOrders.length} of {MOCK_ORDERS.length} entities
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-not-allowed">Prev</button>
            <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-sm">1</button>
            <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
