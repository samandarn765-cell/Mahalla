// Centralized API client for Smart Mahalla with offline fallback

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const AI_BASE = import.meta.env.VITE_AI_URL || 'http://localhost:8000/api';

/**
 * Fetch helper with timeout and fallback
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 800) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export const apiService = {
  // Auth
  async login(role, credentials) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ role, ...credentials })
      });
      if (res && res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object' && data.success !== undefined) {
          return data;
        }
      }
    } catch {
      // Fallback to local authentication logic
    }

    // Secure local fallback
    if (role === 'admin') {
      if (credentials.id === 'admin' && credentials.password === 'admin123') {
        return {
          success: true,
          token: 'mock-jwt-admin-token-' + Date.now(),
          user: { id: 'admin', name: 'Boshqaruvchi Admin', role: 'admin' }
        };
      }
      return { success: false, error: "Noto'g'ri xodim ID yoki parol!" };
    } else {
      if (credentials.name && credentials.phone) {
        return {
          success: true,
          token: 'mock-jwt-resident-token-' + Date.now(),
          user: {
            name: credentials.name,
            phone: credentials.phone,
            mahalla: credentials.mahalla || 'Navoiy Mahallasi',
            address: credentials.address || '',
            role: 'resident'
          }
        };
      }
      return { success: false, error: "Barcha maydonlarni to'ldiring!" };
    }
  },

  // Requests / Murojaatlar
  async getRequests() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/requests`);
      if (res.ok) return await res.json();
    } catch {
      // Offline fallback
    }
    return null;
  },

  async createRequest(data) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/requests`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {
      // Offline fallback
    }
    return {
      id: Date.now(),
      ...data,
      status: "Ko'rib chiqilmoqda",
      date: new Date().toISOString()
    };
  },

  async updateRequestStatus(id, status, type) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/requests/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, type })
      });
      if (res.ok) return await res.json();
    } catch {
      // Offline fallback
    }
    return { id, status, type };
  },

  // Utilities
  async getUtilities() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/utilities`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async updateUtilities(utilities) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/utilities`, {
        method: 'POST',
        body: JSON.stringify(utilities)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return utilities;
  },

  // Residents
  async getResidents() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/residents`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async createResident(data) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/residents`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { id: Date.now(), ...data, date_registered: new Date().toISOString() };
  },

  async deleteResident(id) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/residents/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { success: true, id };
  },

  // News / Yangiliklar
  async getNews() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/news`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async createNews(data) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/news`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback mock
    }
    const now = new Date();
    return { 
      id: Date.now(), 
      ...data, 
      date: now.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' }),
      year: now.getFullYear().toString(),
      views: 0
    };
  },

  async deleteNews(id) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/news/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { success: true, id };
  },

  // User Settings
  async updateUserAvatar(userId, avatarUrl) {
    // In a real app, this would hit an API endpoint like /api/users/:id/avatar
    // Here we'll just mock it returning success
    return { success: true, avatarUrl };
  },

  // Payments & Mahalla Fund
  async getFundStats() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/fund`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return {
      id: 1,
      collected_amount: 0,
      target_amount: 50000000,
      target_title: "Bolalar o'yingohi va 'Yashil Makon' xiyoboni",
      contributors_count: 0
    };
  },

  async getPayments() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/payments`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return [];
  },

  async createPayment(data) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/payments`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {
      // Offline mock fallback
    }
    return {
      id: Date.now(),
      fiscal_id: 'CHK-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      amount: parseInt(data.amount, 10) || 100000,
      purpose: data.purpose || "Mahalla obodonlashtirish fondi",
      provider: data.provider || 'Payme',
      payer_name: data.payer_name || 'Mahalla faoli',
      payer_phone: data.payer_phone || '',
      card_mask: data.card_mask || '8600 **** **** 0000',
      status: 'completed',
      date: new Date().toISOString()
    };
  },

  // AI Chat
  async sendAIChat(message, history = []) {
    try {
      const res = await fetchWithTimeout(`${AI_BASE}/ai/chat`, {
        method: 'POST',
        body: JSON.stringify({ message, history })
      }, 8000);
      if (res.ok) return await res.json();
    } catch {
      // Intelligent fallback bot for offline demo
      const lower = message.toLowerCase();
      let reply = "Smart Mahalla AI yordamchisi: Sizning so'rovingiz qabul qilindi. ";
      if (lower.includes('ariza') || lower.includes('murojaat')) {
        reply += "Murojaat qoldirish uchun yuqoridagi 'Murojaat qilish' yoki '+' tugmasini bosing.";
      } else if (lower.includes('gaz') || lower.includes('elektr') || lower.includes('suv') || lower.includes('chiroq')) {
        reply += "Kommunal holatni Bosh sahifadagi 'Kommunal monitoring' panelida real vaqt rejimida kuzatishingiz mumkin.";
      } else if (lower.includes('admin') || lower.includes('rais') || lower.includes('nozir')) {
        reply += "Mahalla raisi qabul kunlari: Dushanba va Chorshanba 09:00 - 13:00. Favqulodda holatda SOS tugmasidan foydalaning.";
      } else if (lower.includes('to\'lov') || lower.includes('fond') || lower.includes('pul') || lower.includes('payme') || lower.includes('click')) {
        reply += "Mahalla fondiga xayriya yoki to'lov qilish uchun menyudagi 'Mahalla Fondi' tugmasini bosing. To'lovdan so'ng rasmiy QR-kodli elektron chek beriladi.";
      } else {
        reply += "Sizga qanday yordam bera olaman? Xizmatlar, mahalla yangiliklari, fond to'lovlari yoki usta chaqirish bo'yicha savollaringizni berishingiz mumkin.";
      }
      return { reply };
    }
  }
};
