import React from 'react';
import Calculator from './components/Calculator';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center p-4 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-palette-1 via-palette-2 to-palette-3' 
        : 'bg-gradient-to-br from-palette-5 via-palette-4 to-palette-3'
    }`}>
      <Calculator />
    </div>
  );
}

export default App;