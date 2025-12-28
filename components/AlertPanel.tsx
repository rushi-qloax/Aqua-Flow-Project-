
import React from 'react';
import { X, AlertCircle, Info, AlertTriangle, Clock, Check } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { motion, AnimatePresence } from 'framer-motion';

interface AlertPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-black z-[80] shadow-[0_0_100px_rgba(0,0,0,1)] transition-transform duration-500 ease-in-out border-l border-zinc-900 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter neon-glow flex items-center gap-3">
                Events Hub
                {unreadCount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">{unreadCount} New</span>
                )}
              </h2>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">AI-Powered Network Monitoring</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-zinc-900 rounded-xl transition-colors text-zinc-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            {notifications.map((alert) => (
              <div 
                key={alert.id}
                onClick={() => markNotificationRead(alert.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                  alert.read 
                  ? 'bg-zinc-950/50 border-zinc-900 opacity-60' 
                  : 'bg-zinc-900 border-zinc-700 shadow-lg'
                }`}
              >
                {!alert.read && <div className="absolute top-4 right-4 w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_8px_#0ea5e9]"></div>}
                <div className="flex gap-3">
                  <div className={`mt-0.5 ${
                    alert.type === 'error' ? 'text-rose-500' :
                    alert.type === 'warning' ? 'text-amber-500' :
                    'text-sky-500'
                  }`}>
                    {alert.type === 'error' ? <AlertCircle size={18} /> :
                     alert.type === 'warning' ? <AlertTriangle size={18} /> :
                     <Info size={18} />}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-white uppercase tracking-wider">{alert.title}</h4>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed font-bold">{alert.message}</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <Clock size={12} className="text-zinc-700" />
                      <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{alert.timestamp}</span>
                      <span className={`ml-auto text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                        alert.priority === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-zinc-800 text-zinc-400'
                      }`}>{alert.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center text-zinc-600 gap-3">
                 <Check size={32} className="opacity-20" />
                 <p className="text-xs font-black uppercase tracking-widest italic">All systems clear</p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-zinc-900 flex gap-3">
            <button 
              onClick={markAllNotificationsRead}
              className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Mark All Read
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
