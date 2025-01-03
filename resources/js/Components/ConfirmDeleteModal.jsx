import React from "react";
import Modal from "@/Components/Modal";

const ConfirmDeleteModal = ({ show, onClose, onConfirm, name, processing }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6 bg-white rounded shadow-md text-center">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Confirm Deletion
                </h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this {name}? This action
                    cannot be undone.
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                        disabled={processing}
                    >
                        {processing ? "Deleting..." : "Delete"}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
