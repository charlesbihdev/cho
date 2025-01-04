import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
const AddDishModal = ({ show, onClose, foods, vendors }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        food_id: "",
        variants: [{ name: "", price: "" }],
        vendor_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("dishes.store"), {
            onSuccess: () => {
                reset();
                onClose();
            },
            preserveScroll: true,
            preserveState: true,
            only: ["dishes", "errors", "flash"],
        });
    };

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...data.variants];
        updatedVariants[index][field] = value;
        setData("variants", updatedVariants);
    };

    const addAnotherVariant = () => {
        setData("variants", [...data.variants, { name: "", price: "" }]);
    };

    const removeVariant = (index) => {
        if (index > 0) {
            // Ensure we don't remove the first variant
            const updatedVariants = data.variants.filter((_, i) => i !== index);
            setData("variants", updatedVariants);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-lg font-bold">Add Dish</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Food Dropdown */}
                    <div className="mb-4">
                        <label htmlFor="food_id" className="block mb-1">
                            Food
                        </label>
                        <select
                            id="food_id"
                            value={data.food_id}
                            onChange={(e) => setData("food_id", e.target.value)}
                            className="w-full px-3 h-10 border border-gray-500 rounded"
                            required
                        >
                            <option value="">Select a food</option>
                            {foods.map((food) => (
                                <option key={food.id} value={food.id}>
                                    {food.name}
                                </option>
                            ))}
                        </select>
                        {errors.food_id && (
                            <div className="text-red-500 mt-2">
                                {errors.food_id}
                            </div>
                        )}
                    </div>

                    {/* Vendor Dropdown */}
                    <div className="mb-4">
                        <label htmlFor="vendor_id" className="block mb-1">
                            Vendor
                        </label>
                        <select
                            id="vendor_id"
                            value={data.vendor_id}
                            onChange={(e) =>
                                setData("vendor_id", e.target.value)
                            }
                            className="w-full px-3 h-10 border border-gray-500 rounded"
                            required
                        >
                            <option value="">Select a vendor</option>
                            {vendors.map((vendor) => (
                                <option key={vendor.id} value={vendor.id}>
                                    {vendor.name}
                                </option>
                            ))}
                        </select>
                        {errors.vendor_id && (
                            <div className="text-red-500 mt-2">
                                {errors.vendor_id}
                            </div>
                        )}
                    </div>

                    {/* Variant Details */}
                    <div className="mb-4">
                        <h3 className="text-md font-semibold">
                            Variant Details
                        </h3>
                        {data.variants.map((variant, index) => (
                            <div
                                key={index}
                                className="flex flex-wrap gap-4 mb-2"
                            >
                                <input
                                    type="text"
                                    value={variant.name}
                                    onChange={(e) =>
                                        handleVariantChange(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 px-3 h-10 border border-gray-500 rounded"
                                    placeholder="Variant Name"
                                    required
                                />

                                <div>
                                    ₵
                                    <input
                                        type="number"
                                        value={variant.price}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                index,
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        className="w-24 px-3 h-10 border border-gray-500 rounded"
                                        placeholder="Price"
                                        required
                                    />
                                </div>

                                {index > 0 && ( // Show remove button only for variants other than the first
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                                    >
                                        Remove
                                    </button>
                                )}
                                {index === data.variants.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={addAnotherVariant}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                                    >
                                        Add Another Variant
                                    </button>
                                )}
                            </div>
                        ))}
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
                            {processing ? "Adding..." : "Add Dish"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddDishModal;
