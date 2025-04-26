import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: LucideIcon;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  icon: Icon,
  isLoading,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-2 rounded transition-all duration-300';
  
  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isLoading}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}