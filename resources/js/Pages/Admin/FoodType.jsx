import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import AddFoodTypeModal from "./Foods/AddFoodTypeModal";

export default function FoodType({ foods, categories }) {
    const [isOpen, setIsOpen] = useState(false);

    // Function to handle button clicks and show the modal with content
    const handleButtonClick = () => {
        setIsOpen(true);
    };
    console.log(foods);
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
                            Add Food
                        </button>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b border-t-2 border-r-2 border-l-2  py-2 px-4">
                                            id
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Name
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            thumbnail
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Category
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {foods.map((food) => (
                                        <tr key={food.id}>
                                            <td className="border-b border-r-2 border-l-2 py-2 px-4">
                                                {food.id}
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {food.name}
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                <img
                                                    src={food.thumbnail}
                                                    alt={food.name}
                                                    className="w-16 h-16 object-cover"
                                                />
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {food.category.name}
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
            <AddFoodTypeModal
                categories={categories}
                show={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </AdminLayout>
    );
}
