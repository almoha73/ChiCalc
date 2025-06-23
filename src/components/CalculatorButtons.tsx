import React from 'react';
import { Delete } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

interface CalculatorButtonsProps {
  onButtonClick: (value: string) => void;
}

const CalculatorButtons: React.FC<CalculatorButtonsProps> = ({ onButtonClick }) => {
  const { resolvedTheme } = useThemeContext(); // Déplacé ici dans le composant
  
  const buttons = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '='],
  ];

  const getButtonStyle = (button: string) => {
    const baseStyle = "min-h-[3.5rem] h-full rounded-xl font-semibold text-base sm:text-lg lg:text-xl transition-all duration-200 transform active:scale-95 shadow-sm hover:shadow-md";
    
    if (button === '=') {
      return `${baseStyle} ${
        resolvedTheme === 'dark'
          ? 'bg-gradient-to-r from-palette-4 to-palette-5 hover:from-palette-4/90 hover:to-palette-5/90 text-palette-1'
          : 'bg-gradient-to-r from-palette-3 to-palette-4 hover:from-palette-3/90 hover:to-palette-4/90 text-white'
      } shadow-lg`;
    }
    
    if (['÷', '×', '-', '+'].includes(button)) {
      return `${baseStyle} ${
        resolvedTheme === 'dark'
          ? 'bg-gradient-to-r from-palette-3 to-palette-4 hover:from-palette-3/90 hover:to-palette-4/90 text-palette-1'
          : 'bg-gradient-to-r from-palette-2 to-palette-3 hover:from-palette-2/90 hover:to-palette-3/90 text-white'
      }`;
    }
    
    if (['C', '(', ')', '⌫'].includes(button)) {
      return `${baseStyle} ${
        resolvedTheme === 'dark'
          ? 'bg-gradient-to-r from-palette-2/40 to-palette-3/40 hover:from-palette-2/60 hover:to-palette-3/60 text-palette-5 border border-palette-3/30'
          : 'bg-gradient-to-r from-palette-4/20 to-palette-5/20 hover:from-palette-4/30 hover:to-palette-5/30 text-palette-1 border border-palette-4/30'
      }`;
    }
    
    return `${baseStyle} ${
      resolvedTheme === 'dark'
        ? 'bg-palette-1/60 hover:bg-palette-1/80 text-palette-5 border border-palette-2/30 hover:border-palette-2/50'
        : 'bg-white/90 hover:bg-white text-palette-1 border border-palette-4/20 hover:border-palette-4/40'
    }`;
  };

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 h-full min-h-0">
      {buttons.flat().map((button, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(button)}
          className={getButtonStyle(button) + ' h-full flex items-center justify-center'}
        >
          {button === '⌫' ? (
            <Delete size={18} className="mx-auto sm:w-5 sm:h-5" />
          ) : (
            button
          )}
        </button>
      ))}
    </div>
  );
};

export default CalculatorButtons;