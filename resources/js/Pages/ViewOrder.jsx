import { Head } from "@inertiajs/react";
import {
    Package,
    Clock,
    MapPin,
    UtensilsCrossed,
    ChevronLeft,
    Phone,
    Mail,
    Store,
} from "lucide-react";

const ViewOrder = ({ order }) => {
    // console.log(order);
    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-50 text-green-700 border border-green-200";
            case "pending":
                return "bg-amber-50 text-amber-700 border border-amber-200";
            default:
                return "bg-gray-50 text-gray-700 border border-gray-200";
        }
    };

    const getStatusIcon = () => {
        return order.status === "completed" ? (
            <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center shadow-sm">
                <Package className="w-10 h-10 text-green-600" />
            </div>
        ) : (
            <div className="w-20 h-20 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center shadow-sm">
                <Clock className="w-10 h-10 text-amber-600" />
            </div>
        );
    };

    return (
        <>
            <Head title="Order Details" />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <a
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            <span className="font-medium">Back to Home</span>
                        </a>
                    </div>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Order #{order.order_id}
                                    </h1>

                                    <p className="mt-2 text-gray-300">
                                        Placed on{" "}
                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center">
                                    {getStatusIcon()}
                                    <span
                                        className={`mt-3 px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {order?.status
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            order?.status?.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Order Items Section */}
                            <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <UtensilsCrossed className="w-5 h-5 text-blue-600" />
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Order Items
                                        </h2>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {order?.order_items?.map((item, index) => (
                                        <div key={index} className="p-6">
                                            <div className="flex sm:flex-row justify-between sm:items-start gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {item.variant.food.name}
                                                    </h3>
                                                    <p className="text-[#a37c28] font-medium mt-1">
                                                        {item.variant.name}
                                                    </p>
                                                    {item.note && (
                                                        <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                                            Note: {item.note}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-gray-900">
                                                        ₵{item.variant.price}
                                                    </p>
                                                    <p className="text-gray-600 mt-1">
                                                        Quantity:{" "}
                                                        {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                                    <span className="text-lg font-semibold text-gray-600">
                                        + Delivery ₵{order.location.amount}
                                    </span>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-green-600">
                                            Total Amount Paid
                                        </span>
                                        <span className="text-2xl font-bold text-green-600">
                                            ₵
                                            {order.total_price +
                                                order.location.amount}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery and Contact Information Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Delivery Information */}
                                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Delivery Details
                                        </h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapPin className="w-4 h-4 text-gray-600" />
                                                <h3 className="font-medium text-gray-700">
                                                    Delivery Location
                                                </h3>
                                            </div>
                                            <p className="text-gray-900 ml-6">
                                                {order?.location?.destination}
                                            </p>
                                            {order?.location?.note && (
                                                <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg ml-6">
                                                    {order.location.note}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Store className="w-4 h-4 text-gray-600" />
                                                <h3 className="font-medium text-gray-700">
                                                    Vendor
                                                </h3>
                                            </div>
                                            <p className="text-gray-900 ml-6">
                                                {order.location?.vendor?.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Phone className="w-5 h-5 text-blue-600" />
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Contact Details
                                        </h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Phone className="w-4 h-4 text-gray-600" />
                                                <h3 className="font-medium text-gray-700">
                                                    Phone Number
                                                </h3>
                                            </div>
                                            <p className="text-gray-900 ml-6">
                                                {order.phone}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Mail className="w-4 h-4 text-gray-600" />
                                                <h3 className="font-medium text-gray-700">
                                                    Email Address
                                                </h3>
                                            </div>
                                            <p className="text-gray-900 ml-6">
                                                {order.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewOrder;
