import type { NextApiRequest, NextApiResponse } from 'next';

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

  // Mantenha a conexão viva
  const intervalId = setInterval(() => {
    res.write(':\n\n'); // heartbeat
  }, 30000);

  // Função para enviar atualizações
  const sendUpdate = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Limpe o intervalo quando a conexão for fechada
  req.on('close', () => {
    clearInterval(intervalId);
  });
} 