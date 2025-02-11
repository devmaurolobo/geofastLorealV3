import React, { useState } from 'react';
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
      console.log('Resposta da API:', data);

      if (data.url) {
        setVideoData({
          id: data.id || '',
          status: 'completed',
          url: data.url,
        });
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Erro ao criar vídeo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <StyledButton 
        onClick={handleCreate}
        disabled={isLoading}
      >
        {isLoading ? 'Processando...' : 'Criar Vídeo'}
      </StyledButton>

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

const StyledButton = styled(Button)`
  display: block;
  margin-left: auto;
  background: ${props => props.disabled ? '#ccc' : '#2ecc71'};
  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#27ae60'};
  }
`;
