import React from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Camera,
  Compass,
  CheckCircle2,
  Zap,
  ShieldCheck,
  TrendingUp,
  Sun,
  Activity
} from 'lucide-react';
import logoImg from '../../assets/logo/logo.png';
import { ASSETS } from '../../assets/assetsManager';

export const HeroSection = () => {
  const { setActiveTab, setIsReportModalOpen } = useMahalla();
  const { t } = useTranslation();

  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Card 1-to-1 Layout with Organic Spring Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 85, damping: 18 }}
          className="relative rounded-[32px] bg-white dark:bg-[#141f3d] border border-gray-200 dark:border-[#252F43] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-colors duration-300"
        >
          {/* Subtle static gradient glow accents */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-inner"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 -ml-3" />
                <span>{t('hero.active')}</span>
              </motion.div>

              {/* Exact Golden Serif Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 90 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.15]"
              >
                <span className="text-amber-500 dark:text-gold-gradient font-serif-gold block drop-shadow-md">
                  {t('hero.title')}
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-600 dark:text-slate-300 mt-2 block">
                  {t('hero.subtitle')}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal"
              >
                {t('hero.desc')}
              </motion.p>

              {/* Exact CTA Buttons with Organic Spring Hovers */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('about')}
                  className="px-7 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all duration-300 flex items-center gap-2"
                >
                  <Compass className="w-5 h-5 text-slate-900" />
                  <span>{t('hero.introBtn')}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-7 py-3.5 rounded-2xl font-bold text-white bg-slate-800 dark:bg-slate-900/80 hover:bg-slate-700 dark:hover:bg-slate-800 border border-transparent dark:border-white/15 dark:hover:border-cyan-400/50 shadow-lg dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center gap-2"
                >
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <span>{t('hero.reportBtn')}</span>
                </motion.button>
              </motion.div>

              {/* Micro-stats features */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-200 dark:border-white/[0.08] text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span className="text-gray-700 dark:text-slate-300 font-medium">{t('hero.feat1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                  <span className="text-gray-700 dark:text-slate-300 font-medium">{t('hero.feat2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                  <span className="text-gray-700 dark:text-slate-300 font-medium">{t('hero.feat3')}</span>
                </div>
              </div>
            </div>

            {/* Right Visual 3D Isometric Interactive Mahalla Model */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-gray-200 dark:border-cyan-500/20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-gray-300 dark:border-amber-500/20 animate-spin" style={{ animationDuration: '60s' }} />
                
                {/* Center Glowing Mahalla Core */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-white dark:bg-gradient-to-tr dark:from-cyan-950/60 dark:via-slate-900/90 dark:to-amber-950/40 p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-md dark:shadow-[0_0_50px_rgba(6,182,212,0.25)] border border-gray-200 dark:border-white/10 relative overflow-hidden"
                >
                  <img
                    src={logoImg}
                    alt="Mahalla Emblem"
                    className="w-full h-full object-contain filter drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  />
                  <span className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                    Smart Mahalla 2024
                  </span>
                </motion.div>

                {/* Floating 3D status badge 1: Solar Lighting */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 left-4 p-3 rounded-2xl bg-white dark:bg-slate-900/50 backdrop-blur-md border border-cyan-200 dark:border-cyan-400/40 shadow-lg flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-gray-800 dark:text-white">{t('hero.solar')}</div>
                    <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">{t('hero.auto')}</div>
                  </div>
                </motion.div>

                {/* Floating 3D status badge 2: Active Citizens */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 right-2 p-3 rounded-2xl bg-white dark:bg-slate-900/50 backdrop-blur-md border border-amber-200 dark:border-amber-400/40 shadow-lg flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-gray-800 dark:text-white">3,850+ {t('hero.citizens')}</div>
                    <div className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold">{t('hero.rating')}</div>
                  </div>
                </motion.div>

                {/* Floating 3D status badge 3: 24/7 Monitoring */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 -right-6 -translate-y-1/2 p-2.5 rounded-2xl bg-white dark:bg-slate-900/50 backdrop-blur-md border border-emerald-200 dark:border-emerald-400/40 shadow-lg flex items-center gap-2"
                >
                  <Activity className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300">{t('hero.monitor')}</span>
                </motion.div>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
