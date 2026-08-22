require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { notifyAdminOnNewRequest, notifyAdminOnNewPayment } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize Database
const dbPath = path.resolve(__dirname, 'mahalla.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database.');

    db.serialize(() => {
      // 1. Requests table
      db.run(`CREATE TABLE IF NOT EXISTS requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        address TEXT,
        description TEXT,
        urgency TEXT,
        author TEXT,
        phone TEXT,
        status TEXT DEFAULT 'Ko''rib chiqilmoqda',
        type TEXT DEFAULT 'pending',
        date TEXT
      )`);

      // 2. Residents table
      db.run(`CREATE TABLE IF NOT EXISTS residents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        address TEXT,
        status TEXT DEFAULT 'Faol',
        date_registered TEXT
      )`);

      // Migration: Add missing columns if upgrading existing DB
      ['phone', 'address', 'status'].forEach((col) => {
        db.run(`ALTER TABLE residents ADD COLUMN ${col} TEXT`, () => {
          // ignore error if column already exists
        });
      });

      // 2.5 News table
      db.run(`CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        categoryType TEXT,
        excerpt TEXT,
        fullContent TEXT,
        author TEXT,
        date TEXT,
        year TEXT,
        readTime TEXT,
        views INTEGER DEFAULT 0,
        image TEXT
      )`);

      // Pre-populate news if empty
      db.get('SELECT COUNT(*) as count FROM news', (err, row) => {
        if (!err && row && row.count === 0) {
          const stmt = db.prepare('INSERT INTO news (title, category, categoryType, excerpt, fullContent, author, date, year, readTime, views, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
          stmt.run(
            "Mahallamizda umumxalq hashari e'lon qilindi",
            "Hashar", "hashar",
            "Barcha aholini mahallamizni obodonlashtirish ishlarida faol ishtirok etishga chorlaymiz...",
            "Hurmatli mahalla ahli! Ushbu dam olish kunlari mahallamiz hududida keng ko'lamli obodonlashtirish ishlari rejalashtirilgan. Barchangizdan ozoda va ko'rkam muhit yaratishda o'z hissangizni qo'shishingizni so'raymiz. Hasharda daraxt ekish, ariqlarni tozalash va bolalar maydonchalarini ta'mirlash ko'zda tutilgan.",
            "Mahalla Raisi", "24 Oktabr", "2023", "3 daqiqa", 125,
            "https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=800&auto=format&fit=crop&q=80"
          );
          stmt.run(
            "Yangi bolalar maydonchasi qurilishi boshlandi",
            "Qurilish", "meeting",
            "Navoiy ko'chasida zamonaviy bolalar o'yingohi barpo etilmoqda...",
            "Uzoq kutilgan yangilik! Mahalla fondi va faol fuqarolarimiz ko'magida Navoiy ko'chasida zamonaviy, xavfsiz va qiziqarli bolalar o'yingohi qurilishi rasman boshlandi. Qurilish ishlari bir oy ichida yakunlanishi kutilmoqda. Farzandlarimiz uchun eng yaxshi sharoitlarni yaratishda davom etamiz.",
            "Qurilish Bo'limi", "22 Oktabr", "2023", "2 daqiqa", 342,
            "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=800&auto=format&fit=crop&q=80"
          );
          stmt.run(
            "Kuzgi daraxt ekish aksiyasi",
            "Yashil Makon", "hashar",
            "Mahallamiz bo'ylab 1000 tup manzarali daraxtlar ekilmoqda...",
            "'Yashil Makon' umummilliy loyihasi doirasida mahallamizda yirik daraxt ekish aksiyasi o'tkazilmoqda. Har bir ko'cha va xonadon oldiga iqlimimizga mos bo'lgan manzarali va mevali daraxt ko'chatlari o'tqazilmoqda. Yurtimizni yashil makonga aylantirish har birimizning burchimizdir.",
            "Ekologiya Qo'mitasi", "20 Oktabr", "2023", "4 daqiqa", 218,
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80"
          );
          stmt.finalize();
        }
      });

      // 3. Utilities table
      db.run(`CREATE TABLE IF NOT EXISTS utilities (
        id INTEGER PRIMARY KEY,
        service TEXT UNIQUE,
        status TEXT,
        message TEXT,
        updated_at TEXT
      )`);

      // 4. Payments & Fund Donations table
      db.run(`CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fiscal_id TEXT UNIQUE,
        amount INTEGER NOT NULL,
        purpose TEXT NOT NULL,
        provider TEXT NOT NULL,
        payer_name TEXT,
        payer_phone TEXT,
        card_mask TEXT,
        status TEXT DEFAULT 'completed',
        date TEXT
      )`);

      // 5. Fund summary & targets table
      db.run(`CREATE TABLE IF NOT EXISTS fund (
        id INTEGER PRIMARY KEY,
        collected_amount INTEGER DEFAULT 0,
        target_amount INTEGER DEFAULT 50000000,
        target_title TEXT DEFAULT 'Bolalar o''yingohi va Yashil bog'' barpo etish',
        contributors_count INTEGER DEFAULT 0,
        updated_at TEXT
      )`);

      // Pre-populate fund if empty
      db.get('SELECT COUNT(*) as count FROM fund', (err, row) => {
        if (!err && row && row.count === 0) {
          const stmt = db.prepare('INSERT INTO fund (id, collected_amount, target_amount, target_title, contributors_count, updated_at) VALUES (?, ?, ?, ?, ?, ?)');
          stmt.run(1, 0, 50000000, "Bolalar o'yingohi va 'Yashil Makon' xiyoboni", 0, new Date().toISOString());
          stmt.finalize();
        } else {
          db.run('UPDATE fund SET collected_amount = 0, contributors_count = 0 WHERE id = 1');
        }
      });

      // Pre-populate payments if empty
      db.get('SELECT COUNT(*) as count FROM payments', (err, row) => {
        if (!err && row && row.count === 0) {
          const stmt = db.prepare('INSERT INTO payments (fiscal_id, amount, purpose, provider, payer_name, payer_phone, card_mask, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
          stmt.run('CHK-8F92A1', 250000, "Bolalar o'yingohi uchun xayriya", 'Payme', 'Abdurashid Karimov', '+998 90 123 45 67', '8600 **** **** 1234', 'completed', new Date(Date.now() - 3600000 * 2).toISOString());
          stmt.run('CHK-4B11E9', 100000, "Kuzatuv kameralari o'rnatish", 'Click', 'Zuhra Rustamova', '+998 93 456 78 90', '9860 **** **** 5678', 'completed', new Date(Date.now() - 3600000 * 5).toISOString());
          stmt.run('CHK-99DA03', 500000, "Yashil Makon daraxt ekish", 'Uzum', 'Islombek Yoqubov', '+998 97 789 01 23', '8600 **** **** 9012', 'completed', new Date(Date.now() - 3600000 * 12).toISOString());
          stmt.finalize();
        }
      });

      // Pre-populate utilities if empty
      db.get('SELECT COUNT(*) as count FROM utilities', (err, row) => {
        if (!err && row && row.count === 0) {
          const stmt = db.prepare('INSERT INTO utilities (service, status, message, updated_at) VALUES (?, ?, ?, ?)');
          stmt.run('electricity', 'online', 'Tarmoq barqaror ishlamoqda', new Date().toISOString());
          stmt.run('water', 'normal', 'Markaziy nasos stansiyasida bosim me\'yorida', new Date().toISOString());
          stmt.run('gas', 'maintenance', '4-ko\'chada profilaktika ishlari. Tiklanish: 18:00', new Date().toISOString());
          stmt.finalize();
        }
      });

      // Pre-populate residents if empty
      db.get('SELECT COUNT(*) as count FROM residents', (err, row) => {
        if (!err && row && row.count === 0) {
          const stmt = db.prepare('INSERT INTO residents (name, phone, address, status, date_registered) VALUES (?, ?, ?, ?, ?)');
          stmt.run('Aliyev Vali', '+998 90 123 45 67', "Navoiy ko'chasi, 12-uy", 'Faol', new Date().toISOString());
          stmt.run('Karimova Nargiza', '+998 93 987 65 43', "Bog'ishamol ko'chasi, 5-uy", 'Faol', new Date().toISOString());
          stmt.run('Samatov Rustam', '+998 97 111 22 33', "Navoiy ko'chasi, 18-uy", 'Faol', new Date().toISOString());
          stmt.finalize();
        }
      });
    });
  }
});

