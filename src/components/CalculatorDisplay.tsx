import React from 'react';
import { useThemeContext } from '../context/ThemeContext';

interface CalculatorDisplayProps {
  display: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ display }) => {
  const { theme } = useThemeContext();
  
  return (
    <div className={`rounded-2xl p-4 md:p-6 shadow-inner border transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-palette-1/20 to-palette-2/20 border-palette-3/20'
        : 'bg-gradient-to-br from-palette-5/10 to-palette-4/10 border-palette-4/20'
    }`}>
      {/* Affichage Unifié */}
      <div className={`text-3xl md:text-4xl lg:text-5xl font-bold font-mono min-h-[3rem] md:min-h-[4rem] rounded-lg px-3 md:px-4 py-2 md:py-3 border shadow-sm flex items-center justify-end overflow-hidden transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-palette-1/40 border-palette-2/30 text-palette-5'
          : 'bg-white/90 border-palette-4/30 text-palette-1'
      }`}>
        <span className="truncate">
          {display}
        </span>
      </div>
      
      {/* Indication clavier */}
      <div className={`text-xs mt-2 md:mt-3 text-center transition-colors duration-300 ${
        theme === 'dark' ? 'text-palette-4/70' : 'text-palette-2/70'
      }`}>
        Utilisez votre clavier : chiffres, +, -, *, /, Entrée, Échap, Retour arrière
      </div>
    </div>
  );
};

export default CalculatorDisplay;