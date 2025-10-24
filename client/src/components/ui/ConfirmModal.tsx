import { AnimatePresence, motion } from 'framer-motion';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            <p className="text-xl mb-4">{message}</p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:scale-105 active:scale-100 transition"
                onClick={onConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-lg hover:scale-105 active:scale-100 transition"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
