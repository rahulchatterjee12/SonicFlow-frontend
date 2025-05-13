// src/lib/playlists.ts

import api from "./api";

export const createPlaylist = async (name: string, description: string) => {
  try {
    const response = await api.post("playlists/", { name, description });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create playlist."
    );
  }
};

export const addSongToPlaylist = async (playlistId: number, songId: number) => {
  try {
    const response = await api.post(`add-song-to-playlist/${playlistId}/`, {
      song_id: songId,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to add song to playlist."
    );
  }
};
