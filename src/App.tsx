/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { motion, AnimatePresence } from 'motion/react';

export type Page = 'dashboard' | 'patients' | 'appointments' | 'doctors' | 'billing' | 'settings' | 'login' | 'register' | 'forgot-password';
export type Role = 'admin' | 'doctor' | 'receptionist';

export interface User {
  email: string;
  role: Role;
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  if (currentPage === 'login') {
    return <Login 
      onLogin={handleLogin} 
      onForgotPassword={() => setCurrentPage('forgot-password')} 
      onRegister={() => setCurrentPage('register')}
    />;
  }

  if (currentPage === 'register') {
    return <Register onBack={() => setCurrentPage('login')} onRegister={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'forgot-password') {
    return <ForgotPassword onBack={() => setCurrentPage('login')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'patients': return <Patients />;
      case 'appointments': return <Appointments />;
      case 'doctors': return <Doctors />;
      case 'billing': return <Billing />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-medical-bg overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        activePage={currentPage} 
        onPageChange={setCurrentPage} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        user={user}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onLogout={handleLogout} user={user} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto w-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
