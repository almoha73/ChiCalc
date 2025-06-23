import React from 'react';
import { Delete } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

interface CalculatorButtonsProps {
  onButtonClick: (value: string) => void;
}

const CalculatorButtons: React.FC<CalculatorButtonsProps> = ({ onButtonClick }) => {
  const { theme } = useThemeContext();
  
  const buttons = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '='],
  ];

  const getButtonStyle = (button: string) => {
    const baseStyle = "rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl transition-all duration-200 transform active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center";
    
    if (button === '=') {
      return `${baseStyle} ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-palette-4 to-palette-5 hover:from-palette-4/90 hover:to-palette-5/90 text-palette-1 shadow-palette-4/30'
          : 'bg-gradient-to-r from-palette-3 to-palette-4 hover:from-palette-3/90 hover:to-palette-4/90 text-white shadow-palette-3/40'
      }`;
    }
    
    if (['÷', '×', '-', '+'].includes(button)) {
      return `${baseStyle} ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-palette-3 to-palette-4 hover:from-palette-3/90 hover:to-palette-4/90 text-palette-1 shadow-palette-3/30'
          : 'bg-gradient-to-r from-palette-2 to-palette-3 hover:from-palette-2/90 hover:to-palette-3/90 text-white shadow-palette-2/40'
      }`;
    }
    
    if (['C', '(', ')', '⌫'].includes(button)) {
      return `${baseStyle} ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-palette-2/50 to-palette-3/50 hover:from-palette-2/70 hover:to-palette-3/70 text-palette-5 border-2 border-palette-3/40 shadow-palette-2/20'
          : 'bg-gradient-to-r from-palette-4/30 to-palette-5/30 hover:from-palette-4/50 hover:to-palette-5/50 text-palette-1 border-2 border-palette-4/50 shadow-palette-4/30'
      }`;
    }
    
    // Chiffres - amélioration du contraste en thème clair
    return `${baseStyle} ${
      theme === 'dark'
        ? 'bg-gradient-to-r from-palette-1/70 to-palette-2/60 hover:from-palette-1/90 hover:to-palette-2/80 text-palette-5 border-2 border-palette-2/40 shadow-palette-1/30'
        : 'bg-gradient-to-r from-white to-palette-5/20 hover:from-palette-5/10 hover:to-palette-5/30 text-palette-1 border-2 border-palette-4/40 shadow-palette-4/20'
    }`;
  };

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 h-full">
      {buttons.flat().map((button, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(button)}
          className={getButtonStyle(button)}
        >
          {button === '⌫' ? (
            <>
              <Delete size={20} className="sm:hidden" />
              <Delete size={26} className="hidden sm:block md:hidden" />
              <Delete size={32} className="hidden md:block lg:hidden" />
              <Delete size={38} className="hidden lg:block xl:hidden" />
              <Delete size={44} className="hidden xl:block" />
            </>
          ) : (
            button
          )}
        </button>
      ))}
    </div>
  );
};

export default CalculatorButtons;