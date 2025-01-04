import React from "react";
import Modal from "@/Components/Modal";
import { Package, Phone, MapPin, UtensilsCrossed } from "lucide-react";

const OrderItemsModal = ({ show, onClose, order }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
                {" "}
                {/* Limit height and add scrolling */}
                <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Order Details
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Order #{order?.id || "N/A"}
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
                                                Food Name:{" "}
                                                {item.variant?.food?.name}
                                            </h4>
                                            <p className="font-medium text-gray-800">
                                                Variant: {item.variant?.name}
                                            </p>
                                            <div>
                                                <p className=" font-medium text-gray-800">
                                                    Vendor:{" "}
                                                    {
                                                        order?.location.vendor
                                                            ?.name
                                                    }
                                                </p>
                                            </div>
                                            {item.note && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Note: {item.note}
                                                </p>
                                            )}
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
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-800">
                                    Total Amount
                                </p>
                                <p className="font-semibold text-gray-800">
                                    ₵{order?.total_price}
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
