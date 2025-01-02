import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import AddLocationModal from "./Location/AddLocationModal";

export default function Location({ locations, vendors }) {
    const [isOpen, setIsOpen] = useState(false);

    // Function to handle button clicks and show the modal with content
    const handleButtonClick = () => {
        setIsOpen(true);
    };

    return (
        <AdminLayout>
            <Head title="Location" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full flex justify-end mb-3">
                        <button
                            onClick={handleButtonClick}
                            className="bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Add Location
                        </button>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Vendor
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Destination
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Amount
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {locations.map((location) => (
                                        <tr key={location.id}>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {location.vendor.name}
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {location.destination}
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {location.amount}
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {/* <button className="bg-blue-500 text-white py-1 px-4 rounded">
                                                    Edit
                                                </button> */}
                                                <button className="bg-red-600 text-white py-1 px-4 rounded">
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

            {/* Modal */}
            <AddLocationModal
                vendors={vendors}
                show={isOpen}
                onClose={() => setIsOpen(false)}
            ></AddLocationModal>
        </AdminLayout>
        // </AuthenticatedLayout>
    );
}
