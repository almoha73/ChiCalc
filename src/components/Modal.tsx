import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-palette-2 rounded-2xl shadow-2xl max-w-lg w-full mx-4 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-palette-4 hover:text-palette-5 dark:text-palette-5 dark:hover:text-palette-4 transition-colors"
          aria-label="Fermer la modale"
        >
          ×
        </button>
        {title && (
          <div className="px-6 pt-6 pb-2 text-lg font-semibold text-palette-1 dark:text-palette-5">{title}</div>
        )}
        <div className="px-6 pb-6 pt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal; 