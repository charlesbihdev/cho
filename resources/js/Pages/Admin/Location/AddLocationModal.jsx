import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

const AddLocationModal = ({ show, onClose, vendors = [] }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        vendor_id: "",
        destination: "",
        price: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("locations.store"), {
            onSuccess: () => {
                reset();
                onClose();
            },
            preserveScroll: true,
            preserveState: true,
            only: ["locations", "errors", "flash"],
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-lg font-bold">Add Location</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Vendor Select Input */}
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

                    {/* Destination Input */}
                    <div className="mb-4">
                        <label htmlFor="destination" className="block mb-1">
                            Destination
                        </label>
                        <input
                            id="destination"
                            type="text"
                            value={data.destination}
                            onChange={(e) =>
                                setData("destination", e.target.value)
                            }
                            className="w-full px-3 h-10 border border-gray-500 rounded"
                            placeholder="Enter destination"
                            required
                        />
                        {errors.destination && (
                            <div className="text-red-500 mt-2">
                                {errors.destination}
                            </div>
                        )}
                    </div>

                    {/* Price Input */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block mb-1">
                            Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="w-full px-3 h-10 border border-gray-500 rounded"
                            placeholder="Enter price"
                            required
                        />
                        {errors.price && (
                            <div className="text-red-500 mt-2">
                                {errors.price}
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
                            {processing ? "Adding..." : "Add Location"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddLocationModal;
