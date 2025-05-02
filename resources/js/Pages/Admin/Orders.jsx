import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePoll } from "@inertiajs/react";
import { useState, useCallback, useEffect } from "react";

import OrderItemsModal from "./Orders/OrderItemsModal";

import { router } from "@inertiajs/react";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import Pagination from "@/Components/Pagination";

export default function Orders({ orderItems }) {
    const orders = orderItems.data;

    // console.log(orderItems);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [filters, setFilters] = useState({
        search: "",
        from: "",
        to: "",
    });

    usePoll(7000);

    const handleClick = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    const debouncedSearch = useCallback(
        debounce((value) => {
            if (value.trim() !== "") {
                setFilters((prev) => ({ ...prev, search: value }));
                searchOrders(value);
            } else {
                // If empty, reset the search
                setFilters((prev) => ({ ...prev, search: "" }));
                router.get(route("orders.index"));
            }
        }, 300),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setFilters((prev) => ({ ...prev, search: value }));
        debouncedSearch(value);
    };

    // Auto-trigger search when both dates are selected
    useEffect(() => {
        if (filters.from && filters.to) {
            searchOrders();
        }
    }, [filters.from, filters.to]);

    const searchOrders = (value) => {
        router.get(
            route("orders.index"),
            {
                search: value || filters.search,
                from: filters.from,
                to: filters.to,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({ search: "", from: "", to: "" });
        router.get(route("orders.index"));
    };

    return (
        <AdminLayout>
            <Head title="Orders" />

            <div className="py-12 text-base">
                <div className="mx-auto sm:px-2 w-full">
                    <div className="w-full overflow-hidden bg-white shadow-lg sm:rounded-lg">
                        {/* Search Section */}
                        <div className="flex flex-wrap gap-4 p-4 border-b">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={filters.search}
                                onChange={handleSearchChange}
                                className="border px-3 py-2 rounded-md"
                            />
                            <input
                                type="date"
                                name="from"
                                value={filters.from}
                                onChange={handleDateChange}
                                className="border px-3 py-2 rounded-md"
                            />
                            <input
                                type="date"
                                name="to"
                                value={filters.to}
                                onChange={handleDateChange}
                                className="border px-3 py-2 rounded-md"
                            />
                            <button
                                onClick={clearFilters}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Clear
                            </button>
                        </div>

                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            #
                                        </th>
                                        <th className="py-3 px-4 border-b border-gray-400">
                                            Timestamp
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
                                                {new Date(
                                                    order.updated_at
                                                ).toLocaleString("en-GB", {
                                                    dateStyle: "short",
                                                    timeStyle: "short",
                                                    hour12: true,
                                                })}
                                            </td>
                                            <td className="py-4 px-4 border-b border-gray-400">
                                                {order.name} <br />{" "}
                                                {order.email}
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

                <Pagination links={orderItems.links} />
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
