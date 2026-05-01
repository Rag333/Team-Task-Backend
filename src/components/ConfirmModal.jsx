import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({ open, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.25 }}
            className="relative bg-gradient-to-br from-[#020617] to-[#0f172a] 
                       border border-gray-800 shadow-2xl 
                       rounded-2xl w-[90%] max-w-md p-6"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-500/10 text-red-500 p-2 rounded-full">
                ⚠️
              </div>
              <h2 className="text-lg font-semibold text-white">Delete Task</h2>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              This action cannot be undone. Are you sure you want to permanently
              delete this task?
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg 
                           bg-gray-800 hover:bg-gray-700 
                           text-gray-300 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 text-sm rounded-lg 
                           bg-red-500 hover:bg-red-600 
                           text-white font-medium 
                           shadow-lg shadow-red-500/20
                           transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
