import type { NextApiRequest, NextApiResponse } from 'next';
import db from './lib/db';

// Desabilita o body parser para este endpoint
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
      const row = db.prepare(`SELECT result_url FROM video_status ORDER BY id DESC LIMIT 1`).get();
      const url = row ? row.result_url : null;
      console.log('📡 SSE Enviando update:', { url });
      res.write(`data: ${JSON.stringify({ url })}\n\n`);
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
} 