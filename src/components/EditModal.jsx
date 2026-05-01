import { motion, AnimatePresence } from "framer-motion";

const EditModal = ({ open, onClose, onSave, value, setValue }) => {
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
            {/* Title */}
            <h2 className="text-lg font-semibold text-white mb-5">
              Edit Project
            </h2>

            {/* Input Field */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-2 block">
                Project Name
              </label>

              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter project name..."
                className="w-full px-3 py-2.5 rounded-lg
                           bg-gray-900/80 border border-gray-700
                           text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-transparent
                           transition-all duration-200"
              />
            </div>

            {/* Actions */}
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
                  onSave();
                  onClose();
                }}
                disabled={!value.trim()}
                className={`px-4 py-2 text-sm rounded-lg font-medium
                  ${
                    value.trim()
                      ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }
                  transition-all duration-200`}
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;
