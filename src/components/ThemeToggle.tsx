import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 md:p-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-palette-4 to-palette-5 text-palette-1 hover:from-palette-4/90 hover:to-palette-5/90'
          : 'bg-gradient-to-r from-palette-2 to-palette-3 text-white hover:from-palette-2/90 hover:to-palette-3/90'
      }`}
      title={theme === 'light' ? 'Passer au thème sombre' : 'Passer au thème clair'}
    >
      <Sun size={18} className={`md:hidden ${theme === 'light' ? 'block' : 'hidden'}`} />
      <Moon size={18} className={`md:hidden ${theme === 'dark' ? 'block' : 'hidden'}`} />
      <Sun size={20} className={`hidden md:block ${theme === 'light' ? 'block' : 'hidden'}`} />
      <Moon size={20} className={`hidden md:block ${theme === 'dark' ? 'block' : 'hidden'}`} />
    </button>
  );
};

export default ThemeToggle;