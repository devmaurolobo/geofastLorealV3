import React from 'react';
import styled from 'styled-components';

interface VideoPopupProps {
  videoUrl: string;
  onClose: () => void;
  isOpen: boolean;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Video = styled.video`
  max-width: 100%;
  max-height: 80vh;
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

export const VideoPopup: React.FC<VideoPopupProps> = ({ videoUrl, onClose, isOpen }) => {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <PopupContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Video controls autoPlay>
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </Video>
      </PopupContent>
    </Overlay>
  );
}; 