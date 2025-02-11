import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Log detalhado das variáveis de ambiente
    console.log('📢 Variáveis de Ambiente:', {
      VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
      CREATOMATE_API_KEY: process.env.CREATOMATE_API_KEY,
    });

    // Log detalhado
    console.log('🎯 Webhook Recebido:');
    console.log('⏰ Horário:', new Date().toISOString());
    console.log('📦 Payload:', JSON.stringify(req.body, null, 2));
    console.log('🔑 Headers:', JSON.stringify(req.headers, null, 2));
    
    const { id, status, result_url } = req.body;
    
    console.log('🔍 Parâmetros recebidos no webhook:', { id, status, result_url });

    // Log do processamento
    console.log('✅ Dados processados:', {
      id,
      status,
      url: result_url
    });

    // Salvar em variável global (temporária)
    global.lastVideo = {
      id,
      status,
      url: result_url
    };

    console.log('📦 lastVideo atualizado:', global.lastVideo);

    return res.status(200).json({ 
      success: true,
      message: 'Webhook recebido com sucesso',
      receivedAt: new Date().toISOString(),
      data: { id, status, url: result_url }
    });

  } catch (error: any) {
    // Log de erro
    console.error('❌ Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}

export {}; 