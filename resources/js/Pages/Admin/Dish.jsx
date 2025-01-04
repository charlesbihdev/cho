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
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-semibold transition-all duration-200 transform hover:scale-105"
                        >
                            Add Dish
                        </button>
                    </div>

                    <div className="overflow-hidden bg-white shadow-lg rounded-lg">
                        <div className="overflow-x-auto border-gray-200">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="py-3 px-4 border-b">
                                            #
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Food Name
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Category
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Thumbnail
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Total Vendors
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {dishes.map((food, index) => (
                                        <tr
                                            key={food.id}
                                            className="hover:bg-gray-50 transform transition-all duration-200"
                                        >
                                            <td className="py-4 px-4 border-b">
                                                {index + 1}
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                {food.name}
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                {food.category}
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                <div className="flex justify-center">
                                                    <img
                                                        src={food.thumbnail}
                                                        alt={food.name}
                                                        className="w-20 h-20 object-cover rounded-md hover:scale-110 transition-all duration-200"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                {food.vendors.length}
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800 font-semibold transition-all duration-200"
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
