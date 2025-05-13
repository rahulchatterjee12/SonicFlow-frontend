import { usePlayer } from "../context/PlayerContext";

interface PlayButtonProps {
  songId: number;
}

const PlayButton: React.FC<PlayButtonProps> = ({ songId }) => {
  const { setSongId } = usePlayer();

  const handlePlay = () => {
    console.log("Play Button Clicked - Song ID:", songId);
    setSongId(songId);
    console.log(
      "Current Song in Local Storage:",
      localStorage.getItem("currentSong")
    );
  };

  return (
    <button className="" onClick={handlePlay}>
      ▶
    </button>
  );
};

export default PlayButton;
