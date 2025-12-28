
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  path: string;
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, onNavigate }) => {
  const segments = path.split('/').filter(Boolean);
  
  const getLabel = (segment: string) => {
    const labels: Record<string, string> = {
      'dashboard': 'Dashboard',
      'orders': 'Orders',
      'all': 'Registry',
      'inventory': 'Inventory Hub',
      'manufacturer': 'Plant Stock',
      'smart-load-offers': 'Smart Load',
      'active': 'Live Opportunities',
      'generate': 'Generator',
      'accepted': 'Ledger',
      'rules': 'Rule Engine',
      'reports': 'Analytics',
      'payments': 'Settlements',
      'ledger': 'Finance Ledger',
      'partners': 'Partners',
      'wholesalers': 'Wholesaler Hub',
      'logistics': 'Logistics',
      'deliveries': 'Fleet Sync',
      'sales': 'Sales Intelligence',
      'settings': 'System Settings',
      'company': 'Company Config'
    };
    return labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
      <button 
        onClick={() => onNavigate('/dashboard')}
        className="hover:text-primary-600 transition-colors flex items-center gap-1.5"
      >
        <Home size={12} />
        COMMAND
      </button>
      
      {segments.map((segment, index) => {
        const fullPath = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        
        return (
          <React.Fragment key={fullPath}>
            <ChevronRight size={10} className="text-slate-300" />
            <button
              disabled={isLast}
              onClick={() => onNavigate(fullPath)}
              className={`transition-colors ${isLast ? 'text-slate-900 dark:text-white cursor-default italic' : 'hover:text-primary-600'}`}
            >
              {getLabel(segment)}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
