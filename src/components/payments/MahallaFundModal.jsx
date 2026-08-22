import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { useTranslation } from 'react-i18next';
import {
  X,
  CreditCard,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  User,
  Phone,
  Building2,
  Lock
} from 'lucide-react';

export const MahallaFundModal = () => {
  const { isFundModalOpen, setIsFundModalOpen, makePayment, userData } = useMahalla();
  const { t } = useTranslation();

  const [provider, setProvider] = useState('Payme');
  const [amount, setAmount] = useState(100000);
  const [customAmount, setCustomAmount] = useState('');
  const [purpose, setPurpose] = useState("Bolalar o'yingohi va Yashil xiyobon barpo etish");
  const [payerName, setPayerName] = useState(userData?.name || '');
  const [payerPhone, setPayerPhone] = useState(userData?.phone || '+998 ');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [25000, 50000, 100000, 250000, 500000, 1000000];

  const purposes = [
    "Bolalar o'yingohi va Yashil xiyobon barpo etish",
    "Kuzatuv kameralari va xavfsizlik tizimi",
    "Mahalla yo'llarini ta'mirlash va asfaltlash",
    "Quyosh panelli ko'cha chiroqlari o'rnatish",
    "Kam ta'minlangan oilalarga yordam fondi",
    "Ixtiyoriy mahalla obodonlashtirish badali"
  ];

  if (!isFundModalOpen) return null;

  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    setCardExpiry(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseInt(customAmount, 10) : amount;
    if (!finalAmount || finalAmount < 1000) {
      alert("Iltimos, kamida 1,000 so'm summa kiriting");
      return;
    }

    setIsProcessing(true);
    // Simulate real gateway latency for realistic high-tech UX
    setTimeout(async () => {
      await makePayment({
        amount: finalAmount,
        purpose,
        provider,
        payer_name: payerName.trim() || 'Mahalla faoli',
        payer_phone: payerPhone.trim() || '+998 90 000 00 00',
        card_mask: cardNumber ? cardNumber.substring(0, 4) + ' **** **** ' + cardNumber.slice(-4) : '8600 **** **** 4321'
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isProcessing && setIsFundModalOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-white dark:bg-[#11192e] rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden z-10 text-gray-900 dark:text-white my-8"
        >
          {/* Header with vibrant gradient */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                  <HeartHandshake className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Mahalla Fondi & To'lovlar</h2>
                  <p className="text-xs sm:text-sm text-emerald-100 font-medium">Shaffof obodonlashtirish va maqsadli jamg'arma</p>
                </div>
              </div>
              <button
                onClick={() => !isProcessing && setIsFundModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick reassurance badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
              <span>100% Rasmiy QR-kodli elektron kvitansiya beriladi</span>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* 1. Payment Provider Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2.5">
                To'lov Tizimini Tanlang
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Payme', color: 'from-cyan-500 to-blue-600', badge: '0% Komissiya' },
                  { name: 'Click', color: 'from-blue-600 to-indigo-700', badge: 'Tezkor' },
                  { name: 'Uzum', color: 'from-purple-600 to-pink-600', badge: '1-Click' }
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setProvider(item.name)}
                    className={`relative p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      provider === item.name
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30'
                        : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50'
                    }`}
                  >
                    <div className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-1">
                      {item.name}
                      {provider === item.name && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400 font-medium">{item.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Purpose Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">
                To'lov Maqsadi / Yo'nalishi
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-800 text-sm font-semibold focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors"
              >
                {purposes.map((p, idx) => (
                  <option key={idx} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* 3. Preset & Custom Amount */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  To'lov Summasi (UZS)
                </label>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {((customAmount ? parseInt(customAmount, 10) : amount) || 0).toLocaleString('uz-UZ')} so'm
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mb-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      amount === amt && !customAmount
                        ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {amt.toLocaleString('uz-UZ')}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <input
                  type="number"
                  placeholder="Boshqa summa kiritish (masalan: 150000)"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) setAmount(parseInt(e.target.value, 10) || 0);
                  }}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-800 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                />
                <span className="absolute right-4 top-3 text-xs font-bold text-gray-400">so'm</span>
              </div>
            </div>

            {/* 4. Payer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-500" />
                  To'lovchi F.I.Sh (Ixtiyoriy)
                </label>
                <input
                  type="text"
                  placeholder="Aliyev Vali"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  Telefon raqam
                </label>
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={payerPhone}
                  onChange={(e) => setPayerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* 5. Mock Card Entry for instant Demo */}
            <div className="p-4 rounded-2xl bg-gray-100/80 dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  UzCard / Humo Karta Ma'lumotlari
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                  <Lock className="w-3 h-3" /> SSL Himoyalangan
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="8600 0000 0000 0000"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="col-span-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-gray-300 dark:border-slate-800 text-xs font-mono font-semibold focus:outline-none focus:border-emerald-500 tracking-wider"
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-gray-300 dark:border-slate-800 text-xs font-mono font-semibold focus:outline-none focus:border-emerald-500 text-center"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Tranzaksiya bajarilmoqda va Telegramga yuborilmoqda...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>To'lash ({((customAmount ? parseInt(customAmount, 10) : amount) || 0).toLocaleString('uz-UZ')} UZS)</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
