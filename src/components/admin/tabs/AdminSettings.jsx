import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../../context/MahallaContext';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export const AdminSettings = ({
  theme,
  toggleTheme,
  addToast
}) => {
  const { userData, updateUserAvatar } = useMahalla();
  const fileInputRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        await updateUserAvatar(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (avatarUrl) {
      setIsUploading(true);
      await updateUserAvatar(avatarUrl);
      setAvatarUrl('');
      setIsUploading(false);
    }
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-7 shadow-2xl space-y-6">
      <h3 className="text-xl font-bold text-white font-serif-gold mb-4">Tizim Sozlamalari</h3>
      
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
        <h4 className="text-white font-bold border-b border-white/10 pb-2">Umumiy Sozlamalar</h4>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <p className="text-white font-semibold">Profil Rasmi</p>
            <p className="text-xs text-slate-400">Admin paneli uchun profil rasmingizni yangilang.</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input 
                type="url" 
                placeholder="Rasm URL manzili..." 
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
              />
              <button 
                type="submit"
                disabled={isUploading}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
              >
                {isUploading ? "Yuklanmoqda..." : "Saqlash"}
              </button>
            </form>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-bold hover:bg-cyan-500/10 transition-colors flex items-center gap-1"
            >
              <UploadCloud className="w-3.5 h-3.5" /> Fayl tanlash
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">Tungi rejim (Dark Mode)</p>
            <p className="text-xs text-slate-400">Butun tizim uchun ranglar mavzusini almashtirish.</p>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Rang mavzusini almashtirish"
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              theme === 'dark' ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">SMS Xabarnomalar</p>
            <p className="text-xs text-slate-400">Aholiga avtomat SMS jo'natish xizmati.</p>
          </div>
          <button
            onClick={() => addToast("SMS integratsiyasi faol holatda", "success")}
            aria-label="SMS xabarnomalarni sozlash"
            className="w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 bg-emerald-500"
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 translate-x-5" />
          </button>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
        <h4 className="text-white font-bold border-b border-white/10 pb-2">Xavfsizlik & Kirish</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">Admin Parolini O'zgartirish</p>
            <p className="text-xs text-slate-400">Hozirgi standart: admin / admin123</p>
          </div>
          <button 
            onClick={() => addToast("Parolni o'zgartirish oynasi ochilmoqda", "info")} 
            className="px-4 py-2 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-bold hover:bg-cyan-500/10 transition-colors"
          >
            O'zgartirish
          </button>
        </div>
      </div>
    </motion.div>
  );
};
