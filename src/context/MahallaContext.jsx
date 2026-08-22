import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import { apiService } from '../services/api';

const MahallaContext = createContext();

export const MahallaProvider = ({ children }) => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('mahalla_auth') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('mahalla_role') || null;
  });
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('mahalla_token') || null;
  });
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('mahalla_user_data');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

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
  const [mahallaInfo, setMahallaInfo] = useState(MAHALLA_INFO);
  const [utilities, setUtilities] = useState(INITIAL_UTILITIES);
  const [newsList, setNewsList] = useState(INITIAL_NEWS);
  const [leaders, setLeaders] = useState(LEADERS);
  const [masters, setMasters] = useState(INITIAL_MASTERS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [leaderboard, setLeaderboard] = useState(LEADERBOARD_CITIZENS);
  const [rewards] = useState(REWARDS);
  const [emergencyContacts] = useState(EMERGENCY_CONTACTS);

  // Admin Panel specific states
  const [residentsList, setResidentsList] = useState([
    { id: 1, name: "Aliyev Vali", phone: "+998 90 123 45 67", address: "Navoiy ko'chasi, 12-uy", status: "Faol" },
    { id: 2, name: "Karimova Nargiza", phone: "+998 93 987 65 43", address: "Bog'ishamol ko'chasi, 5-uy", status: "Faol" },
    { id: 3, name: "Samatov Rustam", phone: "+998 97 111 22 33", address: "Navoiy ko'chasi, 18-uy", status: "Faol" },
    { id: 4, name: "Toshmatov Eshmat", phone: "+998 99 444 55 66", address: "Do'stlik ko'chasi, 2-uy", status: "Faol" },
    { id: 5, name: "Usmonov Jalol", phone: "+998 94 555 11 22", address: "Mustaqillik ko'chasi, 44-uy", status: "Bloklangan" }
  ]);

  const [servicesList, setServicesList] = useState([
    { id: 1, name: "Santexnika xizmatlari", icon: "💧", count: 12 },
    { id: 2, name: "Elektr ishlari", icon: "⚡", count: 8 },
    { id: 3, name: "Gaz plita ta'miri", icon: "🔥", count: 5 },
    { id: 4, name: "Tozalik va Maishiy", icon: "🧹", count: 15 },
  ]);

  // UI & Interaction States
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Fund & Payments State
  const [fundStats, setFundStats] = useState({
    id: 1,
    collected_amount: 0,
    target_amount: 50000000,
    target_title: "Bolalar o'yingohi va 'Yashil Makon' xiyoboni",
    contributors_count: 0
  });

  const [paymentsList, setPaymentsList] = useState([
    {
      id: 1,
      fiscal_id: 'CHK-8F92A1',
      amount: 250000,
      purpose: "Bolalar o'yingohi uchun xayriya",
      provider: 'Payme',
      payer_name: 'Abdurashid Karimov',
      payer_phone: '+998 90 123 45 67',
      card_mask: '8600 **** **** 1234',
      status: 'completed',
      date: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: 2,
      fiscal_id: 'CHK-4B11E9',
      amount: 100000,
      purpose: "Kuzatuv kameralari o'rnatish",
      provider: 'Click',
      payer_name: 'Zuhra Rustamova',
      payer_phone: '+998 93 456 78 90',
      card_mask: '9860 **** **** 5678',
      status: 'completed',
      date: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: 3,
      fiscal_id: 'CHK-99DA03',
      amount: 500000,
      purpose: "Yashil Makon daraxt ekish",
      provider: 'Uzum',
      payer_name: 'Islombek Yoqubov',
      payer_phone: '+998 97 789 01 23',
      card_mask: '8600 **** **** 9012',
      status: 'completed',
      date: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ]);

  // Fetch initial data from backend API with fallback
  useEffect(() => {
    let isMounted = true;
    const initData = async () => {
      try {
        const [backendRequests, backendUtilities, backendResidents, backendFund, backendPayments, backendNews] = await Promise.all([
          apiService.getRequests(),
          apiService.getUtilities(),
          apiService.getResidents(),
          apiService.getFundStats(),
          apiService.getPayments(),
          apiService.getNews()
        ]);

        if (isMounted) {
          if (backendRequests && backendRequests.length > 0) setRequests(backendRequests);
          if (backendUtilities) setUtilities(prev => ({ ...prev, ...backendUtilities }));
          if (backendResidents && backendResidents.length > 0) setResidentsList(backendResidents);
          if (backendFund) setFundStats(backendFund);
          if (backendPayments && backendPayments.length > 0) setPaymentsList(backendPayments);
          if (backendNews && backendNews.length > 0) setNewsList(backendNews);
        }
      } catch (err) {
        console.warn("Backend data fallback initialized", err);
      }
    };
    initData();
    return () => { isMounted = false; };
  }, []);

  // Toast notification
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Authentication Login
  const login = async (role, credentials) => {
    try {
      const response = await apiService.login(role, credentials);
      if (response && response.success) {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserData(response.user);
        setAuthToken(response.token);

        localStorage.setItem('mahalla_auth', 'true');
        localStorage.setItem('mahalla_role', role);
        localStorage.setItem('mahalla_token', response.token);
        localStorage.setItem('mahalla_user_data', JSON.stringify(response.user));

        addToast(`Xush kelibsiz, ${response.user.name || 'Foydalanuvchi'}!`, 'success');
        return { success: true };
      }
      return { success: false, error: response?.error || "Kirishda xatolik" };
    } catch (err) {
      return { success: false, error: "Serverga ulanish xatosi" };
    }
  };

  // Logout
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserData(null);
    setAuthToken(null);
    localStorage.removeItem('mahalla_auth');
    localStorage.removeItem('mahalla_role');
    localStorage.removeItem('mahalla_token');
    localStorage.removeItem('mahalla_user_data');
    addToast("Tizimdan muvaffaqiyatli chiqildi", 'info');
  }, [addToast]);

  // Request Submission
  const addRequest = async (requestData) => {
    const newRequest = await apiService.createRequest({
      ...requestData,
      author: userData?.name || requestData.author || 'Mahalla fuqarosi',
      phone: userData?.phone || requestData.phone || '+998 90 000 00 00'
    });

    setRequests((prev) => [newRequest, ...prev]);
    addToast("Murojaatingiz qabul qilindi va ro'yxatga olindi!", 'success');
    return newRequest;
  };

  // Update Request Status
  const updateRequestStatus = async (id, newStatus, newType = 'in_progress') => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus, type: newType } : req
      )
    );
    await apiService.updateRequestStatus(id, newStatus, newType);
    addToast(`Murojaat holati "${newStatus}" ga o'zgartirildi`, 'info');
  };

  // Delete Request
  const deleteRequest = async (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    addToast("Murojaat o'chirildi", 'info');
  };

  // Residents Management
  const addResident = async (residentData) => {
    const created = await apiService.createResident(residentData);
    setResidentsList((prev) => [created, ...prev]);
    addToast("Yangi fuqaro ro'yxatga qo'shildi!", 'success');
    return created;
  };

  const deleteResident = async (id) => {
    setResidentsList((prev) => prev.filter((res) => res.id !== id));
    await apiService.deleteResident(id);
    addToast("Fuqaro ro'yxatdan o'chirildi", 'info');
  };

  // News Management
  const addNews = async (newsData) => {
    const created = await apiService.createNews(newsData);
    setNewsList((prev) => [created, ...prev]);
    addToast("Yangi xabar (yangilik) muvaffaqiyatli qo'shildi!", 'success');
    return created;
  };

  const deleteNews = async (id) => {
    setNewsList((prev) => prev.filter((news) => news.id !== id));
    await apiService.deleteNews(id);
    addToast("Yangilik o'chirildi", 'info');
  };

  // User Profile
  const updateUserAvatar = async (avatarUrl) => {
    if (userData) {
      await apiService.updateUserAvatar(userData.id, avatarUrl);
      const updatedUser = { ...userData, avatar: avatarUrl };
      setUserData(updatedUser);
      localStorage.setItem('mahalla_user_data', JSON.stringify(updatedUser));
      addToast("Profil rasmi yangilandi", 'success');
    }
  };

  // Payments / Fund Donation
  const makePayment = async (paymentPayload) => {
    const payment = await apiService.createPayment({
      ...paymentPayload,
      payer_name: paymentPayload.payer_name || userData?.name || 'Mahalla faoli',
      payer_phone: paymentPayload.payer_phone || userData?.phone || '+998 90 123 45 67'
    });

    // Update local state
    setPaymentsList((prev) => [payment, ...prev]);
    setFundStats((prev) => ({
      ...prev,
      collected_amount: prev.collected_amount + (payment.amount || 0),
      contributors_count: prev.contributors_count + 1
    }));

    // Trigger electronic receipt view
    setActiveReceipt(payment);
    setIsFundModalOpen(false);
    addToast(`To'lov muvaffaqiyatli amalga oshirildi: ${Number(payment.amount).toLocaleString('uz-UZ')} so'm!`, 'success');
    return payment;
  };

  // Update Utility Status
  const updateUtilityStatus = async (serviceKey, newStatus, newPercentage, newMessage, statusType) => {
    const updated = {
      ...utilities,
      [serviceKey]: {
        ...utilities[serviceKey],
        status: newStatus,
        percentage: newPercentage,
        message: newMessage,
        statusType: statusType || (newStatus === 'Online' ? 'online' : 'maintenance')
      }
    };
    setUtilities(updated);
    await apiService.updateUtilities(updated);
    addToast(`${serviceKey.toUpperCase()} ta'minoti yangilandi`, 'success');
  };

  return (
    <MahallaContext.Provider
      value={{
        // Auth
        isAuthenticated,
        userRole,
        userData,
        authToken,
        login,
        logout,
        updateUserAvatar,

        // Settings
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        theme,
        setTheme,

        // Core Data
        mahallaInfo,
        setMahallaInfo,
        utilities,
        setUtilities,
        updateUtilityStatus,
        newsList,
        setNewsList,
        addNews,
        deleteNews,
        leaders,
        setLeaders,
        masters,
        setMasters,
        requests,
        setRequests,
        addRequest,
        updateRequestStatus,
        deleteRequest,
        leaderboard,
        setLeaderboard,
        rewards,
        emergencyContacts,

        // Fund & Payments
        fundStats,
        setFundStats,
        paymentsList,
        setPaymentsList,
        makePayment,
        isFundModalOpen,
        setIsFundModalOpen,
        activeReceipt,
        setActiveReceipt,

        // Admin Specific
        residentsList,
        setResidentsList,
        addResident,
        deleteResident,
        servicesList,
        setServicesList,

        // Modals & UI
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
        isAuthModalOpen,
        setIsAuthModalOpen,

        // Toasts
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </MahallaContext.Provider>
  );
};

export const useMahalla = () => {
  const context = useContext(MahallaContext);
  if (!context) {
    throw new Error('useMahalla must be used within a MahallaProvider');
  }
  return context;
};

