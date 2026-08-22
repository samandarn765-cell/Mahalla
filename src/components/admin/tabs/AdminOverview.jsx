import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, AlertTriangle, Flame, Zap, Edit3 } from 'lucide-react';

export const AdminOverview = ({
  requests,
  handleStatusCycle,
  getStatusBadgeStyle,
  gasActive,
  electricActive,
  toggleGasSupply,
  toggleElectricSupply,
  addToast
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Header */}
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
          <span className="font-bold text-cyan-400 block sm:inline sm:ml-1">Bugun, real-vaqt</span>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total population */}
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

        {/* Active requests */}
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
            {requests.length || 18}
          </div>
          <div className="text-[11px] text-amber-300 font-semibold mt-2 flex items-center gap-1">
            <span>⚡ {requests.filter(r => r.urgency === 'Yuqori' || r.urgency === 'Zudlik bilan').length || 5} ta zudlik bilan</span>
          </div>
        </motion.div>

        {/* Systems status */}
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
              <span className={`w-2 h-2 rounded-full ${electricActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">💧 Suv ta'minoti</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">🔥 Tabiiy gaz</span>
              <span className={`w-2 h-2 rounded-full ${gasActive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Requests Table Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-7 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white font-serif-gold">Murojaatlar Boshqaruvi</h3>
            <button
              onClick={() => addToast("Barcha murojaatlar ko'rinishi yangilandi", "info")}
              className="text-xs font-semibold text-cyan-400 hover:underline"
              aria-label="Barcha murojaatlarni ko'rish"
            >
              Barchasi →
            </button>
          </div>

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
                {requests.slice(0, 5).map((req) => (
                  <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-mono text-cyan-400 font-bold">#{req.id}</td>
                    <td className="py-3.5 font-semibold text-white max-w-[180px] truncate">{req.title}</td>
                    <td className="py-3.5 text-slate-400">{req.date || 'Bugun'}</td>
                    <td className="py-3.5">
                      <button
                        onClick={() => handleStatusCycle(req)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-transform active:scale-95 ${getStatusBadgeStyle(req.status)}`}
                        aria-label={`Statusni o'zgartirish: ${req.status}`}
                      >
                        {req.status}
                      </button>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleStatusCycle(req)}
                        aria-label="Holatni yangilash"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition-colors"
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

        {/* Right: Supply Management */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-4 rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-7 flex flex-col justify-between shadow-2xl"
        >
          <div>
            <h3 className="text-lg font-bold text-white font-serif-gold mb-6">Ta'minot Boshqaruvi</h3>
            <div className="space-y-4">
              {/* Natural gas switch */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400"><Flame className="w-4 h-4" /></div>
                  <div>
                    <span className="text-xs font-bold text-white block">Tabiiy gaz</span>
                    <span className="text-[10px] text-amber-400 font-semibold">{gasActive ? "Online holat" : "Ta'mirlash ishlari"}</span>
                  </div>
                </div>
                <button
                  onClick={toggleGasSupply}
                  aria-label="Gaz ta'minotini yoqish/o'chirish"
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${gasActive ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${gasActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Electricity switch */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400"><Zap className="w-4 h-4" /></div>
                  <div>
                    <span className="text-xs font-bold text-white block">Elektr energiyasi</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{electricActive ? "Normal holat" : "Profilaktika"}</span>
                  </div>
                </div>
                <button
                  onClick={toggleElectricSupply}
                  aria-label="Elektr ta'minotini yoqish/o'chirish"
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${electricActive ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${electricActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToast("PDF Hisobot generatsiya qilindi", "success")}
            className="w-full mt-6 py-3 rounded-2xl bg-slate-900/80 border border-white/10 text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-all uppercase tracking-wider"
          >
            Batafsil Hisobot
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
