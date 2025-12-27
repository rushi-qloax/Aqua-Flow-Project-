
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Package, PackageOpen, 
  RefreshCcw, Filter, Download, MoreVertical
} from 'lucide-react';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Chatbot } from './components/Chatbot';
import { AlertPanel } from './components/AlertPanel';
import { MaharashtraMap } from './components/MaharashtraMap';
import { Role } from './types';
import { INITIAL_KPIS, ORDER_TRENDS, MOCK_INVENTORY } from './constants';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<Role>('Manufacturer');
  const [darkMode, setDarkMode] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [kpiData, setKpiData] = useState(INITIAL_KPIS[role]);

  useEffect(() => {
    // Smooth transition when role changes
    setKpiData(INITIAL_KPIS[role]);
  }, [role]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-${kpi.color}-50 dark:bg-${kpi.color}-900/20 text-${kpi.color}-600 dark:text-${kpi.color}-400 group-hover:scale-110 transition-transform`}>
                {kpi.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${kpi.trend >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {kpi.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(kpi.trend)}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Order Velocity</h3>
              <p className="text-xs text-slate-500 font-medium">Global orders processed vs revenue in last 7 days</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-colors">W</button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-lg shadow-blue-500/20">M</button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-colors">Y</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ORDER_TRENDS}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#f1f5f9"} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12}} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: darkMode ? '#0f172a' : '#fff',
                    color: darkMode ? '#fff' : '#000'
                  }} 
                />
                <Area type="monotone" dataKey="orders" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Funnel */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Status Funnel</h3>
          <p className="text-xs text-slate-500 font-medium mb-8">Active orders distribution</p>
          
          <div className="space-y-4">
            {[
              { label: 'Placed', count: 1240, color: '#3b82f6', width: '100%' },
              { label: 'Confirmed', count: 982, color: '#6366f1', width: '85%' },
              { label: 'Dispatched', count: 742, color: '#8b5cf6', width: '65%' },
              { label: 'Delivered', count: 512, color: '#10b981', width: '45%' },
            ].map((stage) => (
              <div key={stage.label} className="space-y-1 group">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-500 dark:text-slate-400">{stage.label}</span>
                  <span className="text-slate-800 dark:text-white">{stage.count}</span>
                </div>
                <div className="h-3 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 group-hover:brightness-110" 
                    style={{ width: stage.width, backgroundColor: stage.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button className="w-full flex items-center justify-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              View Full Logistics Map <TrendingUp size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Maharashtra Demand Map */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Maharashtra Regional Demand</h3>
              <p className="text-xs text-slate-500 font-medium">Real-time consumption heatmap</p>
            </div>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
              <RefreshCcw size={18} />
            </button>
          </div>
          <MaharashtraMap />
        </div>

        {/* Inventory Table */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Inventory Snapshot</h3>
              <p className="text-xs text-slate-500 font-medium">Tracking stock across SKU lines</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-lg hover:text-blue-600 transition-colors">
                <Filter size={18} />
              </button>
              <button className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-lg hover:text-blue-600 transition-colors">
                <Download size={18} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-xs font-black text-slate-400 uppercase tracking-widest">
                  <th className="pb-2 pl-4">Product SKU</th>
                  <th className="pb-2">Stock Level</th>
                  <th className="pb-2 text-center">Status</th>
                  <th className="pb-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_INVENTORY.map((item) => (
                  <tr key={item.id} className="group bg-slate-50/50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors rounded-2xl">
                    <td className="py-4 pl-4 rounded-l-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                          <Package className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.stock.toLocaleString()} L</span>
                        <div className="w-24 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.status === 'Low' ? 'bg-rose-500' : item.status === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min((item.stock/15000)*100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                        item.status === 'Low' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400' : 
                        item.status === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' : 
                        'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-right rounded-r-2xl">
                      <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all text-slate-400 hover:text-blue-500 shadow-sm">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      default: return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 mb-6">
            <PackageOpen size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">Module Under Development</h2>
          <p className="text-slate-500 mt-2 max-w-sm">We are working hard to bring the full {activeTab} functionality to your dashboard soon.</p>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      );
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className={`transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={() => setDarkMode(!darkMode)} 
          role={role} 
          setRole={setRole}
          onOpenAlerts={() => setIsAlertOpen(true)}
        />
        
        <main className="p-8 pb-24 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-10 overflow-hidden">
            <div className="animate-in slide-in-from-left duration-700">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">
                Good Morning, Sameer
              </h1>
              <p className="text-slate-500 font-medium">Here's what's happening with AquaFlow's supply chain today.</p>
            </div>
            
            <div className="hidden sm:flex items-center gap-3 animate-in slide-in-from-right duration-700">
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Last Updated</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white">2 mins ago</p>
              </div>
              <button className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-blue-600 hover:scale-105 transition-transform">
                <RefreshCcw size={18} />
              </button>
            </div>
          </div>

          {renderContent()}
        </main>
      </div>

      <Chatbot role={role} />
      <AlertPanel isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </div>
  );
};

export default App;
