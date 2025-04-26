import React from 'react';
import { GraduationCap, Bell, Settings, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminHeaderProps {
  onLogout: () => void;
}

export function Header({ onLogout }: AdminHeaderProps) {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.href = '/';
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">K</span>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold text-teal-600">KALAMA</h1>
              <p className="text-sm text-gray-600 -mt-1">ENGLISH</p>
            </div>
          </button>

          <nav className="flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <button 
                  onClick={() => handleNavClick('about')} 
                  className="text-gray-700 hover:text-teal-600 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className="text-gray-700 hover:text-teal-600 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('registration')} 
                  className="text-gray-700 hover:text-teal-600 transition-colors"
                >
                  Register
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}