import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Preview } from '@creatomate/preview';
import { Button } from './Button';
import VideoPopup from './VideoPopup';
import { VideoData } from '../types/video';

interface CreateButtonProps {
  preview: Preview;
}

export const CreateButton: React.FC<CreateButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Função para verificar o status do vídeo
  const checkVideoStatus = async () => {
    try {
      const response = await fetch('/api/check-video-status');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.success && data.video) {
        setVideoData(data.video);
        setShowPopup(true);
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      // Parar o polling em caso de erro persistente
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    }
  };

  // Função para criar o vídeo
  const handleCreate = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: props.preview.getSource() }),
      });

      const data = await response.json();
      console.log('Dados recebidos:', data);

      if (data.url) {
        setVideoData({
          id: data.id || '',
          status: 'completed',
          url: data.url,
        });
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Limpa o intervalo quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  if (isLoading) {
    return <Component style={{ background: '#e67e22' }}>Rendering...</Component>;
  }

  if (videoData) {
    return (
      <Component
        style={{ background: '#2ecc71' }}
        onClick={() => {
          window.open(videoData.url, '_blank');
          setVideoData(null);
        }}
      >
        Download
      </Component>
    );
  }

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
          url={videoData.url}
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
