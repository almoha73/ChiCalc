import React from 'react';
import { X, Trash2, Clock, RotateCcw } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
  onLoadFromHistory: (item: HistoryItem) => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onLoadFromHistory
}) => {
  const { theme } = useThemeContext();

  if (!isOpen) return null;

  const handleLoadFromHistory = (item: HistoryItem) => {
    onLoadFromHistory(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md max-h-[80vh] rounded-3xl shadow-2xl border transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-palette-2/95 border-palette-3/30'
          : 'bg-white/95 border-palette-5/30'
      }`}>
        {/* En-tête */}
        <div className={`p-6 border-b transition-colors duration-300 ${
          theme === 'dark' ? 'border-palette-3/20' : 'border-palette-4/20'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={20} className={theme === 'dark' ? 'text-palette-4' : 'text-palette-3'} />
              <h2 className={`text-xl font-bold transition-colors duration-300 ${
                theme === 'dark' ? 'text-palette-5' : 'text-palette-1'
              }`}>Historique</h2>
            </div>
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-palette-1/20 hover:bg-palette-1/40 text-palette-5'
                      : 'bg-palette-1/10 hover:bg-palette-1/20 text-palette-1'
                  }`}
                  title="Effacer l'historique"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-palette-1/20 hover:bg-palette-1/40 text-palette-5'
                    : 'bg-palette-1/10 hover:bg-palette-1/20 text-palette-1'
                }`}
                title="Fermer"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 overflow-y-auto max-h-96">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-palette-3/20 to-palette-4/20'
                  : 'bg-gradient-to-br from-palette-4/20 to-palette-5/20'
              }`}>
                <Clock size={24} className={theme === 'dark' ? 'text-palette-4' : 'text-palette-3'} />
              </div>
              <p className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-palette-4' : 'text-palette-2'
              }`}>Aucun calcul pour le moment</p>
              <p className={`text-sm mt-1 transition-colors duration-300 ${
                theme === 'dark' ? 'text-palette-4/70' : 'text-palette-2/70'
              }`}>
                L'historique de vos calculs apparaîtra ici
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleLoadFromHistory(item)}
                  className={`rounded-xl p-4 cursor-pointer transition-all duration-200 border hover:shadow-md group ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-palette-1/20 to-palette-2/20 hover:from-palette-1/40 hover:to-palette-2/40 border-palette-3/20 hover:border-palette-3/40'
                      : 'bg-gradient-to-r from-palette-5/10 to-palette-4/10 hover:from-palette-5/20 hover:to-palette-4/20 border-palette-4/20 hover:border-palette-4/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className={`text-sm font-mono mb-1 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-palette-4' : 'text-palette-2'
                      }`}>
                        {item.expression}
                      </div>
                      <div className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-palette-5' : 'text-palette-1'
                      }`}>
                        = {item.result}
                      </div>
                      <div className={`text-xs transition-colors duration-300 ${
                        theme === 'dark' ? 'text-palette-4/70' : 'text-palette-2/70'
                      }`}>
                        {item.timestamp.toLocaleString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </div>
                    </div>
                    <RotateCcw 
                      size={16} 
                      className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 mt-1 ${
                        theme === 'dark' ? 'text-palette-4' : 'text-palette-3'
                      }`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;