// --- API Routes ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Auth
app.post('/api/auth/login', (req, res) => {
  const { role, id, password, name, phone, mahalla, address } = req.body;

  if (role === 'admin') {
    if (id === 'admin' && password === 'admin123') {
      return res.json({
        success: true,
        token: 'smart-mahalla-jwt-token-admin-' + Date.now(),
        user: { id: 'admin', name: 'Boshqaruvchi Admin', role: 'admin' }
      });
    }
    return res.status(401).json({ success: false, error: "Noto'g'ri xodim ID yoki parol" });
  }

  if (name && phone) {
    return res.json({
      success: true,
      token: 'smart-mahalla-jwt-token-resident-' + Date.now(),
      user: { name, phone, mahalla: mahalla || 'Navoiy', address: address || '', role: 'resident' }
    });
  }

  return res.status(400).json({ success: false, error: "Ma'lumotlar to'liq emas" });
});

// Requests / Murojaatlar
app.get('/api/requests', (req, res) => {
  db.all('SELECT * FROM requests ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/requests', (req, res) => {
  const { title, category, address, description, urgency, author, phone } = req.body;
  const date = new Date().toISOString();
  
  db.run(
    'INSERT INTO requests (title, category, address, description, urgency, author, phone, status, type, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, category, address, description, urgency, author, phone, "Ko'rib chiqilmoqda", 'pending', date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      
      const newId = this.lastID;
      const responseData = { 
        id: newId, 
        title, 
        category, 
        address, 
        description, 
        urgency, 
        author, 
        phone, 
        status: "Ko'rib chiqilmoqda", 
        type: 'pending',
        date 
      };

      // Send Telegram notification with interactive inline buttons
      try {
        notifyAdminOnNewRequest(responseData);
      } catch (e) {
        console.warn("Telegram notification error:", e.message);
      }

      res.status(201).json(responseData);
    }
  );
});

app.patch('/api/requests/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, type } = req.body;

  db.run(
    'UPDATE requests SET status = ?, type = ? WHERE id = ?',
    [status, type || 'in_progress', id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: Number(id), status, type });
    }
  );
});

