import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Sheet: React.FC<SheetProps> = ({ isOpen, onClose, children, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 h-[85vh] glass-sheet rounded-t-[40px] overflow-hidden flex flex-col"
          >
            {/* Handle Bar */}
            <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing" onClick={onClose}>
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
              <h3 className="text-lg font-semibold text-white/90">{title}</h3>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                <X size={20} className="text-white/70" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pb-24 no-scrollbar">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};