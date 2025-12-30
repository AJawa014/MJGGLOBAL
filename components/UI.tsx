import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  isLoading, 
  children, 
  ...props 
}) => {
  const baseStyles = "relative w-full py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 overflow-hidden";
  
  const variants = {
    primary: "bg-[#0A84FF] text-white hover:bg-[#007AFF] shadow-[0_0_20px_rgba(10,132,255,0.4)]",
    secondary: "bg-white text-black hover:bg-gray-100",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing
        </span>
      ) : children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={cn(
      "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#0A84FF] focus:bg-white/10 transition-all",
      className
    )}
    {...props}
  />
);

export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
    {subtitle && <p className="text-white/50 text-sm mt-1">{subtitle}</p>}
  </div>
);