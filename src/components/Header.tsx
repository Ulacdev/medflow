import { Search, Bell, User, LogOut } from 'lucide-react';
import type { User as UserType } from '../App';

interface HeaderProps {
  onLogout: () => void;
  user: UserType | null;
}

export default function Header({ onLogout, user }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-medical-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search patients, doctors, appointments..." 
            className="w-full bg-medical-bg border-none focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-full pl-11 pr-4 py-2 text-xs transition-all outline-hidden"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-4">
        <button 
          onClick={() => alert('No new notifications')}
          className="p-2 text-slate-500 hover:bg-medical-surface rounded-lg relative transition-all"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        
        <div className="h-6 w-[1px] bg-medical-border hidden md:block" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-medical-secondary">{user?.name || 'Guest User'}</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              {user?.role === 'admin' ? 'Administrator' : 
               user?.role === 'doctor' ? 'Medical Professional' : 
               user?.role === 'receptionist' ? 'Medical Receptionist' : 'User'}
            </p>
          </div>
          <button 
            onClick={() => alert('User profile options coming soon')}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-medical-primary hover:text-white transition-all overflow-hidden border border-medical-border"
          >
            {user?.name ? user.name.charAt(0) : <User size={18} />}
          </button>
        </div>

        <button 
          onClick={() => {
            if (confirm('Are you sure you want to log out?')) {
              onLogout();
            }
          }}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
