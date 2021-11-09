import React from "react";
import { FaSpinner } from "react-icons/fa";

interface Props {
  className?: string;
  loading?: boolean;
  onClick?: any;
  type?: "button" | "submit" | "reset";
  iconStart?: any;
  iconEnd?: any;
  spacing?: string;
}

const Button: React.FC<Props> = ({
  children,
  className,
  loading,
  onClick,
  type,
  iconEnd,
  iconStart,
  spacing,
}) => {
  return (
    <button
      type={type || "button"}
      disabled={loading}
      onClick={onClick}
      className={`${className} ${spacing} px-4 py-2 rounded capitalize transition-all transform relative hover:shadow-lg active:shadow-none flex items-center`}
    >
      {iconStart && <span className="mr-2">{iconStart}</span>}
      {children}
      {iconEnd && <span className="ml-2">{iconEnd}</span>}
      {loading && (
        <div
          className={`absolute top-0 left-0 w-full h-full rounded flex justify-center items-center ${className}`}
        >
          <FaSpinner className="animate-spin" />
        </div>
      )}
    </button>
  );
};

export default Button;
