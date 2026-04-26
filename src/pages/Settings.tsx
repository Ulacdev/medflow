import { useState } from 'react';
import { 
  User, 
  Bell, 
  ShieldCheck, 
  Moon, 
  Globe, 
  Monitor, 
  Save, 
  Camera,
  Mail,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { cn } from '../lib/utils';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-medical-secondary tracking-tight">System Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Configure your account preferences and notifications.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 space-y-1">
          <SettingsTab id="profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={User} label="Profile Details" />
          <SettingsTab id="notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={Bell} label="Alerts & Notifications" />
          <SettingsTab id="security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={ShieldCheck} label="Security Privacy" />
        </div>

        <div className="flex-1 bg-white rounded-xl border border-medical-border p-8 card-shadow shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl bg-medical-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-medical-primary/20">
                      SS
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-medical-secondary">Dr. Sarah Smith</h2>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Chief Surgeon • Administrator</p>
                    </div>
                    <button className="ml-auto text-[10px] font-bold text-medical-primary uppercase tracking-widest px-3 py-1.5 border border-medical-border rounded-lg hover:bg-slate-50 transition-all">
                      Change Avatar
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="First Name" defaultValue="Sarah" />
                    <InputField label="Last Name" defaultValue="Smith" />
                    <InputField label="Email ID" defaultValue="s.smith@medflow.com" />
                    <InputField label="Contact No" defaultValue="+1 234 567 890" />
                  </div>

                  <div className="pt-6 border-t border-medical-border">
                    <button 
                      onClick={(e) => {
                        const btn = e.currentTarget;
                        const originalContent = btn.innerHTML;
                        btn.innerHTML = '<span class="animate-spin mr-2">◌</span> Saving...';
                        btn.disabled = true;
                        
                        setTimeout(() => {
                          btn.innerHTML = '<span class="mr-2">✓</span> Saved Successfully';
                          btn.classList.replace('bg-medical-primary', 'bg-green-600');
                          
                          setTimeout(() => {
                            btn.innerHTML = originalContent;
                            btn.classList.replace('bg-green-600', 'bg-medical-primary');
                            btn.disabled = false;
                          }, 2000);
                        }, 1000);
                      }}
                      className="bg-medical-primary text-white px-6 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-sm hover:bg-medical-primary/90 transition-all flex items-center gap-2"
                    >
                      <Save size={14} />
                      Save Personal Information
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-medical-secondary uppercase tracking-widest mb-4">Notification Preferences</h3>
                  <ToggleCard 
                    title="Email Notifications" 
                    description="Receive daily summary of appointments and patient updates."
                    enabled={emailNotif}
                    onClick={() => setEmailNotif(!emailNotif)}
                  />
                  <ToggleCard 
                    title="Real-time Alerts" 
                    description="Get notified about emergency patient admissions immediately."
                    enabled={true}
                    onClick={() => {}}
                  />
                  <ToggleCard 
                    title="System Updates" 
                    description="Stay informed about new features and software maintenance."
                    enabled={false}
                    onClick={() => {}}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, defaultValue }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type="text" 
        defaultValue={defaultValue} 
        className="w-full bg-medical-bg border border-medical-border rounded-lg px-4 py-2.5 text-sm outline-hidden font-medium focus:bg-white focus:ring-1 focus:ring-medical-primary/20 transition-all" 
      />
    </div>
  );
}

function SettingsTab({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-semibold border-r-4", 
        active 
          ? "bg-teal-50 text-medical-primary border-medical-primary" 
          : "text-slate-500 hover:bg-slate-50 hover:text-medical-primary border-transparent"
      )}
    >
      <Icon size={18} className={active ? "text-medical-primary" : "text-slate-400"} />
      {label}
    </button>
  );
}

function Toggle({ enabled, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "w-10 h-5 rounded-full transition-all relative outline-hidden", 
        enabled ? "bg-medical-primary" : "bg-slate-200"
      )}
    >
      <div 
        className={cn(
          "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm", 
          enabled ? "left-5.5" : "left-0.5"
        )} 
      />
    </button>
  );
}

function ToggleCard({ title, description, enabled, onClick }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-medical-bg rounded-lg border border-medical-border">
      <div>
        <h4 className="font-bold text-medical-secondary text-sm tracking-tight">{title}</h4>
        <p className="text-[11px] text-slate-400 font-medium">{description}</p>
      </div>
      <Toggle enabled={enabled} onClick={onClick} />
    </div>
  );
}
