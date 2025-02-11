import type { NextApiRequest, NextApiResponse } from 'next';

// Variável global para armazenar a última URL
let lastVideoUrl: string | null = null;

// Função para atualizar a URL (será chamada pelo webhook)
export function updateVideoUrl(url: string) {
  lastVideoUrl = url;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Configura os headers para SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    // Se disponível, força o envio dos headers
    if (res.flushHeaders) {
      res.flushHeaders();
    }

    console.log('🔌 SSE Conexão iniciada');

    // Função que envia atualizações
    const sendUpdate = () => {
      try {
        console.log('📡 SSE Enviando update:', { url: lastVideoUrl });
        res.write(`data: ${JSON.stringify({ url: lastVideoUrl })}\n\n`);
      } catch (error) {
        console.error('❌ Erro no SSE:', error);
      }
    };

    // Envia a primeira atualização
    sendUpdate();
    
    // Configura o intervalo para enviar atualizações
    const interval = setInterval(sendUpdate, 1000);

    // Limpa o intervalo quando a conexão for fechada
    req.on('close', () => {
      console.log('🔌 SSE Conexão fechada');
      clearInterval(interval);
    });

  } catch (error) {
    console.error('❌ Erro no SSE:', error);
    return res.status(500).json({ error: 'Erro interno no SSE' });
  }
} 