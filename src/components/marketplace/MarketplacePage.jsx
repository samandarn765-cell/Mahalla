import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Wrench, Zap, BookOpen, HeartPulse, HardHat } from 'lucide-react';
import { useMahalla } from '../../context/MahallaContext';
import { MasterCard } from './MasterCard';

export const MarketplacePage = () => {
  const { masters } = useMahalla();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Barchasi');

  const categories = [
    { id: 'Barchasi', icon: <Search className="w-4 h-4" /> },
    { id: 'Santexnik', icon: <Wrench className="w-4 h-4" /> },
    { id: 'Elektrik', icon: <Zap className="w-4 h-4" /> },
    { id: 'Repetitor', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Hamshira', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'Duradgor', icon: <HardHat className="w-4 h-4" /> }
  ];

  const filteredMasters = masters.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Barchasi' || m.specialty.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-4 tracking-tight"
        >
          Mahalla <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 drop-shadow-[0_4px_20px_rgba(249,115,22,0.4)]">Xizmatlari</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          Mahallamizning ishonchli va tajribali ustalarini shu yerdan toping.
          Barcha mutaxassislar tekshirilgan va kafolatlangan.
        </motion.p>
      </div>

      {/* Search and Filters */}
      <div className="mb-10 space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Usta yoki xizmat turini izlash..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-lg"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id 
                  ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.icon} {cat.id}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMasters.map((master, idx) => (
          <MasterCard key={master.id} master={master} />
        ))}
        {filteredMasters.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400">
            Kechirasiz, bunday xizmat turi bo'yicha usta topilmadi.
          </div>
        )}
      </div>
    </div>
  );
};
