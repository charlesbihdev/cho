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
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:scale-105 transition-all font-semibold"
                        >
                            Add Location
                        </button>
                    </div>

                    <div className="overflow-hidden bg-white shadow-lg rounded-lg">
                        <div className="overflow-x-auto border-gray-200">
                            <table className="w-full text-center table-auto border-collapse ">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="py-3 px-4 border-b">
                                            #
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Vendor
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Destination
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Amount
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {locations.map((location, index) => (
                                        <tr
                                            key={location.id}
                                            className="hover:bg-gray-50 transform transition-all duration-200"
                                        >
                                            <td className="py-4 px-4 border-b">
                                                {index + 1}
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                {location.vendor.name}
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                {location.destination}
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                {location.amount}
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            location.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 font-semibold transition-all duration-200"
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
