import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const lastVideo = (global as any).lastVideo;
  
  if (lastVideo) {
    res.status(200).json(lastVideo);
    // Limpar após enviar
    (global as any).lastVideo = null;
  } else {
    res.status(204).end();
  }
} 