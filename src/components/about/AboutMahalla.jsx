import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import {
  Users,
  Compass,
  Star,
  Phone,
  Send,
  UserCheck
} from 'lucide-react';

export const AboutMahalla = () => {
  const { mahallaInfo, leaders, addToast } = useMahalla();
  const [activeMapPin, setActiveMapPin] = useState(null);

  const mapLocations = [
    { id: 1, name: "Mahalla Fuqarolar Yig'ini Guzari", top: "45%", left: "50%" },
    { id: 2, name: "24-sonli Umumta'lim Maktabi", top: "25%", left: "30%" },
    { id: 3, name: "18-sonli Oilaviy Poliklinika", top: "65%", left: "70%" },
    { id: 4, name: "Yashil Xiyobon & Sport Maydonchasi", top: "35%", left: "75%" },
    { id: 5, name: "Ichki Ishlar Tayanch Punkti", top: "70%", left: "25%" }
  ];

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header 1-to-1 from Screenshot 3 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90 }}
          className="max-w-3xl mb-12 text-left space-y-3"
        >
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Mahalla Haqida
          </span>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Tarixiy an'analar va zamonaviy taraqqiyot uyg'unlashgan maskan. Mahallamiz haqida umumiy ma'lumotlar, demografik ko'rsatkichlar va rahbariyat bilan tanishing.
          </p>
        </motion.div>

        {/* Top Grid: Demografiya & Hudud Xaritasi (1-to-1 matching Screenshot 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left: Demografiya Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 85, damping: 18 }}
            className="lg:col-span-5 rounded-[28px] glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Card Title */}
              <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-6">
                <Users className="w-5 h-5 text-amber-400" />
                <span className="font-serif-gold">Demografiya</span>
              </div>

              {/* Stats Bars with animated springs */}
              <div className="space-y-5 mb-8">
                {/* 1. Umumiy Aholi */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-300">Umumiy Aholi</span>
                    <span className="text-cyan-400 font-bold text-sm">12,450</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                  </div>
                </div>

                {/* 2. Xonadonlar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-300">Xonadonlar</span>
                    <span className="text-emerald-400 font-bold text-sm">3,120</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '65%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    />
                  </div>
                </div>

                {/* 3. Yoshlar (18-30) */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-300">Yoshlar (18-30)</span>
                    <span className="text-amber-400 font-bold text-sm">4,200</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '45%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-400"
                    />
                  </div>
                </div>
              </div>

              {/* Ko'chalar Ro'yxati */}
              <div className="pt-4 border-t border-white/[0.08]">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3">
                  Ko'chalar Ro'yxati:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {mahallaInfo.streets.map((street, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="truncate">{street}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Hudud Xaritasi Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 85, damping: 18 }}
            className="lg:col-span-7 rounded-[28px] glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            {/* Map Header */}
            <div className="flex items-center justify-between mb-4 z-10">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>Hudud Xaritasi</span>
              </div>
              <span className="text-xs font-semibold text-slate-400">Yunusobod tumani, 7-mavze</span>
            </div>

            {/* Interactive Map Display */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1000&auto=format&fit=crop&q=80"
                alt="Interactive Mahalla Map"
                className="w-full h-full object-cover filter contrast-125 brightness-75 opacity-60"
              />
              <div className="absolute inset-0 bg-[#0A0F1D]/50" />

              {/* Central Map Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-3xl font-black text-white/40 tracking-widest font-heading">
                  TOSHKENT
                </span>
                <p className="text-xs font-bold text-cyan-400 tracking-wider">Mening Mahallam Hududi</p>
              </div>

              {/* Interactive Glowing Map Pins */}
              {mapLocations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => {
                    setActiveMapPin(loc);
                    addToast(`Tanlandi: ${loc.name}`, 'info');
                  }}
                  className="absolute cursor-pointer group transform -translate-x-1/2 -translate-y-1/2"
                  style={{ top: loc.top, left: loc.left }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-cyan-400/30 animate-ping absolute" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-cyan-400 border-2 border-white shadow-lg group-hover:scale-125 transition-transform" />
                  </div>

                  <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900/95 border border-cyan-400/40 text-[10px] font-bold text-white shadow-xl z-20">
                    {loc.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-400 z-10">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Boshqaruv Markazi</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Maktab va Bog'chalar</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Yashil Xiyobonlar</span>
            </div>
          </motion.div>

        </div>

        {/* Decorative Star Divider */}
        <div className="flex items-center justify-center gap-2 mb-10 text-cyan-400">
          <Star className="w-3.5 h-3.5 fill-cyan-400" />
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <Star className="w-3.5 h-3.5 fill-cyan-400" />
        </div>

        {/* Section 2: Rahbariyat (Leadership Profiles) 1-to-1 matching Screenshot 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-gold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200">
              Rahbariyat
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mahalla faollari va mas'ul shaxslar bilan bog'lanish
          </p>
        </motion.div>

        {/* 4 Profile Cards Grid from Screenshot 3 with ImagePlaceholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.slice(0, 4).map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 85,
                damping: 18,
                delay: index * 0.1
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.25 }
              }}
              className="rounded-[26px] glass-panel border border-white/10 p-6 glass-card-hover text-center flex flex-col items-center justify-between shadow-xl"
            >
              <div className="w-full">
                {/* Avatar with cyan/gold border and Fallback Image Placeholder */}
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-cyan-400/40 p-1 bg-slate-900 shadow-lg">
                  <ImagePlaceholder
                    src={leader.avatar}
                    alt={leader.name}
                    placeholderText="Rahbar surati"
                    icon={UserCheck}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-white mb-1">{leader.name}</h3>
                
                {/* Role */}
                <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 mb-3">
                  {leader.role}
                </span>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[32px] line-clamp-2 mb-4">
                  {leader.bio}
                </p>
              </div>

              {/* Action Buttons: Telefon & Telegram (Matching Screenshot 3) */}
              <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.06]">
                <a
                  href={`tel:${leader.phone}`}
                  className="py-2 px-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 text-[11px] font-semibold text-slate-200 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Telefon</span>
                </a>

                <a
                  href={`https://t.me/${leader.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-amber-400/50 text-[11px] font-semibold text-slate-200 hover:text-amber-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Telegram</span>
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
