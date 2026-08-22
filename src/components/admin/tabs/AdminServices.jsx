import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Wrench } from 'lucide-react';

export const AdminServices = ({
  servicesList,
  setIsAddServiceModalOpen,
  addToast
}) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-7 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white font-serif-gold">Xizmatlar Boshqaruvi</h3>
          <p className="text-slate-400 text-sm">Aholi uchun mavjud usta va maishiy xizmatlar ro'yxati.</p>
        </div>
        <button 
          onClick={() => setIsAddServiceModalOpen(true)}
          className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Yangi Xizmat</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicesList.map((service) => (
          <div 
            key={service.id} 
            className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between hover:bg-slate-800/90 transition-all hover:border-cyan-500/30 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {service.icon || '🛠️'}
              </div>
              <div>
                <h4 className="text-white font-bold text-base">{service.name}</h4>
                <p className="text-xs text-slate-400">{service.count || 5} ta ro'yxatdan o'tgan usta</p>
              </div>
            </div>
            <button 
              onClick={() => addToast(`'${service.name}' xizmati tahrirlash ochildi`, 'info')}
              className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-colors"
              title="Tahrirlash"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
