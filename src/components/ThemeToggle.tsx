import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-palette-4 to-palette-5 text-palette-1 hover:from-palette-4/90 hover:to-palette-5/90'
          : 'bg-gradient-to-r from-palette-2 to-palette-3 text-white hover:from-palette-2/90 hover:to-palette-3/90'
      }`}
      title={theme === 'light' ? 'Passer au thème sombre' : 'Passer au thème clair'}
    >
      {theme === 'light' ? (
        <>
          <Moon size={16} className="sm:hidden" />
          <Moon size={20} className="hidden sm:block md:hidden" />
          <Moon size={24} className="hidden md:block" />
        </>
      ) : (
        <>
          <Sun size={16} className="sm:hidden" />
          <Sun size={20} className="hidden sm:block md:hidden" />
          <Sun size={24} className="hidden md:block" />
        </>
      )}
    </button>
  );
};

export default ThemeToggle;