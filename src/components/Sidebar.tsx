import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserRound, 
  CreditCard, 
  Settings, 
  LogOut,
  Menu,
  X,
  Stethoscope
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Page, User } from '../App';

interface SidebarProps {
  isOpen: boolean;
  activePage: Page;
  onPageChange: (page: Page) => void;
  onToggle: () => void;
  user: User | null;
}

export default function Sidebar({ isOpen, activePage, onPageChange, onToggle, user }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'doctor', 'receptionist'] },
    { id: 'patients', label: 'Patients', icon: Users, roles: ['admin', 'doctor', 'receptionist'] },
    { id: 'appointments', label: 'Appointments', icon: Calendar, roles: ['admin', 'doctor', 'receptionist'] },
    { id: 'doctors', label: 'Doctors', icon: UserRound, roles: ['admin', 'doctor'] },
    { id: 'billing', label: 'Billing', icon: CreditCard, roles: ['admin', 'receptionist'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'doctor', 'receptionist'] },
  ];

  const filteredItems = menuItems.filter(item => 
    !user || item.roles.includes(user.role)
  );

  return (
    <aside 
      className={cn(
        "bg-white border-r border-medical-border transition-all duration-300 z-50 h-full flex flex-col",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-medical-border h-16">
        {isOpen && (
          <div className="flex items-center gap-2 font-bold text-medical-primary text-xl tracking-tight">
            <Stethoscope className="w-8 h-8" />
            <span>MedFlow</span>
          </div>
        )}
        {!isOpen && <Stethoscope className="w-8 h-8 text-medical-primary mx-auto" />}
        <button 
          onClick={onToggle}
          className="p-2 hover:bg-medical-surface rounded-lg text-slate-500 md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-6 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id as Page)}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 border-r-4",
                isActive 
                  ? "bg-teal-50 text-medical-primary border-medical-primary font-semibold" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-medical-primary border-transparent"
              )}
            >
              <Icon size={20} className={cn(isActive ? "text-medical-primary" : "text-slate-400")} />
              {isOpen && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 mt-auto">
        <button 
          onClick={() => onPageChange('login')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200",
            !isOpen && "justify-center"
          )}
        >
          <LogOut size={20} />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
