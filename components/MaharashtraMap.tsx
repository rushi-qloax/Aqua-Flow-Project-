
import React, { useState } from 'react';
import { MAHARASHTRA_DISTRICTS } from '../constants';

export const MaharashtraMap: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  // Simplified visual representation using boxes for demo (D3 paths would be better but this is reliable)
  return (
    <div className="relative w-full h-[400px] bg-slate-50 dark:bg-slate-900/50 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-800">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-6 p-8 relative z-10 w-full max-w-2xl">
        {MAHARASHTRA_DISTRICTS.map((district) => (
          <div 
            key={district.name}
            onMouseEnter={() => setHovered(district.name)}
            onMouseLeave={() => setHovered(null)}
            className="group cursor-pointer"
          >
            <div 
              className="relative h-24 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center border-2 border-transparent shadow-sm hover:shadow-xl hover:scale-105"
              style={{ backgroundColor: `${district.color}20`, borderColor: district.color }}
            >
              <div 
                className="absolute bottom-0 left-0 h-1.5 bg-blue-500 rounded-b-xl transition-all duration-500"
                style={{ width: `${district.value}%`, backgroundColor: district.color }}
              ></div>
              <span className="font-bold text-slate-800 dark:text-white mb-1">{district.name}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{district.revenue} Rev</span>
            </div>

            {hovered === district.name && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 z-20 w-48 pointer-events-none animate-in fade-in zoom-in duration-200">
                <p className="font-bold text-slate-800 dark:text-white">{district.name} Region</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Orders:</span>
                    <span className="font-mono text-blue-600">{district.orders.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Growth:</span>
                    <span className="font-mono text-emerald-600">+14%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm">
        <span className="text-xs font-medium text-slate-500">Demand Heat:</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-100"></div>
          <div className="w-3 h-3 rounded-full bg-blue-300"></div>
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="w-3 h-3 rounded-full bg-blue-700"></div>
          <div className="w-3 h-3 rounded-full bg-blue-900"></div>
        </div>
      </div>
    </div>
  );
};
