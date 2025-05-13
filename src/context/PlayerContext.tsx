"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

interface PlayerContextType {
  songId: number | null;
  isPlaying: boolean;
  setSongId: (id: number | null) => void;
  togglePlay: () => void;
  updateSong: (id: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [songId, setSongId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const storedSongId = localStorage.getItem("currentSong");
    if (storedSongId) {
      setSongId(Number(storedSongId));
    }
  }, []);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const updateSong = (id: number) => {
    setSongId(id);
    localStorage.setItem("currentSong", String(id));
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{ songId, isPlaying, setSongId, updateSong, togglePlay }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
