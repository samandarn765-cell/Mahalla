import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, User, MoreVertical, Hash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMahalla } from '../../context/MahallaContext';

const INITIAL_MESSAGES = [
  { id: 1, text: "Assalomu alaykum qo'shnilar! Shanba kuni hashar qachon boshlanadi?", sender: 'Nodirbek', isMe: false, time: "10:30" },
  { id: 2, text: "Va alaykum assalom. Soat 09:00 da guzarda yig'ilamiz deyishdi.", sender: 'Aziz', isMe: false, time: "10:35" },
  { id: 3, text: "Xabar uchun rahmat! Belkurak o'zimiz bilan olib chiqamizmi?", sender: 'Farrux', isMe: false, time: "10:38" },
  { id: 4, text: "Ha, iloji bo'lsa. Mahalla tomonidan ham tarqatiladi.", sender: 'Mahalla Raisi', isMe: false, time: "10:45", isAdmin: true },
];

const ONLINE_USERS = [
  { id: 1, name: 'Nodirbek', role: 'Fuqaro' },
  { id: 2, name: 'Aziz', role: 'Fuqaro' },
  { id: 3, name: 'Farrux', role: 'Fuqaro' },
  { id: 4, name: 'Mahalla Raisi', role: 'Admin' },
  { id: 5, name: 'Rustam', role: 'Fuqaro' },
];

export const CommunityChat = () => {
  const { t } = useTranslation();
  const { userData } = useMahalla();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const currentUser = userData?.name || 'Siz';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: currentUser,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in h-[calc(100vh-80px)] lg:h-[calc(100vh-140px)] flex flex-col pt-10">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg">
              <Hash className="w-6 h-6" />
            </span>
            {t('chat.title', { defaultValue: 'Mahalla Chati' })}
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
            {t('chat.subtitle', { defaultValue: "Qo'shnilar bilan muloqot va muhokamalar" })}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-xl font-semibold">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          {ONLINE_USERS.length + 12} {t('chat.online', { defaultValue: 'onlayn' })}
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-[#121626] border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden flex shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-none">
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/50 dark:bg-transparent">
            <div className="flex justify-center mb-6">
              <span className="bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-[11px] px-3 py-1 rounded-lg font-medium">
                {t('chat.today', { defaultValue: 'Bugun' })}
              </span>
            </div>
            
            {messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex gap-3 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isMe && (
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.isAdmin ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                    <User className="w-4 h-4" />
                  </div>
                )}
                
                <div className={`max-w-[85%] sm:max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  {!msg.isMe && (
                    <div className="flex items-center gap-2 mb-1 pl-1">
                      <span className={`text-xs font-semibold ${msg.isAdmin ? 'text-amber-600 dark:text-amber-400' : 'text-gray-700 dark:text-slate-300'}`}>
                        {msg.sender}
                      </span>
                      {msg.isAdmin && (
                        <span className="text-[9px] bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wide">
                          {t('chat.admin', { defaultValue: 'Admin' })}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className={`relative px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.isMe 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-br-sm' 
                      : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 border border-gray-100 dark:border-slate-700 rounded-bl-sm'
                  }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-emerald-100' : 'text-gray-400 dark:text-slate-500'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-white dark:bg-[#121626] border-t border-gray-100 dark:border-white/5">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2 sm:gap-3 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder={t('chat.placeholder', { defaultValue: 'Xabar yozing... (Enter orqali yuborish)' })}
                className="flex-1 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none h-[52px] max-h-[120px]"
                rows="1"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-[52px] h-[52px] shrink-0 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-all active:scale-95"
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar (Online Users) - Hidden on Mobile */}
        <div className="hidden lg:flex w-72 flex-col border-l border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-[#0d101d]">
          <div className="p-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-2 text-gray-700 dark:text-white font-semibold">
            <Users className="w-5 h-5 text-emerald-500" />
            {t('chat.membersTitle', { defaultValue: "Jamoa A'zolari" })}
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {ONLINE_USERS.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-xl bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#0d101d] rounded-full" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-slate-500">
                      {user.role}
                    </div>
                  </div>
                </div>
                <MoreVertical className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
