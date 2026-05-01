const EditModal = ({ open, onClose, onSave, value, setValue }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#020617] border border-gray-800 p-6 rounded-xl w-[90%] max-w-sm">

        <h2 className="text-lg font-semibold mb-3">
          Edit Project
        </h2>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded text-sm">
            Cancel
          </button>

          <button
            onClick={() => {
              onSave();
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 rounded text-sm"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditModal;