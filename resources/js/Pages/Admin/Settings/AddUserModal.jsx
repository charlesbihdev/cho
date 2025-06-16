import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function AddUserModal({ show, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "assistant",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("settings.user.store"), {
            onSuccess: () => {
                reset();
                onClose();
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Add New User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            autocomplete="off"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            autocomplete="off"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded"
                            required
                            autocomplete="off"
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Role</label>
                        <select
                            value={data.role}
                            onChange={(e) => setData("role", e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="main">Main</option>
                            <option value="assistant">Assistant</option>
                        </select>
                        {errors.role && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.role}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
                            disabled={processing}
                        >
                            {processing ? "Adding..." : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
