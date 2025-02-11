import React, { useState } from 'react';
import styled from 'styled-components';
import { Preview } from '@creatomate/preview';
import VideoPopup from './VideoPopup';

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block;
  margin-left: auto;
  background: ${props => props.disabled ? '#ccc' : '#2ecc71'};

  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#27ae60'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

interface CreateButtonProps {
  preview: Preview;
}

export const CreateButton: React.FC<CreateButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  // Função para iniciar o SSE
  const subscribeSSE = () => {
    const es = new EventSource('/api/video-sse');
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log('SSE mensagem recebida:', data);
        if (data.url) {
          setVideoUrl(data.url);
          setIsLoading(false);
          es.close();
          setEventSource(null);
        }
      } catch (error) {
        console.error('Erro no SSE:', error);
      }
    };
    setEventSource(es);
  };

  const handleCreate = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    // Inicia o SSE para receber atualizações sobre o vídeo
    subscribeSSE();

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: props.preview.getSource() }),
      });
      const data = await response.json();
      console.log('📤 Resposta da API:', data);
    } catch (error) {
      console.error('Erro ao criar vídeo:', error);
      setIsLoading(false);
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    }
  };

  return (
    <div>
      <StyledButton onClick={handleCreate} disabled={isLoading}>
        {isLoading ? 'Processando...' : 'Criar Vídeo'}
      </StyledButton>

      {videoUrl && (
        <VideoPopup
          videoUrl={videoUrl}
          onClose={() => {
            setVideoUrl(null);
            if (eventSource) {
              eventSource.close();
              setEventSource(null);
            }
          }}
        />
      )}
    </div>
  );
};
