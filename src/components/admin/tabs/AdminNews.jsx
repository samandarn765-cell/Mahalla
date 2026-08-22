import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMahalla } from '../../../context/MahallaContext';
import { Trash2, Plus, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export const AdminNews = () => {
  const { newsList, addNews, deleteNews } = useMahalla();
  const [isAddNewsModalOpen, setIsAddNewsModalOpen] = useState(false);
  const [newNews, setNewNews] = useState({
    title: '',
    category: 'Xabar',
    categoryType: 'ALL',
    excerpt: '',
    fullContent: '',
    image: '',
    readTime: '2 daqiqa'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { label: 'Hashar', type: 'hashar' },
    { label: 'Kommunal', type: 'kommunal' },
    { label: 'Majlis', type: 'meeting' },
    { label: 'Madaniy', type: 'cultural' },
    { label: 'Boshqa', type: 'ALL' }
  ];

  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.excerpt || !newNews.fullContent) return;
    
    setIsSubmitting(true);
    await addNews({
      ...newNews,
      image: newNews.image || 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=800&auto=format&fit=crop&q=80'
    });
    
    setNewNews({
      title: '', category: 'Xabar', categoryType: 'ALL', excerpt: '', fullContent: '', image: '', readTime: '2 daqiqa'
    });
    setIsSubmitting(false);
    setIsAddNewsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141f3d] p-6 rounded-[24px] border border-[#252F43] shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white font-serif-gold">Yangiliklar Boshqaruvi</h2>
          <p className="text-xs text-slate-400">Saytdagi barcha yangiliklar va e'lonlarni boshqarish</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddNewsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi xabar qo'shish</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {newsList.map((news) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={news.id}
              className="bg-[#141f3d] border border-[#252F43] rounded-2xl overflow-hidden shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="h-40 overflow-hidden relative">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] font-bold text-amber-400 border border-white/10">
                    {news.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3">{news.excerpt}</p>
                </div>
              </div>
              <div className="p-5 pt-0 mt-auto border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">{news.date} {news.year}</span>
                <button
                  onClick={() => deleteNews(news.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isAddNewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl my-8 rounded-3xl bg-[#141f3d] border border-[#252F43] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Yangi Xabar Qo'shish</h3>
            <form onSubmit={handleAddNews} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sarlavha</label>
                <input type="text" required value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-emerald-500 focus:outline-none text-sm" placeholder="Xabar sarlavhasi" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Kategoriya</label>
                  <select value={newNews.categoryType} onChange={e => {
                      const sel = categories.find(c => c.type === e.target.value);
                      setNewNews({...newNews, categoryType: sel.type, category: sel.label});
                    }} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-emerald-500 focus:outline-none text-sm">
                    {categories.map(c => <option key={c.type} value={c.type}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Rasm URL manzil (ixtiyoriy)</label>
                  <input type="text" value={newNews.image} onChange={e => setNewNews({...newNews, image: e.target.value})} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-emerald-500 focus:outline-none text-sm" placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Qisqacha mazmun (karta uchun)</label>
                <textarea rows="2" required value={newNews.excerpt} onChange={e => setNewNews({...newNews, excerpt: e.target.value})} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-emerald-500 focus:outline-none text-sm" placeholder="Qisqacha ta'rif..." />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">To'liq matn (ichiga kirganda)</label>
                <textarea rows="4" required value={newNews.fullContent} onChange={e => setNewNews({...newNews, fullContent: e.target.value})} className="w-full p-3 rounded-xl bg-slate-900 text-white border border-white/10 focus:border-emerald-500 focus:outline-none text-sm" placeholder="Batafsil matn..." />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsAddNewsModalOpen(false)} className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-colors">Bekor qilish</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors flex items-center justify-center gap-2">
                  {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>Saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
