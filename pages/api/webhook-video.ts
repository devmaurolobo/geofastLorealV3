import type { NextApiRequest, NextApiResponse } from 'next';
import { updateVideoUrl } from './video-sse';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { url } = req.body;
    console.log('🎯 Webhook recebido:', { url });

    // Atualiza a URL do vídeo
    updateVideoUrl(url);

    return res.status(200).json({ 
      success: true,
      url: url
    });
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
} 