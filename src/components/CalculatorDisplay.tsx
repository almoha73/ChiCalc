import React from 'react';
import { useThemeContext } from '../context/ThemeContext';

interface CalculatorDisplayProps {
  display: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ display }) => {
  const { theme } = useThemeContext();
  
  return (
    <div className={`rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 shadow-inner border transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-palette-1/20 to-palette-2/20 border-palette-3/20'
        : 'bg-gradient-to-br from-palette-5/10 to-palette-4/10 border-palette-4/20'
    }`}>
      {/* Affichage Unifié */}
      <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-mono min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem] xl:min-h-[7rem] 2xl:min-h-[8rem] rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 border shadow-sm flex items-center justify-end overflow-hidden transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-palette-1/40 border-palette-2/30 text-palette-5'
          : 'bg-white/90 border-palette-4/30 text-palette-1'
      }`}>
        <span className="truncate">
          {display}
        </span>
      </div>
      
      {/* Indication clavier - masquée sur très petits écrans */}
      <div className={`text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center transition-colors duration-300 hidden sm:block ${
        theme === 'dark' ? 'text-palette-4/70' : 'text-palette-2/70'
      }`}>
        Utilisez votre clavier : chiffres, +, -, *, /, Entrée, Échap, Retour arrière
      </div>
    </div>
  );
};

export default CalculatorDisplay;