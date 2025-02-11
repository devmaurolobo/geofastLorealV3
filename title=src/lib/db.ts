import Database from 'better-sqlite3';

const db = new Database('video.db', { verbose: console.log });

// Cria a tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS video_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    result_url TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db; 