import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Preview } from '@creatomate/preview';
import { Button } from './Button';
import VideoPopup from './VideoPopup';

interface CreateButtonProps {
  preview: Preview;
}

interface VideoData {
  id: string;
  status: string;
  url: string;
}

export const CreateButton: React.FC<CreateButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Configurar WebSocket ou SSE para receber atualizações
  useEffect(() => {
    const eventSource = new EventSource('/api/video-status');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === 'completed') {
        setVideoData(data);
        setShowPopup(true);
        eventSource.close();
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleCreate = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: props.preview.getSource(),
          webhookUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/webhook` // URL do webhook
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Aqui apenas iniciamos o processo, o status virá pelo webhook
      const data = await response.json();
      console.log('Vídeo em processamento:', data);

    } catch (error) {
      console.error('Erro ao criar vídeo:', error);
      setShowPopup(false);
      setVideoData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Component
        style={{ display: 'block', marginLeft: 'auto' }}
        onClick={handleCreate}
        disabled={isLoading}
      >
        {isLoading ? 'Criando...' : 'Criar Vídeo'}
      </Component>

      {showPopup && videoData && (
        <VideoPopup
          videoUrl={videoData.url} 
          onClose={() => {
            setShowPopup(false);
            setVideoData(null);
          }}
        />
      )}
    </div>
  );
};

const Component = styled(Button)`
  display: block;
  margin-left: auto;
`;
