const ConfirmModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl w-[90%] max-w-sm">

        <h2 className="text-lg font-semibold mb-2">Delete Task</h2>

        <p className="text-gray-400 text-sm mb-5">
          Are you sure you want to delete this task?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-700 rounded text-sm"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-3 py-1 bg-red-500 rounded text-sm"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;