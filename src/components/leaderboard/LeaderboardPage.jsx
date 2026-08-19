import React from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import {
  Trophy,
  Award,
  Crown,
  ThumbsUp,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LeaderboardPage = () => {
  const { leaderboard, rewards, addToast } = useMahalla();

  const top3 = leaderboard.slice(0, 3);

  const handleClaimReward = (reward) => {
    try {
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}
    addToast(`Tabriklaymiz! "${reward.title}" uchun arizangiz qabul qilindi.`, 'success');
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90 }}
          className="max-w-3xl mx-auto text-center mb-12 space-y-3"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Jamoaviy Faollik & Gamifikatsiya
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif-gold">
            Faol Fuqarolar <span className="text-gold-gradient">Reytingi</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Mahallamiz obodonchiligi uchun befarq bo'lmagan eng faol fuqarolarimiz va ularning erishgan yutuqlari.
          </p>
        </motion.div>

        {/* 3D Top-3 Podium with Spring Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 items-end">
          
          {/* Rank 2 (Silver) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.15 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="order-2 md:order-1 rounded-[28px] glass-panel border border-slate-400/30 p-6 text-center glass-card-hover flex flex-col items-center shadow-xl"
          >
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-slate-300 shadow-xl">
                <ImagePlaceholder
                  src={top3[1]?.avatar}
                  alt={top3[1]?.name}
                  placeholderText="#2"
                  icon={UserCheck}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-300 text-slate-950 shadow-md">
                #2
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-0.5">{top3[1]?.name}</h3>
            <span className="text-xs text-cyan-300 font-semibold">{top3[1]?.title}</span>
            <div className="mt-3 px-4 py-1.5 rounded-full bg-slate-800 text-xs font-black text-amber-400 border border-amber-500/20">
              {top3[1]?.points} ball
            </div>
          </motion.div>

          {/* Rank 1 (Gold with Crown 👑) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 85, damping: 18 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="order-1 md:order-2 rounded-[32px] glass-panel border-2 border-amber-400 p-8 text-center glass-card-gold-hover flex flex-col items-center -mt-4 shadow-[0_0_35px_rgba(245,158,11,0.25)] relative"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-2 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-xl animate-bounce">
              <Crown className="w-6 h-6" />
            </div>

            <div className="relative mb-4 mt-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl">
                <ImagePlaceholder
                  src={top3[0]?.avatar}
                  alt={top3[0]?.name}
                  placeholderText="1-O'rin"
                  icon={UserCheck}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-lg">
                1-O'RIN
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-0.5">{top3[0]?.name}</h3>
            <span className="text-xs text-amber-400 font-bold">{top3[0]?.badge}</span>
            <div className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-sm font-black text-slate-950 shadow-lg">
              {top3[0]?.points} Eco-Ball
            </div>
          </motion.div>

          {/* Rank 3 (Bronze) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.25 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="order-3 rounded-[28px] glass-panel border border-amber-700/40 p-6 text-center glass-card-hover flex flex-col items-center shadow-xl"
          >
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-700 shadow-xl">
                <ImagePlaceholder
                  src={top3[2]?.avatar}
                  alt={top3[2]?.name}
                  placeholderText="#3"
                  icon={UserCheck}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-700 text-amber-100 shadow-md">
                #3
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-0.5">{top3[2]?.name}</h3>
            <span className="text-xs text-cyan-300 font-semibold">{top3[2]?.title}</span>
            <div className="mt-3 px-4 py-1.5 rounded-full bg-slate-800 text-xs font-black text-amber-400 border border-amber-500/20">
              {top3[2]?.points} ball
            </div>
          </motion.div>

        </div>

        {/* 2-Column Split: Leaderboard Table & Rewards Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 85 }}
            className="lg:col-span-7 rounded-[30px] glass-panel border border-white/10 p-6 sm:p-7 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-serif-gold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Barcha Faol Fuqarolar</span>
              </h3>
              <span className="text-xs text-cyan-400 font-semibold">Har hafta yangilanadi</span>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user) => (
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  key={user.rank}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] hover:border-cyan-400/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-6 text-center font-black text-sm text-slate-400">
                      #{user.rank}
                    </span>
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-white/15">
                      <ImagePlaceholder
                        src={user.avatar}
                        alt={user.name}
                        placeholderText="User"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{user.name}</h4>
                      <p className="text-[11px] text-slate-400">{user.reportsCount} ta hal qilingan murojaat</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-bold text-amber-400 block font-heading">
                      {user.points} ball
                    </span>
                    <span className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1 justify-end">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{user.votesCount} ovoz</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Rewards Catalog */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 85 }}
            className="lg:col-span-5 rounded-[30px] glass-panel border border-white/10 p-6 sm:p-7 shadow-2xl text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-6">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="font-serif-gold text-white">Mahalla Sovg'alari & Rag'bat</span>
              </div>

              <div className="space-y-3.5">
                {rewards.map((reward) => (
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    key={reward.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col justify-between group hover:border-amber-400/40 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          {reward.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {reward.points} ball
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {reward.description}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleClaimReward(reward)}
                      className="mt-3 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Almashtirish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] text-center">
              <span className="text-[11px] text-slate-400">
                Ballar har bir tasdiqlangan va baholangan murojaat uchun avtomatik qo'shiladi.
              </span>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};
