import React from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import CalculatorHistory from './CalculatorHistory';
import ChihuahuaIllustration from './ChihuahuaIllustration';
import ThemeToggle from './ThemeToggle';
import { useCalculator } from '../hooks/useCalculator';
import { useTheme } from '../hooks/useTheme';

const Calculator: React.FC = () => {
  const { resolvedTheme } = useTheme();
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Calculator */}
        <div className="lg:col-span-7">
          <div className={`backdrop-blur-sm rounded-3xl shadow-2xl border overflow-hidden transition-colors duration-300 ${
            resolvedTheme === 'dark'
              ? 'bg-palette-2/90 border-palette-3/30'
              : 'bg-white/95 border-palette-5/30'
          }`}>
            {/* Header with Chihuahua and Theme Toggle */}
            <div className={`relative p-6 border-b transition-colors duration-300 ${
              resolvedTheme === 'dark'
                ? 'bg-gradient-to-r from-palette-3/20 to-palette-4/20 border-palette-3/20'
                : 'bg-gradient-to-r from-palette-4/20 to-palette-5/20 border-palette-4/20'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                    resolvedTheme === 'dark' ? 'text-palette-5' : 'text-palette-1'
                  }`}>
                    ChiCalc Pro
                  </h1>
                  <p className={`text-sm transition-colors duration-300 ${
                    resolvedTheme === 'dark' ? 'text-palette-4' : 'text-palette-2'
                  }`}>
                    Advanced Calculator
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <ChihuahuaIllustration className="w-20 h-20 opacity-90" />
                </div>
              </div>
            </div>

            {/* Display */}
            <div className="p-6 pb-4">
              <CalculatorDisplay 
                display={display}
              />
            </div>

            {/* Buttons */}
            <div className="p-6 pt-2">
              <CalculatorButtons 
                onButtonClick={handleButtonClick}
              />
            </div>
          </div>
        </div>

        {/* History Panel */}
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