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
      <div className="w-full max-w-md mx-auto">
        <div className={`backdrop-blur-sm rounded-3xl shadow-2xl border overflow-hidden transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-palette-2/90 border-palette-3/30'
            : 'bg-white/95 border-palette-5/30'
        }`}>
          {/* En-tête avec Chihuahua et Boutons */}
          <div className={`relative p-6 border-b transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-palette-3/20 to-palette-4/20 border-palette-3/20'
              : 'bg-gradient-to-r from-palette-4/20 to-palette-5/20 border-palette-4/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-palette-5' : 'text-palette-1'
                }`}>
                  ChiCalc Pro
                </h1>
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-palette-4' : 'text-palette-2'
                }`}>
                  Calculatrice Avancée
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsHistoryOpen(true)}
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md relative ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-palette-3 to-palette-4 text-palette-1 hover:from-palette-3/90 hover:to-palette-4/90'
                      : 'bg-gradient-to-r from-palette-2 to-palette-3 text-white hover:from-palette-2/90 hover:to-palette-3/90'
                  }`}
                  title="Voir l'historique"
                >
                  <History size={20} />
                  {history.length > 0 && (
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border-2 transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'bg-palette-5 text-palette-1 border-palette-1'
                        : 'bg-palette-4 text-white border-white'
                    }`}>
                      {history.length > 9 ? '9+' : history.length}
                    </div>
                  )}
                </button>
                <ThemeToggle />
                <ChihuahuaIllustration className="w-20 h-20 opacity-90" />
              </div>
            </div>
          </div>

          {/* Affichage */}
          <div className="p-6 pb-4">
            <CalculatorDisplay 
              display={display}
            />
          </div>

          {/* Boutons */}
          <div className="p-6 pt-2">
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