import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import AddLocationModal from "./Location/AddLocationModal";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";

export default function Location({ locations, vendors }) {
    const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [locationToDelete, setLocationToDelete] = useState(null);

    const { delete: destroy, processing } = useForm();

    // Function to show the Add Location Modal
    const handleAddLocationClick = () => {
        setIsAddLocationModalOpen(true);
    };

    // Function to show the Delete Modal
    const handleDeleteClick = (locationId) => {
        setLocationToDelete(locationId);
        setIsDeleteModalOpen(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        destroy(route("locations.destroy", locationToDelete), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setLocationToDelete(null);
            },
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Location" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full flex justify-end mb-3">
                        <button
                            onClick={handleAddLocationClick}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:scale-105  transition-all font-semibold"
                        >
                            Add Location
                        </button>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b border-gray-300">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b border-l border-r border-gray-400 py-2 px-4">
                                            #
                                        </th>
                                        <th className="border-b border-l border-r border-gray-400 py-2 px-4">
                                            Vendor
                                        </th>
                                        <th className="border-b border-l border-r border-gray-400 py-2 px-4">
                                            Destination
                                        </th>
                                        <th className="border-b border-l border-r border-gray-400 py-2 px-4">
                                            Amount
                                        </th>
                                        <th className="border-b border-l border-r border-gray-400 py-2 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locations.map((location, index) => (
                                        <tr key={location.id}>
                                            <td className="border-b border-l border-r border-gray-400 py-2 px-4">
                                                {index + 1}
                                            </td>
                                            <td className="border-b border-l border-r border-gray-400 py-2 px-4">
                                                {location.vendor.name}
                                            </td>
                                            <td className="border-b border-l border-r border-gray-400 py-2 px-4">
                                                {location.destination}
                                            </td>
                                            <td className="border-b border-l border-r border-gray-400 py-2 px-4">
                                                {location.amount}
                                            </td>
                                            <td className="border-b border-l border-r border-gray-400 py-2 px-4">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            location.id
                                                        )
                                                    }
                                                    className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 transition"
                                                    disabled={processing}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Location Modal */}
            <AddLocationModal
                vendors={vendors}
                show={isAddLocationModalOpen}
                onClose={() => setIsAddLocationModalOpen(false)}
            />

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                name="Location"
            />
        </AdminLayout>
    );
}
