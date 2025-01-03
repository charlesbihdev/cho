import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import AddDishModal from "./Dishes/AddDishModal";
import DishDetailsModal from "./Dishes/DishDetailsModal";

export default function Dish({ dishes, vendors, foods }) {
    console.log(dishes);
    const [isOpen, setIsOpen] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    const handleViewDetails = (food) => {
        setSelectedFood(food);
        setShowDetailsModal(true);
    };

    const closeModal = () => {
        setSelectedFood(null);
        setShowDetailsModal(false);
    };
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
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-semibold"
                        >
                            Add Dish
                        </button>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-gray-300 border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b border-r border-gray-400 py-2 px-4">
                                            Food Name
                                        </th>
                                        <th className="border-b border-r border-gray-400 py-2 px-4">
                                            Category
                                        </th>
                                        <th className="border-b border-r border-gray-400 py-2 px-4">
                                            Thumbnail
                                        </th>
                                        <th className="border-b border-r border-gray-400 py-2 px-4">
                                            Total Vendors
                                        </th>
                                        <th className="border-b border-r border-gray-400 py-2 px-4">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dishes.map((food) => (
                                        <tr key={food.id}>
                                            <td className="border-b border-r border-gray-400 py-2">
                                                {food.name}
                                            </td>
                                            <td className="border-b border-r border-gray-400 py-2">
                                                {food.category}
                                            </td>
                                            <td className="border-b border-r border-gray-400 py-2">
                                                <div className=" flex justify-center">
                                                    <img
                                                        src={food.thumbnail}
                                                        alt={food.name}
                                                        className="w-[80px] h-[80px] object-cover rounded-md"
                                                    />
                                                </div>
                                            </td>
                                            <td className="border-b border-r border-gray-400 py-2">
                                                {food.vendors.length}
                                            </td>
                                            <td className="border-b border-r border-gray-400 py-2">
                                                <button
                                                    className="text-blue-600 hover:underline"
                                                    onClick={() =>
                                                        handleViewDetails(food)
                                                    }
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Food Details Modal */}
                        {selectedFood && (
                            <DishDetailsModal
                                show={showDetailsModal}
                                food={selectedFood}
                                onClose={closeModal}
                            />
                        )}
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
