import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import {
  CheckCircle2,
  Printer,
  X,
  ShieldCheck,
  Building2,
  Calendar,
  CreditCard,
  QrCode,
  Share2,
  FileCheck2,
  Download
} from 'lucide-react';

export const PaymentReceiptModal = () => {
  const { activeReceipt, setActiveReceipt, mahallaInfo } = useMahalla();

  if (!activeReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(activeReceipt.date || Date.now()).toLocaleString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SMART-MAHALLA-RECEIPT-${activeReceipt.fiscal_id}-${activeReceipt.amount}UZS`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto print:p-0 print:m-0 print:absolute print:inset-0 print:bg-white">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveReceipt(null)}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md print:hidden"
        />

        {/* Receipt Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-md bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-200 print:border-none print:shadow-none my-6"
        >
          {/* Top Success Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-center text-white relative">
            <button
              onClick={() => setActiveReceipt(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors print:hidden cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-emerald-200" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">To'lov Muvaffaqiyatli!</h3>
            <p className="text-xs text-emerald-100 font-medium mt-1">Rasmiy Elektron Kvitansiya</p>
          </div>

          {/* Receipt Body */}
          <div className="p-6 sm:p-8 space-y-5 bg-[#fafafa]">
            {/* Mahalla Stamp / Header */}
            <div className="text-center pb-4 border-b border-dashed border-gray-300">
              <div className="font-extrabold text-sm uppercase tracking-wider text-gray-800">
                {mahallaInfo?.name || "Navoiy Mahallasi"} Raqamli Boshqarmasi
              </div>
              <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                O'zbekiston Respublikasi Mahalla va Nuroniylarni Qo'llab-quvvatlash Tizimi
              </div>
            </div>

            {/* Main Amount */}
            <div className="text-center py-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">To'langan Summa</div>
              <div className="text-3xl font-extrabold text-emerald-600 font-mono mt-1">
                {Number(activeReceipt.amount).toLocaleString('uz-UZ')} <span className="text-base font-bold">UZS</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1 inline-flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5" /> Tasdiqlangan va Telegramga yetkazildi
              </div>
            </div>

            {/* Metadata Table */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Fiskal Chek ID:</span>
                <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                  {activeReceipt.fiscal_id}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Sana va Vaqt:</span>
                <span className="font-semibold text-gray-800">{formattedDate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-gray-500 font-medium">To'lovchi:</span>
                <span className="font-semibold text-gray-800">{activeReceipt.payer_name || "Mahalla faoli"}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-gray-500 font-medium">To'lov Tizimi:</span>
                <span className="font-bold text-cyan-700">{activeReceipt.provider || 'Payme'}</span>
              </div>
              <div className="flex justify-between items-start py-1">
                <span className="text-gray-500 font-medium">To'lov Maqsadi:</span>
                <span className="font-semibold text-gray-800 text-right max-w-[200px]">
                  {activeReceipt.purpose || "Mahalla obodonlashtirish jamg'armasi"}
                </span>
              </div>
            </div>

            {/* QR Code & Verification Stamp */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-gray-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Haqiqiylikni tekshirish
                </div>
                <p className="text-[10px] text-gray-500 max-w-[180px]">
                  QR-kodni skaner qilib chekning haqiqiyligini tekshirishingiz mumkin.
                </p>
              </div>
              <div className="w-18 h-18 p-1 bg-white border border-gray-200 rounded-xl shadow-inner flex items-center justify-center">
                <img
                  src={qrDataUrl}
                  alt="Fiscal QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Action Buttons (Hidden when printing) */}
            <div className="flex items-center gap-3 pt-2 print:hidden">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Chop etish / PDF</span>
              </button>

              <button
                onClick={() => setActiveReceipt(null)}
                className="py-3 px-5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs transition-all cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
