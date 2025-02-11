import type { NextApiRequest, NextApiResponse } from 'next';

// Definir interface para a resposta
interface VideoStatusResponse {
  status: string;
  url?: string;
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VideoStatusResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error',
      message: 'Método não permitido' 
    });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ 
      status: 'error',
      message: 'ID do vídeo não fornecido' 
    });
  }

  const apiKey = process.env.CREATOMATE_API_KEY;
  if (!apiKey) {
    console.error('❌ API key não encontrada');
    return res.status(401).json({ 
      status: 'error',
      message: 'API key não configurada' 
    });
  }

  try {
    const response = await fetch(`https://api.creatomate.com/v1/renders/${id}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro ao verificar status:', {
        status: response.status,
        body: errorText
      });
      return res.status(response.status).json({
        status: 'error',
        message: 'Erro ao verificar status do vídeo',
        error: errorText
      });
    }

    const data = await response.json();
    console.log('✅ Status do vídeo:', data);

    return res.status(200).json({
      status: data.status,
      url: data.url || data.render_url
    });

  } catch (error: any) {
    console.error('💥 Erro ao verificar status:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
} 