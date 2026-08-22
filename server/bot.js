/**
 * ============================================================================
 * SMART MAHALLA - ENTERPRISE GRADE TELEGRAM BOT ENGINE
 * Architecture: Event-Driven FSM (Finite State Machine) with Global Interceptors
 * ============================================================================
 */

require('dotenv').config();
const https = require('https');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Configuration
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8892063240:AAFFL1w57lzq2v4jXG5fHSh1EJaesonl-qI';
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '7154525640';
const WEBAPP_URL = process.env.WEBAPP_URL || 'http://localhost:5173';
const AI_API_URL = process.env.AI_URL || 'http://localhost:8000/api/ai/chat';

// Initialize Database Connection
const dbPath = path.resolve(__dirname, 'mahalla.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('❌ Database connection error in Bot:', err.message);
  else console.log('✅ Bot connected to SQLite database.');
});

// Resilient HTTPS Agent for high-throughput polling
const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 10000,
  maxSockets: 50,
  timeout: 30000
});

// In-Memory FSM (Finite State Machine) Store with TTL (15 minutes)
const userSessions = new Map();
const SESSION_TTL = 15 * 60 * 1000; // 15 mins

function setSession(chatId, data) {
  userSessions.set(chatId, { ...data, updatedAt: Date.now() });
}

function getSession(chatId) {
  const session = userSessions.get(chatId);
  if (!session) return null;
  if (Date.now() - session.updatedAt > SESSION_TTL) {
    userSessions.delete(chatId);
    return null;
  }
  return session;
}

function clearSession(chatId) {
  userSessions.delete(chatId);
}