app.delete('/api/requests/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM requests WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: Number(id) });
  });
});

// Residents / Aholi
app.get('/api/residents', (req, res) => {
  db.all('SELECT * FROM residents ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/residents', (req, res) => {
  const { name, phone, address, status } = req.body;
  const date_registered = new Date().toISOString();

  db.run(
    'INSERT INTO residents (name, phone, address, status, date_registered) VALUES (?, ?, ?, ?, ?)',
    [name, phone, address || '', status || 'Faol', date_registered],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, phone, address, status: status || 'Faol', date_registered });
    }
  );
});

app.delete('/api/residents/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM residents WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: Number(id) });
  });
});

// News / Yangiliklar
app.get('/api/news', (req, res) => {
  db.all('SELECT * FROM news ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/news', (req, res) => {
  const { title, category, categoryType, excerpt, fullContent, author, image, readTime } = req.body;
  const now = new Date();
  const dateStr = now.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' });
  const yearStr = now.getFullYear().toString();

  db.run(
    'INSERT INTO news (title, category, categoryType, excerpt, fullContent, author, date, year, readTime, views, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, category, categoryType || 'ALL', excerpt, fullContent, author || 'Admin', dateStr, yearStr, readTime || '2 daqiqa', 0, image],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: this.lastID, title, category, categoryType, excerpt, fullContent, author, date: dateStr, year: yearStr, readTime, views: 0, image
      });
    }
  );
});

app.delete('/api/news/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM news WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: Number(id) });
  });
});

// Utilities
app.get('/api/utilities', (req, res) => {
  db.all('SELECT service, status, message, updated_at FROM utilities', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = {};
    rows.forEach(r => {
      formatted[r.service] = { status: r.status, message: r.message, updated_at: r.updated_at };
    });
    res.json(formatted);
  });
});

app.post('/api/utilities', (req, res) => {
  const updates = req.body;
  const now = new Date().toISOString();

  Object.entries(updates).forEach(([service, data]) => {
    db.run(
      'INSERT INTO utilities (service, status, message, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(service) DO UPDATE SET status=excluded.status, message=excluded.message, updated_at=excluded.updated_at',
      [service, data.status, data.message || '', now]
    );
  });

  res.json({ success: true, updated: updates });
});

// Payments & Mahalla Fund
app.get('/api/fund', (req, res) => {
  db.get('SELECT * FROM fund WHERE id = 1', [], (err, fund) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(fund || {
      id: 1,
      collected_amount: 0,
      target_amount: 50000000,
      target_title: "Bolalar o'yingohi va 'Yashil Makon' xiyoboni",
      contributors_count: 0
    });
  });
});

app.get('/api/payments', (req, res) => {
  db.all('SELECT * FROM payments ORDER BY id DESC LIMIT 50', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/payments', (req, res) => {
  const { amount, purpose, provider, payer_name, payer_phone, card_mask } = req.body;
  const fiscal_id = 'CHK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const date = new Date().toISOString();
  const numAmount = parseInt(amount, 10) || 0;

  db.run(
    'INSERT INTO payments (fiscal_id, amount, purpose, provider, payer_name, payer_phone, card_mask, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [fiscal_id, numAmount, purpose || "Mahalla obodonlashtirish fondi", provider || 'Payme', payer_name || 'Mahalla faoli', payer_phone || '', card_mask || '8600 **** **** 0000', 'completed', date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      const newPayment = {
        id: this.lastID,
        fiscal_id,
        amount: numAmount,
        purpose: purpose || "Mahalla obodonlashtirish fondi",
        provider: provider || 'Payme',
        payer_name: payer_name || 'Mahalla faoli',
        payer_phone: payer_phone || '',
        card_mask: card_mask || '8600 **** **** 0000',
        status: 'completed',
        date
      };

      // Update fund totals
      db.run(
        'UPDATE fund SET collected_amount = collected_amount + ?, contributors_count = contributors_count + 1, updated_at = ? WHERE id = 1',
        [numAmount, date]
      );

      // Dispatch Telegram Bot Alert
      try {
        notifyAdminOnNewPayment(newPayment);
      } catch (e) {
        console.warn("Telegram payment notification warning:", e.message);
      }

      res.status(201).json(newPayment);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Smart Mahalla backend server running on http://localhost:${PORT}`);
});

