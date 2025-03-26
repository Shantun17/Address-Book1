import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
