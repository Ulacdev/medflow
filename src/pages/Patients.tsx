import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download,
  User,
  Activity,
  Phone,
  Mail,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { cn } from '../lib/utils';

const initialPatients = [
  { id: '1', name: 'Alice Johnson', age: 34, gender: 'Female', status: 'In Treatment', phone: '+1 234 567 890', email: 'alice@example.com', lastVisit: '2023-10-12', blood: 'A+' },
  { id: '2', name: 'Bob Wilson', age: 45, gender: 'Male', status: 'Scheduled', phone: '+1 234 567 891', email: 'bob@example.com', lastVisit: '2023-11-05', blood: 'O-' },
  { id: '3', name: 'Clara Davis', age: 28, gender: 'Female', status: 'Completed', phone: '+1 234 567 892', email: 'clara@example.com', lastVisit: '2023-09-28', blood: 'B+' },
  { id: '4', name: 'Daniel Lee', age: 52, gender: 'Male', status: 'Cancelled', phone: '+1 234 567 893', email: 'daniel@example.com', lastVisit: '2023-10-20', blood: 'AB-' },
  { id: '5', name: 'Emma Wilson', age: 19, gender: 'Female', status: 'In Treatment', phone: '+1 234 567 894', email: 'emma@example.com', lastVisit: '2023-11-15', blood: 'A-' },
  { id: '6', name: 'Frank Miller', age: 64, gender: 'Male', status: 'Scheduled', phone: '+1 234 567 895', email: 'frank@example.com', lastVisit: '2023-11-02', blood: 'O+' },
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPatients = initialPatients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-medical-secondary tracking-tight">Patient Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Monitor and manage all hospital patient records.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              const btn = document.activeElement as HTMLButtonElement;
              const originalContent = btn.innerHTML;
              btn.innerHTML = '<span class="animate-spin mr-2">◌</span> Exporting...';
              btn.disabled = true;
              setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                alert('Patient data exported successfully!');
              }, 1500);
            }}
            className="bg-white border border-medical-border text-slate-600 px-4 py-2 rounded-lg font-semibold text-sm shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-medical-primary text-white px-5 py-2 rounded-lg font-semibold text-sm shadow-sm hover:bg-medical-primary/90 transition-all flex items-center gap-2"
          >
            <Plus size={16} />
            Add Patient
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-medical-border card-shadow shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search by name, ID or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-medical-bg border-none focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg pl-11 pr-4 py-2 text-sm outline-hidden"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 bg-medical-bg border border-medical-border text-slate-600 px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all">
            <Filter size={14} />
            Filters
          </button>
          <select className="bg-medical-bg border border-medical-border text-slate-600 px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all outline-hidden cursor-pointer">
            <option>All Status</option>
            <option>In Treatment</option>
            <option>Scheduled</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl border border-medical-border card-shadow shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-medical-border">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient Info</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age / Gender</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Information</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-medical-border">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-medical-primary/5 flex items-center justify-center text-medical-primary font-bold text-sm border border-medical-primary/10">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-medical-secondary">{patient.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">PID-{patient.id.padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-slate-700">{patient.age} years</p>
                      <p className="text-[11px] text-slate-400 font-medium">{patient.gender}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Phone size={12} className="text-slate-400" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Mail size={12} className="text-slate-400" />
                        {patient.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5",
                      patient.status === 'In Treatment' ? 'bg-blue-100 text-blue-600' :
                      patient.status === 'Scheduled' ? 'bg-teal-100 text-teal-600' :
                      patient.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    )}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-medical-primary hover:bg-slate-50 rounded-lg transition-all border border-transparent hover:border-medical-border">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPatients.length === 0 && (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-medical-bg rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-medical-secondary">No patients found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
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
              className="bg-white w-full max-w-lg rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-medical-border flex items-center justify-between bg-medical-bg">
                <div>
                  <h2 className="text-lg font-bold text-medical-secondary tracking-tight">Add New Patient</h2>
                  <p className="text-slate-500 text-xs font-medium">Create a new medical record.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-all text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="e.g. Johnathan Doe" className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-4 py-2.5 text-sm outline-hidden transition-all" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Age</label>
                      <input type="number" placeholder="25" className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-4 py-2.5 text-sm outline-hidden transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                      <select className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-3 py-2.5 text-sm outline-hidden transition-all">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-4 py-2.5 text-sm outline-hidden transition-all" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input type="tel" placeholder="+1 123 456 7890" className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-4 py-2.5 text-sm outline-hidden transition-all" />
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
                        alert('Patient record saved successfully!');
                      }}
                      className="py-2.5 bg-medical-primary text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-sm hover:bg-medical-primary/90 transition-all"
                    >
                      Save Patient
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
