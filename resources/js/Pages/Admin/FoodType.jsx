import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import AddFoodTypeModal from "./Foods/AddFoodTypeModal";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";

export default function FoodType({ foods, categories }) {
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [foodToDelete, setFoodToDelete] = useState(null);

    // Function to show the Add Food Modal
    const handleAddFoodClick = () => {
        setIsAddFoodModalOpen(true);
    };

    // Function to show the Delete Modal
    const handleDeleteClick = (foodId) => {
        setFoodToDelete(foodId);
        setIsDeleteModalOpen(true);
    };

    const { delete: destroy, processing } = useForm();

    // Function to confirm deletion
    const confirmDelete = () => {
        destroy(route("foods.destroy", foodToDelete), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setFoodToDelete(null); // Reset foodToDelete after successful deletion
            },
            preserveScroll: true,
        });

        // console.log(`Deleting food with ID: ${foodToDelete}`);
    };

    return (
        <AdminLayout>
            <Head title="Food" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full flex justify-end mb-3">
                        <button
                            onClick={handleAddFoodClick}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:scale-105 transition-all font-semibold"
                        >
                            Add Food
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
                                            Name
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Thumbnail
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Category
                                        </th>
                                        <th className="py-3 px-4 border-b">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-700">
                                    {foods.map((food, index) => (
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
                                                <div className="flex justify-center hover:scale-110 transition-all">
                                                    <img
                                                        src={food.thumbnail}
                                                        alt={food.name}
                                                        className="w-20 h-20 object-cover rounded-md"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                {food.category.name}
                                            </td>
                                            <td className="py-4 px-4 border-b">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            food.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 font-semibold transition-all duration-200"
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

            <AddFoodTypeModal
                categories={categories}
                show={isAddFoodModalOpen}
                onClose={() => setIsAddFoodModalOpen(false)}
            />

            <ConfirmDeleteModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                name="Food"
            />
        </AdminLayout>
    );
}
