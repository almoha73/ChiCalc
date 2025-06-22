import React from 'react';
import { Delete } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface CalculatorButtonsProps {
  onButtonClick: (value: string) => void;
}

const CalculatorButtons: React.FC<CalculatorButtonsProps> = ({ onButtonClick }) => {
  const { theme } = useTheme();
  
  const buttons = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '='],
  ];

  const getButtonStyle = (button: string) => {
    const baseStyle = "h-14 sm:h-16 rounded-xl font-semibold text-lg transition-all duration-200 transform active:scale-95 shadow-sm hover:shadow-md";
    
    if (button === '=') {
      return `${baseStyle} ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-palette-4 to-palette-5 hover:from-palette-4/90 hover:to-palette-5/90 text-palette-1'
          : 'bg-gradient-to-r from-palette-3 to-palette-4 hover:from-palette-3/90 hover:to-palette-4/90 text-white'
      } shadow-lg`;
    }
    
    if (['÷', '×', '-', '+'].includes(button)) {
      return `${baseStyle} ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-palette-3 to-palette-4 hover:from-palette-3/90 hover:to-palette-4/90 text-palette-1'
          : 'bg-gradient-to-r from-palette-2 to-palette-3 hover:from-palette-2/90 hover:to-palette-3/90 text-white'
      }`;
    }
    
    if (['C', '(', ')', '⌫'].includes(button)) {
      return `${baseStyle} ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-palette-2/40 to-palette-3/40 hover:from-palette-2/60 hover:to-palette-3/60 text-palette-5 border border-palette-3/30'
          : 'bg-gradient-to-r from-palette-4/20 to-palette-5/20 hover:from-palette-4/30 hover:to-palette-5/30 text-palette-1 border border-palette-4/30'
      }`;
    }
    
    return `${baseStyle} ${
      theme === 'dark'
        ? 'bg-palette-1/60 hover:bg-palette-1/80 text-palette-5 border border-palette-2/30 hover:border-palette-2/50'
        : 'bg-white/90 hover:bg-white text-palette-1 border border-palette-4/20 hover:border-palette-4/40'
    }`;
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {buttons.flat().map((button, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(button)}
          className={getButtonStyle(button)}
        >
          {button === '⌫' ? (
            <Delete size={20} className="mx-auto" />
          ) : (
            button
          )}
        </button>
      ))}
    </div>
  );
};

export default CalculatorButtons;