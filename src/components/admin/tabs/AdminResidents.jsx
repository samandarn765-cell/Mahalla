import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Phone, MapPin, CheckCircle, Ban } from 'lucide-react';

export const AdminResidents = ({
  residentsList,
  setResidentsList,
  setIsAddResidentModalOpen,
  addToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredResidents = residentsList.filter(resident => {
    const matchesSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resident.phone.includes(searchTerm) ||
                          resident.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || resident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (id, currentStatus, name) => {
    const newStatus = currentStatus === 'Faol' ? 'Bloklangan' : 'Faol';
    setResidentsList(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    addToast(`${name} statusi: ${newStatus}`, newStatus === 'Faol' ? 'success' : 'warning');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[30px] bg-[#141f3d] border border-[#252F43] p-6 sm:p-7 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white font-serif-gold">Aholi Boshqaruvi</h3>
          <p className="text-slate-400 text-sm">
            Jami: {residentsList.length} ta fuqaro | Faol: {residentsList.filter(r => r.status === 'Faol').length} ta
          </p>
        </div>
        <button 
          onClick={() => setIsAddResidentModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Yangi Fuqaro</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Ism, telefon yoki manzil bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'Faol', 'Bloklangan'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === status
                  ? 'bg-slate-700 text-white border border-white/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              {status === 'all' ? 'Barchasi' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-white/[0.08] pb-3">
              <th className="py-3 font-bold uppercase tracking-wider text-xs">Ism Familiya</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs">Telefon</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs">Manzil</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs text-right">Holat & Amal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-white">
            {filteredResidents.length > 0 ? (
              filteredResidents.map((person) => (
                <tr key={person.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-xs text-cyan-400">
                      {person.name.charAt(0)}
                    </div>
                    <span>{person.name}</span>
                  </td>
                  <td className="py-3.5 text-slate-300">
                    <span className="flex items-center gap-1.5 font-mono text-xs">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {person.phone}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-300">
                    <span className="flex items-center gap-1.5 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {person.address || '—'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => toggleStatus(person.id, person.status, person.name)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-transform active:scale-95 inline-flex items-center gap-1.5 ${
                        person.status === 'Faol' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {person.status === 'Faol' ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                      <span>{person.status}</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-400 text-sm">
                  Hech qanday fuqaro topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
