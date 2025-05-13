"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import AuthModal from "./AuthModal";
import Button from "./Button";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <nav className="bg-gray-900 py-4 px-6 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <motion.h1
        className="text-pink-500 font-bold text-2xl"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
      >
        SonicFlow
      </motion.h1>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Button>
              <AiOutlinePlus className="inline-block mr-2" />
              Create Playlist
            </Button>
            <Button>
              <AiOutlineHeart className="inline-block mr-2" />
              Liked Songs
            </Button>
          </>
        ) : (
          <Button onClick={toggleModal}>Login / Signup</Button>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} onClose={toggleModal} />
    </nav>
  );
};

export default Navbar;
