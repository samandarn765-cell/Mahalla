import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import {
  User,
  Phone,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  PlusCircle,
  Edit3,
  Award,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  LogOut,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  Check,
  Camera,
  BellRing,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
];

export const ProfilePage = () => {
  const {
    userData,
    userRole,
    requests,
    setIsReportModalOpen,
    setSelectedRequest,
    logout,
    updateUserProfile,
    addToast
  } = useMahalla();

  const [activeTab, setActiveTab] = useState('requests'); // 'requests' | 'edit' | 'rewards'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'in_progress' | 'resolved'
  const [searchQuery, setSearchQuery] = useState('');

  // User form editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userData?.name || 'Mahalla Rezidenti');
  const [editPhone, setEditPhone] = useState(userData?.phone || '+998 90 123-45-67');
  const [editMahalla, setEditMahalla] = useState(userData?.mahalla || 'Navoiy Mahallasi');
  const [editAddress, setEditAddress] = useState(userData?.address || "Navoiy ko'chasi, 24-uy");
  const [editAvatar, setEditAvatar] = useState(
    userData?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
  );

  const currentUser = useMemo(() => {
    return {
      name: userData?.name || 'Mahalla Rezidenti',
      phone: userData?.phone || '+998 90 123-45-67',
      mahalla: userData?.mahalla || 'Navoiy Mahallasi',
      address: userData?.address || "Navoiy ko'chasi, 24-uy",
      avatar: userData?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      id: userData?.id || '#MH-7842',
      joinDate: '2024-yil Fevral',
      points: 240,
      badge: 'Faol Fuqaro'
    };
  }, [userData]);

  // Filter requests that belong to this user or are recent
  const userRequests = useMemo(() => {
    if (!requests || requests.length === 0) return [];
    
    // Match by author name or phone, or include user created ones
    return requests.filter((req) => {
      const matchName = currentUser.name && req.author?.toLowerCase().includes(currentUser.name.toLowerCase());
      const matchPhone = currentUser.phone && req.phone === currentUser.phone;
      // If user is resident and newly registered, show their matched requests or default first 3 if none exist
      return matchName || matchPhone;
    });
  }, [requests, currentUser]);

  // Fallback demo requests if user just created a brand new account and hasn't submitted yet
  const displayedUserRequests = useMemo(() => {
    if (userRequests.length > 0) return userRequests;
    // Provide sample linked requests so profile isn't totally barren initially
    return requests.slice(0, 3);
  }, [userRequests, requests]);

  // Filtered by status and search
  const filteredRequests = useMemo(() => {
    return displayedUserRequests.filter((req) => {
      const matchesSearch = 
        req.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.address?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterStatus === 'pending') return req.status === "Ko'rib chiqilmoqda" || req.statusType === 'pending';
      if (filterStatus === 'in_progress') return req.status === 'Jarayonda' || req.statusType === 'in_progress';
      if (filterStatus === 'resolved') return req.status === 'Hal etilgan' || req.status === 'Bajarildi' || req.statusType === 'resolved';

      return true;
    });
  }, [displayedUserRequests, filterStatus, searchQuery]);

  // Metrics
  const stats = useMemo(() => {
    const total = displayedUserRequests.length;
    const pending = displayedUserRequests.filter(r => r.status === "Ko'rib chiqilmoqda" || r.statusType === 'pending').length;
    const inProgress = displayedUserRequests.filter(r => r.status === 'Jarayonda' || r.statusType === 'in_progress').length;
    const resolved = displayedUserRequests.filter(r => r.status === 'Hal etilgan' || r.status === 'Bajarildi' || r.statusType === 'resolved').length;
    return { total, pending, inProgress, resolved };
  }, [displayedUserRequests]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (updateUserProfile) {
      updateUserProfile({
        name: editName,
        phone: editPhone,
        mahalla: editMahalla,
        address: editAddress,
        avatar: editAvatar
      });
    } else {
      addToast("Profil ma'lumotlari saqlandi!", 'success');
    }
    setIsEditing(false);
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}
  };

  const getStatusBadge = (status, statusType) => {
    if (status === 'Hal etilgan' || status === 'Bajarildi' || statusType === 'resolved') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" /> Hal etildi
        </span>
      );
    }
    if (status === 'Jarayonda' || statusType === 'in_progress') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
          <Clock className="w-3.5 h-3.5 animate-spin" /> Jarayonda
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
        <AlertCircle className="w-3.5 h-3.5" /> Ko'rib chiqilmoqda
      </span>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* 1. PROFILE BANNER & USER HEADER */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 dark:border-white/5 shadow-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/95 text-white">
        
        {/* Background Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          
          {/* Avatar & Main Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-cyan-500/50 shadow-2xl bg-slate-800 relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => {
                  setActiveTab('edit');
                  setIsEditing(true);
                }}
                title="Rasmni o'zgartirish"
                className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg hover:scale-110 transition-transform"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {currentUser.badge}
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs px-2.5 py-1 rounded-full font-mono font-bold">
                  {currentUser.id}
                </span>
              </div>

              <p className="text-slate-300 text-sm flex items-center justify-center sm:justify-start gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{currentUser.mahalla}</span>
                <span className="text-slate-500">•</span>
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{currentUser.address}</span>
              </p>

              <p className="text-slate-400 text-xs flex items-center justify-center sm:justify-start gap-3 pt-1">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" /> {currentUser.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> A'zo: {currentUser.joinDate}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Ariza Qoldirish</span>
            </motion.button>

            <button
              onClick={() => {
                setActiveTab(activeTab === 'edit' ? 'requests' : 'edit');
                setIsEditing(!isEditing);
              }}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
              title="Tahrirlash"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={logout}
              className="p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              title="Tizimdan chiqish"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. STATS OVERVIEW CARDS STRIP */}
        <div className="border-t border-white/10 grid grid-cols-2 md:grid-cols-4 bg-slate-950/40 divide-x divide-white/5">
          <div className="p-4 sm:p-6 text-center hover:bg-white/[0.02] transition-colors">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" /> Jami Arizalar
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{stats.total}</div>
          </div>

          <div className="p-4 sm:p-6 text-center hover:bg-white/[0.02] transition-colors">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" /> Ko'rib chiqilmoqda
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{stats.pending}</div>
          </div>

          <div className="p-4 sm:p-6 text-center hover:bg-white/[0.02] transition-colors">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" /> Jarayonda
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">{stats.inProgress}</div>
          </div>

          <div className="p-4 sm:p-6 text-center hover:bg-white/[0.02] transition-colors">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Hal Etilgan
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.resolved}</div>
          </div>
        </div>
      </div>

      {/* 3. TABS NAVIGATION */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'requests'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Mening Arizalarim</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-white/20 font-mono">
              {stats.total}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'edit'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Ma'lumotlarni tahrirlash</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'rewards'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Faollik & Nishonlar</span>
          </button>
        </div>

        {activeTab === 'requests' && (
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <PlusCircle className="w-4 h-4" /> Yangi ariza yuborish
          </button>
        )}
      </div>

      {/* 4. TAB CONTENTS */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: USER REQUESTS */}
        {activeTab === 'requests' && (
          <motion.div
            key="requests-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ariza yoki manzil bo'yicha qidiruv..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {[
                  { key: 'all', label: 'Barchasi' },
                  { key: 'pending', label: "Ko'rib chiqilmoqda" },
                  { key: 'in_progress', label: 'Jarayonda' },
                  { key: 'resolved', label: 'Hal etilgan' }
                ].map((st) => (
                  <button
                    key={st.key}
                    onClick={() => setFilterStatus(st.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                      filterStatus === st.key
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Requests Grid */}
            {filteredRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-900/80 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-lg hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-44 overflow-hidden bg-slate-800">
                        <img
                          src={req.image || "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80"}
                          alt={req.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          {getStatusBadge(req.status, req.statusType)}
                        </div>

                        {/* Category & ID */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                          <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 font-semibold">
                            {req.category}
                          </span>
                          <span className="font-mono text-cyan-300 font-bold bg-slate-900/80 px-2 py-1 rounded-lg">
                            {req.id}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                          {req.title}
                        </h3>

                        <p className="text-xs text-gray-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {req.description}
                        </p>

                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{req.address}</span>
                        </div>

                        {/* Progress Stepper Line */}
                        <div className="pt-2 border-t border-gray-100 dark:border-white/5 space-y-1.5">
                          <div className="flex justify-between text-[11px] font-semibold text-gray-400 dark:text-slate-500">
                            <span className="text-emerald-500 font-bold">1. Qabul qilindi</span>
                            <span className={req.status !== "Ko'rib chiqilmoqda" ? 'text-cyan-500 font-bold' : ''}>2. Jarayonda</span>
                            <span className={req.status === "Hal etilgan" || req.status === "Bajarildi" ? 'text-emerald-500 font-bold' : ''}>3. Bajarildi</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${
                                req.status === 'Hal etilgan' || req.status === 'Bajarildi'
                                  ? 'w-full bg-emerald-500'
                                  : req.status === 'Jarayonda'
                                  ? 'w-2/3 bg-cyan-500'
                                  : 'w-1/3 bg-amber-500'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 py-3.5 bg-gray-50 dark:bg-slate-900/40 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs">
                      <span className="text-gray-400 dark:text-slate-500 font-medium">
                        {req.date || 'Bugun'}
                      </span>
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1"
                      >
                        Batafsil <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/40 rounded-3xl border border-dashed border-gray-300 dark:border-white/10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Hech qanday ariza topilmadi
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto">
                    Mahallamiz infratuzilmasini birgalikda yaxshilaymiz. Muammo yoki taklifingiz bo'lsa darhol xabar bering!
                  </p>
                </div>
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> Ariza qoldirish
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: EDIT PROFILE */}
        {activeTab === 'edit' && (
          <motion.div
            key="edit-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-2xl mx-auto bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-xl"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Shaxsiy Ma'lumotlarni Tahrirlash
            </h2>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">
              Arizalaringiz tezkor ko'rib chiqilishi uchun telefon raqam va mahallangizni aniq kiriting.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Profil Rasmini Tanlang
                </label>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {PRESET_AVATARS.map((av, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setEditAvatar(av)}
                      className={`relative w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                        editAvatar === av
                          ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={av} alt="Avatar option" className="w-full h-full object-cover" />
                      {editAvatar === av && (
                        <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center text-white">
                          <Check className="w-4 h-4 font-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ism Familiya */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Ism va Familiya
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Telefon Raqam */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Telefon Raqam
                </label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Mahalla */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Mahalla Nomi
                </label>
                <input
                  type="text"
                  value={editMahalla}
                  onChange={(e) => setEditMahalla(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Manzil */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Aniq Yashash Manzili (Ko'cha va Uy raqami)
                </label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('requests')}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 3: REWARDS & GAMIFICATION */}
        {activeTab === 'rewards' && (
          <motion.div
            key="rewards-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Gamification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900/60 to-slate-900 border border-amber-500/30 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">To'plangan Ballar</h4>
                <div className="text-3xl font-black text-amber-400 mb-2">240 Ball</div>
                <p className="text-xs text-slate-300">
                  Har bir hal etilgan ariza va mahalla hasharidagi ishtirok uchun ball beriladi.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-slate-900/60 to-slate-900 border border-emerald-500/30 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Mahalla Reytingi</h4>
                <div className="text-3xl font-black text-emerald-400 mb-2">#4 O'rin</div>
                <p className="text-xs text-slate-300">
                  Navoiy mahallasi faol aholisi orasida yuqori 5% lik darajasidasiz.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-slate-900/60 to-slate-900 border border-cyan-500/30 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Eko-Tashabbuslar</h4>
                <div className="text-3xl font-black text-cyan-400 mb-2">5 ta Hashtar</div>
                <p className="text-xs text-slate-300">
                  Daraxt ekish va mahalla obodonlashtirish aksiyalarida faol qatnashgan.
                </p>
              </div>
            </div>

            {/* Badges List */}
            <div className="bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Sizning Nishonlaringiz (Badges)
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: "Faol Fuqaro", desc: "5+ ariza yuborilgan", icon: "🎖️", earned: true },
                  { title: "Yashil Mahalla", desc: "Hashar ishtirokchisi", icon: "🌱", earned: true },
                  { title: "Tezkor Posbon", desc: "Birinchi bo'lib xabar bergan", icon: "⚡", earned: true },
                  { title: "Oltin Qo'shni", desc: "10+ qo'llab-quvvatlash", icon: "⭐", earned: false }
                ].map((bg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                      bg.earned
                        ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-gray-50 dark:bg-slate-800/40 border-gray-200 dark:border-white/5 opacity-50'
                    }`}
                  >
                    <div className="text-3xl">{bg.icon}</div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">{bg.title}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">{bg.desc}</div>
                    {bg.earned && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        Qo'lga kiritildi
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
