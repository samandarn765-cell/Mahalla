import React from 'react';
import { useMahalla } from '../../context/MahallaContext';
import {
  Send,
  Phone,
  MapPin,
  Clock,
  ShieldAlert,
  Heart,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import logoImg from '../../assets/logo/logo.png';

export const Footer = () => {
  const { setActiveTab, mahallaInfo } = useMahalla();

  return (
    <footer className="relative mt-20 border-t border-white/[0.08] bg-[#070B16] text-slate-400 overflow-hidden z-10">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-gradient-to-t from-cyan-950/30 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#1E293B] overflow-hidden">
                <img
                  src={logoImg}
                  alt="Emblem"
                  loading="lazy"
                  decoding="async"
                  width="40"
                  height="40"
                  className="w-full h-full object-cover filter drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Mening <span className="text-amber-400 font-serif-gold">Mahallam</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Mahalla fuqarolari va boshqaruvi o'rtasidagi zamonaviy raqamli ko'prik. Shaffoflik, tezkorlik va jamoaviy hamkorlik platformasi.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-cyan-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Innovatsion CivicTech Ekotizimi</span>
            </div>
          </div>

          {/* Col 2: Sahifalar & Havolalar */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Tezkor Sahifalar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Asosiy Sahifa
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Yangiliklar va E'lonlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Mahalla Haqida & Rahbariyat
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Murojaat Yuborish & Ustalari
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('leaderboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Faol Fuqarolar Reytingi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Bog'lanish & Manzil */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Aloqa Ma'lumotlari</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{mahallaInfo.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{mahallaInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{mahallaInfo.workingHours}</span>
              </div>
              <div className="flex items-center gap-2.5 text-amber-400">
                <Send className="w-4 h-4 shrink-0" />
                <span className="font-semibold">{mahallaInfo.telegramBot}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Shoshilinch Xizmatlar */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Shoshilinch Xizmatlar</span>
            </h4>
            <p className="text-xs text-slate-400">Favqulodda vaziyatlarda 24/7 tezkor xizmatlar raqamlari:</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <div className="p-2 rounded-xl bg-red-950/30 border border-red-500/20 text-red-300 flex items-center justify-between">
                <span>Tez Yordam</span>
                <span className="font-bold text-red-400">103</span>
              </div>
              <div className="p-2 rounded-xl bg-blue-950/30 border border-blue-500/20 text-blue-300 flex items-center justify-between">
                <span>IIB / Militsiya</span>
                <span className="font-bold text-blue-400">102</span>
              </div>
              <div className="p-2 rounded-xl bg-orange-950/30 border border-orange-500/20 text-orange-300 flex items-center justify-between">
                <span>Yong'in</span>
                <span className="font-bold text-orange-400">101</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-300 flex items-center justify-between">
                <span>Gaz Avariya</span>
                <span className="font-bold text-amber-400">104</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Mening Mahallam</span>
            <span>© 2024 Barcha huquqlar himoyalangan.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>Telegram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setActiveTab('about')}
              className="hover:text-cyan-400 transition-colors"
            >
              Bog'lanish
            </button>
            <a href="#privacy" className="hover:text-cyan-400 transition-colors">
              Maxfiylik
            </a>
            <a href="/admin" className="text-slate-600 hover:text-amber-400 transition-colors ml-4" title="Admin Panel">
              <ShieldAlert className="w-3 h-3 inline-block mr-1 opacity-50" />
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
