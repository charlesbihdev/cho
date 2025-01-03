import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import AddDishModal from "./Dishes/AddDishModal";

export default function Dish({ dishes, vendors, foods }) {
    console.log(dishes);
    const [isOpen, setIsOpen] = useState(false);

    // Function to handle button clicks and show the modal with content
    const handleButtonClick = () => {
        setIsOpen(true);
    };

    return (
        <AdminLayout>
            <Head title="Food" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full flex justify-end mb-3">
                        <button
                            onClick={handleButtonClick}
                            className="bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Add Dish
                        </button>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Food
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Category
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Vendor
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Variants
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Prices
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <AddDishModal
                foods={foods}
                vendors={vendors}
                show={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </AdminLayout>
    );
}
