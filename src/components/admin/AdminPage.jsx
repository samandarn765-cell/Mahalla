import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import {
  LayoutDashboard,
  Users,
  Wrench,
  BarChart3,
  Settings,
  PlusCircle,
  UserCheck,
  FileText,
  Newspaper
} from 'lucide-react';

import { AdminOverview } from './tabs/AdminOverview';
import { AdminResidents } from './tabs/AdminResidents';
import { AdminRequests } from './tabs/AdminRequests';
import { AdminServices } from './tabs/AdminServices';
import { AdminStatistics } from './tabs/AdminStatistics';
import { AdminSettings } from './tabs/AdminSettings';
import { AdminPayments } from './tabs/AdminPayments';
import { AdminNews } from './tabs/AdminNews';
import { Landmark } from 'lucide-react';

export const AdminPage = () => {
  const {
    requests,
    updateRequestStatus,
    updateUtilityStatus,
    addToast,
    setIsReportModalOpen,
    theme,
    setTheme,
    residentsList,
    setResidentsList,
    servicesList,
    setServicesList,
    userData
  } = useMahalla();

  const [activeSidebarTab, setActiveSidebarTab] = useState('dashboard');
  const [gasActive, setGasActive] = useState(true);
  const [electricActive, setElectricActive] = useState(true);
  
  // Modals state
  const [isAddResidentModalOpen, setIsAddResidentModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [newResident, setNewResident] = useState({ name: '', phone: '', address: '' });
  const [newService, setNewService] = useState({ name: '', icon: '⚡' });

  const handleAddResident = (e) => {
    e.preventDefault();
    if (newResident.name && newResident.phone) {
      setResidentsList(prev => [
        { id: prev.length + 1, ...newResident, status: "Faol" },
        ...prev
      ]);
      addToast("Yangi fuqaro muvaffaqiyatli qo'shildi", "success");
      setNewResident({ name: '', phone: '', address: '' });
      setIsAddResidentModalOpen(false);
    }
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (newService.name) {
      setServicesList(prev => [
        { id: prev.length + 1, ...newService, count: 0 },
        ...prev
      ]);
      addToast("Yangi xizmat turi qo'shildi", "success");
      setNewService({ name: '', icon: '⚡' });
      setIsAddServiceModalOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'Yangiliklar', icon: Newspaper },
    { id: 'requests', label: 'Murojaatlar', icon: FileText },
    { id: 'payments', label: 'Moliya & Fond', icon: Landmark },
    { id: 'residents', label: 'Aholi', icon: Users },
    { id: 'services', label: 'Xizmatlar', icon: Wrench },
    { id: 'statistics', label: 'Statistika', icon: BarChart3 },
    { id: 'settings', label: 'Sozlamalar', icon: Settings }
  ];

  const handleStatusCycle = (req) => {
    let nextStatus = "Jarayonda";
    let nextType = "in_progress";
    if (req.status === "Ko'rib chiqilmoqda") {
      nextStatus = "Jarayonda";
      nextType = "in_progress";
    } else if (req.status === "Jarayonda") {
      nextStatus = "Bajarildi";
      nextType = "resolved";
    } else {
      nextStatus = "Ko'rib chiqilmoqda";
      nextType = "pending";
    }

    updateRequestStatus(req.id, nextStatus, nextType);
  };

  const getStatusBadgeStyle = (status) => {
    if (status === 'Bajarildi' || status === 'Hal etilgan') {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
    if (status === 'Jarayonda') {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
    return 'bg-red-500/20 text-red-300 border-red-500/40';
  };

  const toggleGasSupply = () => {
    const next = !gasActive;
    setGasActive(next);
    updateUtilityStatus(
      'gas',
      next ? 'Online' : 'Ta\'mirlash',
      next ? 95 : 65,
      next ? 'Gaz bosimi barqaror ta\'minlanmoqda.' : '4-ko\'chada profilaktika ishlari. Tiklanish: 18:00',
      next ? 'online' : 'maintenance'
    );
  };

  const toggleElectricSupply = () => {
    const next = !electricActive;
    setElectricActive(next);
    updateUtilityStatus(
      'electric',
      next ? 'Online' : 'Vaqtinchalik o\'chiq',
      next ? 98 : 30,
      next ? 'Tarmoq barqaror ishlamoqda.' : 'Profilaktika ishlari olib borilmoqda.',
      next ? 'online' : 'maintenance'
    );
  };

  return (
    <>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 85 }}
              className="lg:col-span-3 rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 flex flex-col justify-between shadow-2xl text-left"
            >
              <div>
                {/* Admin Avatar */}
                <div className="text-center pb-6 border-b border-white/[0.08] mb-6">
                  <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-cyan-400 p-1 bg-slate-900 shadow-xl flex items-center justify-center">
                    {userData?.avatar ? (
                      <img src={userData.avatar} alt="Admin" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="text-3xl font-bold text-cyan-400">
                        {userData?.name ? userData.name.charAt(0).toUpperCase() : 'A'}
                      </span>
                    )}
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0A0F1D]" />
                  </div>
                  <h3 className="text-base font-bold text-white font-serif-gold">{userData?.name || 'Mahalla Admin'}</h3>
                  <span className="text-[11px] text-cyan-400 font-semibold">Mahalla Boshqaruvi</span>
                </div>

                {/* Nav Links */}
                <nav className="space-y-1.5" aria-label="Admin navigatsiya">
                  {sidebarLinks.map((link) => {
                    const isActive = activeSidebarTab === link.id;
                    return (
                      <motion.button
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        key={link.id}
                        onClick={() => {
                          setActiveSidebarTab(link.id);
                          addToast(`${link.label} bo'limiga o'tildi`, 'info');
                        }}
                        className={`w-full px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-3 transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        <link.icon className="w-4 h-4" />
                        <span>{link.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/[0.08]">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-lg hover:from-amber-300 hover:to-yellow-300 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Yangi Xabar</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Main Area */}
            <div className="lg:col-span-9 space-y-8 text-left">
              {activeSidebarTab === 'dashboard' && (
                <AdminOverview
                  requests={requests}
                  handleStatusCycle={handleStatusCycle}
                  getStatusBadgeStyle={getStatusBadgeStyle}
                  gasActive={gasActive}
                  electricActive={electricActive}
                  toggleGasSupply={toggleGasSupply}
                  toggleElectricSupply={toggleElectricSupply}
                  addToast={addToast}
                />
              )}

              {activeSidebarTab === 'news' && (
                <AdminNews />
              )}

              {activeSidebarTab === 'requests' && (
                <AdminRequests
                  requests={requests}
                  handleStatusCycle={handleStatusCycle}
                  getStatusBadgeStyle={getStatusBadgeStyle}
                  addToast={addToast}
                />
              )}

              {activeSidebarTab === 'payments' && (
                <AdminPayments />
              )}

              {activeSidebarTab === 'residents' && (
                <AdminResidents
                  residentsList={residentsList}
                  setResidentsList={setResidentsList}
                  setIsAddResidentModalOpen={setIsAddResidentModalOpen}
                  addToast={addToast}
                />
              )}

              {activeSidebarTab === 'services' && (
                <AdminServices
                  servicesList={servicesList}
                  setIsAddServiceModalOpen={setIsAddServiceModalOpen}
                  addToast={addToast}
                />
              )}

              {activeSidebarTab === 'statistics' && (
                <AdminStatistics />
              )}

              {activeSidebarTab === 'settings' && (
                <AdminSettings
                  theme={theme}
                  toggleTheme={toggleTheme}
                  addToast={addToast}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Resident Modal */}
      {isAddResidentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl bg-[#141f3d] border border-[#252F43] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Yangi Fuqaro Qo'shish</h3>
            <form onSubmit={handleAddResident} className="space-y-4">
              <input type="text" placeholder="Ism Familiya" value={newResident.name} onChange={e => setNewResident({...newResident, name: e.target.value})} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-emerald-500 focus:outline-none" required />
              <input type="tel" placeholder="Telefon raqam" value={newResident.phone} onChange={e => setNewResident({...newResident, phone: e.target.value})} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-emerald-500 focus:outline-none" required />
              <input type="text" placeholder="Manzil (Turar joy)" value={newResident.address} onChange={e => setNewResident({...newResident, address: e.target.value})} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-emerald-500 focus:outline-none" required />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsAddResidentModalOpen(false)} className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold">Bekor qilish</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {isAddServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl bg-[#141f3d] border border-[#252F43] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Yangi Xizmat Turi</h3>
            <form onSubmit={handleAddService} className="space-y-4">
              <input type="text" placeholder="Xizmat nomi (masalan: Uyni tozalash)" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-cyan-500 focus:outline-none" required />
              <input type="text" placeholder="Ikonka (Emoji)" value={newService.icon} onChange={e => setNewService({...newService, icon: e.target.value})} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-cyan-500 focus:outline-none" required />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsAddServiceModalOpen(false)} className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold">Bekor qilish</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold">Qo'shish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
