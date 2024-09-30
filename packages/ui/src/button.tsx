"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  clickHandler: ()=> void;
}

export const Button = ({ children, className, clickHandler }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};