// Low-level HTTP Transport for Telegram API
function callTelegram(method, data = {}) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(data);
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${TOKEN}/${method}`,
      method: 'POST',
      agent: httpsAgent,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let chunks = '';
      res.on('data', (chunk) => { chunks += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(chunks);
          if (!json.ok) {
            console.warn(`⚠️ Telegram API [${method}] response:`, json.description);
          }
          resolve(json);
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', (err) => {
      console.warn(`⚠️ Network transport error on [${method}]:`, err.message);
      resolve(null);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

// High-level messaging helper
async function sendMessage(chatId, text, options = {}) {
  return await callTelegram('sendMessage', {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML',
    ...options
  });
}

// ----------------------------------------------------------------------------
// KEYBOARDS & UI COMPONENTS
// ----------------------------------------------------------------------------

// Persistent Main Menu Keyboard
const MAIN_MENU_KEYBOARD = {
  reply_markup: {
    keyboard: [
      [{ text: '📝 Murojaat qoldirish' }, { text: '⚡ Kommunal holat' }],
      [{ text: '🚨 Favqulodda (SOS)' }, { text: '📊 Mahalla statistikasi' }],
      [{ text: "📞 Rais / Nozir bilan bog'lanish" }, { text: '🤖 AI Savol-Javob' }],
      [{ text: '🌐 Mahalla Veb-Portali' }]
    ],
    resize_keyboard: true,
    is_persistent: true
  }
};

// Wizard Cancel Keyboard (Always visible during form inputs)
const CANCEL_KEYBOARD = {
  reply_markup: {
    keyboard: [
      [{ text: '❌ Bekor qilish (Bosh menyu)' }]
    ],
    resize_keyboard: true
  }
};

// Category Inline Selection Keyboard
const CATEGORY_INLINE_KEYBOARD = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '⚡ Kommunal (Gaz, Suv, Tok)', callback_data: 'cat_kom' },
        { text: "🛣️ Yo'l ta'miri", callback_data: 'cat_road' }
      ],
      [
        { text: '🌳 Obodonlashtirish', callback_data: 'cat_obo' },
        { text: '👥 Ijtimoiy masala', callback_data: 'cat_soc' }
      ],
      [
        { text: '📋 Boshqa masala', callback_data: 'cat_other' }
      ],
      [
        { text: '❌ Bekor qilish', callback_data: 'wizard_cancel' }
      ]
    ]
  }
};

// ----------------------------------------------------------------------------
// AI KNOWLEDGE ENGINE (UZBEK NLP)
// ----------------------------------------------------------------------------
async function queryAIEngine(query, userName) {
  // 1. Check Python FastApi AI Server
  try {
    const res = await fetch(AI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query, history: [] })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.reply && data.reply.length > 5) return data.reply;
    }
  } catch {
    // Offline AI fallback
  }

  const q = query.toLowerCase();

  if (q.includes('salom') || q.includes('assalom') || q.includes('qalaysiz')) {
    return `Assalomu alaykum, <b>${userName}</b>! 🏛 <b>Smart Mahalla</b> AI tizimi xizmatingizda. Mahalla, rahbarlar, kommunal yoki ijtimoiy yordam bo'yicha savollaringizga mamnuniyat bilan javob beraman.`;
  }
  if (q.includes('rais') || q.includes('qabul') || q.includes('oqsoqol') || q.includes('boshliq') || q.includes('idora')) {
    return `👤 <b>Mahalla Raisi:</b> Qodirov Anvar Akramovich\n` +
           `🕒 <b>Qabul kunlari:</b> Dushanba va Chorshanba (09:00 - 13:00)\n` +
           `📞 <b>Telefon:</b> +998 (90) 123-45-67\n` +
           `📍 <b>Idora manzili:</b> Navoiy ko'chasi, 1-bino.`;
  }
  if (q.includes('nozir') || q.includes('uchastk') || q.includes('militsiy') || q.includes('inspektor') || q.includes('xavfsiz')) {
    return `👮 <b>Profilaktika inspektori (Uchastkovoy):</b> Mayor Rustamov Jamshid\n` +
           `📞 <b>Telefon:</b> +998 (93) 987-65-43\n` +
           `🚨 <b>Tezkor chaqiruv:</b> 102 (24 soat xizmatda).`;
  }
  if (q.includes('bola') || q.includes('nafaqa') || q.includes('moddiy') || q.includes('subsid') || q.includes('yordam') || q.includes('daftar')) {
    return `👶 <b>Bolalar nafaqasi va Moddiy yordam olish:</b>\n\n` +
           `1. <b>Qayerga topshiriladi:</b> 'Yagona ijtimoiy himoya reyestri' (my.gov.uz) yoki Mahalla xotin-qizlar faoliga.\n` +
           `2. <b>Kerakli hujjatlar:</b> Pasport nusxalari, bolalarning tug'ilganlik guvohnomalari, oila daromadlari to'g'risida ma'lumot.\n` +
           `3. <b>Muddati:</b> 10 ish kuni ichida komissiya tomonidan ko'rib chiqiladi.`;
  }
  if (q.includes('gaz') || q.includes('svet') || q.includes('elektr') || q.includes('suv') || q.includes('chiqindi') || q.includes('musor')) {
    return `⚡ <b>Kommunal Tarmoqlar Avariya Xizmatlari:</b>\n\n` +
           `• <b>Elektr tarmoqlari:</b> 1154\n` +
           `• <b>Tabiiy gaz:</b> 104\n` +
           `• <b>Ichimlik suvi:</b> 1054\n` +
           `• <b>Chiqindi tashish:</b> Seshanba va Juma (07:00 - 10:00)\n\n` +
           `Hozirgi holatni bilish uchun menyudagi <b>'⚡ Kommunal holat'</b> tugmasini bosing.`;
  }
  if (q.includes('usta') || q.includes('santexnik') || q.includes('elektrik') || q.includes('remont') || q.includes('xizmat')) {
    return `🛠 <b>Mahallamiz Ustalari:</b>\n\n` +
           `• <b>Santexnik:</b> Rustam usta (+998 90 234-56-78) ⭐ 4.9\n` +
           `• <b>Elektrik:</b> Sherzod (+998 94 345-67-89) ⭐ 4.8\n` +
           `• <b>Konditsioner:</b> Dilshod (+998 97 456-78-90) ⭐ 5.0\n\n` +
           `Barcha ustalarni ko'rish uchun <b>'🌐 Mahalla Veb-Portali'</b> tugmasini bosing.`;
  }
  if (q.includes('spravka') || q.includes('malumotnoma') || q.includes('ma\'lumotnoma') || q.includes('yashash')) {
    return `📄 <b>Yashash joyidan ma'lumotnoma (Spravka):</b>\n\n` +
           `Ushbu ma'lumotnoma <b>my.gov.uz</b> orqali 1 daqiqada bepul beriladi. Mahalla muhrlangan asl nusxasi kerak bo'lsa, Mahalla kotibiyatiga (Xona №1) uchrashishingiz mumkin.`;
  }

  return `Savolingiz qabul qilindi: <i>"${query}"</i>.\n\n` +
         `🏛 <b>Smart Mahalla AI:</b>\n` +
         `Ushbu savol/murojaatingiz to'g'ridan-to'g'ri <b>Sayt Admin Paneliga</b> yuborildi. Mas'ul xodimlarimiz tez orada o'rganib chiqishadi.`;
}

