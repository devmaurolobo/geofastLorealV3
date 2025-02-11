import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/src/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Seleciona o registro mais recente ordenado pelo id
    const row = db.prepare(`SELECT result_url FROM video_status ORDER BY id DESC LIMIT 1`).get();
    console.log('📍 Check Video -- registro:', row); // Log para depurar
    
    if (row && row.result_url) {
      return res.status(200).json({ url: row.result_url });
    } else {
      return res.status(200).json({ url: null });
    }
  } catch (error) {
    console.error('Erro ao checar vídeo:', error);
    return res.status(500).json({ error: 'Erro ao checar vídeo' });
  }
} 