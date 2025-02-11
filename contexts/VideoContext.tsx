import React, { createContext, useContext, useState } from 'react';

interface VideoContextData {
  videos: string[];
  addVideo: (url: string) => void;
}

const VideoContext = createContext<VideoContextData>({} as VideoContextData);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<string[]>([]);

  const addVideo = (url: string) => {
    setVideos(prev => [...prev, url]);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideoContext.Provider>
  );
}

export const useVideo = () => useContext(VideoContext); 