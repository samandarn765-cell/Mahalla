import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { useTranslation } from 'react-i18next';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import {
  LayoutDashboard,
  Users,
  Wrench,
  BarChart3,
  Settings,
  PlusCircle,
  Zap,
  Flame,
  AlertTriangle,
  Edit3,
  UserCheck
} from 'lucide-react';

export const AdminPage = () => {
  const {
    requests,
    updateRequestStatus,
    updateUtilityStatus,
    addToast,
    setIsReportModalOpen
  } = useMahalla();

  const { t } = useTranslation();

  const [activeSidebarTab, setActiveSidebarTab] = useState('dashboard');
  const [gasActive, setGasActive] = useState(false);
  const [electricActive, setElectricActive] = useState(true);

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
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
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full Admin Dashboard Layout 1-to-1 matching Screenshot 1 & 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Admin Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 85 }}
            className="lg:col-span-3 rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 flex flex-col justify-between shadow-2xl text-left"
          >
            <div>
              {/* Admin Avatar & Profile */}
              <div className="text-center pb-6 border-b border-white/[0.08] mb-6">
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-cyan-400 p-1 bg-slate-900 shadow-xl">
                  <ImagePlaceholder
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                    alt="Admin Avatar"
                    placeholderText="Admin"
                    icon={UserCheck}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0A0F1D]" />
                </div>
                <h3 className="text-base font-bold text-white font-serif-gold">Mahalla Admin</h3>
                <span className="text-[11px] text-cyan-400 font-semibold">Mahalla Boshqaruvi</span>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5">
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

            {/* Bottom + Yangi Xabar Button */}
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

          {/* Right Main Dashboard Area */}
          <div className="lg:col-span-9 space-y-8 text-left">
            
            {/* Header: Xush Kelibsiz, Admin 1-to-1 matching Screenshot 1 & 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-amber-300 font-serif-gold drop-shadow-sm">
                  {t('admin.welcome', { defaultValue: 'Xush Kelibsiz, Admin' })}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {t('admin.subtitle', { defaultValue: "Mahalla holati va asosiy ko'rsatkichlar." })}
                </p>
              </div>

              <div className="text-right text-[11px] text-slate-400">
                <span>So'nggi yangilanish:</span>
                <span className="font-bold text-cyan-400 block sm:inline sm:ml-1">Bugun, 14:30</span>
              </div>
            </motion.div>

            {/* 3 Top Summary KPI Cards (1-to-1 matching Screenshot 1 & 2) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* 1. UMUMIY AHOLI */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 rounded-[26px] bg-[#141f3d] border border-[#252F43] flex flex-col justify-between shadow-xl"
              >
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span className="uppercase tracking-wider">UMUMIY AHOLI</span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-white font-heading">
                  4,250
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold mt-2">
                  ↗ +2.4% o'tgan oydan
                </div>
              </motion.div>

              {/* 2. FAOL MUROJAATLAR */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 rounded-[26px] bg-[#141f3d] border border-[#252F43] flex flex-col justify-between shadow-xl"
              >
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span className="uppercase tracking-wider">FAOL MUROJAATLAR</span>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-amber-400 font-heading">
                  18
                </div>
                <div className="text-[11px] text-amber-300 font-semibold mt-2 flex items-center gap-1">
                  <span>⚡ 5 ta zudlik bilan</span>
                </div>
              </motion.div>

              {/* 3. TIZIMLAR HOLATI */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 rounded-[26px] bg-[#141f3d] border border-[#252F43] flex flex-col justify-between shadow-xl"
              >
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  TIZIMLAR HOLATI
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">⚡ Elektr energiyasi</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">💧 Suv ta'minoti</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">🔥 Tabiiy gaz</span>
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Bottom Split: Murojaatlar Boshqaruvi & Ta'minot Boshqaruvi */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: Murojaatlar Boshqaruvi Table */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-8 rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-7 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white font-serif-gold">Murojaatlar Boshqaruvi</h3>
                  <button
                    onClick={() => addToast("Barcha murojaatlar filtri yangilandi", "info")}
                    className="text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    Barchasi →
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-white/[0.08] pb-3">
                        <th className="py-2.5 font-bold uppercase tracking-wider">ID</th>
                        <th className="py-2.5 font-bold uppercase tracking-wider">MAVZU</th>
                        <th className="py-2.5 font-bold uppercase tracking-wider">SANA</th>
                        <th className="py-2.5 font-bold uppercase tracking-wider">HOLAT</th>
                        <th className="py-2.5 font-bold uppercase tracking-wider text-right">HARAKAT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {requests.slice(0, 4).map((req) => (
                        <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 font-mono text-cyan-400 font-bold">{req.id}</td>
                          <td className="py-3.5 font-semibold text-white max-w-[180px] truncate">{req.title}</td>
                          <td className="py-3.5 text-slate-400">{req.date}</td>
                          <td className="py-3.5">
                            <button
                              onClick={() => handleStatusCycle(req)}
                              title="Holatni o'zgartirish uchun bosing"
                              className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-transform active:scale-95 ${getStatusBadgeStyle(
                                req.status
                              )}`}
                            >
                              {req.status}
                            </button>
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => handleStatusCycle(req)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition-colors"
                              title="Holatni yangilash"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Right: Ta'minot Boshqaruvi (Screenshot 1 & 2) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="lg:col-span-4 rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-7 flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <h3 className="text-lg font-bold text-white font-serif-gold mb-6">
                    Ta'minot Boshqaruvi
                  </h3>

                  <div className="space-y-4">
                    {/* Tabiiy gaz switch */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                          <Flame className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Tabiiy gaz</span>
                          <span className="text-[10px] text-amber-400 font-semibold">
                            {gasActive ? "Online holat" : "Ta'mirlash ishlari"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={toggleGasSupply}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                          gasActive ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            gasActive ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Elektr energiyasi switch */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Elektr energiyasi</span>
                          <span className="text-[10px] text-emerald-400 font-semibold">
                            {electricActive ? "Normal holat" : "Profilaktika"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={toggleElectricSupply}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                          electricActive ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            electricActive ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Batafsil Hisobot Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToast("PDF Hisobot generatsiya qilindi va yuklab olindi", "success")}
                  className="w-full mt-6 py-3 rounded-2xl bg-slate-900/80 border border-white/10 text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-all uppercase tracking-wider"
                >
                  Batafsil Hisobot
                </motion.button>

              </motion.div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
