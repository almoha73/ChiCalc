import React, { useState } from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import CalculatorHistory from './CalculatorHistory';
import ChihuahuaIllustration from './ChihuahuaIllustration';
import ThemeToggle from './ThemeToggle';
import Modal from './Modal';
import { useCalculator } from '../hooks/useCalculator';
import { useThemeContext } from '../context/ThemeContext';

const Calculator: React.FC = () => {
  const { resolvedTheme } = useThemeContext();
  const {
    display,
    history,
    handleButtonClick,
    clearHistory,
    loadFromHistory
  } = useCalculator();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
        {/* Calculatrice Principale */}
        <div className={`flex flex-col backdrop-blur-sm rounded-2xl shadow-2xl border overflow-hidden transition-colors duration-300 ${
          resolvedTheme === 'dark'
            ? 'bg-palette-2/90 border-palette-3/30'
            : 'bg-white/95 border-palette-5/30'
        }`}>
          {/* En-tête avec Chihuahua, Bouton Thème et Historique */}
          <div className={`relative p-3 sm:p-4 lg:p-6 border-b transition-colors duration-300 flex-shrink-0 ${
            resolvedTheme === 'dark'
              ? 'bg-gradient-to-r from-palette-3/20 to-palette-4/20 border-palette-3/20'
              : 'bg-gradient-to-r from-palette-4/20 to-palette-5/20 border-palette-4/20'
          }`}>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex-1 min-w-[160px]">
                <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-1 lg:mb-2 transition-colors duration-300 ${
                  resolvedTheme === 'dark' ? 'text-palette-5' : 'text-palette-1'
                }`}>
                  ChiCalc Pro
                </h1>
                <p className={`text-xs sm:text-sm transition-colors duration-300 ${
                  resolvedTheme === 'dark' ? 'text-palette-4' : 'text-palette-2'
                }`}>
                  Calculatrice Avancée
                </p>
              </div>
              <div className="flex w-full sm:w-auto items-center justify-end gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-0 sm:ml-auto">
                <ThemeToggle />
                <button
                  onClick={() => setIsHistoryOpen(true)}
                  className="p-2 rounded-lg bg-palette-4 text-white hover:bg-palette-5 transition-colors shadow-md"
                  title="Afficher l'historique"
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.05 13A9 9 0 1 0 6 5.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <ChihuahuaIllustration className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 opacity-90" />
              </div>
            </div>
          </div>

          {/* Affichage */}
          <div className="p-3 sm:p-4 lg:p-6 flex-shrink-0">
            <CalculatorDisplay
              display={display}
            />
          </div>

          {/* Boutons */}
          <div className="p-3 sm:p-4 lg:p-6 pt-2 sm:pt-3 flex-1 min-h-0">
            <CalculatorButtons
              onButtonClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} title="Historique des calculs">
        <CalculatorHistory 
          history={history}
          onClearHistory={clearHistory}
          onLoadFromHistory={item => {
            loadFromHistory(item);
            setIsHistoryOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Calculator;