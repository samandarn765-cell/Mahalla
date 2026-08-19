import React from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import {
  Zap,
  Droplets,
  Flame,
  ArrowRight,
  Activity
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UtilityStatus = () => {
  const { utilities, setActiveTab } = useMahalla();
  const { t } = useTranslation();

  const getIcon = (id) => {
    switch (id) {
      case 'electric':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'water':
        return <Droplets className="w-5 h-5 text-cyan-400" />;
      case 'gas':
        return <Flame className="w-5 h-5 text-amber-400" />;
      default:
        return <Activity className="w-5 h-5 text-white" />;
    }
  };

  const getBadgeStyle = (type) => {
    if (type === 'online') {
      return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30';
    }
    if (type === 'maintenance') {
      return 'bg-amber-950/80 text-amber-300 border-amber-500/30';
    }
    return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30';
  };

  const getProgressColor = (id) => {
    switch (id) {
      case 'electric':
        return 'bg-emerald-400';
      case 'water':
        return 'bg-cyan-400';
      case 'gas':
        return 'bg-amber-400';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header 1-to-1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{t('utilities.title')}</span>
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('admin')}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group"
          >
            <span>{t('utilities.details')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* 3 Status Cards Grid matching screenshot with Spring Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {utilities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 18,
                delay: index * 0.12
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.25 }
              }}
              className="relative rounded-3xl bg-[#141f3d] border border-[#252F43] p-6 sm:p-7 glass-card-hover text-left flex flex-col justify-between"
            >
              <div>
                {/* Top Icon and Status Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center shadow-inner">
                    {getIcon(item.id)}
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getBadgeStyle(item.type)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span>{t(`utilities.status.${item.type}`, { defaultValue: item.status })}</span>
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-white mb-2">{t(`utilities.items.${item.id}.title`, { defaultValue: item.title })}</h3>
                
                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                  {t(`utilities.items.${item.id}.desc`, { defaultValue: item.statusText })}
                </p>
              </div>

              {/* Progress Level Bar with spring fill */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>{t('utilities.stability')}</span>
                  <span className="font-bold text-white">{item.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 + index * 0.1 }}
                    className={`h-full rounded-full ${getProgressColor(item.id)}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
