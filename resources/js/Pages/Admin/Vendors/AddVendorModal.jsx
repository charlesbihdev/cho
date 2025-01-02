import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
const AddVendorModal = ({ show, onClose }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("vendors.store"), {
            onSuccess: () => {
                reset();
                onClose();
            },
            preserveScroll: true,
            preserveState: true,
            only: ["vendors", "errors", "flash"],
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-lg font-bold">Add Vendor</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Vendor Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1">
                            Vendor Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-3 h-10 border border-gray-500 rounded"
                            placeholder="Enter vendor's name"
                            required
                        />
                        {errors.name && (
                            <div className="text-red-500 mt-2">
                                {errors.name}
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
                            {processing ? "Adding..." : "Add Vendor"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddVendorModal;
