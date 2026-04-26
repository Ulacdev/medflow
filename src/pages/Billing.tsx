import { useState } from 'react';
import { 
  Plus,
  Search, 
  DollarSign, 
  X,
  Download,
  Printer,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const invoicesData = [
  { id: 'INV-2023-001', patient: 'Alice Johnson', date: 'Oct 12, 2023', amount: 1250.00, status: 'Paid', method: 'Insurance', color: 'green' },
  { id: 'INV-2023-002', patient: 'Bob Wilson', date: 'Oct 14, 2023', amount: 450.00, status: 'Pending', method: 'Credit Card', color: 'amber' },
  { id: 'INV-2023-003', patient: 'Clara Davis', date: 'Oct 15, 2023', amount: 2800.50, status: 'Paid', method: 'Cash', color: 'green' },
  { id: 'INV-2023-004', patient: 'Daniel Lee', date: 'Oct 18, 2023', amount: 95.00, status: 'Overdue', method: 'N/A', color: 'red' },
  { id: 'INV-2023-005', patient: 'Emma Wilson', date: 'Oct 20, 2023', amount: 320.00, status: 'Paid', method: 'Insurance', color: 'green' },
  { id: 'INV-2023-006', patient: 'Frank Miller', date: 'Oct 22, 2023', amount: 1560.75, status: 'Pending', method: 'Debit Card', color: 'amber' },
];

export default function Billing() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-medical-secondary tracking-tight">Billing & Finance</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage invoices, payments and financial reports.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-medical-primary text-white px-5 py-2 rounded-lg font-semibold text-sm shadow-sm hover:bg-medical-primary/90 transition-all flex items-center gap-2"
        >
          <DollarSign size={16} />
          New Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardSmall title="Overdue" value="$2,450" change="4 invoices" color="bg-red-500" />
        <StatCardSmall title="Pending" value="$8,720" change="12 invoices" color="bg-amber-500" />
        <StatCardSmall title="Processed" value="$12,450" change="+4.2%" color="bg-medical-primary" />
        <StatCardSmall title="Total Revenue" value="$45,800" change="+18.4%" color="bg-medical-secondary" />
      </div>

      <div className="bg-white rounded-xl border border-medical-border card-shadow shadow-sm overflow-hidden">
        <div className="p-4 border-b border-medical-border flex items-center justify-between bg-medical-bg/30">
          <h2 className="text-sm font-bold text-medical-secondary uppercase tracking-widest">Invoices History</h2>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-primary transition-all" size={14} />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="bg-medical-bg border border-medical-border rounded-lg pl-9 pr-4 py-1.5 text-xs outline-hidden focus:bg-white focus:ring-1 focus:ring-medical-primary/20 transition-all" 
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-medical-border">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID / Patient</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Method</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-medical-border">
              {invoicesData.map((invoice) => (
                <tr key={invoice.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => setSelectedInvoice(invoice)}>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-medical-secondary">{invoice.patient}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{invoice.id} • {invoice.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{invoice.method}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-medical-secondary text-right">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    )}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white w-full max-w-lg rounded-xl shadow-2xl relative overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-medical-border flex items-center justify-between bg-medical-bg">
                <div>
                  <h2 className="text-xl font-bold text-medical-secondary tracking-tight">Invoice Details</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{selectedInvoice.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-all text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bill To</p>
                    <h3 className="text-lg font-bold text-medical-secondary">{selectedInvoice.patient}</h3>
                    <p className="text-xs text-slate-500">123 Street, Medical City</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xs",
                      selectedInvoice.status === 'Paid' ? 'bg-green-500 text-white' :
                      selectedInvoice.status === 'Pending' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                    )}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>

                <div className="border border-medical-border rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</th>
                        <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-medical-border">
                      <tr>
                        <td className="px-4 py-4 text-xs font-medium text-slate-700 tracking-tight leading-relaxed">Medical Consultation - General Service</td>
                        <td className="px-4 py-4 text-sm font-bold text-medical-secondary text-right">${selectedInvoice.amount}</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="px-4 py-3 text-xs font-bold text-slate-500 text-right">Tax (5%)</td>
                        <td className="px-4 py-3 text-sm font-bold text-slate-500 text-right">${(selectedInvoice.amount * 0.05).toFixed(2)}</td>
                      </tr>
                      <tr className="bg-medical-bg">
                        <td className="px-4 py-3 text-sm font-bold text-medical-secondary text-right uppercase tracking-widest">Total Amount</td>
                        <td className="px-4 py-3 text-lg font-bold text-medical-primary text-right">${(selectedInvoice.amount * 1.05).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 bg-medical-primary text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-sm hover:bg-medical-primary/90 transition-all flex items-center justify-center gap-2">
                    <Download size={14} /> Download
                  </button>
                  <button className="flex-1 py-2.5 border border-medical-border text-slate-500 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Printer size={14} /> Print
                  </button>
                  <button className="w-12 py-2.5 border border-medical-border text-slate-500 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-all">
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

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
                  <h2 className="text-lg font-bold text-medical-secondary tracking-tight">New Transaction</h2>
                  <p className="text-slate-500 text-xs font-medium">Record a new patient payment.</p>
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
                    <input type="text" placeholder="John Doe" className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-4 py-2.5 text-sm outline-hidden transition-all" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Amount ($)</label>
                      <input type="number" placeholder="0.00" className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-4 py-2.5 text-sm outline-hidden transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Method</label>
                      <select className="w-full bg-medical-bg border border-medical-border focus:bg-white focus:ring-1 focus:ring-medical-primary/20 rounded-lg px-3 py-2.5 text-sm outline-hidden transition-all">
                        <option>Credit Card</option>
                        <option>Insurance</option>
                        <option>Cash</option>
                        <option>Bank Transfer</option>
                      </select>
                    </div>
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
                        alert('Transaction processed successfully!');
                      }}
                      className="py-2.5 bg-medical-primary text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-sm hover:bg-medical-primary/90 transition-all"
                    >
                      Process
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

function StatCardSmall({ title, value, change, color }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-medical-border card-shadow shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className={cn("w-2 h-2 rounded-full", color)} />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      </div>
      <h3 className="text-xl font-bold text-medical-secondary">{value}</h3>
      <p className="text-[11px] text-slate-500 font-medium mt-1">{change}</p>
    </div>
  );
}


function TrendingUp({ size, className }: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
