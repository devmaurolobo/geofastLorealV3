import { NextApiRequest, NextApiResponse } from 'next';

// Definir interface para a resposta
interface VideoStatusResponse {
  status: string;
  url?: string;
  message?: string;
  error?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Envia o status inicial
  res.write(`data: ${JSON.stringify(global.lastVideo)}\n\n`);

  // Mantém a conexão aberta
  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify(global.lastVideo)}\n\n`);
  }, 1000);

  // Limpa o intervalo quando a conexão é fechada
  req.on('close', () => {
    clearInterval(interval);
  });
} 