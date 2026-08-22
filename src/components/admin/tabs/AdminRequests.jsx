import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Clock, AlertCircle, Edit3 } from 'lucide-react';

export const AdminRequests = ({
  requests,
  handleStatusCycle,
  getStatusBadgeStyle,
  addToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRequests = requests.filter(req => {
    const matchesSearch = (req.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (req.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (req.address || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || req.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-7 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white font-serif-gold">Murojaatlar Boshqaruvi</h3>
          <p className="text-slate-400 text-sm">
            Jami murojaatlar: {requests.length} ta | Hal qilingan: {requests.filter(r => r.status === 'Bajarildi' || r.status === 'Hal etilgan').length} ta
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Mavzu, muallif yoki manzil..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
        >
          <option value="all">Barcha kategoriyalar</option>
          <option value="Kommunal">Kommunal</option>
          <option value="Obodonlashtirish">Obodonlashtirish</option>
          <option value="Yo'l ta'miri">Yo'l ta'miri</option>
          <option value="Ijtimoiy">Ijtimoiy</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
        >
          <option value="all">Barcha holatlar</option>
          <option value="Ko'rib chiqilmoqda">Ko'rib chiqilmoqda</option>
          <option value="Jarayonda">Jarayonda</option>
          <option value="Bajarildi">Bajarildi</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-white/[0.08] pb-3">
              <th className="py-3 font-bold uppercase tracking-wider text-xs">ID</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs">Mavzu & Tafsilot</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs">Kategoriya</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs">Muallif</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs">Holat</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs text-right">O'zgartirish</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-white">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-cyan-400">#{req.id}</td>
                  <td className="py-3.5">
                    <div className="font-bold text-white max-w-[240px] truncate">{req.title}</div>
                    <div className="text-xs text-slate-400 max-w-[240px] truncate">{req.description || req.address}</div>
                  </td>
                  <td className="py-3.5 text-xs text-slate-300">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-white/10">
                      {req.category || 'Umumiy'}
                    </span>
                  </td>
                  <td className="py-3.5 text-xs text-slate-300">
                    <div>{req.author || 'Anonim'}</div>
                    <div className="text-[11px] text-slate-500">{req.phone || '—'}</div>
                  </td>
                  <td className="py-3.5">
                    <button
                      onClick={() => handleStatusCycle(req)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition-transform active:scale-95 ${getStatusBadgeStyle(req.status)}`}
                    >
                      {req.status}
                    </button>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleStatusCycle(req)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                      title="Holatni almashtirish"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400 text-sm">
                  Murojaat topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
