import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('calculator-theme') as Theme;
    return saved || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateResolvedTheme = () => {
      let resolved: 'light' | 'dark';
      
      if (theme === 'system') {
        resolved = mediaQuery.matches ? 'dark' : 'light';
      } else {
        resolved = theme;
      }
      
      setResolvedTheme(resolved);
      
      // Apply theme to document
      document.documentElement.classList.toggle('dark', resolved === 'dark');
    };

    // Initial update
    updateResolvedTheme();
    
    // Listen for system theme changes
    mediaQuery.addEventListener('change', updateResolvedTheme);
    
    // Save to localStorage
    localStorage.setItem('calculator-theme', theme);

    return () => {
      mediaQuery.removeEventListener('change', updateResolvedTheme);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      switch (prev) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'system';
        case 'system':
          return 'light';
        default:
          return 'light';
      }
    });
  };

  return { 
    theme, 
    resolvedTheme, 
    toggleTheme,
    isSystemTheme: theme === 'system'
  };
};