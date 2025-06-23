import React, { useState } from 'react';
import { History } from 'lucide-react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import HistoryModal from './HistoryModal';
import ChihuahuaIllustration from './ChihuahuaIllustration';
import ThemeToggle from './ThemeToggle';
import { useCalculator } from '../hooks/useCalculator';
import { useThemeContext } from '../context/ThemeContext';

const Calculator: React.FC = () => {
  const { theme } = useThemeContext();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const {
    display,
    expression,
    history,
    handleButtonClick,
    clearHistory,
    loadFromHistory
  } = useCalculator();

  return (
    <>
      <div className="w-full h-full max-w-[95vw] max-h-[95vh] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto flex flex-col">
        <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border overflow-hidden transition-colors duration-300 flex-1 flex flex-col ${
          theme === 'dark'
            ? 'bg-palette-2/90 border-palette-3/30'
            : 'bg-white/95 border-palette-5/30'
        }`}>
          {/* En-tête avec Chihuahua et Boutons */}
          <div className={`relative p-2 sm:p-4 md:p-6 border-b transition-colors duration-300 flex-shrink-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-palette-3/20 to-palette-4/20 border-palette-3/20'
              : 'bg-gradient-to-r from-palette-4/20 to-palette-5/20 border-palette-4/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-base sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-palette-5' : 'text-palette-1'
                }`}>
                  ChiCalc Pro
                </h1>
                <p className={`text-xs sm:text-sm md:text-base transition-colors duration-300 ${
                  theme === 'dark' ? 'text-palette-4' : 'text-palette-2'
                }`}>
                  Calculatrice Avancée
                </p>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                <button
                  onClick={() => setIsHistoryOpen(true)}
                  className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md relative ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-palette-3 to-palette-4 text-palette-1 hover:from-palette-3/90 hover:to-palette-4/90'
                      : 'bg-gradient-to-r from-palette-2 to-palette-3 text-white hover:from-palette-2/90 hover:to-palette-3/90'
                  }`}
                  title="Voir l'historique"
                >
                  <History size={16} className="sm:hidden" />
                  <History size={20} className="hidden sm:block md:hidden" />
                  <History size={24} className="hidden md:block" />
                  {history.length > 0 && (
                    <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center border-2 transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'bg-palette-5 text-palette-1 border-palette-1'
                        : 'bg-palette-4 text-white border-white'
                    }`}>
                      {history.length > 9 ? '9+' : history.length}
                    </div>
                  )}
                </button>
                <ThemeToggle />
                <ChihuahuaIllustration className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-90" />
              </div>
            </div>
          </div>

          {/* Affichage */}
          <div className="p-2 sm:p-4 md:p-6 pb-1 sm:pb-2 md:pb-4 flex-shrink-0">
            <CalculatorDisplay 
              display={display}
            />
          </div>

          {/* Boutons */}
          <div className="p-2 sm:p-4 md:p-6 pt-1 sm:pt-2 flex-1 flex flex-col">
            <CalculatorButtons 
              onButtonClick={handleButtonClick}
            />
          </div>
        </div>
      </div>

      {/* Modale Historique */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={clearHistory}
        onLoadFromHistory={loadFromHistory}
      />
    </>
  );
};

export default Calculator;