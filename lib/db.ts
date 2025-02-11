import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Função para conectar ao banco
async function openDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}

// Função para inicializar o banco
async function initializeDb() {
  const db = await openDb();
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS video_status (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_id TEXT NOT NULL,
      status TEXT NOT NULL,
      url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

export { openDb, initializeDb }; 