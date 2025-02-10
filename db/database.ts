import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

// Função para inicializar o banco de dados
export async function initializeDatabase(): Promise<Database> {
  try {
    // Abrir conexão com o banco
    const db = await open({
      filename: './db/database.sqlite',
      driver: sqlite3.Database
    });

    // Criar tabela se não existir
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Mmiolo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_sort INTEGER,
        form_segmento TEXT,
        formCelebridade TEXT,
        video_url TEXT,
        thumbnail_url TEXT
      )
    `);

    return db;
  } catch (erro) {
    console.error('Erro ao inicializar banco de dados:', erro);
    throw erro;
  }
}

// Função para obter vídeos por segmento
export async function getVideosBySegmento(segmento: string) {
  let db;
  try {
    db = await initializeDatabase();
    const videos = await db.all(
      'SELECT * FROM Mmiolo WHERE form_segmento = ? ORDER BY id_sort',
      [segmento]
    );
    return videos;
  } catch (erro) {
    console.error('Erro ao buscar vídeos:', erro);
    throw erro;
  } finally {
    if (db) {
      await db.close();
    }
  }
}

// Função para obter todos os segmentos únicos
export async function getSegmentos() {
  let db;
  try {
    db = await initializeDatabase();
    const segmentos = await db.all(
      'SELECT DISTINCT form_segmento FROM Mmiolo ORDER BY form_segmento'
    );
    return segmentos;
  } catch (erro) {
    console.error('Erro ao buscar segmentos:', erro);
    throw erro;
  } finally {
    if (db) {
      await db.close();
    }
  }
}

// Função para obter assinaturas por celebridade e segmento
export async function getMassinatura(celebridade: string, segmento: string) {
  let db;
  try {
    db = await initializeDatabase();
    const assinaturas = await db.all(
      'SELECT * FROM Mmiolo WHERE formCelebridade = ? AND form_segmento = ? ORDER BY id_sort',
      [celebridade, segmento]
    );
    return assinaturas;
  } catch (erro) {
    console.error('Erro ao buscar assinaturas:', erro);
    throw erro;
  } finally {
    if (db) {
      await db.close();
    }
  }
} 