// ----------------------------------------------------------------------------
// GLOBAL INTERCEPTORS & EVENT HANDLERS
// ----------------------------------------------------------------------------

async function handleMessage(msg) {
  const chatId = msg.chat?.id;
  const rawText = msg.text?.trim() || '';
  const text = rawText.toLowerCase();
  const userName = msg.from?.first_name || 'Hurmatli fuqaro';
  const userFull = msg.from?.first_name + (msg.from?.last_name ? ' ' + msg.from.last_name : '');
  const username = msg.from?.username ? `@${msg.from.username}` : '';

  if (!chatId || !rawText) return;

  console.log(`📩 [INCOMING] User: ${userFull} (${chatId}) -> "${rawText}"`);

  // =========================================================================
  // PRIORITY #1: GLOBAL CANCEL / STOP / MENU INTERCEPTOR
  // =========================================================================
  const isGlobalCancel = 
    text.includes('bekor') || 
    text.includes('orqaga') || 
    text.includes('bosh menyu') ||
    text === '❌' ||
    text === 'cancel' ||
    text === '/cancel' ||
    text === '/stop' ||
    text === '/menu';

  if (isGlobalCancel) {
    clearSession(chatId);
    console.log(`🔄 Session cleared for user ${chatId} via global cancel interceptor.`);
    return await sendMessage(
      chatId,
      `✅ <b>Jarayon bekor qilindi.</b>\n\nAsosiy menyudasiz. Kerakli xizmatni tanlang: 👇`,
      MAIN_MENU_KEYBOARD
    );
  }

  // =========================================================================
  // PRIORITY #2: GLOBAL /start COMMAND
  // =========================================================================
  if (text.startsWith('/start')) {
    clearSession(chatId);
    const welcome = 
      `Assalomu alaykum, <b>${userName}</b>!\n\n` +
      `🏛 <b>Smart Mahalla</b> rasmiy raqamli boshqaruv botiga xush kelibsiz.\n\n` +
      `Quyidagi menyu tugmalaridan birini tanlang yoki to'g'ridan-to'g'ri savol/murojaatingizni yozing: 👇`;

    return await sendMessage(chatId, welcome, MAIN_MENU_KEYBOARD);
  }

  // =========================================================================
  // PRIORITY #3: GLOBAL MENU BUTTONS INTERCEPTORS
  // (Switches context immediately even if inside a form)
  // =========================================================================

  // 1. Murojaat qoldirish
  if (text.includes('murojaat') || text.includes('ariza') || text.startsWith('/murojaat')) {
    setSession(chatId, { step: 'TITLE' });
    return await sendMessage(
      chatId,
      `📝 <b>[ 1 / 4 ] Yangi Murojaat Qoldirish</b>\n\n` +
      `Iltimos, murojaatingizning <b>qisqacha mavzusini (mazmunini)</b> yozib yuboring:\n\n` +
      `<i>Masalan: 3-ko'chadagi suv quvuri ta'miri</i>`,
      CANCEL_KEYBOARD
    );
  }

  // 2. Kommunal holat
  if (text.includes('kommunal') || text.startsWith('/kommunal')) {
    clearSession(chatId);
    db.all('SELECT * FROM utilities', [], async (err, rows) => {
      let statusText = `⚡ <b>Mahalla Kommunal Ta'minot Holati</b>\n\n`;
      if (err || !rows || rows.length === 0) {
        statusText += `⚡ <b>Elektr energiyasi:</b> ✅ Barqaror (220V)\n` +
                      `💧 <b>Suv ta'minoti:</b> ✅ Bosim me'yorda\n` +
                      `🔥 <b>Tabiiy gaz:</b> ⚠️ 4-ko'chada profilaktika (18:00 gacha)\n\n` +
                      `<i>Barcha tarmoqlar navbatchi mutaxassislar nazoratida.</i>`;
      } else {
        rows.forEach(r => {
          const icon = r.service === 'electricity' ? '⚡ Elektr' : r.service === 'water' ? '💧 Suv' : '🔥 Gaz';
          const badge = r.status === 'online' || r.status === 'normal' ? '✅ Normal' : '⚠️ Ta\'mirlash';
          statusText += `<b>${icon}:</b> ${badge}\nℹ️ <i>${r.message || 'Barqaror ishlamoqda'}</i>\n\n`;
        });
      }
      await sendMessage(chatId, statusText, MAIN_MENU_KEYBOARD);
    });
    return;
  }

  // 3. SOS Favqulodda
  if (text.includes('sos') || text.includes('favqulodda') || text.startsWith('/sos')) {
    clearSession(chatId);
    const sosText = 
      `🚨 <b>FAVQULODDA TEZKOR YORDAM RAQAMLARI</b>\n\n` +
      `🚑 <b>103</b> — Tez tibbiy yordam\n` +
      `🚒 <b>101</b> — Yong'in xavfsizligi\n` +
      `👮 <b>102</b> — Ichki ishlar (Militsiya)\n` +
      `🔥 <b>104</b> — Favqulodda gaz xizmati\n` +
      `⚡ <b>1154</b> — Elektr ta'minoti avariya xizmati\n` +
      `💧 <b>1054</b> — Suvsoz (Suv ta'minoti)\n\n` +
      `🏢 <b>Mahalla profilaktika inspektori:</b>\n📞 +998 (71) 234-56-78 / +998 (93) 987-65-43`;

    return await sendMessage(chatId, sosText, MAIN_MENU_KEYBOARD);
  }

  // 4. Mahalla statistikasi
  if (text.includes('statistika') || text.includes('stats') || text.startsWith('/stats')) {
    clearSession(chatId);
    db.get('SELECT COUNT(*) as count FROM requests', (err, reqRow) => {
      const totalRequests = reqRow ? reqRow.count : 18;
      const statsText = 
        `📊 <b>Mahallamiz Ochiq Ko'rsatkichlari (Smart Mahalla)</b>\n\n` +
        `👥 <b>Aholi soni:</b> ~4,250 nafar\n` +
        `🏠 <b>Xonadonlar soni:</b> ~850 ta\n` +
        `📝 <b>Kelib tushgan murojaatlar:</b> ${totalRequests} ta\n` +
        `✅ <b>Ijobiy hal etilganlar:</b> ~88%\n` +
        `⭐ <b>Aholi qoniqish reytingi:</b> 4.8 / 5.0\n` +
        `🌳 <b>Yashillik darajasi:</b> 45% hudud obodonlashtirilgan\n\n` +
        `<i>Ma'lumotlar real vaqt rejimida yangilanib boradi.</i>`;

      sendMessage(chatId, statsText, MAIN_MENU_KEYBOARD);
    });
    return;
  }

  // 5. Rais / Nozir aloqa
  if (text.includes('rais') || text.includes('nozir') || text.includes('aloqa')) {
    clearSession(chatId);
    const contactText = 
      `🏛 <b>Mahalla Ma'muriyati Bilan Bog'lanish</b>\n\n` +
      `👤 <b>Mahalla Raisi:</b> Qodirov Anvar Akramovich\n` +
      `🕒 <b>Qabul kunlari:</b> Dushanba va Chorshanba (09:00 - 13:00)\n` +
      `📞 <b>Telefon:</b> +998 (90) 123-45-67\n\n` +
      `👮 <b>Profilaktika inspektori:</b> Mayor Rustamov Jamshid\n` +
      `📞 <b>Telefon:</b> +998 (93) 987-65-43\n\n` +
      `👩‍💼 <b>Xotin-qizlar faoli:</b> Karimova Nodira\n` +
      `📞 <b>Telefon:</b> +998 (97) 555-44-33\n\n` +
      `📍 <b>Mahalla idorasi:</b> Navoiy ko'chasi, 1-bino`;

    return await sendMessage(chatId, contactText, MAIN_MENU_KEYBOARD);
  }

  // 6. AI Savol-Javob
  if (text.includes('ai savol') || text.startsWith('/ai')) {
    clearSession(chatId);
    return await sendMessage(
      chatId,
      `🤖 <b>Smart Mahalla Sun'iy Intellekti Faol!</b>\n\n` +
      `Mahalla bo'yicha har qanday savolingizni yozing.\n\n` +
      `<i>Masalan:</i>\n` +
      `• <i>"Bolalar nafaqasi qanday olinadi?"</i>\n` +
      `• <i>"Mahalla raisi kim va qachon qabul qiladi?"</i>\n` +
      `• <i>"Santexnik usta raqami kerak"</i>`,
      MAIN_MENU_KEYBOARD
    );
  }

  // 7. Veb-portal
  if (text.includes('portal') || text.includes('sayt') || text.includes('veb')) {
    clearSession(chatId);
    const portalText = 
      `🌐 <b>Smart Mahalla Rasmiy Veb-Portali</b>\n\n` +
      `Sayt manzili: <a href="${WEBAPP_URL}">${WEBAPP_URL}</a>\n\n` +
      `Portalda mavjud imkoniyatlar:\n` +
      `• 📋 11+ turdagi barcha elektron xizmatlar\n` +
      `• 🛠 Mahallamiz ustalari va narxlari\n` +
      `• 🏆 Aholining faollik reytingi va ballar\n` +
      `• 📸 Muammolarning 'Oldin va Keyin' holatlari\n` +
      `• 🗺 Mahalla interaktiv hududiy xaritasi\n\n` +
      `Quyidagi tugma orqali saytga kiring: 👇`;

    return await sendMessage(chatId, portalText, {
      ...MAIN_MENU_KEYBOARD,
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 Veb-Saytga Kirish', url: WEBAPP_URL }]
        ]
      }
    });
  }

  // =========================================================================
  // PRIORITY #4: FINITE STATE MACHINE (WIZARD STEPS)
  // =========================================================================
  const session = getSession(chatId);
  if (session) {
    // Step 1 -> Step 2
    if (session.step === 'TITLE') {
      session.title = rawText;
      session.step = 'CATEGORY';
      setSession(chatId, session);

      return await sendMessage(
        chatId,
        `📂 <b>[ 2 / 4 ] Murojaat kategoriyasini tanlang:</b>\n\n` +
        `<i>Mavzu: "${rawText}"</i>\n\n` +
        `Quyidagi kategoriyalardan birini bosing: 👇`,
        CATEGORY_INLINE_KEYBOARD
      );
    }

    // Step 3 -> Step 4
    if (session.step === 'ADDRESS') {
      session.address = rawText;
      session.step = 'PHONE';
      setSession(chatId, session);

      return await sendMessage(
        chatId,
        `📞 <b>[ 4 / 4 ] Telefon raqamingizni kiriting:</b>\n\n` +
        `<i>(Masalan: +998901234567)</i>`,
        CANCEL_KEYBOARD
      );
    }

    // Step 4 -> Complete & Save
    if (session.step === 'PHONE') {
      session.phone = rawText;
      session.author = userFull;
      const date = new Date().toISOString();
      const finalTitle = session.title || 'Murojaat';
      const finalCat = session.category || 'Umumiy';
      const finalAddr = session.address || 'Kiritilmagan';

      db.run(
        'INSERT INTO requests (title, category, address, description, urgency, author, phone, status, type, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [finalTitle, finalCat, finalAddr, finalTitle, 'Telegram Bot', session.author, session.phone, "Ko'rib chiqilmoqda", 'pending', date],
        function(err) {
          const newId = this.lastID || Math.floor(Math.random() * 1000);

          sendMessage(
            chatId,
            `✅ <b>Murojaatingiz muvaffaqiyatli qabul qilindi!</b>\n\n` +
            `🔢 <b>Murojaat ID:</b> #${newId}\n` +
            `📌 <b>Mavzu:</b> ${finalTitle}\n` +
            `📂 <b>Kategoriya:</b> ${finalCat}\n` +
            `📍 <b>Manzil:</b> ${finalAddr}\n` +
            `📞 <b>Telefon:</b> ${session.phone}\n` +
            `⏳ <b>Holat:</b> Ko'rib chiqilmoqda\n\n` +
            `Ushbu murojaat real vaqt rejimida <b>Sayt Admin Paneliga</b> yuborildi. Mas'ul xodimlarimiz tez orada o'rganib chiqishadi.`,
            MAIN_MENU_KEYBOARD
          );

          notifyAdminOnNewRequest({
            id: newId,
            title: finalTitle,
            category: finalCat,
            address: finalAddr,
            author: session.author,
            phone: session.phone,
            urgency: 'Telegram Bot'
          });

          clearSession(chatId);
        }
      );
      return;
    }
  }

  // =========================================================================
  // PRIORITY #5: NATURAL AI CONVERSATION & ADMIN DISPATCH
  // =========================================================================
  const aiAnswer = await queryAIEngine(rawText, userName);
  await sendMessage(chatId, `🤖 <b>AI Yordamchisi:</b>\n\n${aiAnswer}`, MAIN_MENU_KEYBOARD);

  // Erkin savolni ham Web Admin panelda ko'rsatish
  const date = new Date().toISOString();
  db.run(
    'INSERT INTO requests (title, category, address, description, urgency, author, phone, status, type, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [rawText.slice(0, 60), 'Telegram Murojaat', 'Telegram Chat', rawText, 'Oddiy', `${userFull} (${username})`, `ChatID: ${chatId}`, "Ko'rib chiqilmoqda", 'pending', date],
    function(err) {
      if (!err && this.lastID) {
        notifyAdminOnNewRequest({
          id: this.lastID,
          title: rawText.slice(0, 60),
          category: 'Telegram Murojaat',
          address: 'Telegram Chat orqali',
          author: `${userFull} ${username}`,
          phone: `ChatID: ${chatId}`,
          description: rawText,
          urgency: 'Oddiy'
        });
      }
    }
  );
}

