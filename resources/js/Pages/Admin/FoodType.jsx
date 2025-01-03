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

        console.log(`Deleting food with ID: ${foodToDelete}`);
    };

    return (
        <AdminLayout>
            <Head title="Food" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full flex justify-end mb-3">
                        <button
                            onClick={handleAddFoodClick}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:scale-105  transition-all font-semibold"
                        >
                            Add Food
                        </button>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b border-gray-300 b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b  border-r border-gray-400 py-2 px-4">
                                            #
                                        </th>
                                        <th className="border-b border-r py-2 border-gray-400 px-4">
                                            Name
                                        </th>
                                        <th className="border-b border-r py-2 border-gray-400 px-4">
                                            Thumbnail
                                        </th>
                                        <th className="border-b border-r py-2 border-gray-400 px-4">
                                            Category
                                        </th>
                                        <th className="border-b border-r py-2 border-gray-400 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {foods.map((food, index) => (
                                        <tr key={food.id}>
                                            <td className="border-b border-r py-2 border-gray-400 px-4">
                                                {index + 1}
                                            </td>
                                            <td className="border-b border-r py-2 border-gray-400 px-4">
                                                {food.name}
                                            </td>
                                            <td className="border-b border-r py-2 border-gray-400 px-4">
                                                <div className="flex justify-center hover:scale-110  transition-all">
                                                    <img
                                                        src={food.thumbnail}
                                                        alt={food.name}
                                                        className="w-[80px] h-[80px] object-cover rounded-md"
                                                    />
                                                </div>
                                            </td>
                                            <td className="border-b border-r py-2 px-4 border-gray-400">
                                                {food.category.name}
                                            </td>
                                            <td className="border-b py-2 px-4 border-gray-400">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            food.id
                                                        )
                                                    }
                                                    className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 transition"
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
