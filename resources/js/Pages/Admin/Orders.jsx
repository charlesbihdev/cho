import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState, useCallback, useEffect } from "react";

import OrderItemsModal from "./Orders/OrderItemsModal";

import { router } from "@inertiajs/react";
import { debounce } from "lodash";
import { Search } from "lucide-react";

export default function Orders({ orders }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleClick = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };
    const debouncedSearch = useCallback(
        debounce((value) => {
            router.get(
                route("orders.index"),
                { search: value },
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }, 300),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    // console.log(orders);

    return (
        <AdminLayout>
            <Head title="Orders" />

            <div className="py-12">
                <div className="mx-auto sm:px-2 w-full">
                    <div className="w-full overflow-hidden bg-white shadow-lg sm:rounded-lg">
                        {/* Search Section */}
                        {/* Search Box */}
                        <div className="p-4 border-b">
                            <div className="relative max-w-md mx-auto">
                                <input
                                    type="text"
                                    placeholder="Search orders by order_id, status, email, phone..."
                                    className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            #
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Username | Email
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Phone
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Order ID
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
                                                {order.name +
                                                    " | " +
                                                    order.email}
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                {order.phone}
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                {order.order_id}
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
