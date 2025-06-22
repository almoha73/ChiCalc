import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      title={resolvedTheme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    >
      {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;