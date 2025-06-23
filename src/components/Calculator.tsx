import React from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import CalculatorHistory from './CalculatorHistory';
import ChihuahuaIllustration from './ChihuahuaIllustration';
import ThemeToggle from './ThemeToggle';
import { useCalculator } from '../hooks/useCalculator';
import { useThemeContext } from '../context/ThemeContext';

const Calculator: React.FC = () => {
  const { resolvedTheme } = useThemeContext();
  const {
    display,
    expression,
    history,
    handleButtonClick,
    clearHistory,
    loadFromHistory
  } = useCalculator();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Calculatrice Principale */}
        <div className="lg:col-span-7">
          <div className={`backdrop-blur-sm rounded-3xl shadow-2xl border overflow-hidden transition-colors duration-300 ${
            resolvedTheme === 'dark'
              ? 'bg-palette-2/90 border-palette-3/30'
              : 'bg-white/95 border-palette-5/30'
          }`}>
            {/* En-tête avec Chihuahua et Bouton Thème */}
            <div className={`relative p-4 lg:p-6 border-b transition-colors duration-300 ${
              resolvedTheme === 'dark'
                ? 'bg-gradient-to-r from-palette-3/20 to-palette-4/20 border-palette-3/20'
                : 'bg-gradient-to-r from-palette-4/20 to-palette-5/20 border-palette-4/20'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-xl lg:text-2xl font-bold mb-1 lg:mb-2 transition-colors duration-300 ${
                    resolvedTheme === 'dark' ? 'text-palette-5' : 'text-palette-1'
                  }`}>
                    ChiCalc Pro
                  </h1>
                  <p className={`text-sm transition-colors duration-300 ${
                    resolvedTheme === 'dark' ? 'text-palette-4' : 'text-palette-2'
                  }`}>
                    Calculatrice Avancée
                  </p>
                </div>
                <div className="flex items-center gap-3 lg:gap-4">
                  <ThemeToggle />
                  <ChihuahuaIllustration className="w-16 h-16 lg:w-20 lg:h-20 opacity-90" />
                </div>
              </div>
            </div>

            {/* Affichage */}
            <div className="p-4 lg:p-6 pb-3 lg:pb-4">
              <CalculatorDisplay 
                display={display}
              />
            </div>

            {/* Boutons */}
            <div className="p-4 lg:p-6 pt-2">
              <CalculatorButtons 
                onButtonClick={handleButtonClick}
              />
            </div>
          </div>
        </div>

        {/* Panneau Historique */}
        <div className="lg:col-span-5">
          <CalculatorHistory 
            history={history}
            onClearHistory={clearHistory}
            onLoadFromHistory={loadFromHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;