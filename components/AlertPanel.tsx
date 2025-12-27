
import React from 'react';
import { X, AlertCircle, Info, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { MOCK_ALERTS } from '../constants';

interface AlertPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70] animate-in fade-in duration-300"
          onClick={onClose}
        ></div>
      )}
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 z-[80] shadow-2xl transition-transform duration-500 ease-in-out border-l border-slate-200 dark:border-slate-800 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Alerts Center</h2>
              <p className="text-xs text-slate-500 font-medium">Monitoring AquaFlow network live</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {MOCK_ALERTS.map((alert) => (
              <div 
                key={alert.id}
                className={`p-4 rounded-2xl border-l-4 transition-all hover:translate-x-1 ${
                  alert.type === 'error' ? 'bg-red-50 dark:bg-red-900/10 border-red-500' :
                  alert.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-500' :
                  'bg-blue-50 dark:bg-blue-900/10 border-blue-500'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`mt-0.5 ${
                    alert.type === 'error' ? 'text-red-600' :
                    alert.type === 'warning' ? 'text-amber-600' :
                    'text-blue-600'
                  }`}>
                    {alert.type === 'error' ? <AlertCircle size={18} /> :
                     alert.type === 'warning' ? <AlertTriangle size={18} /> :
                     <Info size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{alert.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{alert.message}</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <Clock size={12} className="text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{alert.timestamp}</span>
                      <span className={`ml-auto text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        alert.priority === 'High' ? 'bg-red-200 text-red-700' : 'bg-slate-200 text-slate-700'
                      }`}>{alert.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
            <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold transition-colors">
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
