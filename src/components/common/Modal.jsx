import React, { useState } from 'react';
import { useMahalla } from '../../context/MahallaContext';
import {
  X,
  Camera,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  Mic,
  Calendar,
  Phone,
  MessageSquare,
  Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Modal = () => {
  const {
    isReportModalOpen,
    setIsReportModalOpen,
    selectedNews,
    setSelectedNews,
    selectedRequest,
    setSelectedRequest,
    selectedMaster,
    setSelectedMaster,
    selectedLeader,
    setSelectedLeader,
    submitReport,
    addToast
  } = useMahalla();

  // Form State for Report Modal
  const [formData, setFormData] = useState({
    title: '',
    category: "Ko'cha Chiroqlari",
    categoryType: 'lighting',
    address: '',
    description: '',
    urgency: 'Oddiy',
    isAnonymous: false,
    author: '',
    phone: '',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const categories = [
    { label: "Ko'cha Chiroqlari", type: "lighting", icon: "💡" },
    { label: "Yo'l Ta'miri", type: "roads", icon: "🛣️" },
    { label: "Chiqindi", type: "waste", icon: "🗑️" },
    { label: "Suv Muammosi", type: "water", icon: "💧" },
    { label: "Yashil Hudud", type: "greenery", icon: "🌳" },
    { label: "Gaz / Elektr", type: "utility", icon: "⚡" }
  ];

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitReport(formData);
      setIsSubmitting(false);
      setIsReportModalOpen(false);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }

      setFormData({
        title: '',
        category: "Ko'cha Chiroqlari",
        categoryType: 'lighting',
        address: '',
        description: '',
        urgency: 'Oddiy',
        isAnonymous: false,
        author: '',
        phone: '',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
      });
    }, 900);
  };

  const handleVoiceRecordSimulate = () => {
    setIsRecording(true);
    addToast("Ovoz yozilmoqda... Gapiring", "info");
    setTimeout(() => {
      setIsRecording(false);
      setFormData((prev) => ({
        ...prev,
        description: prev.description
          ? prev.description + " [Ovozli xabar matnga aylantirildi: Ko'chamizdagi chiroqlar 2 kundan beri yonmayapti, iltimos tezroq yordam bering]"
          : "Ko'chamizdagi chiroqlar 2 kundan beri yonmayapti, iltimos tezroq yordam bering."
      }));
      addToast("Ovoz matnga muvaffaqiyatli aylantirildi!", "success");
    }, 2500);
  };

  return (
    <>
      {/* 1. REPORT AN ISSUE MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-scaleUp">
            
            {/* Close Button */}
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Yangi Murojaat Qoldirish</h3>
                <p className="text-xs text-slate-400">Muammoni belgilang — Telegram bot orqali raisga yetkaziladi</p>
              </div>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-5">
              
              {/* Category Chips */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                  Muammo Turini Tanlang:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat.label}
                      onClick={() => setFormData({ ...formData, category: cat.label, categoryType: cat.type })}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                        formData.category === cat.label
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-800/60 border-white/[0.06] text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mavzu / Qisqa nom:</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Ko'cha chirog'i yonmayapti"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Manzil (Ko'cha va uy):</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Alisher Navoiy ko'chasi, 24-uy"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                    <MapPin className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Description + Voice Button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">Murojaat Matni (Batafsil):</label>
                  <button
                    type="button"
                    onClick={handleVoiceRecordSimulate}
                    className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 border transition-all ${
                      isRecording
                        ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
                        : 'bg-slate-800 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isRecording ? "Yozilmoqda..." : "Ovozli aytish"}</span>
                  </button>
                </div>
                <textarea
                  rows="3"
                  required
                  placeholder="Muammo haqida batafsil ma'lumot yozing..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Urgency & Media Upload Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Shoshilinchlik Darajasi:</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Oddiy">Oddiy (2-3 kun ichida)</option>
                    <option value="Shoshilinch">Shoshilinch (24 soat ichida)</option>
                    <option value="Favqulodda">Favqulodda (Zudlik bilan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Surat Yuklash (Ixtiyoriy):</label>
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/80 border border-dashed border-white/20">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-lg border border-white/10"
                    />
                    <div className="text-[11px] text-slate-400">
                      <span className="text-cyan-400 font-semibold cursor-pointer">Surat tanlandi</span>
                      <p>AI rasmni tahlil qildi: "Ko'cha yoritish tayanchi"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Contacts / Anonymous Toggle */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-200">Shaxsingizni ko'rsatish:</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    <span className="ml-2 text-xs text-slate-300 font-medium">Anonim</span>
                  </label>
                </div>

                {!formData.isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <input
                      type="text"
                      placeholder="Ism Familiyangiz"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs text-white border border-white/10 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="tel"
                      placeholder="+998 (90) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs text-white border border-white/10 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Murojaatni Yuborish (Telegramga Uzatish)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. FULL NEWS ARTICLE DETAIL MODAL */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-3xl glass-panel border border-cyan-500/20 p-6 sm:p-8 shadow-2xl animate-scaleUp">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-slate-950 uppercase tracking-wider">
                    {selectedNews.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                    {selectedNews.title}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-bold text-amber-300">
                  {selectedNews.date} {selectedNews.year}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p className="font-semibold text-cyan-300 text-lg">{selectedNews.excerpt}</p>
              <p>{selectedNews.fullContent}</p>
              
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Muallif: <b className="text-white">{selectedNews.author}</b></span>
                <span>O'qish vaqti: <b className="text-amber-400">{selectedNews.readTime}</b></span>
                <span>Ko'rishlar soni: <b className="text-cyan-400">{selectedNews.views}</b></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. REQUEST DETAILS MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-8 rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 shadow-2xl animate-scaleUp">
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-bold">
                {selectedRequest.id}
              </span>
              <h3 className="text-xl font-bold text-white">{selectedRequest.title}</h3>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="h-48 rounded-xl overflow-hidden">
                <img
                  src={selectedRequest.image}
                  alt={selectedRequest.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-slate-400 block mb-1">Manzil:</span>
                  <span className="font-semibold text-white">{selectedRequest.address}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-slate-400 block mb-1">Holati:</span>
                  <span className="font-bold text-amber-400">{selectedRequest.status}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-slate-400 block mb-1">Sana & Vaqt:</span>
                  <span className="font-semibold text-white">{selectedRequest.date}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-slate-400 block mb-1">Yuboruvchi:</span>
                  <span className="font-semibold text-white">{selectedRequest.author}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs">
                <span className="text-slate-400 block mb-1">Batafsil bayon:</span>
                <p className="text-slate-200">{selectedRequest.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MASTER CONTACT MODAL */}
      {selectedMaster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md my-8 rounded-3xl glass-panel border border-cyan-500/30 p-6 shadow-2xl animate-scaleUp">
            <button
              onClick={() => setSelectedMaster(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3 mb-6">
              <img
                src={selectedMaster.avatar}
                alt={selectedMaster.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-cyan-400 shadow-lg"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{selectedMaster.name}</h3>
                <p className="text-xs text-cyan-400 font-semibold">{selectedMaster.specialty}</p>
                <div className="flex items-center justify-center gap-2 mt-1 text-xs text-amber-400 font-bold">
                  <span>⭐ {selectedMaster.rating}</span>
                  <span>•</span>
                  <span>{selectedMaster.jobsCount} ta bajarilgan ish</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 text-center leading-relaxed mb-6">
              {selectedMaster.description}
            </p>

            <div className="space-y-3">
              <a
                href={`tel:${selectedMaster.phone}`}
                className="w-full py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Qo'ng'iroq qilish: {selectedMaster.phone}</span>
              </a>

              <button
                onClick={() => {
                  addToast(`Ustaga xabar yo'llandi! Tez orada bog'lanadi.`, 'success');
                  setSelectedMaster(null);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Xabar qoldirish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
