import type { NextApiRequest, NextApiResponse } from 'next';
import db from './lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('🔍 Debug: Consultando banco de dados...');
    
    // Verifica se a tabela existe
    const tableExists = db.prepare(`
      SELECT name 
      FROM sqlite_master 
      WHERE type='table' AND name='video_status'
    `).get();

    if (!tableExists) {
      return res.status(200).json({ 
        message: 'Tabela não existe ainda',
        records: [] 
      });
    }

    // Busca os registros
    const rows = db.prepare(`SELECT * FROM video_status`).all();
    console.log('📊 Registros encontrados:', rows);

    return res.status(200).json({ 
      message: rows.length ? 'Registros encontrados' : 'Nenhum registro',
      records: rows 
    });

  } catch (error) {
    console.error('❌ Erro ao debugar:', error);
    return res.status(500).json({ 
      error: 'Erro interno',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
} 