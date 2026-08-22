import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { useTranslation } from 'react-i18next';
import {
  Camera,
  CheckCircle2,
  Zap,
  TrendingUp,
  Sun,
  Activity,
  Compass
} from 'lucide-react';

export const HeroSection = () => {
  const { setIsReportModalOpen } = useMahalla();
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  // Smooth scroll-driven shrink animation for the 3D model
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const modelScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.84]);
  const modelOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.8]);

  return (
    <section ref={sectionRef} className="relative pt-4 sm:pt-6 pb-8 sm:pb-12">
      {/* Hero Atmosphere Background Layer - Fully covers the entire Hero section */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 86%, rgba(0,0,0,0.5) 94%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 86%, rgba(0,0,0,0.5) 94%, transparent 100%)'
        }}
      >
        <motion.div 
          animate={{ scale: [1.45, 1.55, 1.45] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-14 sm:-inset-20 origin-center"
          style={{
            backgroundImage: "url('/image copy.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Subtle Adaptive Overlay for Crisp Contrast */}
          <div className="absolute inset-0 bg-white/30 dark:bg-[#0A0F1D]/50" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative rounded-3xl bg-white/85 dark:bg-[#141f3d]/85 backdrop-blur-2xl border border-white/60 dark:border-[#252F43]/90 p-6 sm:p-8 lg:p-10 overflow-hidden shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-colors duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              
              {/* Status Badge without pulsing animation */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-semibold shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>{t('hero.active', { defaultValue: 'Tizim faol' })}</span>
              </div>

              {/* Exact Golden Serif Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.14]">
                <span className="text-amber-500 dark:text-gold-gradient font-serif-gold block drop-shadow-md">
                  {t('hero.title', { defaultValue: "Mahalla Yo'riqnomasi" })}
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-cyan-400 block mt-2 font-heading tracking-normal">
                  {t('hero.subtitle', { defaultValue: 'Raqamli Boshqaruv Markazi' })}
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
                {t('hero.desc', { 
                  defaultValue: "Zamonaviy boshqaruv va raqamli xizmatlar orqali mahallamizni birgalikda rivojlantiramiz. Barcha muhim ma'lumotlar, murojaatlar va xizmatlar bir joyda." 
                })}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-sm sm:text-base shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_32px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 hover:scale-[1.02]"
                >
                  <Camera className="w-5 h-5 text-slate-950" />
                  <span>{t('hero.reportBtn', { defaultValue: 'Xabar berish' })}</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('utilities-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#0c182c] dark:hover:bg-[#10223f] text-gray-800 dark:text-slate-200 font-bold text-sm sm:text-base border border-gray-300 dark:border-cyan-500/30 transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 hover:scale-[1.02] shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                >
                  <Compass className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                  <span>{t('hero.introBtn', { defaultValue: 'Tanishuv' })}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs sm:text-sm font-semibold text-gray-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>100% Shaffof</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>Tezkor ijro</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  <span>To'g'ridan-to'g'ri Aloqa</span>
                </div>
              </div>

            </div>

            {/* Right Visual 3D Interactive Mahalla Model */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-80 h-80 sm:w-[460px] sm:h-[460px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">
                
                {/* 3D Mahalla Model with scroll shrink animation */}
                <motion.div 
                  style={{ scale: modelScale, opacity: modelOpacity }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full h-full flex flex-col items-center justify-center text-center relative z-10"
                >
                  <img
                    src="/image.png"
                    alt="Mahalla 3D Model"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width="500"
                    height="500"
                    className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.65)] scale-[1.5] sm:scale-[1.62]"
                  />
                </motion.div>

                {/* Floating status badge 1: Solar Lighting (Close to 3D model with full readable size) */}
                <div className="absolute top-5 left-5 sm:top-8 sm:left-10 p-2.5 sm:p-3 rounded-2xl bg-[#091222]/92 dark:bg-[#070e1b]/95 backdrop-blur-md border border-cyan-500/40 shadow-[0_4px_25px_rgba(6,182,212,0.35)] flex items-center gap-2.5 sm:gap-3 z-30 transition-all hover:scale-105">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      {t('hero.solar', { defaultValue: 'Quyosh Chiroqlari' })}
                    </div>
                    <div className="text-[10px] sm:text-xs text-emerald-400 font-semibold mt-0.5">
                      {t('hero.auto', { defaultValue: '100% Avtomatlashtirilgan' })}
                    </div>
                  </div>
                </div>

                {/* Floating status badge 2: 24/7 Monitoring (Close to 3D model right edge with full readable size) */}
                <div className="absolute top-[48%] right-3 sm:right-8 -translate-y-1/2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-[#091222]/92 dark:bg-[#070e1b]/95 backdrop-blur-md border border-emerald-500/50 shadow-[0_4px_25px_rgba(16,185,129,0.35)] flex items-center gap-2 z-30 transition-all hover:scale-105">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 tracking-wide">
                    {t('hero.monitor', { defaultValue: '24/7 Monitoring' })}
                  </span>
                </div>

                {/* Floating status badge 3: Active Citizens (Close to 3D model bottom right with full readable size) */}
                <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-10 p-2.5 sm:p-3 rounded-2xl bg-[#091222]/92 dark:bg-[#070e1b]/95 backdrop-blur-md border border-amber-500/40 shadow-[0_4px_25px_rgba(245,158,11,0.35)] flex items-center gap-2.5 sm:gap-3 z-30 transition-all hover:scale-105">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      {t('hero.citizens', { defaultValue: 'Faol Rezident' })}
                    </div>
                    <div className="text-[10px] sm:text-xs text-amber-400 font-semibold mt-0.5">
                      {t('hero.rating', { defaultValue: 'Reytingda ishtirokchi' })}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
