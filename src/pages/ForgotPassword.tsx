import { useState } from 'react';
import { motion } from 'motion/react';
import { Stethoscope, Mail, ArrowLeft, Send } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export default function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-medical-bg relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0d9488 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-[400px] relative z-10"
      >
        <div className="bg-white p-10 rounded-xl border border-medical-border card-shadow shadow-md">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-medical-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Login
          </button>

          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-14 h-14 bg-medical-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg shadow-medical-primary/20">
              <Stethoscope size={28} />
            </div>
            <h1 className="text-2xl font-bold text-medical-secondary tracking-tight">Reset Password</h1>
            <p className="text-slate-500 text-sm mt-1">Enter your email to receive a recovery link.</p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full bg-medical-bg border border-medical-border rounded-lg pl-10 pr-4 py-3 text-sm outline-hidden font-medium focus:bg-white focus:ring-1 focus:ring-medical-primary/20 transition-all text-medical-secondary" 
                    placeholder="name@hospital.com"
                    required 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-medical-primary text-white py-3.5 rounded-lg font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-medical-primary/90 shadow-sm transition-all mt-4 flex items-center justify-center gap-2"
              >
                <Send size={14} />
                Send Reset Link
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4"
            >
              <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-100 mb-6 font-medium text-sm leading-relaxed">
                If an account exists for {email}, you will receive a reset link shortly.
              </div>
              <button 
                onClick={onBack}
                className="text-[11px] font-bold text-medical-primary uppercase tracking-[0.1em] hover:underline"
              >
                Return to Sign In
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
