import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Função para inicializar o banco de dados
export async function initializeDatabase() {
  const db = await open({
    filename: './db/database.sqlite',
    driver: sqlite3.Database
  });

  // Executar as migrações
  const migration = await import('./migrations/create_tables.sql');
  await db.exec(migration.default);

  return db;
}

// Função para obter vídeos por segmento
export async function getVideosBySegmento(segmento: string) {
  const db = await initializeDatabase();
  return await db.all(
    'SELECT * FROM Mmiolo WHERE form_segmento = ? ORDER BY id_sort',
    [segmento]
  );
}

// Função para obter todos os segmentos únicos
export async function getSegmentos() {
  const db = await initializeDatabase();
  return await db.all(
    'SELECT DISTINCT form_segmento FROM Mmiolo ORDER BY form_segmento'
  );
} 