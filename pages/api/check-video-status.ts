import type { NextApiRequest, NextApiResponse } from 'next';
import { openDb } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { videoId } = req.query;

  try {
    const db = await openDb();
    
    const videoStatus = await db.get(
      'SELECT * FROM video_status WHERE video_id = ? ORDER BY created_at DESC LIMIT 1',
      [videoId]
    );

    if (!videoStatus) {
      return res.status(404).json({ message: 'Vídeo não encontrado' });
    }

    return res.status(200).json(videoStatus);
  } catch (error) {
    console.error('❌ Erro ao verificar status:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
} 