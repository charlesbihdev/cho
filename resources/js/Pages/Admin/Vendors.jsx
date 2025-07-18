import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import AddVendorModal from "./Vendors/AddVendorModal";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import { useState } from "react";

export default function Vendors({ vendors }) {
    const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [vendorToDelete, setVendorToDelete] = useState(null);

    // State for loading indicator
    const [loading, setLoading] = useState(false);

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
        setLoading(true); // Show loading indicator
        destroy(route("vendors.destroy", vendorToDelete), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setVendorToDelete(null); // Reset vendorToDelete
                setLoading(false); // Hide loading indicator
            },
            onError: () => {
                setLoading(false); // Hide loading indicator in case of error
            },
            preserveScroll: true,
        });

        console.log(`Deleting vendor with ID: ${vendorToDelete}`);
    };

    const handleToggle = (e, id) => {
        e.preventDefault();
        router.post(route("vendors.toggle-active", id));
        onClose();
    };

    return (
        <AdminLayout>
            <Head title="Vendors" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full flex justify-end mb-3">
                        <button
                            onClick={handleAddVendorClick}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 hover:scale-105 transition-all"
                        >
                            Add Vendor
                        </button>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-b border-gray-300">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            #
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Name
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Status
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {vendors.map((vendor, index) => (
                                        <tr
                                            key={vendor.id}
                                            className="hover:bg-gray-50 transition-all duration-200"
                                        >
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                {index + 1}
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                {vendor.name}
                                            </td>
                                            <td
                                                className={`py-4 px-4 border-b border-gray-400 font-bold`}
                                            >
                                                <div className="mt-6 pt-4 border-t">
                                                    <label className="flex justify-center items-center cursor-pointer">
                                                        <input
                                                            onChange={(e) =>
                                                                handleToggle(
                                                                    e,
                                                                    vendor.id
                                                                )
                                                            }
                                                            checked={
                                                                vendor.active
                                                            }
                                                            type="checkbox"
                                                            className="hidden"
                                                            aria-label="Order processed toggle"
                                                        />
                                                        <div className="relative">
                                                            <div
                                                                className={`block w-14 h-8 rounded-full transition duration-200 ease-in-out ${
                                                                    vendor.active
                                                                        ? "bg-green-500"
                                                                        : "bg-gray-400"
                                                                }`}
                                                            ></div>
                                                            <div
                                                                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-md transition duration-200 ease-in-out ${
                                                                    vendor.active
                                                                        ? "translate-x-6 bg-green-400"
                                                                        : ""
                                                                }`}
                                                            ></div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            vendor.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 font-semibold transition-all duration-200"
                                                    disabled={loading}
                                                >
                                                    {loading
                                                        ? "Deleting..."
                                                        : "Delete"}
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
