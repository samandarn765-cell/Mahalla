import React, { useState } from 'react';
import { useMahalla } from '../../../context/MahallaContext';
import {
  CreditCard,
  Search,
  Filter,
  ArrowDownRight,
  TrendingUp,
  Receipt,
  CheckCircle2,
  Calendar,
  Building2,
  Download,
  Eye,
  ShieldCheck
} from 'lucide-react';

export const AdminPayments = () => {
  const { paymentsList, fundStats, setActiveReceipt } = useMahalla();
  const [searchTerm, setSearchTerm] = useState('');
  const [providerFilter, setProviderFilter] = useState('all');

  const filteredPayments = paymentsList.filter((p) => {
    const matchesSearch =
      (p.payer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.fiscal_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.purpose || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvider = providerFilter === 'all' || p.provider?.toLowerCase() === providerFilter.toLowerCase();
    return matchesSearch && matchesProvider;
  });

  const totalCollected = fundStats?.collected_amount ?? 0;
  const target = fundStats?.target_amount || 50000000;

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Jami Yig'ilgan Mablag'</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {totalCollected.toLocaleString('uz-UZ')} <span className="text-sm text-emerald-400 font-bold">UZS</span>
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Maqsadning {Math.round((totalCollected / target) * 100)}% qismi to'plandi</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Maqsadli Byudjet</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {target.toLocaleString('uz-UZ')} <span className="text-sm text-cyan-400 font-bold">UZS</span>
          </div>
          <div className="text-xs text-slate-400 mt-2 truncate">
            {fundStats?.target_title || "Bolalar o'yingohi barpo etish"}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tranzaksiyalar Soni</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {paymentsList.length} <span className="text-sm text-amber-400 font-bold">ta</span>
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Barcha to'lovlar Telegram orqali bildirilgan</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="F.I.Sh, Fiskal ID yoki Maqsad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-400">To'lov turi:</span>
            {['all', 'payme', 'click', 'uzum'].map((prov) => (
              <button
                key={prov}
                onClick={() => setProviderFilter(prov)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  providerFilter === prov
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {prov.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-4">Fiskal ID</th>
                <th className="px-5 py-4">To'lovchi</th>
                <th className="px-5 py-4">Maqsad</th>
                <th className="px-5 py-4">Tizim</th>
                <th className="px-5 py-4">Summa</th>
                <th className="px-5 py-4">Sana</th>
                <th className="px-5 py-4 text-right">Chek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 font-medium">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                    To'lovlar topilmadi
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-cyan-400">
                      {p.fiscal_id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{p.payer_name || "Mahalla fuqarosi"}</div>
                      <div className="text-xs text-slate-400 font-mono">{p.payer_phone || p.card_mask}</div>
                    </td>
                    <td className="px-5 py-4 max-w-xs truncate text-slate-300">
                      {p.purpose || "Mahalla fondi"}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        p.provider?.toLowerCase() === 'payme' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                        p.provider?.toLowerCase() === 'click' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {p.provider || 'Payme'}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-emerald-400">
                      +{Number(p.amount).toLocaleString('uz-UZ')} UZS
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">
                      {new Date(p.date || Date.now()).toLocaleDateString('uz-UZ')}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setActiveReceipt(p)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 ml-auto transition-colors cursor-pointer border border-slate-700"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Ko'rish</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
