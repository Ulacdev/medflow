import { useState } from 'react';
import { motion } from 'motion/react';
import { Stethoscope, Mail, Lock, User, Users, ArrowLeft } from 'lucide-react';

interface RegisterProps {
  onBack: () => void;
  onRegister: () => void;
}

export default function Register({ onBack, onRegister }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Account request sent to administrator for approval.');
    onRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-medical-bg relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0d9488 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="bg-white p-10 rounded-xl border border-medical-border card-shadow shadow-md">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-medical-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Login
          </button>

          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 bg-medical-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg shadow-medical-primary/20">
              <Stethoscope size={28} />
            </div>
            <h1 className="text-2xl font-bold text-medical-secondary tracking-tight">Create Account</h1>
            <p className="text-slate-500 text-sm mt-1">Join the MedFlow medical network.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  className="w-full bg-medical-bg border border-medical-border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-hidden font-medium focus:bg-white focus:ring-1 focus:ring-medical-primary/20 transition-all text-medical-secondary" 
                  placeholder="Dr. John Smith"
                  required 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="email" 
                  className="w-full bg-medical-bg border border-medical-border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-hidden font-medium focus:bg-white focus:ring-1 focus:ring-medical-primary/20 transition-all text-medical-secondary" 
                  placeholder="john@hospital.com"
                  required 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Proposed Role</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select className="w-full bg-medical-bg border border-medical-border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-hidden font-medium focus:bg-white focus:ring-1 focus:ring-medical-primary/20 transition-all text-medical-secondary appearance-none">
                  <option value="doctor">Medical Professional</option>
                  <option value="receptionist">Reception Staff</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="password" 
                  className="w-full bg-medical-bg border border-medical-border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-hidden font-medium focus:bg-white focus:ring-1 focus:ring-medical-primary/20 transition-all text-medical-secondary" 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-medical-primary text-white py-3.5 rounded-lg font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-medical-primary/90 shadow-sm transition-all mt-4"
            >
              Request Access
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-4 leading-relaxed">
              New accounts require manual verification by the IT Administrator.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
