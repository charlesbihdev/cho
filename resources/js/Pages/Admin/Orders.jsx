import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { AiOutlineEye } from "react-icons/ai";

export default function Orders({ orders }) {
    console.log(orders);
    return (
        <AdminLayout>
            <Head title="Orders" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Username
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Phone
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Location
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Total Price
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Status
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr
                                            key={index}
                                            className="text-gray-700"
                                        >
                                            <td className="border-b border-r py-2 px-4">
                                                {order.email}
                                            </td>
                                            <td className="border-b border-r py-2 px-4">
                                                {order.phone}
                                            </td>
                                            <td className="border-b border-r py-2 px-4">
                                                {order.location.vendor?.name} -{" "}
                                                {order.location.destination}
                                            </td>
                                            <td className="border-b border-r py-2 px-4">
                                                ₵{order.total_price}
                                            </td>
                                            <td className="border-b border-r py-2 px-4">
                                                {/* Display status creatively */}
                                                <span
                                                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                                                        order.status ===
                                                        "pending"
                                                            ? "bg-yellow-200 text-yellow-800"
                                                            : order.status ===
                                                              "success"
                                                            ? "bg-green-200 text-green-800"
                                                            : "bg-red-200 text-red-800"
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="border-b border-r py-2 px-4">
                                                <button className="text-blue-500 hover:underline">
                                                    <AiOutlineEye className="inline-block mr-1" />
                                                    View
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
        </AdminLayout>
    );
}
