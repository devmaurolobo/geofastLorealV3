import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = process.env.CREATOMATE_API_KEY;
  if (!apiKey) {
    console.error('❌ API key não encontrada');
    return res.status(401).json({ message: 'API key not configured' });
  }

  console.log('🔑 API Key presente:', !!process.env.CREATOMATE_API_KEY);
  console.log('📢 NEXT_PUBLIC_VERCEL_URL:', process.env.NEXT_PUBLIC_VERCEL_URL);

  try {
    // URL do webhook (URL da Vercel)
    const webhookUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}';
    console.log('🔗 Webhook URL:', webhookUrl);

    const requestBody = {
      source: req.body.source,
      webhook_url: webhookUrl, // URL que receberá a notificação
      output_format: 'mp4',
      width: 1920,
      height: 1080,
      fps: 30,
      modifications: req.body.modifications || {}
    };

    console.log('📤 Enviando para Creatomate:', JSON.stringify(requestBody, null, 2));

    const response = await fetch('https://api.creatomate.com/v1/renders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro na API Creatomate:', {
        status: response.status,
        body: errorText
      });
      return res.status(response.status).json({ 
        message: 'Erro na API Creatomate',
        error: errorText,
        status: response.status
      });
    }

    const data = await response.json();
    console.log('✅ Resposta da Creatomate:', JSON.stringify(data, null, 2));
    
    return res.status(200).json({
      id: data.id,
      status: data.status,
      url: data.url || data.render_url,
      created_at: data.created_at
    });

  } catch (error: any) {
    console.error('💥 Erro na API:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}