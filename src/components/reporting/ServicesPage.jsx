import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import {
  Megaphone,
  MapPin,
  Upload,
  Send,
  Search,
  CheckCircle2,
  Wrench,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ServicesPage = () => {
  const { masters, setSelectedMaster, submitReport, addToast } = useMahalla();

  // Form State
  const [selectedCategory, setSelectedCategory] = useState("Ko'cha Chiroqlari");
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchMaster, setSearchMaster] = useState('');

  const categories = [
    { label: "Ko'cha Chiroqlari", icon: "💡" },
    { label: "Yo'l Ta'miri", icon: "🛣️" },
    { label: "Chiqindi", icon: "🗑️" },
    { label: "Suv Muammosi", icon: "💧" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim() || !description.trim()) {
      addToast("Iltimos, manzil va murojaat matnini kiriting!", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitReport({
        title: `${selectedCategory} bo'yicha murojaat`,
        category: selectedCategory,
        address: address,
        description: description,
        urgency: "Oddiy",
        isAnonymous: false
      });
      setIsSubmitting(false);
      setAddress('');
      setDescription('');

      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (err) {}
    }, 700);
  };

  const filteredMasters = masters.filter((m) =>
    m.name.toLowerCase().includes(searchMaster.toLowerCase()) ||
    m.specialty.toLowerCase().includes(searchMaster.toLowerCase())
  );

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90 }}
          className="max-w-2xl mx-auto text-center mb-12 space-y-2"
        >
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
            Mahallamizni yanada obod qilishda o'z hissangizni qo'shing yoki kerakli mutaxassislarni tez va oson toping.
          </p>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Yangi Murojaat Qoldirish Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 85, damping: 18 }}
            className="lg:col-span-7 rounded-[30px] bg-white border border-gray-200 p-6 sm:p-8 shadow-sm"
          >
            {/* Form Title */}
            <div className="flex items-center gap-2.5 text-amber-500 font-bold text-lg mb-6">
              <Megaphone className="w-5 h-5" />
              <span className="text-gray-800 font-serif-gold">Yangi Murojaat Qoldirish</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {/* Category selector chips */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                  Muammo Turini Tanlang:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      key={cat.label}
                      type="button"
                      onClick={() => setSelectedCategory(cat.label)}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                        selectedCategory === cat.label
                          ? 'bg-amber-500 text-white border-amber-500 font-bold shadow-md'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span className="truncate">{cat.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Manzil (Ko'cha va uy raqami) + Mini map widget */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-7 space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Manzil:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ko'cha va uy raqami"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-xs placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-5 relative h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&auto=format&fit=crop&q=80"
                    alt="Map Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg border border-white/20">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      Joylashuvni aniqlash
                    </span>
                  </div>
                </div>
              </div>

              {/* Murojaat matni */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Murojaat Matni:
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Muammoni batafsil ta'riflang..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-xs placeholder-gray-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Surat yuklash dropzone */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Surat Yuklash (Ixtiyoriy):
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Suratni bu yerga tashlang yoki <span className="text-blue-500 font-bold underline">Fayl tanlang</span>
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1 block">PNG, JPG, MP4 (maksimal 20MB)</span>
                </div>
              </div>

              {/* Murojaatni Yuborish Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Murojaatni Yuborish</span>
                  </>
                )}
              </motion.button>

            </form>
          </motion.div>

          {/* Right: Mahalla Ustalari & So'nggi Hal Qilinganlar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 85, damping: 18 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Mahalla Ustalari Card */}
            <div className="rounded-[30px] bg-white border border-gray-100 p-6 sm:p-7 shadow-sm text-left">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-800 font-serif-gold">Mahalla ustalari</h3>
                  <p className="text-xs text-gray-400">Tezkor yordam kerakmi?</p>
                </div>

                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-cyan-500">
                  <Search className="w-4 h-4" />
                </div>
              </div>

              {/* Masters Grid 2x2 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {filteredMasters.slice(0, 3).map((master, idx) => (
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    key={master.id}
                    onClick={() => setSelectedMaster(master)}
                    className="p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-cyan-200 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-600 border border-cyan-100 uppercase">
                        {master.specialty.split(' ')[0]}
                      </span>
                      <h4 className="text-sm font-bold text-gray-800 mt-2 group-hover:text-cyan-600 transition-colors">
                        {master.name}
                      </h4>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-amber-500 font-bold">
                      <span>★ {master.rating}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}

                {/* Barcha Xizmatlar Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => addToast("Mahallada 12 ta litsenziyalangan usta ro'yxatdan o'tgan", "info")}
                  className="p-3.5 rounded-2xl bg-gray-50 border border-dashed border-gray-300 hover:border-cyan-300 cursor-pointer transition-all flex flex-col items-center justify-center text-center group"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-1">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-gray-700">Barcha xizmatlar</span>
                  <span className="text-[10px] text-gray-500">+12 ta mutaxassis</span>
                </motion.div>
              </div>
            </div>

            {/* So'nggi Hal Qilinganlar Card */}
            <div className="rounded-[30px] bg-white border border-gray-100 p-6 shadow-sm text-left">
              <div className="flex items-center gap-2 text-cyan-500 font-bold text-sm mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>So'nggi hal qilinganlar</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Navoiy ko'chasida yoritish tiklandi</p>
                    <span className="text-[11px] text-gray-400">2 soat oldin</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">4-uy oldidagi chiqindi olib ketildi</p>
                    <span className="text-[11px] text-gray-400">Kecha, 14:30</span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};
