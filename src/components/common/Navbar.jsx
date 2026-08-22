import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useMahalla } from '../../context/MahallaContext';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  User,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import logoImg from '../../assets/logo/logo.png';

export const Navbar = () => {
  const { language, setLanguage, theme, setTheme, userData } = useMahalla();
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav.home', { defaultValue: 'Bosh sahifa' }) },
    { path: '/news', label: t('nav.news', { defaultValue: 'Yangiliklar' }) },
    { path: '/about', label: t('nav.about', { defaultValue: 'Mahalla haqida' }) },
    { path: '/services', label: t('nav.services', { defaultValue: 'Xizmatlar' }) },
    { path: '/marketplace', label: t('nav.marketplace', { defaultValue: 'Ustalar' }) },
    { path: '/archive', label: t('nav.archive', { defaultValue: 'Arxiv' }) }
  ];

  const languages = [
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#0A0F1D] border-b border-gray-200 dark:border-[#1A2235] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 select-none" aria-label="Smart Mahalla Bosh Sahifa">
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#1E293B] overflow-hidden shadow-sm">
             <img
               src={logoImg}
               alt="Smart Mahalla Logo"
               width="44"
               height="44"
               loading="eager"
               decoding="async"
               className="w-full h-full object-cover"
             />
          </div>
          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white tracking-wide">
            Mening <span className="text-amber-500 dark:text-amber-400">Mahallam</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Asosiy menyu">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xs font-semibold tracking-wider transition-colors ${
                  isActive
                    ? 'text-emerald-500 dark:text-[#00D2B4] border-b-2 border-emerald-500 dark:border-[#00D2B4] pb-1'
                    : 'text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3 relative">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? "Tungi rejimga o'tish" : "Kunduzgi rejimga o'tish"}
            className="p-2 text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Language Selector */}
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            aria-label="Tilni tanlash"
            aria-expanded={isLangDropdownOpen}
            className="p-2 text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <Globe className="w-5 h-5" />
          </button>

          {isLangDropdownOpen && (
            <div className="absolute top-12 right-12 w-36 py-1 rounded-2xl bg-white dark:bg-[#1A2235] border border-gray-200 dark:border-white/10 shadow-2xl z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    i18n.changeLanguage(lang.code);
                    setIsLangDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#252F43] flex items-center gap-2"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Profile Link */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `p-2 px-3 rounded-xl transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-500 dark:text-[#00D2B4] border border-emerald-500/30'
                  : 'text-gray-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
              }`
            }
            aria-label="Foydalanuvchi profili"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-bold max-w-[100px] truncate">
              {userData?.name ? userData.name.split(' ')[0] : 'Profil'}
            </span>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            className="lg:hidden p-2 text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0A0F1D] border-t border-gray-200 dark:border-[#1A2235] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-sm font-semibold rounded-xl ${
                  isActive
                    ? 'bg-gray-100 dark:bg-[#1A2235] text-emerald-500 dark:text-[#00D2B4]'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-[#1A2235]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsFundModalOpen(true);
            }}
            className="w-full text-left px-4 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4 text-emerald-500" />
            <span>Mahalla Fondi & To'lovlar (Payme/Click)</span>
          </button>

          {userRole === 'admin' && (
            <NavLink
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-sm font-bold rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30"
            >
              🛡️ Admin Boshqaruv Paneli
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};
