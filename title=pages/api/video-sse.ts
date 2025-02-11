import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../src/lib/db';

// Desabilita o body parser para este endpoint
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Usa writeHead para enviar os headers de SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
  });
  // Se disponível, força o envio dos headers imediatamente
  if (res.flushHeaders) {
    res.flushHeaders();
  }

  // Função que consulta o banco para buscar a URL do vídeo
  const sendUpdate = () => {
    try {
      // Seleciona o registro mais recente ordenado pelo id
      const row = db.prepare(`SELECT result_url FROM video_status ORDER BY id DESC LIMIT 1`).get();
      const url = row ? row.result_url : null;
      // Envia o dado via SSE
      res.write(`data: ${JSON.stringify({ url })}\n\n`);
    } catch (error) {
      console.error('Erro no SSE:', error);
    }
  };

  // Envia a atualização imediatamente
  sendUpdate();
  // Define um intervalo para enviar atualizações a cada 1 segundo
  const interval = setInterval(sendUpdate, 1000);

  // Quando a conexão for fechada, limpa o intervalo.
  req.on('close', () => {
    clearInterval(interval);
  });
} 