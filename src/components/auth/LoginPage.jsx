import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, UserCheck, AlertCircle, ArrowRight, Lock, Phone, User, Home, MapPin } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useMahalla();
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState('resident'); // 'resident' | 'admin'
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Resident fields
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('+998 ');
  const [resMahalla, setResMahalla] = useState('Navoiy Mahallasi');
  const [resAddress, setResAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      let result;
      if (role === 'admin') {
        result = await login('admin', { id: adminId.trim(), password: adminPassword });
        if (result?.success) {
          const destination = location.state?.from?.pathname || '/admin';
          navigate(destination, { replace: true });
        } else {
          setErrorMessage(result?.error || "Xodim ID yoki parol noto'g'ri! (Standart: admin / admin123)");
        }
      } else {
        result = await login('resident', {
          name: resName.trim(),
          phone: resPhone.trim(),
          mahalla: resMahalla.trim(),
          address: resAddress.trim()
        });
        if (result?.success) {
          const destination = location.state?.from?.pathname || '/';
          navigate(destination, { replace: true });
        } else {
          setErrorMessage(result?.error || "Iltimos, barcha maydonlarni to'ldiring!");
        }
      }
    } catch (err) {
      setErrorMessage("Tizimga ulanishda xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0A0F1D] py-12 px-4 sm:px-6">
      {/* Lightweight CSS ambient background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 60%), radial-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 0)`,
          backgroundSize: '100% 100%, 32px 32px',
          zIndex: 0
        }}
      />
      
      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[480px] bg-white dark:bg-[#141f3d] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-[#252F43] overflow-hidden"
      >
        <div className="px-8 pb-10 pt-10 relative z-10 text-left">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              Smart Mahalla v2.0
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Himoyalangan tizim</span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-amber-400 mb-2 tracking-tight">
            Tizimga kirish
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
            Mahallamizning raqamli boshqaruv platformasiga ulaning.
          </p>

          {/* Role Segmented Control */}
          <div className="flex p-1 mb-6 bg-gray-100 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-white/10" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={role === 'resident'}
              onClick={() => { setRole('resident'); setErrorMessage(''); }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                role === 'resident' 
                  ? 'bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-white/10' 
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Aholi</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={role === 'admin'}
              onClick={() => { setRole('admin'); setErrorMessage(''); }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                role === 'admin' 
                  ? 'bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-white/10' 
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-700'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Xodimlar (Admin)</span>
            </button>
          </div>

          {/* Error alert */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            {role === 'resident' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Ism va Familiya
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Masalan: Anvar Qodirov"
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Telefon raqami
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={resPhone}
                      onChange={(e) => setResPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Mahalla
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Mahalla nomi"
                      value={resMahalla}
                      onChange={(e) => setResMahalla(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Manzil / Uy raqami
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Masalan: 12-uy, 4-xonadon"
                      value={resAddress}
                      onChange={(e) => setResAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Xodim ID (Standart: admin)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="admin"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Parol (Standart: admin123)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{role === 'resident' ? "Tizimga ulanish" : "Admin paneliga kirish"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
