const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, '../../data.db'), (err) => {
  if (err) console.error('Erreur SQLite:', err.message);
  else console.log('Connecté à SQLite');
});

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT
  )
`);

module.exports = db;
