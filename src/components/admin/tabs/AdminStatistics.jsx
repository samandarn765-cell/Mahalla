import React from 'react';
import { motion } from 'framer-motion';

export const AdminStatistics = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h3 className="text-xl font-bold text-white font-serif-gold mb-4">Statistika va Hisobotlar</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#141f3d] border border-[#252F43] shadow-lg flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-semibold uppercase mb-2">Jami Murojaatlar</div>
          <div className="text-2xl font-black text-white">1,248</div>
          <div className="text-[11px] text-emerald-400 mt-1">↗ +12% bu oy</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#141f3d] border border-[#252F43] shadow-lg flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-semibold uppercase mb-2">Hal qilinganlar</div>
          <div className="text-2xl font-black text-emerald-400">1,102</div>
          <div className="text-[11px] text-emerald-400 mt-1">↗ 88% muvaffaqiyat</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#141f3d] border border-[#252F43] shadow-lg flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-semibold uppercase mb-2">Jarayonda</div>
          <div className="text-2xl font-black text-amber-400">146</div>
          <div className="text-[11px] text-slate-400 mt-1">Mutaxassislar ishlamoqda</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#141f3d] border border-[#252F43] shadow-lg flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-semibold uppercase mb-2">Aholi qoniqishi</div>
          <div className="text-2xl font-black text-cyan-400">4.8/5.0</div>
          <div className="text-[11px] text-emerald-400 mt-1">↗ +0.2 o'tgan oydan</div>
        </div>
      </div>

      {/* Chart area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="p-6 rounded-[26px] bg-[#141f3d] border border-[#252F43] shadow-xl">
          <h4 className="text-sm font-bold text-white mb-6">Murojaatlar Dinamikasi (Oxirgi 6 oy)</h4>
          <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-white/10 p-4 pl-0">
            {[40, 70, 45, 90, 65, 100].map((h, i) => (
              <div key={i} className="w-full bg-cyan-500/20 hover:bg-cyan-500/40 transition-colors rounded-t-md relative group cursor-pointer" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity text-white pointer-events-none whitespace-nowrap">
                  {h * 12} ta
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">
                  {['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 rounded-[26px] bg-[#141f3d] border border-[#252F43] shadow-xl">
          <h4 className="text-sm font-bold text-white mb-6">Xizmatlar Bo'yicha Taqsimot</h4>
          <div className="space-y-6">
            {[
              { name: 'Elektr ta\'minoti', val: 75, color: 'bg-amber-400' },
              { name: 'Suv muammolari', val: 45, color: 'bg-cyan-400' },
              { name: 'Obodonlashtirish', val: 60, color: 'bg-emerald-400' },
              { name: 'Xavfsizlik', val: 20, color: 'bg-rose-400' }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300 font-semibold">{item.name}</span>
                  <span className="text-white font-bold">{item.val}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.val}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
