import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useVideo } from '@/contexts/VideoContext';

const VideoContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const VideoWrapper = styled.div`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
`;

const Video = styled.video`
  width: 100%;
  border-radius: 8px;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  background: #2ecc71;
  color: white;
  cursor: pointer;

  &:hover {
    background: #27ae60;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export default function VideoPage() {
  const router = useRouter();
  const { videos } = useVideo();

  const handleBack = () => {
    router.push('/');
  };

  if (!videos.length) return null;

  return (
    <VideoContainer>
      <BackButton onClick={handleBack}>← Voltar</BackButton>
      <Title>Seus Vídeos ({videos.length})</Title>
      <VideoGrid>
        {videos.map((url, index) => (
          <VideoWrapper key={index}>
            <Video controls autoPlay={index === videos.length - 1}>
              <source src={url} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </Video>
          </VideoWrapper>
        ))}
      </VideoGrid>
    </VideoContainer>
  );
} 