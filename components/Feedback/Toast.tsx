
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppStore();

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`pointer-events-auto px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border min-w-[300px] ${
              toast.type === 'success' ? 'bg-emerald-600 border-emerald-500 text-white' :
              toast.type === 'error' ? 'bg-rose-600 border-rose-500 text-white' :
              'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={20} /> :
             toast.type === 'error' ? <AlertCircle size={20} /> :
             <Info size={20} />}
            <p className="text-xs font-black uppercase tracking-widest flex-1 italic">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="opacity-60 hover:opacity-100 transition-opacity">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
