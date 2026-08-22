import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, ShieldAlert, Flame, Ambulance, TriangleAlert, Fuel, X } from 'lucide-react';
import { useMahalla } from '../../context/MahallaContext';

export const SOSButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { emergencyContacts } = useMahalla();

  // Map icon strings to actual components
  const iconMap = {
    Ambulance: <Ambulance className="w-5 h-5" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5" />,
    Flame: <Flame className="w-5 h-5" />,
    Fuel: <Fuel className="w-5 h-5" />,
    PhoneCall: <PhoneCall className="w-5 h-5" />
  };

  return (
    <div className="fixed bottom-28 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            role="region"
            aria-label="Favqulodda yordam xizmatlari ro'yxati"
            className="absolute bottom-20 right-0 mb-2 w-72 glass-panel bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-red-500/30 flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between mb-1 pb-2 border-b border-white/10">
              <h3 className="text-red-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <TriangleAlert className="w-4 h-4" /> Favqulodda Yordam (SOS)
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Yopish"
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {emergencyContacts?.map((contact, idx) => (
              <motion.a
                key={idx}
                href={`tel:${contact.number}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`${contact.title} - ${contact.number}`}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="p-2 rounded-lg text-white shadow-lg"
                    style={{ backgroundColor: contact.color || '#ef4444' }}
                  >
                    {iconMap[contact.icon] || <PhoneCall className="w-4 h-4" />}
                  </div>
                  <span className="text-slate-200 text-xs font-semibold group-hover:text-white transition-colors">
                    {contact.title}
                  </span>
                </div>
                <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md text-xs font-bold font-mono border border-red-500/20">
                  {contact.number}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Favqulodda SOS xizmatlarini ochish"
        aria-expanded={isOpen}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center shadow-red-500/50 shadow-xl border-2 border-white/20 hover:border-white/50 transition-all relative cursor-pointer"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-30 pointer-events-none" />
        <PhoneCall className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 ${isOpen ? 'rotate-[135deg]' : ''}`} />
      </motion.button>
    </div>
  );
};
