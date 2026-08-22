import React, { useState, useRef, useEffect } from 'react';
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
  Shield,
  Play,
  Pause,
  Trash2,
  Volume2,
  Navigation,
  Image as ImageIcon,
  Square,
  Lightbulb,
  Construction,
  Droplets,
  Zap,
  TreePine,
  Gamepad2,
  Building2,
  ShieldAlert,
  ClipboardList
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_MODAL_PHOTOS = [
  { title: "Chiroq", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80" },
  { title: "Yo'l", url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80" },
  { title: "Suv", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80" },
  { title: "Chiqindi", url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80" }
];

export const Modal = () => {
  const {
    isReportModalOpen,
    setIsReportModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    selectedNews,
    setSelectedNews,
    selectedRequest,
    setSelectedRequest,
    selectedMaster,
    setSelectedMaster,
    selectedLeader,
    setSelectedLeader,
    submitReport,
    addToast,
    logout,
    userRole,
    userData
  } = useMahalla();

  // Form State for Report Modal
  const [formData, setFormData] = useState({
    title: '',
    category: "Ko'cha Chiroqlari",
    categoryType: 'lighting',
    address: userData?.address || '',
    description: '',
    urgency: 'Oddiy',
    isAnonymous: false,
    author: userData?.name || '',
    phone: userData?.phone || '',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Image Upload State
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [imageName, setImageName] = useState('');

  // Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [voiceAudioUrl, setVoiceAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  const audioElementRef = useRef(null);

  const categories = [
    { label: "Ko'cha Chiroqlari", type: "lighting", Icon: Lightbulb, color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30" },
    { label: "Yo'l Ta'miri", type: "roads", Icon: Construction, color: "text-orange-400", bg: "bg-orange-500/15 border-orange-500/30" },
    { label: "Chiqindi & Tozalik", type: "waste", Icon: Trash2, color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30" },
    { label: "Suv Muammosi", type: "water", Icon: Droplets, color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30" },
    { label: "Gaz / Elektr Uzilishi", type: "utility", Icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/15 border-yellow-500/30" },
    { label: "Yashil Hudud & Bog'", type: "greenery", Icon: TreePine, color: "text-teal-400", bg: "bg-teal-500/15 border-teal-500/30" },
    { label: "Bolalar Maydonchasi", type: "playground", Icon: Gamepad2, color: "text-indigo-400", bg: "bg-indigo-500/15 border-indigo-500/30" },
    { label: "Ko'p Qavatli Uy / Tom", type: "roof", Icon: Building2, color: "text-purple-400", bg: "bg-purple-500/15 border-purple-500/30" },
    { label: "Xavfsizlik & Hayvonlar", type: "safety", Icon: ShieldAlert, color: "text-rose-400", bg: "bg-rose-500/15 border-rose-500/30" },
    { label: "Boshqa Taklif / Murojaat", type: "other", Icon: ClipboardList, color: "text-cyan-400", bg: "bg-cyan-500/15 border-cyan-500/30" }
  ];

  // Cleanup timer and audio
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    };
  }, []);

  // Handle Image File Selection
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        addToast("Fayl hajmi 20MB dan oshmasligi kerak!", "error");
        return;
      }
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
        addToast("Surat yuklandi!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  // Start Voice Recording
  const startVoiceRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setVoiceAudioUrl(url);
          stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
        setIsRecording(true);
        setRecordingSeconds(0);
        recordingIntervalRef.current = setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
        addToast("Ovoz yozilmoqda... Gapiring", "info");
      } else {
        simulateVoiceRecording();
      }
    } catch (err) {
      console.warn("Microphone access not available, using simulation fallback", err);
      simulateVoiceRecording();
    }
  };

  // Stop Voice Recording
  const stopVoiceRecording = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    } else {
      // Create synthetic audio url fallback
      simulateVoiceFile();
    }

    setIsRecording(false);
    
    // Automatically transcribe or add to text
    setFormData((prev) => ({
      ...prev,
      description: prev.description
        ? prev.description + " [Ovozli xabar biriktirildi]"
        : "Ko'chamizdagi muammo bo'yicha ovozli xabar qoldirildi, iltimos eshitib ko'ring."
    }));

    addToast("Ovozli xabar muvaffaqiyatli saqlandi!", "success");
  };

  const simulateVoiceRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
    addToast("Ovoz yozilmoqda...", "info");
  };

  const simulateVoiceFile = () => {
    // Generate a simple audio Tone Blob so it is actually playable
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const dest = audioCtx.createMediaStreamDestination();
      osc.connect(dest);
      osc.start();
      const rec = new MediaRecorder(dest.stream);
      const chunks = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        const b = new Blob(chunks, { type: 'audio/webm' });
        setVoiceAudioUrl(URL.createObjectURL(b));
        osc.stop();
        audioCtx.close();
      };
      rec.start();
      setTimeout(() => rec.stop(), 500);
    } catch (e) {
      setVoiceAudioUrl("simulated_audio_ready");
    }
  };

  // Toggle Audio Playback
  const toggleAudioPlay = () => {
    if (!voiceAudioUrl) return;

    if (!audioElementRef.current) {
      if (voiceAudioUrl !== "simulated_audio_ready") {
        audioElementRef.current = new Audio(voiceAudioUrl);
        audioElementRef.current.onended = () => setIsPlayingAudio(false);
      }
    }

    if (isPlayingAudio) {
      if (audioElementRef.current) audioElementRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      if (audioElementRef.current) {
        audioElementRef.current.play().catch(() => {
          // Playback demo fallback
        });
      }
      setIsPlayingAudio(true);
      // Auto reset after 4s
      setTimeout(() => setIsPlayingAudio(false), 4000);
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitReport({
        ...formData,
        voiceAudioUrl: voiceAudioUrl || null
      });
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

      // Reset form
      setFormData({
        title: '',
        category: "Ko'cha Chiroqlari",
        categoryType: 'lighting',
        address: userData?.address || '',
        description: '',
        urgency: 'Oddiy',
        isAnonymous: false,
        author: userData?.name || '',
        phone: userData?.phone || '',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
      });
      setUploadedImagePreview(null);
      setImageName('');
      setVoiceAudioUrl(null);
    }, 800);
  };

  return (
    <>
      {/* 1. REPORT AN ISSUE MODAL */}
      {isReportModalOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsReportModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl my-8 rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-scaleUp bg-slate-950/95 text-white">
            
            {/* Close Button with high visibility and tooltips */}
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-800/90 text-slate-300 hover:text-white hover:bg-red-500/80 transition-all border border-white/10 hover:rotate-90"
              title="Yopish (Chiqish)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
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
                  Muammo Turini Tanlang ({categories.length} ta kategoriya):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {categories.map((cat) => {
                    const isSelected = formData.category === cat.label;
                    const IconComp = cat.Icon;
                    return (
                      <button
                        type="button"
                        key={cat.label}
                        onClick={() => setFormData({ ...formData, category: cat.label, categoryType: cat.type })}
                        className={`p-2.5 rounded-2xl text-xs font-semibold flex flex-col items-center justify-center gap-1.5 border transition-all text-center group ${
                          isSelected
                            ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.35)] scale-[1.03]'
                            : 'bg-slate-900/60 border-white/[0.06] text-slate-300 hover:bg-slate-800/80 hover:border-white/20'
                        }`}
                      >
                        <div className={`p-1.5 rounded-xl border transition-colors ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                            : `${cat.bg} ${cat.color}`
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] leading-tight line-clamp-2">{cat.label}</span>
                      </button>
                    );
                  })}
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
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
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Description + Real Voice Message Recording */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">Murojaat Matni (Batafsil):</label>
                  
                  {/* Voice Button / Stop Button */}
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startVoiceRecording}
                      className="text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all font-semibold"
                    >
                      <Mic className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Ovozli aytish</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopVoiceRecording}
                      className="text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 border border-red-500 bg-red-500/20 text-red-300 animate-pulse font-bold"
                    >
                      <Square className="w-3 h-3 fill-red-400" />
                      <span>To'xtatish ({recordingSeconds}s)</span>
                    </button>
                  )}
                </div>

                <textarea
                  rows="3"
                  required
                  placeholder="Muammo haqida batafsil ma'lumot yozing yoki ovozli xabar qoldiring..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />

                {/* Saved Voice Note Player */}
                {voiceAudioUrl && (
                  <div className="mt-2 p-3 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={toggleAudioPlay}
                        className="w-9 h-9 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                      >
                        {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                      </button>
                      <div>
                        <div className="flex items-center gap-1 text-xs font-bold text-cyan-300">
                          <Volume2 className="w-3.5 h-3.5" /> Ovozli xabar biriktirildi
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {isPlayingAudio ? "Ijro etilmoqda..." : "Tinglash uchun bosing"}
                        </span>
                      </div>
                    </div>

                    {/* Equalizer animation bar */}
                    <div className="flex items-center gap-1">
                      {[12, 20, 16, 24, 14, 18, 8].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 bg-cyan-400 rounded-full transition-all duration-300 ${
                            isPlayingAudio ? 'animate-pulse' : 'opacity-40'
                          }`}
                          style={{ height: isPlayingAudio ? `${h}px` : '8px' }}
                        />
                      ))}
                    </div>

                    {/* Delete Voice Note */}
                    <button
                      type="button"
                      onClick={() => {
                        setVoiceAudioUrl(null);
                        setIsPlayingAudio(false);
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      title="Ovozli xabarni o'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Urgency & Functional Image Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Shoshilinchlik Darajasi:</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Oddiy">Oddiy (2-3 kun ichida)</option>
                    <option value="Shoshilinch">Shoshilinch (24 soat ichida)</option>
                    <option value="Favqulodda">Favqulodda (Zudlik bilan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Surat Yuklash (Ixtiyoriy):</label>
                  
                  {/* Hidden Real File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {uploadedImagePreview ? (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-emerald-500/40">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={uploadedImagePreview}
                          alt="Preview"
                          className="w-10 h-10 object-cover rounded-lg border border-white/10"
                        />
                        <div className="text-left">
                          <span className="text-xs text-emerald-400 font-semibold block truncate max-w-[140px]">
                            {imageName || 'Surat biriktirildi'}
                          </span>
                          <span className="text-[10px] text-slate-400">Ko'rib chiqishga tayyor</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedImagePreview(null);
                          setImageName('');
                          setFormData((prev) => ({
                            ...prev,
                            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
                          }));
                        }}
                        className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg"
                        title="O'chirish"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-dashed border-white/20 hover:border-amber-400 cursor-pointer transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <div className="text-[11px] text-slate-400 text-left">
                        <span className="text-amber-400 font-semibold block">Fayl tanlang yoki rasm tashlang</span>
                        <span className="text-[10px] text-slate-500">PNG, JPG (maks. 20MB)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sample Photo Pickers if no custom photo uploaded */}
              {!uploadedImagePreview && (
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] text-slate-400 shrink-0">yoki namuna:</span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {SAMPLE_MODAL_PHOTOS.map((sp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setUploadedImagePreview(sp.url);
                          setImageName(`${sp.title}_namuna.jpg`);
                          setFormData((prev) => ({ ...prev, image: sp.url }));
                          addToast(`${sp.title} rasmi tanlandi`, "info");
                        }}
                        className="px-2 py-0.5 rounded-md text-[10px] bg-slate-800 hover:bg-amber-500/20 text-slate-300 border border-white/5 flex items-center gap-1 shrink-0"
                      >
                        <ImageIcon className="w-3 h-3 text-amber-400" />
                        <span>{sp.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                      className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs text-white border border-white/10 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="tel"
                      placeholder="+998 (90) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs text-white border border-white/10 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}
              </div>

              {/* Submit & Cancel Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="w-1/3 py-3.5 rounded-2xl font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-all text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 active:scale-98 text-xs sm:text-sm"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-slate-950" />
                      <span>Murojaatni Yuborish</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 2. NEWS DETAILS MODAL */}
      {selectedNews && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedNews(null);
          }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl my-8 rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 shadow-2xl animate-scaleUp text-left">
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
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedRequest(null);
          }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-xl my-8 rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 shadow-2xl animate-scaleUp text-left">
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

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs space-y-2">
                <span className="text-slate-400 block font-semibold">Batafsil bayon:</span>
                <p className="text-slate-200">{selectedRequest.description}</p>
                {selectedRequest.voiceAudioUrl && (
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-cyan-400 font-bold">
                    <Volume2 className="w-4 h-4" />
                    <span>Murojaatga ovozli xabar ilova qilingan</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MASTER CONTACT MODAL */}
      {selectedMaster && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedMaster(null);
          }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-md my-8 rounded-3xl glass-panel border border-cyan-500/30 p-6 shadow-2xl animate-scaleUp text-left">
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
                className="w-full py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-lg flex items-center justify-center gap-2 transition-all block text-center text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Qo'ng'iroq qilish ({selectedMaster.phone})</span>
              </a>
              <button
                onClick={() => {
                  setSelectedMaster(null);
                  addToast(`${selectedMaster.name}ga xabaringiz yetkazildi`, 'success');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Xabar qoldirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. USER PROFILE MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-sm my-8 rounded-3xl glass-panel border border-cyan-500/30 p-6 shadow-2xl animate-scaleUp text-left">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3 mb-6">
              <div className="w-20 h-20 rounded-full mx-auto bg-slate-800 flex items-center justify-center border-2 border-cyan-400 shadow-lg overflow-hidden">
                <img 
                  src={userData?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{userData?.name || "Foydalanuvchi"}</h3>
                <p className="text-xs text-cyan-400 font-semibold mt-1 uppercase tracking-wider">
                  {userRole === 'admin' ? "Xodim (Admin)" : "Aholi (Rezident)"}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {userRole === 'admin' ? (
                <>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex justify-between items-center text-sm">
                    <span className="text-slate-400">Xodim ID:</span>
                    <span className="text-white font-bold">{userData?.id || '#AD-101'}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex justify-between items-center text-sm">
                    <span className="text-slate-400">Ism Familiya:</span>
                    <span className="text-white font-bold">{userData?.name || 'Aholi'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex justify-between items-center text-sm">
                    <span className="text-slate-400">Telefon:</span>
                    <span className="text-white font-bold">{userData?.phone || '+998 -- --- -- --'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex justify-between items-center text-sm">
                    <span className="text-slate-400">Mahalla:</span>
                    <span className="text-white font-bold">{userData?.mahalla || 'Mahalla'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex justify-between items-center text-sm">
                    <span className="text-slate-400">Manzil:</span>
                    <span className="text-white font-bold">{userData?.address || 'Manzil yo\'q'}</span>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => {
                logout();
                setIsAuthModalOpen(false);
              }}
              className="w-full py-3 rounded-xl font-bold text-white bg-red-500/80 hover:bg-red-500 shadow-lg transition-all"
            >
              Tizimdan chiqish
            </button>
          </div>
        </div>
      )}
    </>
  );
};
