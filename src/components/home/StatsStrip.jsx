import React from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import {
  CheckCircle,
  Users,
  Clock,
  TreePine,
  TrendingUp
} from 'lucide-react';

export const StatsStrip = () => {
  const { mahallaInfo } = useMahalla();

  const stats = [
    {
      id: 1,
      title: 'Hal etilgan Murojaatlar',
      value: '1,420+',
      subtext: '+18% o\'tgan oydan',
      icon: CheckCircle,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      id: 2,
      title: 'Faol Fuqarolar',
      value: '3,850+',
      subtext: '98.4% qoniqish indeksi',
      icon: Users,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20'
    },
    {
      id: 3,
      title: "O'rtacha Javob Vaqti",
      value: '4.2 soat',
      subtext: 'Toshkent bo\'yicha top-3',
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      id: 4,
      title: 'Yashil Mahalla Loyihalari',
      value: '28 ta',
      subtext: "2000+ ekilgan daraxtlar",
      icon: TreePine,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    }
  ];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 18,
                delay: index * 0.1
              }}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className={`relative rounded-3xl glass-panel p-5 sm:p-6 border ${item.borderColor} glass-card-hover text-left flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">{item.title}</span>
                <div className={`p-2 rounded-xl ${item.bgColor} ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className={`text-2xl sm:text-3xl font-black ${item.color} tracking-tight font-heading`}>
                  {item.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 inline text-emerald-400" />
                  <span>{item.subtext}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
