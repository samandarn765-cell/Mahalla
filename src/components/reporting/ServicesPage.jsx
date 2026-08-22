import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { Link } from 'react-router-dom';
import {
  Megaphone,
  MapPin,
  Upload,
  Send,
  Search,
  CheckCircle2,
  Wrench,
  ArrowRight,
  UserCheck,
  X,
  Sparkles,
  Mic,
  Navigation,
  Image as ImageIcon,
  AlertTriangle,
  Flame,
  TreePine,
  Lightbulb,
  Trash2,
  Droplets,
  Layers,
  ShieldAlert,
  HelpCircle,
  Check,
  Construction,
  Zap,
  Gamepad2,
  Building2,
  ClipboardList
} from 'lucide-react';
import confetti from 'canvas-confetti';

const EXTENDED_CATEGORIES = [
  { label: "Ko'cha Chiroqlari", type: "lighting", Icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
  { label: "Yo'l Ta'miri", type: "roads", Icon: Construction, color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/20" },
  { label: "Chiqindi & Tozalik", type: "waste", Icon: Trash2, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { label: "Suv Muammosi", type: "water", Icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Gaz / Elektr Uzilishi", type: "utility", Icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { label: "Yashil Hudud & Bog'", type: "greenery", Icon: TreePine, color: "text-teal-500", bg: "bg-teal-500/10 border-teal-500/20" },
  { label: "Bolalar Maydonchasi", type: "playground", Icon: Gamepad2, color: "text-indigo-500", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { label: "Ko'p Qavatli Uy / Tom", type: "roof", Icon: Building2, color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20" },
  { label: "Xavfsizlik & Hayvonlar", type: "safety", Icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" },
  { label: "Boshqa Taklif / Murojaat", type: "other", Icon: ClipboardList, color: "text-cyan-500", bg: "bg-cyan-500/10 border-cyan-500/20" }
];

const SAMPLE_PHOTOS = [
  { title: "Chiroq", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80" },
  { title: "Yo'l", url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80" },
  { title: "Suv", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80" },
  { title: "Tom", url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&auto=format&fit=crop&q=80" }
];

export const ServicesPage = () => {
  const { masters, setSelectedMaster, submitReport, addToast, userData } = useMahalla();
  const fileInputRef = useRef(null);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState("Ko'cha Chiroqlari");
  const [address, setAddress] = useState(userData?.address || '');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Oddiy'); // 'Oddiy' | 'Shoshilinch' | 'Favqulodda'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchMaster, setSearchMaster] = useState('');
  
  // Geolocation & GPS State
  const [isLocating, setIsLocating] = useState(false);
  const [detectedCoords, setDetectedCoords] = useState(null);

  // Media / Photo Upload State
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  // Quick Templates
  const templates = [
    "💡 Tungi vaqtda ko'cha chirog'i yonmayapti, qorong'ilik yuzaga kelgan.",
    "🛣️ Ichki yo'lda chuqurlik paydo bo'lgan, transport harakatiga xalal bermoqda.",
    "💧 Suv bosimi juda past va loyqa oqmoqda.",
    "🗑️ Chiqindi konteyneri to'lib ketgan, olib ketish kerak."
  ];

  // Geolocation handler
  const handleDetectLocation = () => {
    setIsLocating(true);
    addToast("GPS joylashuvingiz aniqlanmoqda...", "info");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          setDetectedCoords({ lat, lng });
          const geoAddress = `Alisher Navoiy ko'chasi, 24-uy (GPS: ${lat}, ${lng})`;
          setAddress(geoAddress);
          setIsLocating(false);
          addToast(`Joylashuv aniqlandi: ${lat}° N, ${lng}° E`, "success");
        },
        (error) => {
          // Fallback to mahalla standard location if permission denied or error
          const fallbackLat = 41.3111;
          const fallbackLng = 69.2797;
          setDetectedCoords({ lat: fallbackLat, lng: fallbackLng });
          setAddress(`Alisher Navoiy ko'chasi, 24-uy (GPS: ${fallbackLat}, ${fallbackLng})`);
          setIsLocating(false);
          addToast("Mahalla GPS koordinatasi belgilandi!", "success");
        },
        { timeout: 6000 }
      );
    } else {
      const fallbackLat = 41.3111;
      const fallbackLng = 69.2797;
      setDetectedCoords({ lat: fallbackLat, lng: fallbackLng });
      setAddress(`Navoiy ko'chasi, 12-uy (GPS: ${fallbackLat}, ${fallbackLng})`);
      setIsLocating(false);
      addToast("Mahalla hududi joylashuvi belgilandi!", "info");
    }
  };

  // Image Upload File Handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        addToast("Fayl hajmi 20MB dan oshmasligi kerak!", "error");
        return;
      }
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        addToast("Surat muvaffaqiyatli yuklandi!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        addToast("Surat muvaffaqiyatli yuklandi!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  // Voice recording simulation
  const handleVoiceInput = () => {
    setIsVoiceRecording(true);
    addToast("Ovoz yozilmoqda... Muammoni ayting", "info");
    setTimeout(() => {
      setIsVoiceRecording(false);
      const voiceText = "Ko'chamizdagi svetofor va tungi chiroqlar ishlamayapti, ta'mirlab berishingizni so'raymiz.";
      setDescription((prev) => (prev ? `${prev} ${voiceText}` : voiceText));
      addToast("Ovozli xabar matnga aylantirildi!", "success");
    }, 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim() || !description.trim()) {
      addToast("Iltimos, manzil va murojaat matnini to'liq kiriting!", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitReport({
        title: `${selectedCategory} bo'yicha murojaat`,
        category: selectedCategory,
        address: address,
        description: description,
        urgency: urgency,
        isAnonymous: false,
        image: uploadedImage || "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80"
      });
      setIsSubmitting(false);
      setAddress(userData?.address || '');
      setDescription('');
      setUploadedImage(null);
      setImageFileName('');
      setDetectedCoords(null);

      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch (err) {}
    }, 700);
  };

  const filteredMasters = masters.filter((m) =>
    m.name.toLowerCase().includes(searchMaster.toLowerCase()) ||
    m.specialty.toLowerCase().includes(searchMaster.toLowerCase())
  );

  return (
    <div className="py-10 bg-gray-50/50 dark:bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90 }}
          className="max-w-3xl mx-auto text-center mb-10 space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold mb-2">
            <Megaphone className="w-4 h-4" /> Fuqarolar Murojaat Markazi
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Mahalla Xizmatlari & Murojaatlar
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
            Mahallamizni yanada obod qilishda o'z hissangizni qo'shing, muammolar haqida xabar bering yoki ishonchli ustalarni chaqiring.
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
            className="lg:col-span-7 rounded-[32px] bg-white dark:bg-slate-900/90 border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-xl text-left space-y-6"
          >
            {/* Form Title */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Yangi Murojaat Qoldirish</h2>
                  <p className="text-xs text-gray-400">Telegram bot orqali rais va mas'ullarga yetkaziladi</p>
                </div>
              </div>
              <Link
                to="/profile"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                Arizalarim tarixi <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. Category selector chips */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Muammo Turini Tanlang ({EXTENDED_CATEGORIES.length} ta kategoriya):
                  </label>
                  <span className="text-[11px] font-bold text-amber-500">
                    Tanlandi: {selectedCategory}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {EXTENDED_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.label;
                    const IconComp = cat.Icon;
                    return (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        key={cat.label}
                        type="button"
                        onClick={() => setSelectedCategory(cat.label)}
                        className={`p-2.5 rounded-2xl text-xs font-semibold flex flex-col items-center justify-center gap-1.5 border transition-all text-center group ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-500 font-bold shadow-lg shadow-amber-500/25 scale-[1.02]'
                            : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <div className={`p-1.5 rounded-xl border transition-colors ${
                          isSelected
                            ? 'bg-white/20 text-white border-white/30 font-bold'
                            : `${cat.bg} ${cat.color}`
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] leading-tight line-clamp-2">{cat.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Shoshilinchlik darajasi (Urgency Level) */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Shoshilinchlik Darajasi:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'Oddiy', desc: '1-3 kun ichida', color: 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400' },
                    { label: 'Shoshilinch', desc: '24 soat ichida', color: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400' },
                    { label: 'Favqulodda', desc: 'Darhol (Tezkor)', color: 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400' }
                  ].map((lvl) => (
                    <button
                      key={lvl.label}
                      type="button"
                      onClick={() => setUrgency(lvl.label)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        urgency === lvl.label
                          ? `${lvl.color} border-2 font-bold shadow-sm ring-1 ring-amber-500/30`
                          : 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-white/10 text-gray-600 dark:text-slate-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="text-xs font-bold flex items-center justify-between">
                        <span>{lvl.label}</span>
                        {urgency === lvl.label && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-[10px] opacity-75">{lvl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Manzil (Ko'cha va uy raqami) + Joylashuvni aniqlash */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-7 space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Manzil:</span>
                    {detectedCoords && (
                      <span className="text-[10px] text-emerald-500 font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> GPS Faol
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ko'cha va uy raqami (masalan: Navoiy 24-uy)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* GPS Joylashuv Button & Preview */}
                <div className="sm:col-span-5 relative h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&auto=format&fit=crop&q=80"
                    alt="Map Preview"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isLocating}
                    className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/60 flex flex-col items-center justify-center transition-colors p-2 text-center"
                  >
                    <span className="text-[11px] font-bold text-white flex items-center gap-1.5 bg-black/70 px-3 py-1.5 rounded-lg border border-white/20 shadow-md">
                      {isLocating ? (
                        <>
                          <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                          <span>Aniqlanmoqda...</span>
                        </>
                      ) : (
                        <>
                          <Navigation className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span>Joylashuvni aniqlash</span>
                        </>
                      )}
                    </span>
                    {detectedCoords && (
                      <span className="text-[9px] text-emerald-400 font-mono mt-1 bg-black/60 px-1.5 rounded">
                        {detectedCoords.lat}, {detectedCoords.lng}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* 4. Murojaat matni + Voice & Templates */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Murojaat Matni:
                  </label>
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    disabled={isVoiceRecording}
                    className={`text-[11px] font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                      isVoiceRecording
                        ? 'bg-red-500 text-white border-red-500 animate-pulse'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-white/10 hover:border-amber-500 hover:text-amber-500'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isVoiceRecording ? 'Yozilmoqda...' : 'Ovozli kiritish'}</span>
                  </button>
                </div>

                <textarea
                  rows="3"
                  required
                  placeholder="Muammoni batafsil ta'riflang (masalan: qayerda, qachondan beri va qanday yordam kerak)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />

                {/* Quick Suggestion Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-gray-400 self-center">Tezkor shablon:</span>
                  {templates.map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDescription(tpl)}
                      className="text-[10px] bg-gray-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-500/10 text-gray-600 dark:text-slate-300 px-2 py-1 rounded-md border border-gray-200 dark:border-white/5 truncate max-w-[200px]"
                      title={tpl}
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Surat yuklash (Dropzone, File Picker, & Samples) */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Surat Yuklash (Ixtiyoriy):
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {uploadedImage ? (
                  /* Uploaded Image Preview */
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 bg-slate-900 p-2 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                      <img src={uploadedImage} alt="Uploaded preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-0.5">
                        <CheckCircle2 className="w-4 h-4" /> Surat muvaffaqiyatli biriktirildi
                      </div>
                      <p className="text-xs text-gray-300 truncate">{imageFileName || 'muammo_rasmi.jpg'}</p>
                      <span className="text-[10px] text-gray-400">Ko'rib chiqish uchun tayyor</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImage(null);
                        setImageFileName('');
                      }}
                      className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors mr-2"
                      title="O'chirish"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* Dropzone */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer group ${
                      isDragging
                        ? 'border-amber-500 bg-amber-500/10 scale-[1.01]'
                        : 'border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-slate-800/40 hover:bg-gray-100 dark:hover:bg-slate-800/80 hover:border-amber-400'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-sm">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-300">
                      Suratni bu yerga tashlang yoki <span className="text-amber-600 dark:text-amber-400 font-bold underline">Fayl tanlang</span>
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">PNG, JPG, HEIC, MP4 (maksimal 20MB)</span>
                  </div>
                )}

                {/* Preset Sample Photos */}
                {!uploadedImage && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-gray-400 shrink-0">yoki namuna tanlang:</span>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {SAMPLE_PHOTOS.map((sp, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setUploadedImage(sp.url);
                            setImageFileName(`${sp.title}_namuna.jpg`);
                            addToast(`${sp.title} namunasi tanlandi`, "info");
                          }}
                          className="px-2 py-1 rounded-md text-[10px] bg-gray-100 dark:bg-slate-800 hover:bg-amber-500/10 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-white/5 flex items-center gap-1 shrink-0"
                        >
                          <ImageIcon className="w-3 h-3 text-amber-500" />
                          <span>{sp.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Murojaatni Yuborish Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 text-sm"
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
            <div className="rounded-[32px] bg-white dark:bg-slate-900/90 border border-gray-200 dark:border-white/10 p-6 sm:p-7 shadow-xl text-left">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Mahalla Ustalari</h3>
                  <p className="text-xs text-gray-400">Tezkor mutaxassis kerakmi?</p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Qidiruv..."
                    value={searchMaster}
                    onChange={(e) => setSearchMaster(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 w-32"
                  />
                </div>
              </div>

              {/* Masters Grid 2x2 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {filteredMasters.slice(0, 3).map((master) => (
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    key={master.id}
                    onClick={() => setSelectedMaster(master)}
                    className="p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-100 dark:border-white/5 hover:border-cyan-400 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl overflow-hidden mb-2">
                        <img src={master.avatar} alt={master.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-500/20 uppercase">
                        {master.specialty.split(' ')[0]}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-1.5 group-hover:text-cyan-500 transition-colors truncate">
                        {master.name}
                      </h4>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-xs text-amber-500 font-bold">
                      <span>★ {master.rating}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}

                {/* Barcha Xizmatlar Card */}
                <Link
                  to="/marketplace"
                  className="p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-800/40 border border-dashed border-gray-300 dark:border-white/10 hover:border-cyan-400 cursor-pointer transition-all flex flex-col items-center justify-center text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-1">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 dark:text-white">Barcha xizmatlar</span>
                  <span className="text-[10px] text-gray-500 dark:text-slate-400">+{masters.length} ta mutaxassis</span>
                </Link>
              </div>
            </div>

            {/* So'nggi Hal Qilinganlar Card */}
            <div className="rounded-[32px] bg-white dark:bg-slate-900/90 border border-gray-200 dark:border-white/10 p-6 shadow-xl text-left space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>So'nggi hal qilingan arizalar</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs bg-gray-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-gray-100 dark:border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 animate-pulse" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Navoiy ko'chasida yoritish to'liq tiklandi</p>
                    <span className="text-[10px] text-gray-400">2 soat oldin • #1042</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs bg-gray-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-gray-100 dark:border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">4-uy oldidagi chiqindi to'liq olib ketildi</p>
                    <span className="text-[10px] text-gray-400">Kecha, 14:30 • #1038</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs bg-gray-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-gray-100 dark:border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Ibn Sino ko'chasida suv quvuri ta'mirlandi</p>
                    <span className="text-[10px] text-gray-400">12 Oktabr • #1041</span>
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
