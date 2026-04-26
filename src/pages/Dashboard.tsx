import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar 
} from 'recharts';

import { cn } from '../lib/utils';

const analyticsData = [
  { name: 'Mon', appointments: 45, revenue: 2400 },
  { name: 'Tue', appointments: 52, revenue: 3200 },
  { name: 'Wed', appointments: 48, revenue: 2800 },
  { name: 'Thu', appointments: 61, revenue: 4500 },
  { name: 'Fri', appointments: 55, revenue: 3800 },
  { name: 'Sat', appointments: 42, revenue: 2500 },
  { name: 'Sun', appointments: 30, revenue: 1800 },
];

const recentAppointments = [
  { id: 1, name: 'Alice Johnson', time: '09:00 AM', type: 'Checkup', status: 'In Progress', color: 'teal' },
  { id: 2, name: 'Bob Wilson', time: '10:30 AM', type: 'Surgeory', status: 'Upcoming', color: 'blue' },
  { id: 3, name: 'Clara Davis', time: '01:00 PM', type: 'Follow-up', status: 'Completed', color: 'green' },
  { id: 4, name: 'Daniel Lee', time: '02:15 PM', type: 'Dental', status: 'Cancelled', color: 'red' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-medical-secondary tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-0.5">Welcome back, Dr. Smith! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg border border-medical-border flex shadow-sm">
            <button 
              onClick={() => setActiveTab('daily')}
              className={cn(
                "px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all",
                activeTab === 'daily' ? "bg-medical-primary text-white shadow-xs" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              Daily
            </button>
            <button 
              onClick={() => setActiveTab('weekly')}
              className={cn(
                "px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all",
                activeTab === 'weekly' ? "bg-medical-primary text-white shadow-xs" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              Weekly
            </button>
          </div>
          <button className="bg-white text-slate-600 p-2 rounded-lg border border-medical-border shadow-sm hover:bg-slate-50 transition-all">
            <Calendar size={18} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value="2,543" 
          change="+12.5%" 
          trend="up" 
          icon={Users} 
          color="bg-medical-primary" 
        />
        <StatCard 
          title="Appointments" 
          value="48" 
          change="+3.2%" 
          trend="up" 
          icon={Calendar} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Doctors Available" 
          value="12" 
          change="-2" 
          trend="down" 
          icon={UserCheck} 
          color="bg-slate-700" 
        />
        <StatCard 
          title="Total Revenue" 
          value="$12,450" 
          change="+18.4%" 
          trend="up" 
          icon={DollarSign} 
          color="bg-emerald-600" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-medical-border card-shadow shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-medical-secondary">Hospital Analytics</h2>
              <p className="text-xs text-slate-400">Weekly patient intake & revenue tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-medical-primary" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Patients</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.05}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', padding: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0d9488" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Sidebar List */}
        <div className="bg-white p-6 rounded-xl border border-medical-border card-shadow shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-medical-secondary">Quick Schedule</h2>
            <button className="text-medical-primary hover:text-medical-secondary transition-colors p-1 rounded-lg hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentAppointments.map((app) => (
              <div key={app.id} className="p-3 bg-medical-bg border border-medical-border rounded-lg transition-all hover:bg-white hover:shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm", 
                      app.color === 'teal' ? 'bg-teal-100 text-teal-600' : 
                      app.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      app.color === 'green' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    )}>
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-medical-secondary">{app.name}</h3>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                        <Clock size={10} />
                        {app.time}
                      </div>
                    </div>
                  </div>
                  <div className={cn("px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                    app.status === 'Completed' ? 'bg-green-100 text-green-600' :
                    app.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                    app.status === 'In Progress' ? 'bg-teal-100 text-teal-600' : 'bg-blue-100 text-blue-600'
                  )}>
                    {app.status}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 ml-12">{app.type} Specialist</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-2.5 border border-medical-border rounded-lg text-slate-500 hover:text-medical-primary hover:bg-slate-50 transition-all text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            View All Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-medical-border card-shadow shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", color)}>
          <Icon size={20} />
        </div>
        <div className={cn("px-1.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1", 
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
        )}>
          {trend === 'up' ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
          {change}
        </div>
      </div>
      <h3 className="text-slate-400 font-bold text-[10px] tracking-wider uppercase">{title}</h3>
      <p className="text-2xl font-bold text-medical-secondary mt-1">{value}</p>
    </div>
  );
}
