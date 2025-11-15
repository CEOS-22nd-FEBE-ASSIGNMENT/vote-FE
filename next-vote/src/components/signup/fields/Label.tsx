import React from "react";

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

const Label = ({ children, className = "" }: LabelProps) => (
  <label className={`text-body-2-semibold mb-1 flex ${className}`}>{children}</label>
);

export default Label;
