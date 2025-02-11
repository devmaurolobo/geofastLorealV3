import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { videoId, status, url } = req.body;

    // Aqui você pode adicionar validação do webhook
    // Por exemplo, verificar um token secreto
    
    // Armazene o status do vídeo (pode ser em um banco de dados como MongoDB ou PostgreSQL)
    // Por enquanto, vamos apenas retornar os dados
    
    return res.status(200).json({
      success: true,
      video: {
        id: videoId,
        status,
        url
      }
    });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return res.status(500).json({ success: false, error: 'Erro interno' });
  }
} 