import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import {
  FileText,
  Clock,
  CheckCircle,
  SlidersHorizontal,
  ShieldCheck
} from 'lucide-react';

export const ArchivePage = () => {
  const { requests, setSelectedRequest, registerResident, addToast } = useMahalla();

  // Multi-step resident registration form state
  const [step, setStep] = useState(1);
  const [residentForm, setResidentForm] = useState({
    region: 'Toshkent shahri',
    district: 'Yunusobod tumani',
    street: 'Amir Temur ko\'chasi',
    apartment: '',
    fullName: '',
    passportSeries: '',
    phone: '',
    familyMembersCount: '4'
  });

  const regions = ['Toshkent shahri', 'Toshkent viloyati', 'Samarqand viloyati', 'Farg\'ona viloyati'];
  const districts = ['Yunusobod tumani', 'Mirzo Ulug\'bek tumani', 'Chilonzor tumani', 'Shayxontohur tumani'];

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      registerResident(residentForm);
      setStep(1);
      setResidentForm({
        region: 'Toshkent shahri',
        district: 'Yunusobod tumani',
        street: 'Amir Temur ko\'chasi',
        apartment: '',
        fullName: '',
        passportSeries: '',
        phone: '',
        familyMembersCount: '4'
      });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const getStatusBadge = (status) => {
    if (status === 'Bajarildi' || status === 'Hal etilgan') {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
    if (status === 'Jarayonda') {
      return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
    return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header 1-to-1 from Screenshot 1 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90 }}
          className="max-w-3xl mb-8 text-left space-y-2"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-gold">
            Aholi Arxivi va Ro'yxatdan O'tish
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Yangi aholini ro'yxatga olish va mavjud murojaatlarni kuzatish paneli. Barcha ma'lumotlar xavfsiz himoyalangan.
          </p>
        </motion.div>

        {/* Top 3 Metric Summary Boxes (1-to-1 matching Screenshot 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-2xl bg-[#141f3d] border border-[#252F43] flex items-center justify-between text-left shadow-lg"
          >
            <div>
              <span className="text-2xl font-bold text-cyan-400 font-heading">124</span>
              <p className="text-xs text-slate-400">Barcha Murojaatlar</p>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-2xl bg-[#141f3d] border border-[#252F43] flex items-center justify-between text-left shadow-lg"
          >
            <div>
              <span className="text-2xl font-bold text-amber-400 font-heading">13</span>
              <p className="text-xs text-slate-400">Jarayonda</p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-2xl bg-[#141f3d] border border-[#252F43] flex items-center justify-between text-left shadow-lg"
          >
            <div>
              <span className="text-2xl font-bold text-emerald-400 font-heading">98</span>
              <p className="text-xs text-slate-400">Hal etilgan</p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
          </motion.div>
        </div>

        {/* 2-Column Split matching Screenshot 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Ro'yxatdan O'tish (Yangi Resident) Multi-step Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 85, damping: 18 }}
            className="lg:col-span-5 rounded-[28px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-white font-serif-gold">Ro'yxatdan O'tish</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
                  Yangi Resident
                </span>
              </div>

              {/* 4-Step Progress Indicator (1-to-1 with Amber and Cyan bubbles) */}
              <div className="flex items-center justify-between relative mb-8 px-2">
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 z-0" />
                {[1, 2, 3, 4].map((s) => (
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    key={s}
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-lg transition-all ${
                      s === step
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20 scale-110'
                        : s < step
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 border border-white/10'
                    }`}
                  >
                    {s}
                  </motion.div>
                ))}
              </div>

              {/* Step Forms */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Viloyat:
                      </label>
                      <select
                        value={residentForm.region}
                        onChange={(e) => setResidentForm({ ...residentForm, region: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      >
                        {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Tuman:
                      </label>
                      <select
                        value={residentForm.district}
                        onChange={(e) => setResidentForm({ ...residentForm, district: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      >
                        {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Ko'cha nomi:
                      </label>
                      <input
                        type="text"
                        placeholder="Amir Temur ko'chasi"
                        value={residentForm.street}
                        onChange={(e) => setResidentForm({ ...residentForm, street: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Uy va xonadon raqami:
                      </label>
                      <input
                        type="text"
                        placeholder="45-uy, 12-xonadon"
                        value={residentForm.apartment}
                        onChange={(e) => setResidentForm({ ...residentForm, apartment: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        F.I.SH (To'liq ismingiz):
                      </label>
                      <input
                        type="text"
                        placeholder="Rustamov Dilshod Anvarovich"
                        value={residentForm.fullName}
                        onChange={(e) => setResidentForm({ ...residentForm, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Telefon raqamingiz:
                      </label>
                      <input
                        type="tel"
                        placeholder="+998 (90) 123-45-67"
                        value={residentForm.phone}
                        onChange={(e) => setResidentForm({ ...residentForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-3 p-4 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-300"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <ShieldCheck className="w-5 h-5" />
                      <span>Ma'lumotlarni Tasdiqlash</span>
                    </div>
                    <p>Manzil: {residentForm.district}, {residentForm.street}</p>
                    <p>Fuqaro: {residentForm.fullName || 'Kiritilmadi'}</p>
                    <p>Telefon: {residentForm.phone || '+998 90 000-00-00'}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Buttons (Orqaga & Davom etish) */}
            <div className="grid grid-cols-2 gap-3 mt-8 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={step === 1}
                className="py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40 transition-colors"
              >
                Orqaga
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleNextStep}
                className="py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-lg hover:from-amber-300 hover:to-yellow-300 transition-all"
              >
                {step === 4 ? "Ro'yxatdan O'tish" : "Davom etish"}
              </motion.button>
            </div>
          </motion.div>

          {/* Right: So'nggi Murojaatlar (1-to-1 matching Screenshot 1) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 85, damping: 18 }}
            className="lg:col-span-7 rounded-[28px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-white font-serif-gold">So'nggi Murojaatlar</h3>
                <button
                  onClick={() => addToast("Murojaatlar filtri yangilandi", "info")}
                  className="p-2 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 hover:bg-slate-800"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Requests List */}
              <div className="space-y-3">
                {requests.slice(0, 4).map((req) => (
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] hover:border-cyan-400/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {req.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{req.address}</p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1.5">
                      <span className="text-[10px] text-slate-400">{req.date}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Barchasini Ko'rish Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToast("Barcha 124 ta arxiv ma'lumotlari yuklandi", "info")}
              className="w-full mt-6 py-3 rounded-2xl bg-slate-900/60 border border-white/10 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all uppercase tracking-wider"
            >
              BARCHASINI KO'RISH
            </motion.button>
          </motion.div>

        </div>

      </div>
    </div>
  );
};
