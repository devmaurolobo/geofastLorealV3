import React, { useState } from 'react';
import styled from 'styled-components';
import { Preview } from '@creatomate/preview';
import { useRouter } from 'next/router';
import { useVideo } from '@/contexts/VideoContext';

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
  width: 100%;
  background: ${props => props.disabled ? '#ccc' : '#000DFF'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#0052CC'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface CreateButtonProps {
  preview: Preview;
}

export const CreateButton: React.FC<CreateButtonProps> = (props) => {
  const router = useRouter();
  const { addVideo } = useVideo();
  const [isLoading, setIsLoading] = useState(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  // Função para iniciar o SSE
  const subscribeSSE = () => {
    const es = new EventSource('/api/video-sse');
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log('SSE mensagem recebida:', data);
        if (data.url) {
          addVideo(data.url); // Adiciona o vídeo ao contexto
          router.push('/video');
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
      console.log('1. Iniciando chamada à API com dados:', { source: props.preview.getSource() })
      
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source: props.preview.getSource() })
      })
      
      console.log('2. Status da resposta:', response.status)
      
      const data = await response.json()
      console.log('3. Dados recebidos:', data)
      // Verifica se a resposta foi bem sucedida antes de redirecionar
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      // Após sucesso, redireciona usando o router do Next.js
      router.push('https://orbita.aureatech.io/version-test/viewtemplate');

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      console.error('❌ Erro na chamada:', {
        mensagem: errorMessage,
        dados: { source: props.preview.getSource() }
      });
      setIsLoading(false);
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleCreate} disabled={isLoading}>
        {isLoading ? 'Processando...' : 'Criar Material'}
      </Button>
    </div>
  );
};
