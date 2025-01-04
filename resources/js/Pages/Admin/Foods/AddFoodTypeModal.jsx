import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
const AddFoodTypeModal = ({ show, onClose, categories }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        thumbnail: null,
        category_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("foods.store"), {
            onSuccess: () => {
                reset();
                onClose();
            },
            preserveScroll: true,
            preserveState: true,
            only: ["foods", "errors", "flash"],
        });
    };

    const handleFileChange = (e) => {
        setData("thumbnail", e.target.files[0]);
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-lg font-bold">Add Food Type</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1">
                            Food Type Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-3 h-10 border border-gray-500 rounded"
                            placeholder="Enter food type name"
                            required
                        />
                        {errors.name && (
                            <div className="text-red-500 mt-2">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Input */}
                    <div className="mb-4">
                        <label htmlFor="thumbnail" className="block mb-1">
                            Thumbnail
                        </label>
                        <input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border border-gray-500 rounded"
                            required
                        />
                        {errors.thumbnail && (
                            <div className="text-red-500 mt-2">
                                {errors.thumbnail}
                            </div>
                        )}
                    </div>

                    {/* Category Select Input */}
                    <div className="mb-4">
                        <label htmlFor="category_id" className="block mb-1">
                            Category
                        </label>
                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full px-3 h-10 border border-gray-500 rounded"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <div className="text-red-500 mt-2">
                                {errors.category_id}
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                            disabled={processing}
                        >
                            {processing ? "Adding..." : "Add Food Type"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddFoodTypeModal;
