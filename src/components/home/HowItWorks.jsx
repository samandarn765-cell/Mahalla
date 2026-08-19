import React from 'react';
import { Camera, Bot, CheckCircle2, ArrowRight } from 'lucide-react';
import { useMahalla } from '../../context/MahallaContext';
import { useTranslation } from 'react-i18next';

export const HowItWorks = () => {
  const { setIsReportModalOpen } = useMahalla();
  const { t } = useTranslation();

  const steps = [
    {
      step: '01',
      title: t('howItWorks.step1'),
      description: t('howItWorks.step1Desc'),
      icon: Camera,
      color: 'from-amber-500 to-yellow-400',
      badgeColor: 'text-amber-400 border-amber-500/30'
    },
    {
      step: '02',
      title: t('howItWorks.step2'),
      description: t('howItWorks.step2Desc'),
      icon: Bot,
      color: 'from-cyan-500 to-blue-500',
      badgeColor: 'text-cyan-400 border-cyan-500/30'
    },
    {
      step: '03',
      title: t('howItWorks.step3'),
      description: t('howItWorks.step3Desc'),
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-400',
      badgeColor: 'text-emerald-400 border-emerald-500/30'
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-2xl mx-auto mb-12 space-y-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Qulay va Tezkor Tizim
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('howItWorks.title')}
          </h2>
          <p className="text-sm text-slate-300">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative rounded-3xl glass-panel border border-white/10 p-8 glass-card-hover text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-slate-950 font-bold shadow-lg`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className={`text-2xl font-black font-heading px-3 py-1 rounded-xl bg-slate-900/80 border ${item.badgeColor}`}>
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-cyan-400">
                <span>Bosqich {index + 1} / 3</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
