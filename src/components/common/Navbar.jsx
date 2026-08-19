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
  const { language, setLanguage, theme, setTheme } = useMahalla();
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/news', label: t('nav.news') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/archive', label: t('nav.archive') }
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
        <Link to="/" className="flex items-center gap-3 select-none">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#1E293B] overflow-hidden shadow-sm">
             <img
               src={logoImg}
               alt="Logo"
               className="w-full h-full object-cover"
             />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
            Mening <span className="text-emerald-500 dark:text-[#00D2B4]">Mahallam</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
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
        <div className="flex items-center gap-4 relative">
          
          <button
            onClick={toggleTheme}
            className="text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white transition-colors"
            title={theme === 'light' ? t('theme.dark') : t('theme.light')}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white transition-colors"
          >
            <Globe className="w-5 h-5" />
          </button>

          {isLangDropdownOpen && (
            <div className="absolute top-10 right-8 w-36 py-1 rounded-md bg-white dark:bg-[#1A2235] border border-gray-200 dark:border-white/10 shadow-lg z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    i18n.changeLanguage(lang.code);
                    setIsLangDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#252F43] flex items-center gap-2"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}

          <Link
            to="/admin"
            className="text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white transition-colors"
            title={t('nav.admin')}
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white"
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
                `block px-4 py-3 text-sm font-semibold rounded-md ${
                  isActive
                    ? 'bg-gray-100 dark:bg-[#1A2235] text-emerald-500 dark:text-[#00D2B4]'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-[#1A2235]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};
