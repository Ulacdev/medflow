import { useState } from 'react';
import { 
  Phone, 
  Mail,
  Plus,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const doctorsData = [
  { id: 1, name: 'Dr. Sarah Smith', specialty: 'Cardiologist', rating: 4.9, patients: '1,200+', availability: 'Available Today', color: 'blue' },
  { id: 2, name: 'Dr. John Doe', specialty: 'Neurologist', rating: 4.8, patients: '800+', availability: 'On Leave', color: 'teal' },
  { id: 3, name: 'Dr. Emily Blunt', specialty: 'Pediatrician', rating: 5.0, patients: '2,500+', availability: 'Available Today', color: 'purple' },
  { id: 4, name: 'Dr. Michael Chen', specialty: 'Orthopedic', rating: 4.7, patients: '950+', availability: 'In Surgery', color: 'emerald' },
  { id: 5, name: 'Dr. Jessica Alba', specialty: 'Dermatologist', rating: 4.9, patients: '1,500+', availability: 'Available Today', color: 'rose' },
  { id: 6, name: 'Dr. David Gandy', specialty: 'Radiologist', rating: 4.6, patients: '600+', availability: 'On Call', color: 'amber' },
];

export default function Doctors() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-medical-secondary tracking-tight">Medical Personnel</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and monitor hospital staff and availability.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-medical-primary text-white px-5 py-2 rounded-lg font-semibold text-sm shadow-sm hover:bg-medical-primary/90 transition-all flex items-center gap-2"
        >
          <Plus size={16} />
          Register Specialist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsData.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl border border-medical-border card-shadow shadow-sm overflow-hidden group hover:border-medical-primary/30 transition-all">
            <div className={cn("h-1.5 w-full", 
              doctor.color === 'blue' ? 'bg-blue-600' : 
              doctor.color === 'teal' ? 'bg-teal-600' : 
              doctor.color === 'purple' ? 'bg-purple-600' : 
              doctor.color === 'emerald' ? 'bg-emerald-600' : 
              doctor.color === 'rose' ? 'bg-rose-600' : 'bg-amber-600'
            )} />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-medical-border">
                    {doctor.name.split(' ').map(n => n.startsWith('Dr.') ? '' : n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-medical-secondary group-hover:text-medical-primary transition-colors">{doctor.name}</h3>
                    <p className="text-[11px] font-bold text-medical-primary uppercase tracking-wider">{doctor.specialty}</p>
                  </div>
                </div>
                <div className={cn("px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider", 
                  doctor.availability === 'Available Today' ? 'bg-green-100 text-green-600' : 
                  doctor.availability === 'On Leave' ? 'bg-red-100 text-red-600' : 
                  doctor.availability === 'In Surgery' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                )}>
                  {doctor.availability.split(' ')[0]}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-medical-bg p-2 rounded-lg border border-medical-border text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Patients</p>
                  <p className="text-sm font-bold text-medical-secondary">{doctor.patients}</p>
                </div>
                <div className="bg-medical-bg p-2 rounded-lg border border-medical-border text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rating</p>
                  <p className="text-sm font-bold text-medical-secondary">{doctor.rating} / 5.0</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone size={12} className="text-slate-400" />
                  +1 234 567 890
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail size={12} className="text-slate-400" />
                  {doctor.name.toLowerCase().replace('dr. ', '').replace(' ', '.') + '@medflow.com'}
                </div>
              </div>

              <button className="w-full py-2.5 border border-medical-border rounded-lg text-[10px] font-bold text-slate-500 hover:bg-slate-50 hover:text-medical-primary transition-all uppercase tracking-widest">
                View Schedule
              </button>
            </div>
          </div>
        ))}
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
                  <h2 className="text-lg font-bold text-medical-secondary tracking-tight">Register Specialist</h2>
                  <p className="text-slate-500 text-xs font-medium">Add a new medical professional.</p>
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
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="e.g. Dr. Jane Cooper" className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-4 py-2.5 text-sm outline-hidden transition-all" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Specialization</label>
                    <select className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-3 py-2.5 text-sm outline-hidden transition-all">
                      <option>Surgery</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Pediatrics</option>
                      <option>Dermatology</option>
                      <option>Radiology</option>
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
                        alert('Specialist registered successfully!');
                      }}
                      className="py-2.5 bg-medical-primary text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-sm hover:bg-medical-primary/90 transition-all"
                    >
                      Complete
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

