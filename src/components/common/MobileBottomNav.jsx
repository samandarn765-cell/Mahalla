import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Newspaper, Plus, MessageCircle, Briefcase } from 'lucide-react';

export const MobileBottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#121626] border-t border-gray-200 dark:border-white/5 rounded-t-[20px] px-4 py-2 flex items-center justify-between pb-safe shadow-[0_-4px_15px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors duration-300">
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 w-16 transition-all duration-300 ${
            isActive ? 'text-emerald-600 dark:text-white' : 'text-gray-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-slate-300'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <div className={`relative ${isActive ? 'dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}`}>
              <Home className={`w-6 h-6 ${isActive ? 'dark:fill-white/20 fill-emerald-100 dark:text-white text-emerald-600' : ''}`} />
            </div>
            <span className="text-[10px] font-medium tracking-wide">Asosiy</span>
          </>
        )}
      </NavLink>

      {/* News */}
      <NavLink
        to="/news"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 w-16 transition-all duration-300 ${
            isActive ? 'text-emerald-600 dark:text-white' : 'text-gray-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-slate-300'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <div className={`relative ${isActive ? 'dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}`}>
              <Newspaper className={`w-6 h-6 ${isActive ? 'dark:fill-white/20 fill-emerald-100 dark:text-white text-emerald-600' : ''}`} />
            </div>
            <span className="text-[10px] font-medium tracking-wide">Yangiliklar</span>
          </>
        )}
      </NavLink>

      {/* Report (Hisobot) - FAB (Floating Action Button) style */}
      <NavLink
        to="/services"
        className="flex flex-col items-center justify-center -mt-6 w-16 group"
      >
        <div className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] border-[4px] border-white dark:border-[#121626] transition-all">
          <Plus className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-[10px] font-medium text-gray-500 dark:text-slate-400 tracking-wide mt-1">Hisobot</span>
      </NavLink>

      {/* Chat */}
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 w-16 transition-all duration-300 ${
            isActive ? 'text-emerald-600 dark:text-white' : 'text-gray-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-slate-300'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <div className={`relative ${isActive ? 'dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}`}>
              <MessageCircle className={`w-6 h-6 ${isActive ? 'dark:fill-white/20 fill-emerald-100 dark:text-white text-emerald-600' : ''}`} />
            </div>
            <span className="text-[10px] font-medium tracking-wide">Suhbat</span>
          </>
        )}
      </NavLink>

      {/* Marketplace (Ustalar) */}
      <NavLink
        to="/marketplace"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 w-16 transition-all duration-300 ${
            isActive ? 'text-emerald-600 dark:text-white' : 'text-gray-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-slate-300'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <div className={`relative ${isActive ? 'dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}`}>
              <Briefcase className={`w-6 h-6 ${isActive ? 'dark:fill-white/20 fill-emerald-100 dark:text-white text-emerald-600' : ''}`} />
            </div>
            <span className="text-[10px] font-medium tracking-wide">Ustalar</span>
          </>
        )}
      </NavLink>
    </div>
  );
};
