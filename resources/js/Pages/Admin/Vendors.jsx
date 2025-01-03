import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import AddVendorModal from "./Vendors/AddVendorModal";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import { useState } from "react";

export default function Vendors({ vendors }) {
    const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [vendorToDelete, setVendorToDelete] = useState(null);

    // Function to show the Add Vendor Modal
    const handleAddVendorClick = () => {
        setIsAddVendorModalOpen(true);
    };

    // Function to show the Delete Modal
    const handleDeleteClick = (vendorId) => {
        setVendorToDelete(vendorId);
        setIsDeleteModalOpen(true);
    };

    const { delete: destroy, processing } = useForm();
    // Function to confirm deletion
    const confirmDelete = () => {
        destroy(route("vendors.destroy", vendorToDelete), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setVendorToDelete(null); // Corrected here
            },
            preserveScroll: true,
        });

        console.log(`Deleting vendor with ID: ${vendorToDelete}`);
        // Perform deletion logic here, e.g., send a request to the backend
    };

    return (
        <AdminLayout>
            <Head title="Vendors" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full flex justify-end mb-3">
                        <button
                            onClick={handleAddVendorClick}
                            className="bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Add Vendor
                        </button>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b border-r-2 py-2 px-4">
                                            ID
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Name
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {vendors.map((vendor, index) => (
                                        <tr key={vendor.id}>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {index + 1}
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {vendor.name}
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            vendor.id
                                                        )
                                                    }
                                                    className="bg-red-600 text-white py-1 px-4 rounded"
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

            <AddVendorModal
                vendors={vendors}
                show={isAddVendorModalOpen}
                onClose={() => setIsAddVendorModalOpen(false)}
            />

            <ConfirmDeleteModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                name="Vendor"
            />
        </AdminLayout>
    );
}
