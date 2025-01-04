import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

import OrderItemsModal from "./Orders/OrderItemsModal";

export default function Orders({ orders }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleClick = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    console.log(orders);

    return (
        <AdminLayout>
            <Head title="Orders" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            #
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Username
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Phone
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Location
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Total Price
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Status
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {orders.map((order, index) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50 transition-all duration-200"
                                        >
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                {index + 1}
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                {order.email}
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                {order.phone}
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                {order.location.vendor?.name} -{" "}
                                                {order.location.destination}
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                ₵{order.total_price}
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                <span
                                                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                                                        order.status ===
                                                        "pending"
                                                            ? "bg-yellow-200 text-yellow-800"
                                                            : order.status ===
                                                              "completed"
                                                            ? "bg-green-200 text-green-800"
                                                            : "bg-red-200 text-red-800"
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                <button
                                                    className="text-blue-500 hover:underline transition-all duration-200"
                                                    onClick={() =>
                                                        handleClick(order)
                                                    }
                                                >
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

            {selectedOrder && (
                <OrderItemsModal
                    show={isOpen}
                    onClose={() => setIsOpen(false)}
                    order={selectedOrder}
                />
            )}
        </AdminLayout>
    );
}
