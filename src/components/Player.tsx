"use client";
import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { fetchSongById } from "@/lib/songs";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHeart, AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import {
  BsPlayFill,
  BsPauseFill,
  BsSkipBackwardFill,
  BsSkipForwardFill,
} from "react-icons/bs";

const Player = () => {
  const { songId, isPlaying, togglePlay } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [songUrl, setSongUrl] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("Loading...");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (!songId) return;

    const fetchUrl = async () => {
      try {
        const song = await fetchSongById(songId);
        setCurrentTime(0);
        setSongUrl(song.song_url);
        setSongTitle(song.title);
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    };

    fetchUrl();
  }, [songId]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const updateTime = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      };

      audio.addEventListener("timeupdate", updateTime);

      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [isPlaying, songUrl]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // Implement API call to like/unlike here
  };

  const handleAddToPlaylist = () => {
    console.log("Add to playlist");
    // Implement add to playlist logic here
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 10);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
    exit: { y: 100, opacity: 0, transition: { duration: 0.3 } },
  };

  if (!songId || !songUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 shadow-lg flex items-center justify-between gap-4 z-50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Song Info */}
        <div className="flex items-center gap-4">
          <div className="bg-gray-700 p-3 rounded-full">
            <BsPlayFill className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{songTitle}</h3>
            <p className="text-sm text-gray-400">Now Playing</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSkipBackward}
            className="text-white p-2 hover:bg-gray-700 rounded-full"
          >
            <BsSkipBackwardFill className="w-6 h-6" />
          </button>

          <button
            onClick={togglePlay}
            className="text-white p-3 bg-gray-700 rounded-full"
          >
            {isPlaying ? (
              <BsPauseFill className="w-6 h-6" />
            ) : (
              <BsPlayFill className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={handleSkipForward}
            className="text-white p-2 hover:bg-gray-700 rounded-full"
          >
            <BsSkipForwardFill className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-gray-400">
            {currentTime &&
              new Date(currentTime * 1000).toISOString().substring(14, 19)}
          </span>

          <input
            type="range"
            min="0"
            max={duration.toString()}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 bg-gray-600 accent-pink-500"
          />

          <span className="text-xs text-gray-400">
            {duration &&
              new Date(duration * 1000).toISOString().substring(14, 19)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLike}
            className="text-white p-2 hover:bg-gray-700 rounded-full"
          >
            {isLiked ? (
              <AiFillHeart className="w-6 h-6 text-pink-500" />
            ) : (
              <AiOutlineHeart className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={handleAddToPlaylist}
            className="text-white p-2 hover:bg-gray-700 rounded-full"
          >
            <AiOutlinePlus className="w-6 h-6" />
          </button>
        </div>

        <audio ref={audioRef} src={songUrl} preload="metadata" />
      </motion.div>
    </AnimatePresence>
  );
};

export default Player;
