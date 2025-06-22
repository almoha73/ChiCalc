import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} />;
      case 'dark':
        return <Moon size={20} />;
      case 'system':
        return <Monitor size={20} />;
      default:
        return <Sun size={20} />;
    }
  };

  const getTitle = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark theme';
      case 'dark':
        return 'Switch to system theme';
      case 'system':
        return 'Switch to light theme';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${
        resolvedTheme === 'dark'
          ? 'bg-gradient-to-r from-palette-4 to-palette-5 text-palette-1 hover:from-palette-4/90 hover:to-palette-5/90'
          : 'bg-gradient-to-r from-palette-2 to-palette-3 text-white hover:from-palette-2/90 hover:to-palette-3/90'
      }`}
      title={getTitle()}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;