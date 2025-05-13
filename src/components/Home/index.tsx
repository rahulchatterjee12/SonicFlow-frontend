"use client";

import { useEffect, useState } from "react";

import SongCard from "@/components/song/SongCard";
import { fetchAllSongs } from "@/lib/songs";
import Hero from "./lamp";

interface Song {
  id: number;
  title: string;
  artist: string;
  cover_art: string;
}

const Home = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await fetchAllSongs();
        setSongs(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    loadSongs();
  }, []);

  const handlePlay = (id: number) => {
    localStorage.setItem("currentSong", String(id));
    console.log(`Playing song with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Top Songs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.length > 0 ? (
            songs.map((song) => (
              <SongCard
                key={song.id}
                id={song.id}
                title={song.title}
                artist={song.artist}
                coverArt={song.cover_art}
                onPlay={handlePlay}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Loading songs...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
