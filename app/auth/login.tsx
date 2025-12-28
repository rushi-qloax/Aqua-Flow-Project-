
import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, ShieldCheck, UserCheck, Truck, Lock } from 'lucide-react';
import { useAuthStore, PERSONAS } from '../../store/authStore';
import { Role } from '../../types';

export const LoginPage: React.FC = () => {
  const { setUser } = useAuthStore();

  const handleLogin = (role: Role) => {
    setUser(PERSONAS[role]);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
      >
        {/* Branding Side */}
        <div className="p-12 flex flex-col justify-between bg-gradient-to-br from-primary-600 to-blue-900 text-white">
          <div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
              <Droplets size={32} />
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
              NIKS-AQUA <br />
              <span className="text-2xl text-primary-200">SCM ENGINE</span>
            </h1>
            <p className="mt-6 text-primary-100 font-medium leading-relaxed opacity-80">
              Enterprise-grade manufacturing intelligence for high-scale FMCG operations. Powered by QLOAX Platform v2.1.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-10 border-t border-white/10">
            <ShieldCheck className="text-primary-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-200">End-to-End Encrypted Node</span>
          </div>
        </div>

        {/* Action Side */}
        <div className="p-12 flex flex-col justify-center bg-slate-900">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">System Access Gate</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Select your operational persona</p>
          </div>

          <div className="space-y-4">
            <PersonaButton 
              role="ADMIN" 
              title="System Owner" 
              desc="Full registry access & financial ledger" 
              icon={<ShieldCheck size={20} />} 
              onClick={() => handleLogin('ADMIN')}
            />
            <PersonaButton 
              role="STAFF" 
              title="Operations Manager" 
              desc="Order hub & inventory matrix control" 
              icon={<UserCheck size={20} />} 
              onClick={() => handleLogin('STAFF')}
            />
            <PersonaButton 
              role="DRIVER" 
              title="Logistics Pilot" 
              desc="Fleet sync & smart load optimization" 
              icon={<Truck size={20} />} 
              onClick={() => handleLogin('DRIVER')}
            />
          </div>

          <p className="mt-10 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
            Unauthorized Access is Monitored
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const PersonaButton: React.FC<{ 
  role: Role, 
  title: string, 
  desc: string, 
  icon: React.ReactNode, 
  onClick: () => void 
}> = ({ role, title, desc, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-5 p-5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary-500/50 rounded-3xl transition-all group text-left"
  >
    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-black text-white uppercase tracking-tight">{title}</h4>
      <p className="text-[10px] text-slate-500 font-bold">{desc}</p>
    </div>
  </button>
);
