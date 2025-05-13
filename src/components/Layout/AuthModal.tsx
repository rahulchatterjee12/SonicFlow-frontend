"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { loginUser, registerUser } from "@/lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const { toggleAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const response = await loginUser({ username: email, password });
        localStorage.setItem("access", response.access);
        localStorage.setItem("refresh", response.refresh);
      } else {
        const response = await registerUser({
          username: email,
          email,
          password,
        });
        localStorage.setItem("access", response.access);
        localStorage.setItem("refresh", response.refresh);
      }
      toggleAuth();
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-md"
            variants={containerVariants}
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              {isLogin ? "Login" : "Signup"}
            </h2>

            {error && (
              <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-2 p-2 bg-gray-700 text-white rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 bg-gray-700 text-white rounded-lg"
            />

            <Button onClick={handleAuth}>{isLogin ? "Login" : "Signup"}</Button>

            <p className="text-sm text-center mt-4 text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="text-pink-500 cursor-pointer"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
