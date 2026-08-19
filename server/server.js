const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database
const dbPath = path.resolve(__dirname, 'mahalla.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Tables if not exist
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
      date TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS residents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      region TEXT,
      district TEXT,
      date_registered TEXT
    )`);
  }
});

// API Routes

// --- Requests ---
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
    'INSERT INTO requests (title, category, address, description, urgency, author, phone, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, category, address, description, urgency, author, phone, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      
      const newId = this.lastID;
      const responseData = { id: newId, title, category, address, description, urgency, author, phone, status: "Ko'rib chiqilmoqda", date };

      // Send Telegram Notification
      const telegramToken = '8892063240:AAFFL1w57lzq2v4jXG5fHSh1EJaesonl-qI';
      const chatId = '7154525640';
      const text = `🚨 *Yangi Murojaat* (#${newId})\n\n` +
                   `📌 *Mavzu:* ${title || '-'}\n` +
                   `📂 *Kategoriya:* ${category || '-'}\n` +
                   `📍 *Manzil:* ${address || '-'}\n` +
                   `⚡ *Muhimlik:* ${urgency || '-'}\n` +
                   `👤 *Muallif:* ${author || '-'}\n` +
                   `📞 *Telefon:* ${phone || '-'}\n` +
                   `📝 *Batafsil:* ${description || '-'}`;

      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.error("Telegram send error:", err));

      res.json(responseData);
    }
  );
});

// --- Utility Status ---
app.get('/api/utilities', (req, res) => {
  // Mock data for now, ideally this would also be in DB
  res.json({
    electricity: { status: 'online', message: 'Tarmoq barqaror ishlamoqda' },
    water: { status: 'normal', message: 'Markaziy nasos stansiyasida bosim me\'yorida' },
    gas: { status: 'maintenance', message: '4-ko\'chada profilaktika ishlari. Tiklanish: 18:00' }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
