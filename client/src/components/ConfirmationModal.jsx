import React from 'react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText, // Dynamic confirm button text
  cancelText = 'Cancel', // Default cancel text
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg text-center">
        <p className="text-lg text-gray-800 mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {confirmText} {/* Dynamic button text */}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {cancelText} {/* Dynamic cancel button text */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
