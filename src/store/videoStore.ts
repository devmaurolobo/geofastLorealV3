import { create } from 'zustand';

interface VideoState {
  videoData: {
    id: string;
    status: string;
    url: string;
  } | null;
  setVideoData: (data: any) => void;
  clearVideoData: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videoData: null,
  setVideoData: (data) => set({ videoData: data }),
  clearVideoData: () => set({ videoData: null }),
})); 