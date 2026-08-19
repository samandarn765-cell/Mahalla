import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MAHALLA_INFO,
  INITIAL_UTILITIES,
  INITIAL_NEWS,
  LEADERS,
  INITIAL_MASTERS,
  INITIAL_REQUESTS,
  LEADERBOARD_CITIZENS,
  REWARDS,
  EMERGENCY_CONTACTS
} from '../assets/mockData';

const MahallaContext = createContext();

export const MahallaProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || 'uz');
  const [theme, setTheme] = useState(localStorage.getItem('mahalla_theme') || 'light');
  
  // Theme effect
  useEffect(() => {
    localStorage.setItem('mahalla_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Data States
  const [utilities, setUtilities] = useState(INITIAL_UTILITIES);
  const [newsList, setNewsList] = useState(INITIAL_NEWS);
  const [leaders, setLeaders] = useState(LEADERS);
  const [masters, setMasters] = useState(INITIAL_MASTERS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [leaderboard, setLeaderboard] = useState(LEADERBOARD_CITIZENS);
  const [rewards] = useState(REWARDS);
  const [emergencyContacts] = useState(EMERGENCY_CONTACTS);

  // UI & Interaction States
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Fetch initial data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqRes = await fetch('http://localhost:3001/api/requests');
        const reqData = await reqRes.json();
        if (reqData && reqData.length > 0) setRequests(reqData);

        const utilRes = await fetch('http://localhost:3001/api/utilities');
        const utilData = await utilRes.json();
        if (utilData && utilData.length > 0) setUtilities(utilData);

        const newsRes = await fetch('http://localhost:3001/api/news');
        const newsData = await newsRes.json();
        if (newsData && newsData.length > 0) setNewsList(newsData);
      } catch (err) {
        console.error("Failed to fetch backend data", err);
      }
    };
    fetchData();
  }, []);

  // Add toast notification
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Submit new civic issue report via backend API
  const submitReport = async (reportData) => {
    const newRequest = {
      title: reportData.title || "Yangi Murojaat",
      description: reportData.description || "",
      address: reportData.address || "Mahalla hududi",
      category: reportData.category || "Ko'cha Chiroqlari",
      urgency: reportData.urgency || "Oddiy",
      author: reportData.author || (reportData.isAnonymous ? "Anonim fuqaro" : "Mahalla rezidenti"),
      phone: reportData.phone || "+998 -- --- -- --",
      status: "Ko'rib chiqilmoqda"
    };

    try {
      const res = await fetch('http://localhost:3001/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      });
      const data = await res.json();
      setRequests((prev) => [data, ...prev]);
      addToast(`Murojaatingiz qabul qilindi! ID: #${data.id}. Telegram bot orqali raisga yo'llandi.`, 'success');
    } catch (err) {
      console.error(err);
      addToast(`Murojaatni yuborishda xatolik yuz berdi`, 'error');
    }
  };

  // Update request status (for Admin)
  const updateRequestStatus = (id, newStatus, statusType) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus, statusType } : req))
    );
    addToast(`Murojaat ${id} holati "${newStatus}"ga o'zgartirildi`, 'success');
  };

  // Toggle or update utility status
  const updateUtilityStatus = (id, newStatus, level, statusText, type) => {
    setUtilities((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: newStatus,
              level: level !== undefined ? level : u.level,
              statusText: statusText || u.statusText,
              type: type || u.type,
              lastUpdate: 'Bugun, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : u
      )
    );
    addToast(`Kommunal tarmoq holati yangilandi!`, 'info');
  };

  // Register new resident
  const registerResident = (residentData) => {
    addToast(`Tabriklaymiz! ${residentData.fullName || 'Fuqaro'} muvaffaqiyatli ro'yxatga olindi. Mahalla ID berildi.`, 'success');
  };

  // Add new master to marketplace
  const addMaster = (masterData) => {
    const newMaster = {
      id: masters.length + 1,
      name: masterData.name,
      specialty: masterData.specialty,
      rating: 5.0,
      jobsCount: 1,
      phone: masterData.phone,
      description: masterData.description,
      experience: masterData.experience || "Yangi usta",
      available: true,
      avatar: masterData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
    };
    setMasters((prev) => [newMaster, ...prev]);
    addToast("Xizmatingiz Mahalla Marketpleysiga qo'shildi!", 'success');
  };

  return (
    <MahallaContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        theme,
        setTheme,
        mahallaInfo: MAHALLA_INFO,
        utilities,
        updateUtilityStatus,
        newsList,
        setNewsList,
        leaders,
        masters,
        addMaster,
        requests,
        submitReport,
        updateRequestStatus,
        leaderboard,
        rewards,
        emergencyContacts,
        selectedNews,
        setSelectedNews,
        selectedRequest,
        setSelectedRequest,
        selectedMaster,
        setSelectedMaster,
        selectedLeader,
        setSelectedLeader,
        isReportModalOpen,
        setIsReportModalOpen,
        registerResident,
        toasts,
        addToast
      }}
    >
      {children}
    </MahallaContext.Provider>
  );
};

export const useMahalla = () => useContext(MahallaContext);
