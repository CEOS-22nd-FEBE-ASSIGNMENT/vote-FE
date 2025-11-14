import React from "react";

interface CheckButtonProps {
  disabled: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const CheckButton = ({ disabled, onClick, children, className = "" }: CheckButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={`w-[88px] h-full flex items-center justify-center text-body-1-semibold rounded-[14px] transition-colors duration-150 ${className} ${
      disabled
        ? "bg-gray-500 text-gray-700 opacity-100 cursor-not-allowed"
        : "bg-blue-600 text-white cursor-pointer hover:bg-blue-500"
    }`}
  >
    {children}
  </button>
);

export default CheckButton;
