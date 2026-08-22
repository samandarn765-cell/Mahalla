import React from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { useTranslation } from 'react-i18next';
import {
  HeartHandshake,
  TrendingUp,
  Sparkles,
  Users,
  ShieldCheck,
  ArrowRight,
  Target,
  CheckCircle2
} from 'lucide-react';

export const MahallaFundCard = () => {
  const { fundStats, paymentsList, setIsFundModalOpen } = useMahalla();
  const { t } = useTranslation();

  const collected = fundStats?.collected_amount ?? 0;
  const target = fundStats?.target_amount || 50000000;
  const percentage = target > 0 ? Math.min(Math.round((collected / target) * 100), 100) : 0;
  const contributors = fundStats?.contributors_count ?? 0;

  return (
    <section className="py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-br from-emerald-950/90 via-[#0d1e2e]/95 to-[#0b1728]/95 border border-emerald-500/30 p-6 sm:p-10 overflow-hidden shadow-2xl backdrop-blur-xl"
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Ochiq Byudjet & Mahalla Jamg'armasi</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                Mahallamiz kelajagiga <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">birgalikda hissa qo'shamiz</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                Har bir so'm 100% shaffof va ochiq sarflanadi. Homiylik yoki obodonlashtirish badali to'lab, darhol rasmiy QR-kodli elektron chek oling.
              </p>

              {/* Current Project Goal Badge */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Hozirgi maqsadli loyiha:</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {fundStats?.target_title || "Bolalar o'yingohi va 'Yashil Makon' xiyoboni barpo etish"}
                  </div>
                </div>
              </div>

              {/* Action Button & Payment Gateways */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsFundModalOpen(true)}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm sm:text-base shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.45)] transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
                >
                  <HeartHandshake className="w-5 h-5 text-slate-950" />
                  <span>Hissa qo'shish / To'lov qilish</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-cyan-400 font-bold">Payme</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-blue-400 font-bold">Click</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-purple-400 font-bold">Uzum</span>
                </div>
              </div>
            </div>

            {/* Right Live Statistics & Progress Column */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-6">
                {/* Stats row */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Yig'ilgan mablag'</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                      {collected.toLocaleString('uz-UZ')} <span className="text-sm font-bold text-emerald-400">UZS</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Maqsad</div>
                    <div className="text-sm sm:text-base font-bold text-slate-300 font-mono mt-1">
                      {target.toLocaleString('uz-UZ')} UZS
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Reja ijrosi</span>
                    <span className="text-emerald-400">{percentage}%</span>
                  </div>
                  <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Contributors Count & Security Info */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Homiylar soni</span>
                    </div>
                    <div className="text-lg font-bold text-white mt-1">{contributors} nafar</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Shaffoflik</span>
                    </div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">100% Ochiq</div>
                  </div>
                </div>

                {/* Mini Recent Transactions Ticker */}
                {paymentsList && paymentsList.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Oxirgi tushumlar:</div>
                    <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                      {paymentsList.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs text-slate-300 bg-white/[0.03] px-2.5 py-1.5 rounded-lg">
                          <span className="truncate max-w-[140px] font-medium">{item.payer_name || "Mahalla faoli"}</span>
                          <span className="font-mono font-bold text-emerald-400">+{Number(item.amount).toLocaleString('uz-UZ')} UZS</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
