import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = "", ...props }: InputProps) => (
  <input
    {...props}
    className={`border border-gray-200 bg-gray-300 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-body-1-semibold placeholder:text-black/50 placeholder:text-body-1-semibold w-full min-w-0 box-border ${className}`}
  />
);

export default Input;
