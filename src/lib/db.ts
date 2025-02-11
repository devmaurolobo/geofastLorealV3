import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'video.db');
console.log('📁 Database path:', dbPath);

const db = new Database(dbPath, { verbose: console.log });

// Cria a tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS video_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    result_url TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db; 