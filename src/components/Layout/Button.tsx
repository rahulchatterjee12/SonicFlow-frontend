import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
