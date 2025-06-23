import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, toggleTheme } = useThemeContext();

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
        return 'Thème clair - Cliquez pour le thème sombre';
      case 'dark':
        return 'Thème sombre - Cliquez pour le thème système';
      case 'system':
        return `Thème système (${resolvedTheme === 'dark' ? 'sombre' : 'clair'}) - Cliquez pour le thème clair`;
      default:
        return 'Changer de thème';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md relative ${
          resolvedTheme === 'dark'
            ? 'bg-gradient-to-r from-palette-4 to-palette-5 text-palette-1 hover:from-palette-4/90 hover:to-palette-5/90'
            : 'bg-gradient-to-r from-palette-2 to-palette-3 text-white hover:from-palette-2/90 hover:to-palette-3/90'
        }`}
        title={getTitle()}
      >
        {getIcon()}
        
        {/* Indicateur pour le thème système */}
        {theme === 'system' && (
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
            resolvedTheme === 'dark'
              ? 'bg-palette-5 border-palette-1'
              : 'bg-palette-3 border-white'
          }`} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;