import { motion } from "framer-motion";
import PlayButton from "../PlayButton";

interface SongCardProps {
  id: number;
  title: string;
  artist: string;
  coverArt: string;
  onPlay: (id: number) => void;
}

const SongCard: React.FC<SongCardProps> = ({
  id,
  title,
  artist,
  coverArt,
  onPlay,
}) => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={coverArt}
        alt={`${title} cover`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{artist}</p>

        <PlayButton songId={id} />
      </div>
    </motion.div>
  );
};

export default SongCard;