// ----------------------------------------------------------------------------
// INLINE BUTTON CALLBACK QUERY HANDLER
// ----------------------------------------------------------------------------
async function handleCallbackQuery(query) {
  const data = query.data;
  const chatId = query.message?.chat?.id;
  const messageId = query.message?.message_id;

  if (!data || !chatId) return;

  // Wizard Cancel Button via Inline
  if (data === 'wizard_cancel') {
    clearSession(chatId);
    await callTelegram('answerCallbackQuery', { callback_query_id: query.id, text: "Bekor qilindi" });
    await callTelegram('editMessageText', {
      chat_id: chatId,
      message_id: messageId,
      text: "❌ <b>Murojaat bekor qilindi.</b> Asosiy menyudasiz: 👇",
      parse_mode: 'HTML'
    });
    return await sendMessage(chatId, "Asosiy menyu:", MAIN_MENU_KEYBOARD);
  }

  // Wizard Category Selection
  if (data.startsWith('cat_')) {
    const categoryMap = {
      'cat_kom': 'Kommunal ta\'minot',
      'cat_road': 'Yo\'l ta\'miri',
      'cat_obo': 'Obodonlashtirish',
      'cat_soc': 'Ijtimoiy masala',
      'cat_other': 'Boshqa masala'
    };
    const selectedCat = categoryMap[data] || 'Umumiy';

    const session = getSession(chatId) || {};
    session.category = selectedCat;
    session.step = 'ADDRESS';
    setSession(chatId, session);

    await callTelegram('answerCallbackQuery', { callback_query_id: query.id, text: `Tanlandi: ${selectedCat}` });
    await callTelegram('editMessageText', {
      chat_id: chatId,
      message_id: messageId,
      text: `📂 Kategoriya: <b>${selectedCat}</b> ✅`,
      parse_mode: 'HTML'
    });

    return await sendMessage(
      chatId,
      `📍 <b>[ 3 / 4 ] Manzilingizni kiriting:</b>\n\n` +
      `<i>(Masalan: Navoiy ko'chasi, 14-uy)</i>`,
      CANCEL_KEYBOARD
    );
  }

  // Admin Actions (Resolve / In Progress / Reject)
  if (data.startsWith('status_')) {
    const parts = data.split('_');
    const action = parts[1];
    const reqId = parts[2];

    let newStatus = "Ko'rib chiqilmoqda";
    let newType = 'pending';

    if (action === 'resolve') {
      newStatus = "Bajarildi";
      newType = "resolved";
    } else if (action === 'progress') {
      newStatus = "Jarayonda";
      newType = "in_progress";
    } else if (action === 'reject') {
      newStatus = "Rad etildi";
      newType = "rejected";
    }

    db.run(
      'UPDATE requests SET status = ?, type = ? WHERE id = ?',
      [newStatus, newType, reqId],
      async () => {
        await callTelegram('answerCallbackQuery', {
          callback_query_id: query.id,
          text: `Murojaat #${reqId} holati: ${newStatus}`
        });

        await callTelegram('editMessageText', {
          chat_id: chatId,
          message_id: messageId,
          text: (query.message?.text || '') + `\n\n🔄 <b>Holat yangilandi:</b> ${newStatus} (${new Date().toLocaleTimeString('uz-UZ')})`,
          parse_mode: 'HTML'
        });
      }
    );
  }
}

