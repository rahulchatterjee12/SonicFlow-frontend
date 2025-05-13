import { usePlayer } from "../context/PlayerContext";

interface PlayButtonProps {
  songId: number;
}

const PlayButton: React.FC<PlayButtonProps> = ({ songId }) => {
  const { setSongId, togglePlay } = usePlayer();

  const handlePlay = () => {
    setSongId(songId);
    togglePlay();
  };

  return (
    <button
      className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      onClick={handlePlay}
    >
      ▶ Play
    </button>
  );
};

export default PlayButton;
