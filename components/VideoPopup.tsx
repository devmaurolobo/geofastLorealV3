import React from 'react';

interface VideoPopupProps {
  videoUrl: string;
  onClose: () => void;
}

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