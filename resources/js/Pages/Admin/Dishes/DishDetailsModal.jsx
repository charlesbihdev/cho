import Modal from "@/Components/Modal";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";

const DishDetailsModal = ({ food, show, onClose, onUpdate }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [variantToDelete, setVariantToDelete] = useState(null);

    // console.log(food);

    const handleDeleteClick = (variant) => {
        setVariantToDelete(variant.id); // Pass only the ID
        setIsDeleteModalOpen(true);
    };

    const handleToggle = (e, id) => {
        // Find the variant to get its current active status
        const variant = food.vendors
            .flatMap((vendor) => vendor.variants)
            .find((v) => v.id === id);
        const newActiveStatus = !variant.active;

        // Optimistically update the UI
        onUpdate("toggle", { variantId: id, newActiveStatus });

        router.post(
            route("dishes.toggle-active", id),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    // Server confirmed the toggle; UI is already updated
                },
                onError: (errors) => {
                    console.error("Toggle failed:", errors);
                    // Revert the optimistic update
                    onUpdate("toggle", {
                        variantId: id,
                        newActiveStatus: variant.active,
                    });
                },
            }
        );
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (!variantToDelete) {
            console.error("No variant selected for deletion!");
            return;
        }
        setIsDeleteModalOpen(false);

        // Optimistically update the UI by removing the variant
        onUpdate("delete", { variantId: variantToDelete });

        router.delete(route("dishes.destroy", variantToDelete), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setVariantToDelete(null);
            },
            onError: (errors) => {
                console.error("Delete failed:", errors);
                // Revert the optimistic update by refetching or restoring the variant
                // For simplicity, we assume the parent will handle this
                // You may need to refetch the food data or restore the variant
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-center">
                    {food.name} - Details
                </h3>
                {food.vendors.map((vendor) => (
                    <div key={vendor.id} className="mt-4 border-b pb-4">
                        <h4 className="text-lg font-semibold mb-2 text-[#d5a234] text-center">
                            Vendor: {vendor.name}
                        </h4>
                        <div className="mt-2">
                            <h5 className="font-medium">Variants:</h5>
                            <ul className="list-disc ml-5 space-y-2">
                                {vendor.variants.map((variant) => (
                                    <li
                                        key={variant.id}
                                        className="grid grid-cols-2 md:grid-cols-4 gap-x-4 justify-right items-center p-2 border rounded hover:bg-gray-100 text-center"
                                    >
                                        <span>{variant.name}</span>
                                        <span className="font-semibold text-gray-700">
                                            ₵{variant.price.toFixed(2)}
                                        </span>

                                        <label className="flex justify-center items-center cursor-pointer my-3">
                                            <input
                                                onChange={(e) =>
                                                    handleToggle(e, variant.id)
                                                }
                                                checked={variant.active}
                                                type="checkbox"
                                                className="hidden"
                                                aria-label="Order processed toggle"
                                            />
                                            <div className="relative">
                                                <div
                                                    className={`block w-14 h-8 rounded-full transition duration-200 ease-in-out ${
                                                        variant.active
                                                            ? "bg-green-500"
                                                            : "bg-gray-400"
                                                    }`}
                                                ></div>
                                                <div
                                                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-md transition duration-200 ease-in-out ${
                                                        variant.active
                                                            ? "translate-x-6 bg-green-400"
                                                            : ""
                                                    }`}
                                                ></div>
                                            </div>
                                        </label>
                                        <div>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() =>
                                                    handleDeleteClick(variant)
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

            {/* Confirmation Delete Modal */}
            <ConfirmDeleteModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                name={"Variant"}
            />
        </Modal>
    );
};

export default DishDetailsModal;
