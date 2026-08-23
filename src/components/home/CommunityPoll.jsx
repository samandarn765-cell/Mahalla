import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CommunityPoll = () => {
  const { t } = useTranslation();
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const pollQuestion = t('poll.question', { defaultValue: "Mahallamiz markaziga nima qurishni taklif qilasiz?" });
  
  const [options, setOptions] = useState([
    { id: 1, text: t('poll.opt1', { defaultValue: "Zamonaviy bolalar maydonchasi" }), votes: 145, color: "bg-cyan-500" },
    { id: 2, text: t('poll.opt2', { defaultValue: "Workout va sport maydonchasi" }), votes: 89, color: "bg-emerald-500" },
    { id: 3, text: t('poll.opt3', { defaultValue: "Keksalar uchun yashil xiyobon" }), votes: 112, color: "bg-amber-500" },
    { id: 4, text: t('poll.opt4', { defaultValue: "Avtoturargoh" }), votes: 45, color: "bg-rose-500" }
  ]);

  const totalVotes = options.reduce((acc, curr) => acc + curr.votes, 0);

  const handleVote = (id) => {
    if (hasVoted) return;
    setOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
    ));
    setSelectedOption(id);
    setHasVoted(true);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30 shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <PieChart className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-1 block">{t('poll.title', { defaultValue: "Haftalik So'rovnoma" })}</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{pollQuestion}</h2>
              <p className="text-slate-400 text-sm mt-2">{t('poll.totalVotes', { defaultValue: "Jami ovozlar:" })} <span className="text-white font-bold">{totalVotes}</span></p>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            {options.map((option, idx) => {
              const percentage = Math.round((option.votes / totalVotes) * 100);
              const isSelected = selectedOption === option.id;

              return (
                <div key={option.id} className="relative">
                  <button
                    onClick={() => handleVote(option.id)}
                    disabled={hasVoted}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                      hasVoted 
                        ? 'border-white/5 bg-white/5 cursor-default' 
                        : 'border-white/10 bg-white/5 hover:border-cyan-500/50 hover:bg-white/10 cursor-pointer'
                    } ${isSelected ? 'border-cyan-500/50 ring-1 ring-cyan-500/50' : ''}`}
                  >
                    {/* Progress Bar Background (shows after vote) */}
                    {hasVoted && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute top-0 left-0 bottom-0 opacity-20 ${option.color}`}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-cyan-400 bg-cyan-400/20' : 'border-slate-500 group-hover:border-cyan-400'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <span className={`font-medium ${hasVoted ? 'text-slate-200' : 'text-slate-300 group-hover:text-white'}`}>
                          {option.text}
                        </span>
                      </div>
                      
                      {hasVoted && (
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="font-bold text-white text-lg"
                        >
                          {percentage}%
                        </motion.span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
          
          {hasVoted && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-emerald-400 font-medium mt-6 text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Ovozingiz qabul qilindi. Rahmat!
            </motion.p>
          )}

        </div>
      </div>
    </section>
  );
};