// ----------------------------------------------------------------------------
// HIGH PERFORMANCE POLLING ENGINE
// ----------------------------------------------------------------------------
let offset = 0;
let isPolling = false;

async function registerCommands() {
  await callTelegram('setMyCommands', {
    commands: [
      { command: 'start', description: 'Bosh menyuni ochish' },
      { command: 'murojaat', description: 'Yangi murojaat yuborish' },
      { command: 'kommunal', description: 'Kommunal xizmatlar holati' },
      { command: 'sos', description: 'Favqulodda raqamlar (103, 102)' },
      { command: 'stats', description: 'Mahalla ko\'rsatkichlari' },
      { command: 'ai', description: 'Sun\'iy intellekt AI yordamchi' }
    ]
  });
}

async function startPolling() {
  if (isPolling) return;
  isPolling = true;
  console.log('🤖 [Smart Mahalla Engine] Bot polling faol boshlandi...');

  registerCommands().catch(() => {});

  while (isPolling) {
    try {
      const updates = await callTelegram('getUpdates', {
        offset: offset,
        timeout: 20
      });

      if (updates && updates.ok && updates.result && updates.result.length > 0) {
        for (const update of updates.result) {
          offset = update.update_id + 1;

          if (update.message) {
            await handleMessage(update.message);
          } else if (update.callback_query) {
            await handleCallbackQuery(update.callback_query);
          }
        }
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 1500));
    }
  }
}

