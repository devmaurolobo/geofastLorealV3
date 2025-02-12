import React from 'react';
import styled from 'styled-components';

interface VideoPopupProps {
  videoUrl: string;
  onClose: () => void;
}

export default function VideoPopup({ videoUrl, onClose }: VideoPopupProps) {
  return (
    <Overlay>
      <PopupContent>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <Title>Seu vídeo está pronto!</Title>
        <VideoContainer>
          <VideoFrame src={videoUrl} />
        </VideoContainer>
        <DownloadButton href={videoUrl} download>
          Download
        </DownloadButton>
      </PopupContent>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  max-width: 800px;
  width: 90%;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const VideoContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  height: 90vh;
  max-width: 800px;
  z-index: 1000;
`;

const VideoFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #ff4444;
  color: white;
  cursor: pointer;
  
  &:hover {
    background: #ff0000;
  }
`;

const DownloadButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background: #2ecc71;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  
  &:hover {
    background: #27ae60;
  }
`; 