import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface CalculatorDisplayProps {
  display: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ display }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-2xl p-6 shadow-inner border transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-palette-1/20 to-palette-2/20 border-palette-3/20'
        : 'bg-gradient-to-br from-palette-5/10 to-palette-4/10 border-palette-4/20'
    }`}>
      {/* Unified Display */}
      <div className={`text-4xl sm:text-5xl font-bold font-mono min-h-[4rem] rounded-lg px-4 py-3 border shadow-sm flex items-center justify-end overflow-hidden transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-palette-1/40 border-palette-2/30 text-palette-5'
          : 'bg-white/90 border-palette-4/30 text-palette-1'
      }`}>
        <span className="truncate">
          {display}
        </span>
      </div>
      
      {/* Keyboard hint */}
      <div className={`text-xs mt-3 text-center transition-colors duration-300 ${
        theme === 'dark' ? 'text-palette-4/70' : 'text-palette-2/70'
      }`}>
        Use your keyboard: numbers, +, -, *, /, Enter, Escape, Backspace
      </div>
    </div>
  );
};

export default CalculatorDisplay;