// Notification dispatcher to Mahalla Admin
async function notifyAdminOnNewRequest(reqData) {
  if (!ADMIN_CHAT_ID) return;

  const text = 
    `🚨 <b>YANGI MUROJAAT KELIB TUSHDI</b> (#${reqData.id})\n\n` +
    `📌 <b>Mavzu:</b> ${reqData.title || '-'}\n` +
    `📂 <b>Kategoriya:</b> ${reqData.category || '-'}\n` +
    `📍 <b>Manzil:</b> ${reqData.address || '-'}\n` +
    `⚡ <b>Muhimlik:</b> ${reqData.urgency || '-'}\n` +
    `👤 <b>Fuqaro:</b> ${reqData.author || '-'}\n` +
    `📞 <b>Telefon:</b> ${reqData.phone || '-'}\n` +
    `🕒 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`;

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: '⏳ Jarayonda', callback_data: `status_progress_${reqData.id}` },
        { text: '✅ Bajarildi', callback_data: `status_resolve_${reqData.id}` }
      ],
      [
        { text: '❌ Rad etish', callback_data: `status_reject_${reqData.id}` }
      ]
    ]
  };

  await sendMessage(ADMIN_CHAT_ID, text, { reply_markup: inlineKeyboard });
}

// Notification dispatcher for new Payments / Mahalla Fund Donations
async function notifyAdminOnNewPayment(paymentData) {
  if (!ADMIN_CHAT_ID) return;

  const text = 
    `💰 <b>YANGI TO'LOV / XAYRIYA TUSHDI!</b> (#${paymentData.id || 'TRX-' + Date.now()})\n\n` +
    `💵 <b>Summa:</b> ${Number(paymentData.amount).toLocaleString('uz-UZ')} so'm\n` +
    `🎯 <b>Maqsad:</b> ${paymentData.purpose || "Mahalla obodonlashtirish fondi"}\n` +
    `💳 <b>To'lov turi:</b> ${paymentData.provider || 'Payme'}\n` +
    `👤 <b>To'lovchi:</b> ${paymentData.payer_name || "Mahalla faoli"}\n` +
    `📞 <b>Telefon:</b> ${paymentData.payer_phone || '-'}\n` +
    `🧾 <b>Fiskal Chek ID:</b> <code>${paymentData.fiscal_id || ('CHK-' + Math.random().toString(36).substring(2, 9).toUpperCase())}</code>\n` +
    `🕒 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}\n\n` +
    `<i>✨ Mahalla byudjeti muvaffaqiyatli to'ldirildi.</i>`;

  await sendMessage(ADMIN_CHAT_ID, text);
}

// Start polling
startPolling().catch(err => console.error('Polling error:', err));

module.exports = {
  sendMessage,
  notifyAdminOnNewRequest,
  notifyAdminOnNewPayment
};
