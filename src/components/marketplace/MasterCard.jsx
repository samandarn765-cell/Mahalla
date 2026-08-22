import React from 'react';
import { Star, Phone, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const MasterCard = ({ master }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-xl group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={master.avatar} 
          alt={master.name} 
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute top-3 left-3 bg-emerald-500/90 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4" /> Ishonchli Usta
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{master.name}</h3>
          <p className="text-cyan-400 text-sm font-medium">{master.specialty}</p>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-amber-400 font-bold text-sm">{master.rating}</span>
          </div>
          <span className="text-slate-400 text-sm flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            {master.jobsCount} ta ish
          </span>
        </div>
        
        <p className="text-slate-300 text-sm line-clamp-2">
          {master.description}
        </p>
        
        <div className="text-xs text-slate-400">
          Tajriba: <span className="text-slate-200 font-medium">{master.experience}</span>
        </div>

        <motion.a 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={`tel:${master.phone}`}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-cyan-500/25"
        >
          <Phone className="w-4 h-4" /> Bog'lanish
        </motion.a>
      </div>
    </motion.div>
  );
};
