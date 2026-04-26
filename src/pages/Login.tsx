import { useState } from 'react';
import { motion } from 'motion/react';
import { Stethoscope, Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import type { User } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

export default function Login({ onLogin, onForgotPassword, onRegister }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@medflow.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Mock authentication logic
    if (email === 'admin@medflow.com' && password === 'admin') {
      onLogin({ email, role: 'admin', name: 'Dr. Sarah Smith' });
    } else if (email === 'doctor@medflow.com' && password === 'doctor') {
      onLogin({ email, role: 'doctor', name: 'Dr. John Doe' });
    } else if (email === 'reception@medflow.com' && password === 'reception') {
      onLogin({ email, role: 'receptionist', name: 'Alice Johnson' });
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-medical-bg relative overflow-hidden">
      {/* Subtle Geometric Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0d9488 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-[400px] relative z-10"
      >
        <div className="bg-white p-10 rounded-xl border border-medical-border card-shadow shadow-md">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-14 h-14 bg-medical-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg shadow-medical-primary/20">
              <Stethoscope size={28} />
            </div>
            <h1 className="text-2xl font-bold text-medical-secondary tracking-tight">MedFlow HMS</h1>
            <p className="text-slate-500 text-sm mt-1">Please enter your credentials to log in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-2 text-red-600"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p className="text-xs font-medium leading-relaxed">{error}</p>
              </motion.div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-medical-bg border border-medical-border rounded-lg pl-10 pr-4 py-3 text-sm outline-hidden font-medium focus:bg-white focus:ring-1 focus:ring-medical-primary/20 transition-all text-medical-secondary" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <button 
                  type="button" 
                  onClick={onForgotPassword}
                  className="text-[10px] font-bold text-medical-primary uppercase tracking-widest hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-medical-bg border border-medical-border rounded-lg pl-10 pr-10 py-3 text-sm outline-hidden font-medium focus:bg-white focus:ring-1 focus:ring-medical-primary/20 transition-all text-medical-secondary" 
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-medical-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-medical-primary text-white py-3.5 rounded-lg font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-medical-primary/90 shadow-sm transition-all mt-4"
            >
              Secure Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-[11px] text-slate-400 font-medium mb-3">Don't have an account?</p>
            <button 
              onClick={onRegister}
              className="w-full py-2 border border-medical-border text-medical-secondary rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              Create Account
            </button>
          </div>
          
          <div className="mt-10 pt-6 border-t border-medical-border text-center">
            <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold tracking-widest uppercase">
              Authenticated Access Only
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

