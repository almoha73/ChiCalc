import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

interface CalculatorHistoryProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onLoadFromHistory: (item: HistoryItem) => void;
}

const CalculatorHistory: React.FC<CalculatorHistoryProps> = ({
  history,
  onClearHistory,
  onLoadFromHistory
}) => {
  const { resolvedTheme } = useThemeContext(); // Changé ici
  
  return (
    <div className={`backdrop-blur-sm rounded-3xl shadow-2xl border h-full transition-colors duration-300 ${
      resolvedTheme === 'dark'
        ? 'bg-palette-2/90 border-palette-3/30'
        : 'bg-white/95 border-palette-5/30'
    }`}>
      {/* Header */}
      <div className={`p-6 border-b transition-colors duration-300 ${
        resolvedTheme === 'dark' ? 'border-palette-3/20' : 'border-palette-4/20'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={20} className={resolvedTheme === 'dark' ? 'text-palette-4' : 'text-palette-3'} />
            <h2 className={`text-xl font-bold transition-colors duration-300 ${
              resolvedTheme === 'dark' ? 'text-palette-5' : 'text-palette-1'
            }`}>History</h2>
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className={`p-2 rounded-lg transition-colors ${
                resolvedTheme === 'dark'
                  ? 'bg-palette-1/20 hover:bg-palette-1/40 text-palette-5'
                  : 'bg-palette-1/10 hover:bg-palette-1/20 text-palette-1'
              }`}
              title="Clear History"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* History List */}
      <div className="p-6">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              resolvedTheme === 'dark'
                ? 'bg-gradient-to-br from-palette-3/20 to-palette-4/20'
                : 'bg-gradient-to-br from-palette-4/20 to-palette-5/20'
            }`}>
              <Clock size={24} className={resolvedTheme === 'dark' ? 'text-palette-4' : 'text-palette-3'} />
            </div>
            <p className={`transition-colors duration-300 ${
              resolvedTheme === 'dark' ? 'text-palette-4' : 'text-palette-2'
            }`}>No calculations yet</p>
            <p className={`text-sm mt-1 transition-colors duration-300 ${
              resolvedTheme === 'dark' ? 'text-palette-4/70' : 'text-palette-2/70'
            }`}>
              Your calculation history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {history.slice().reverse().map((item) => (
              <div
                key={item.id}
                onClick={() => onLoadFromHistory(item)}
                className={`rounded-xl p-4 cursor-pointer transition-all duration-200 border hover:shadow-md ${
                  resolvedTheme === 'dark'
                    ? 'bg-gradient-to-r from-palette-1/20 to-palette-2/20 hover:from-palette-1/40 hover:to-palette-2/40 border-palette-3/20 hover:border-palette-3/40'
                    : 'bg-gradient-to-r from-palette-5/10 to-palette-4/10 hover:from-palette-5/20 hover:to-palette-4/20 border-palette-4/20 hover:border-palette-4/40'
                }`}
              >
                <div className={`text-sm font-mono mb-1 transition-colors duration-300 ${
                  resolvedTheme === 'dark' ? 'text-palette-4' : 'text-palette-2'
                }`}>
                  {item.expression}
                </div>
                <div className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  resolvedTheme === 'dark' ? 'text-palette-5' : 'text-palette-1'
                }`}>
                  = {item.result}
                </div>
                <div className={`text-xs transition-colors duration-300 ${
                  resolvedTheme === 'dark' ? 'text-palette-4/70' : 'text-palette-2/70'
                }`}>
                  {item.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorHistory;