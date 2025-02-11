import React from 'react';
import styled from 'styled-components';

interface VideoPopupProps {
  videoUrl: string;
  onClose: () => void;
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

export default function VideoPopup({ videoUrl, onClose }: VideoPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Seu vídeo está pronto!</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="aspect-video mb-4">
          <video
            src={videoUrl}
            controls
            className="w-full h-full rounded"
          />
        </div>
        
        <div className="flex justify-end">
          <a
            href={videoUrl}
            download
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
} 