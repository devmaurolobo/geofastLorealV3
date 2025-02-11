import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { result_url } = req.body;
    console.log('🎯 Webhook recebido:', { result_url });

    // Limpa registros anteriores
    db.exec(`DELETE FROM video_status`);
    
    // Insere o novo registro com a URL do vídeo
    const insert = db.prepare(`INSERT INTO video_status (result_url) VALUES (?)`);
    const info = insert.run(result_url);

    return res.status(200).json({ 
      success: true,
      url: result_url
    });
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
} 