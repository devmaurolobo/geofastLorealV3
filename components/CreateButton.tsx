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
    if (isLoading) return; // Previne múltiplos cliques
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: props.preview.getSource() // Usando a prop preview
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Limpa qualquer intervalo existente antes de criar um novo
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
      
      const interval = setInterval(checkVideoStatus, 2000);
      setPollingInterval(interval);

    } catch (error) {
      console.error('Erro ao criar vídeo:', error);
      setShowPopup(false); // Reset do estado em caso de erro
      setVideoData(null);
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
            setVideoData(null); // Limpa os dados do vídeo ao fechar
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
