import { useEffect, useState } from "react";
import { Check, Clock, MapPin, ChevronLeft, Receipt } from "lucide-react";

const OrderSuccess = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart items from local storage on component mount
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    // Sample order details - in real app, this would come from props or state
    const orderDetails = {
        orderId: "ORD-2024-1234",
        estimatedDelivery: "30-40",
        location: "Hall B",
        roomNumber: "Room 234",
        items: [
            {
                name: "Fried Rice",
                variant: "Beef",
                vendor: "Asian Kitchen",
                quantity: 2,
                price: 14.99,
            },
        ],
        deliveryFee: 2.0,
        total: 31.98,
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-lg mx-auto">
                {/* Success Animation */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-[#493711] mb-2">
                        Order Successful!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Your order #{orderDetails.orderId} has been placed
                    </p>

                    {/* Delivery Info */}
                    {/* <div className="flex items-center justify-center gap-2 text-[#493711]">
                        <Clock size={20} />
                        <span>
                            Estimated delivery in{" "}
                            {orderDetails.estimatedDelivery} mins
                        </span>
                    </div> */}
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h2 className="text-lg font-bold text-[#493711] mb-4">
                        Order Details
                    </h2>

                    {/* Delivery Location */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                        <MapPin className="text-[#FBB60E]" />
                        <div>
                            <p className="font-bold text-[#493711]">
                                Delivery Location
                            </p>
                            <p className="text-gray-600">
                                {orderDetails.location}
                            </p>
                            <p className="text-gray-600">
                                {orderDetails.roomNumber}
                            </p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t border-b py-4 mb-4">
                        {orderDetails.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between mb-2"
                            >
                                <div>
                                    <p className="font-bold text-[#493711]">
                                        {item.quantity}x {item.name} (
                                        {item.variant})
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        from {item.vendor}
                                    </p>
                                </div>
                                <p className="font-bold text-[#493711]">
                                    ₵{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>
                                ₵
                                {(
                                    orderDetails.total -
                                    orderDetails.deliveryFee
                                ).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Fee</span>
                            <span>₵{orderDetails.deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#493711] text-lg pt-2 border-t">
                            <span>Total</span>
                            <span>₵{orderDetails.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => (window.location.href = "/")}
                        className="flex-1 py-3 px-4 rounded-full bg-[#FBB60E] text-[#493711] font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        Back to Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
