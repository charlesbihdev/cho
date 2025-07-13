import {
    FaCheckCircle,
    FaHome,
    FaEnvelope,
    FaSms,
    FaMicrosoft,
} from "react-icons/fa";
import { Link, Head } from "@inertiajs/react";
import ToastProvider from "@/Layouts/ToastProvider";
import Header from "@/Components/Header";
import DeliveryInfoBanner from "@/Components/DeliveryInfoBanner";
import useCartStore from "@/Store/cartStore";
import { useEffect } from "react";

const PaymentVerification = ({ amount }) => {
    // console.log(is_event);

    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        // Load cart items from local storage on component mount
        // const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        // setCartItems(storedCart);
        clearCart();
    }, []);
    return (
        <>
            <Head title="Verify Payment" />

            <ToastProvider>
                <Header />
                <div className="bg-gray-50 flex flex-col gap-8 items-center justify-center p-4">
                    <Head title="Payment Verification" />
                    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-12 text-center my-14">
                        {/* Loading Icon */}
                        <FaCheckCircle className="w-20 h-20 text-green-700 mx-auto mb-4" />

                        {/* Message */}
                        <h1 className="text-2xl font-medium text-gray-900 mb-2">
                            Payment Submitted Successfully!
                        </h1>

                        <p className="text-base text-gray-600 mb-6">
                            We're verifying your payment and will confirm once
                            it's processed.
                        </p>

                        {/* Amount */}
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <p className="text-blue-800 font-medium">
                                Amount: GH₵{" "}
                                <span className="font-bold">{amount}</span>
                            </p>
                        </div>

                        {/* Notification Methods */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-center mb-3">
                                <FaEnvelope className="w-5 h-5 text-green-600 mr-2" />
                                <FaSms className="w-5 h-5 text-green-600 mr-2" />
                                <p className="text-green-700 font-medium">
                                    Confirmation Notification
                                </p>
                            </div>
                            <p className="text-green-600 text-sm">
                                You'll receive confirmation via email or SMS
                                once your payment is verified.
                            </p>
                        </div>

                        {/* Home Button */}

                        <div>
                            <Link
                                href={route("landing")}
                                className="inline-flex items-center gap-2 bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-blue-900 transition-colors"
                            >
                                <FaHome className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </ToastProvider>
            <DeliveryInfoBanner />
        </>
    );
};

export default PaymentVerification;
