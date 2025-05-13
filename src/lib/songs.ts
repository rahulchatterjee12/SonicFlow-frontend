// src/lib/songs.ts

import api from "./api";

export const fetchAllSongs = async () => {
  try {
    const response = await api.get("songs/");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch songs.");
  }
};

export const fetchSongById = async (songId: number) => {
  try {
    const response = await api.get(`songs/${songId}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch song by ID."
    );
  }
};
export const likeSong = async (songId: number) => {
  try {
    const response = await api.post(`like-song/${songId}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to like song.");
  }
};
