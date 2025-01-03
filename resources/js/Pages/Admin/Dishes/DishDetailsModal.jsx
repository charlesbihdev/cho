import Modal from "@/Components/Modal";

const DishDetailsModal = ({ food, show, onClose }) => {
    const handleEditVariant = (variant) => {
        console.log("Editing variant:", variant.name);
    };

    const handleDeleteVariant = (variant) => {
        console.log("Deleting variant:", variant.name);
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4 h-[90%] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">
                    {food.name} - Details
                </h3>
                {food.vendors.map((vendor) => (
                    <div key={vendor.id} className="mt-4 border-b pb-4">
                        <h4 className="text-lg font-semibold mb-2">
                            Vendor: {vendor.name}
                        </h4>
                        <div className="mt-2">
                            <h5 className="font-medium">Variants:</h5>
                            <ul className="list-disc ml-5 space-y-2">
                                {vendor.variants.map((variant) => (
                                    <li
                                        key={variant.id}
                                        className="flex justify-between items-center p-2 border rounded hover:bg-gray-100"
                                    >
                                        <span>{variant.name}</span>
                                        <span className="font-semibold text-gray-700">
                                            ${variant.price.toFixed(2)}
                                        </span>
                                        <div>
                                            {/* <button
                                                className="text-blue-600 hover:underline mr-2"
                                                onClick={() =>
                                                    handleEditVariant(variant)
                                                }
                                            >
                                                Edit
                                            </button> */}
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() =>
                                                    handleDeleteVariant(variant)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DishDetailsModal;
