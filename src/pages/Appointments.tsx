import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  X,
  UserRound
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const appointmentsData = [
  { id: 1, patient: 'Alice Johnson', doctor: 'Dr. Sarah Smith', time: '09:00 AM', date: 'Oct 24, 2023', type: 'Checkup', status: 'Completed', color: 'green' },
  { id: 2, patient: 'Bob Wilson', doctor: 'Dr. John Doe', time: '10:30 AM', date: 'Oct 24, 2023', type: 'Radiology', status: 'In Progress', color: 'teal' },
  { id: 3, patient: 'Clara Davis', doctor: 'Dr. Emily Blunt', time: '01:00 PM', date: 'Oct 24, 2023', type: 'Emergency', status: 'Upcoming', color: 'blue' },
  { id: 4, patient: 'Daniel Lee', doctor: 'Dr. Michael Chen', time: '02:15 PM', date: 'Oct 25, 2023', type: 'Cardiology', status: 'Cancelled', color: 'red' },
  { id: 5, patient: 'Emma Wilson', doctor: 'Dr. Sarah Smith', time: '04:00 PM', date: 'Oct 25, 2023', type: 'Dental', status: 'Upcoming', color: 'blue' },
];

export default function Appointments() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-medical-secondary tracking-tight">Clinic Appointments</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage daily schedule and clinic availability.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-medical-primary text-white px-5 py-2 rounded-lg font-semibold text-sm shadow-sm hover:bg-medical-primary/90 transition-all flex items-center gap-2"
        >
          <Plus size={16} />
          New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-medical-border card-shadow shadow-sm overflow-hidden">
            <div className="p-6 border-b border-medical-border flex items-center justify-between">
              <h2 className="font-bold text-medical-secondary">Schedule List</h2>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setView('list')}
                  className={cn(
                    "px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all",
                    view === 'list' ? "bg-white shadow-sm text-medical-primary" : "text-slate-400"
                  )}
                >
                  List
                </button>
                <button 
                  onClick={() => setView('calendar')}
                  className={cn(
                    "px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all",
                    view === 'calendar' ? "bg-white shadow-sm text-medical-primary" : "text-slate-400"
                  )}
                >
                  Calendar
                </button>
              </div>
            </div>
            
            {view === 'list' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-medical-border">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Time</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-medical-border">
                    {appointmentsData.map((app) => (
                      <tr key={app.id} className="group hover:bg-slate-50/50 transition-all">
                        <td className="px-6 py-4 text-sm font-semibold text-medical-secondary">{app.patient}</td>
                        <td className="px-6 py-4">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{app.type}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 text-right font-medium">{app.time}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={cn("px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center", 
                            app.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                            app.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                            app.status === 'Upcoming' ? 'bg-teal-100 text-teal-700' :
                            'bg-amber-100 text-amber-700'
                          )}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-20 text-center">
                <CalendarIcon size={48} className="mx-auto mb-4 text-slate-200" />
                <p className="text-slate-400 text-sm font-medium">Calendar module is currently being optimized.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-medical-border card-shadow shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-medical-secondary uppercase tracking-widest">October 2023</h2>
              <div className="flex gap-1">
                <button className="p-1 rounded hover:bg-slate-50 text-slate-400"><ChevronLeft size={16} /></button>
                <button className="p-1 rounded hover:bg-slate-50 text-slate-400"><ChevronRight size={16} /></button>
              </div>
            </div>
            
            <div className="p-4 bg-medical-bg rounded-lg border border-medical-border mb-6">
              <p className="text-xs font-semibold text-medical-secondary mb-1">Available Clinic Capacity</p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-medical-primary h-full w-[75%]" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">75% Occuppied • 4 Slots Open</p>
            </div>

            <button className="w-full py-2.5 bg-medical-primary text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-medical-primary/90 shadow-sm transition-all">
              Manage Schedule
            </button>
          </div>

          <div className="bg-medical-secondary p-6 rounded-xl text-white card-shadow shadow-sm">
            <h3 className="font-bold text-sm mb-2">Doctor on Duty</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                <UserRound size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Dr. Sarah Smith</p>
                <p className="text-[10px] text-white/60 font-bold uppercase">Senior Surgeon</p>
              </div>
            </div>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border border-white/20">
              Contact Doctor
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white w-full max-w-md rounded-xl shadow-2xl relative overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-medical-border flex items-center justify-between bg-medical-bg">
                <div>
                  <h2 className="text-lg font-bold text-medical-secondary tracking-tight">New Appointment</h2>
                  <p className="text-slate-500 text-xs font-medium">Schedule a patient visit.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-all text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                <form className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Patient Name</label>
                    <input type="text" placeholder="Search client name..." className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-4 py-2.5 text-sm outline-hidden transition-all" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date</label>
                      <input type="date" className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-4 py-2.5 text-sm outline-hidden transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Time</label>
                      <input type="time" className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-3 py-2.5 text-sm outline-hidden transition-all" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Department</label>
                    <select className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-3 py-2.5 text-sm outline-hidden transition-all">
                      <option>General Checkup</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Dermatology</option>
                      <option>Orthopedics</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="py-2.5 border border-medical-border rounded-lg text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsModalOpen(false);
                        alert('Appointment scheduled successfully!');
                      }}
                      className="py-2.5 bg-medical-primary text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-sm hover:bg-medical-primary/90 transition-all"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
