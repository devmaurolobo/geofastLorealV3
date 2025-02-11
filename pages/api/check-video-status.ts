import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('🔍 Verificando status do vídeo');
    console.log('📦 lastVideo:', global.lastVideo);

    if (global.lastVideo) {
      return res.status(200).json({
        success: true,
        video: global.lastVideo
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Nenhum vídeo encontrado'
    });

  } catch (error: any) {
    console.error('❌ Erro ao verificar status:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}

export {}; 