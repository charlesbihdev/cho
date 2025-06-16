import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import AddUserModal from "./settings/AddUserModal";

export default function Settings({ settings, users }) {
    const admin = usePage().props.auth.user;

    const { role } = admin;
    // console.log("Admin User:", role);
    // console.log("Admin User:", admin);

    const [deliveryDiscount, setDeliveryDiscount] = useState(
        settings.delivery_discount || 0
    );

    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const { patch, processing, setData } = useForm({
        delivery_discount: settings.delivery_discount,
    });

    const updateDeliveryDiscount = (e) => {
        e.preventDefault();
        patch(route("settings.update-discount"), {
            preserveScroll: true,
        });
    };

    const toggleDiscountActive = (e) => {
        e.preventDefault();
        router.post(route("settings.discount.active"), {
            preserveScroll: true,
        });
    };

    const toggleUser = (userId) => {
        router.post(route("settings.toggle-user", userId));
    };

    const deleteUser = (userId) => {
        router.post(route("settings.delete-user", userId));
    };

    return (
        <AdminLayout>
            <Head title="Settings" />

            <div className="py-12 space-y-8">
                {/* Delivery Discount */}
                <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Delivery Discount (%)
                    </h2>
                    <form
                        onSubmit={updateDeliveryDiscount}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={deliveryDiscount}
                                onChange={(e) => {
                                    setDeliveryDiscount(e.target.value);
                                    setData(
                                        "delivery_discount",
                                        e.target.value
                                    );
                                }}
                                className="border rounded p-2 w-32"
                            />

                            <label className="flex justify-center items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={Boolean(
                                        settings.delivery_discount_active
                                    )}
                                    onChange={(e) => toggleDiscountActive(e)}
                                    className="hidden"
                                />

                                {/* <input
                                    type="checkbox"
                                    onChange={(e) => handleToggle(e, vendor.id)}
                                    checked={vendor.active}
                                    className="hidden"
                                    aria-label="Order processed toggle"
                                /> */}

                                <label className="flex justify-center items-center cursor-pointer">
                                    <input
                                        onChange={(e) =>
                                            toggleDiscountActive(e)
                                        }
                                        checked={
                                            settings.delivery_discount_active
                                        }
                                        type="checkbox"
                                        className="hidden"
                                        aria-label="Order processed toggle"
                                    />
                                    <div className="relative">
                                        <div
                                            className={`block w-14 h-8 rounded-full transition duration-200 ease-in-out ${
                                                settings.delivery_discount_active ==
                                                "1"
                                                    ? "bg-green-500"
                                                    : "bg-gray-400"
                                            }`}
                                        ></div>
                                        <div
                                            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-md transition duration-200 ease-in-out ${
                                                settings.delivery_discount_active ==
                                                "1"
                                                    ? "translate-x-6 bg-green-400"
                                                    : ""
                                            }`}
                                        ></div>
                                    </div>
                                </label>
                                <span className="ml-3 text-sm text-gray-900">
                                    Active
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
                            >
                                {processing ? "Saving..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* User Management */}
                <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            User Management
                        </h2>

                        {role === "main" && (
                            <button
                                onClick={() => setIsAddUserModalOpen(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Add User
                            </button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left table-auto border-collapse">
                            <thead className="bg-gray-100 text-gray-700 uppercase">
                                <tr>
                                    <th className="py-3 px-4 border-b">#</th>
                                    <th className="py-3 px-4 border-b">Name</th>
                                    <th className="py-3 px-4 border-b">
                                        Email
                                    </th>
                                    <th className="py-3 px-4 border-b">Role</th>
                                    <th className="py-3 px-4 border-b">
                                        Active
                                    </th>
                                    <th className="py-3 px-4 border-b">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <td className="py-2 px-4 border-b">
                                            {index + 1}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {user.name}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {user.email}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {user.role === "main"
                                                ? "Main"
                                                : "Assistant"}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {role === "main" &&
                                            admin.id != user.id ? (
                                                <>
                                                    <label className="flex justify-center items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                user.active
                                                            }
                                                            onChange={() =>
                                                                toggleUser(
                                                                    user.id
                                                                )
                                                            }
                                                            className="hidden"
                                                            aria-label="User active toggle"
                                                        />
                                                        <div className="relative">
                                                            <div
                                                                className={`block w-14 h-8 rounded-full transition duration-200 ease-in-out ${
                                                                    user.active
                                                                        ? "bg-green-500"
                                                                        : "bg-gray-400"
                                                                }`}
                                                            ></div>
                                                            <div
                                                                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
                                                                    user.active
                                                                        ? "translate-x-6"
                                                                        : ""
                                                                }`}
                                                            ></div>
                                                        </div>
                                                    </label>
                                                </>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {role === "main" &&
                                            user.id != admin.id ? (
                                                <button
                                                    onClick={() =>
                                                        deleteUser(user.id)
                                                    }
                                                    className={`px-3 py-1 rounded text-white ${"bg-red-600 hover:bg-red-700"}l`}
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AddUserModal
                show={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
            />
        </AdminLayout>
    );
}
