import Modal from "@/Components/Modal";
import { Phone, MapPin, UtensilsCrossed } from "lucide-react";
import { router } from "@inertiajs/react";
import CopyToClipboardBttn from "@/Components/CopyToClipboardBttn";

const OrderItemsModal = ({ show, onClose, order }) => {
    const handleToggle = (e) => {
        e.preventDefault();
        router.put(route("orders.update", order.id));
        onClose();
    };

    // console.log(order);
    return (
        <Modal show={show} onClose={onClose}>
            <div className="py-6 px-3 max-h-[80vh] overflow-y-auto">
                {" "}
                {/* Limit height and add scrolling */}
                <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Order Details - {order?.name}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        Date:
                        {" " +
                            new Date(order.created_at).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                        Order #
                        <span className="font-bold text-blue-700">
                            {" "}
                            {order?.order_id || "N/A"}
                        </span>
                    </p>
                </div>
                <div className="space-y-6">
                    {/* Order Items Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <UtensilsCrossed className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-800">
                                Food Items
                            </h3>
                        </div>
                        <div className="divide-y">
                            {order?.order_items.map((item, index) => (
                                <div key={index} className="py-3">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800">
                                                <span className="text-[#ac8125]">
                                                    Food Name:
                                                </span>
                                                {" " + item.variant?.food?.name}
                                            </h4>
                                            <p className="font-medium text-gray-800">
                                                <span className="text-[#ac8125]">
                                                    Variant:
                                                </span>

                                                {" " + item.variant?.name}
                                            </p>
                                            <div>
                                                <p className=" font-medium text-gray-800">
                                                    <span className="text-[#ac8125]">
                                                        Vendor:
                                                    </span>
                                                    {" " +
                                                        order?.location.vendor
                                                            ?.name}
                                                </p>
                                            </div>
                                            <div>
                                                <p className=" font-medium text-gray-800">
                                                    <span className="text-[#ac8125]">
                                                        Destination:
                                                    </span>
                                                    {" " +
                                                        order?.location
                                                            .destination}
                                                </p>
                                            </div>
                                            {item.note && (
                                                <div>
                                                    <p className="font-medium text-gray-800 mt-1 italic">
                                                        <span className="text-[#ac8125] not-italic">
                                                            Note:
                                                        </span>
                                                        {" " + item.note}
                                                    </p>
                                                </div>
                                            )}

                                            <CopyToClipboardBttn
                                                data={{
                                                    foodName:
                                                        item.variant?.food
                                                            ?.name,
                                                    variant: item.variant?.name,
                                                    vendor: order?.location
                                                        .vendor?.name,
                                                    note: item.note,
                                                    price: item.variant?.price,
                                                    quantity: item.quantity,
                                                    phone: order?.phone,
                                                    name: order?.name,
                                                    orderId: order?.order_id,
                                                    location:
                                                        order?.location
                                                            .destination,
                                                }}
                                            />
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-medium text-gray-800">
                                                Variant Price:{" "}
                                                {item.variant?.price}
                                            </p>
                                            <p className="font-medium text-gray-800">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 pt-3 border-t">
                            <p className="font-semibold text-gray-800">
                                + Delivery ₵{order.location.amount}
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-800">
                                    Total Amount
                                </p>
                                <p className="font-semibold text-gray-800">
                                    ₵
                                    {order?.total_price + order.location.amount}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <Phone className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-800">
                                Contact Details
                            </h3>
                        </div>
                        <p className="text-gray-800">{order?.name}</p>
                        <p className="text-gray-800">{order?.phone}</p>
                        <p className="text-gray-800">{order?.email}</p>
                    </div>

                    {/* Delivery Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-800">
                                Delivery Information
                            </h3>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-gray-600">Destination</p>
                                <p className="text-gray-800">
                                    {order?.location.destination}
                                </p>
                            </div>
                            {order?.location.note && (
                                <div>
                                    <p className="text-gray-600">
                                        Additional Notes
                                    </p>
                                    <p className="text-gray-800">
                                        {order?.location.note}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t">
                    <label className="flex justify-center items-center cursor-pointer">
                        <input
                            onChange={handleToggle}
                            checked={order.status === "completed"}
                            type="checkbox"
                            className="hidden"
                            aria-label="Order processed toggle"
                        />
                        <div className="relative">
                            <div
                                className={`block w-14 h-8 rounded-full transition duration-200 ease-in-out ${
                                    order.status === "completed"
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                }`}
                            ></div>
                            <div
                                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-md transition duration-200 ease-in-out ${
                                    order.status === "completed"
                                        ? "translate-x-6 bg-green-400"
                                        : ""
                                }`}
                            ></div>
                        </div>
                        <span className="ml-3 text-gray-700 font-semibold">
                            {order.status === "completed"
                                ? "Processed"
                                : "Pending"}
                        </span>
                    </label>
                </div>
                <div className="mt-6 pt-4 border-t">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default OrderItemsModal;
