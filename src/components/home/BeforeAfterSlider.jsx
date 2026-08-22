import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BeforeAfterSlider = () => {
  const { t } = useTranslation();
  const [sliderPos, setSliderPos] = useState(50);

  const cases = [
    {
      id: 1,
      title: "Alisher Navoiy ko'chasi — Yo'l va chiroqlar yangilandi",
      beforeImg: "/src/assets/images/road-before.jpg",
      afterImg: "/src/assets/images/road-after.jpg",
      category: "Yo'l va Yoritish",
      time: "3 kun ichida hal etildi"
    }
  ];

  const current = cases[0];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {t('beforeAfter.title')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
              {t('beforeAfter.title')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            {t('beforeAfter.subtitle')}
          </p>
        </div>

        {/* Interactive Comparison Card */}
        <div className="relative rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl p-4 sm:p-6">
          <div className="relative w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden select-none">
            
            {/* After Image (Full width background) */}
            <img
              src={current.afterImg}
              alt="After Fix"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-emerald-600/90 text-white text-xs font-bold shadow-lg">
              ✨ Keyin (Bajarildi)
            </div>

            {/* Before Image (Clipped by slider position) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={current.beforeImg}
                alt="Before Fix"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-slate-900/90 text-amber-300 text-xs font-bold border border-white/10 shadow-lg">
                ⚠️ Oldin (Muammo)
              </div>
            </div>

            {/* Draggable Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_#22d3ee] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-500 border-2 border-white shadow-xl flex items-center justify-center text-slate-950">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Range Input for Dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold text-white text-sm">{current.title}</span>
            <span className="text-emerald-400 font-semibold">{current.time}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
