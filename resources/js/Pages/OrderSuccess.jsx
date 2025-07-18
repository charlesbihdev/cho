import { useEffect } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { Head } from "@inertiajs/react";
import useCartStore from "@/Store/cartStore";

const OrderSuccess = () => {
    // const [cartItems, setCartItems] = useState([]);

    // const cartItems = useCartStore((state) => state.cartItems);
    // const setCartItems = useCartStore((state) => state.setCartItems);
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        // Load cart items from local storage on component mount
        // const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        // setCartItems(storedCart);
        clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <Head title="Order Success" />
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
                        Your order has been placed. Check your SMS to get a link
                        to track your order
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <button
                onClick={() => (window.location.href = "/")}
                className="flex-1 py-3 px-4 rounded-full bg-[#FBB60E] text-[#493711] font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors mx-auto"
            >
                <ChevronLeft size={20} />
                Back to Home
            </button>
        </div>
    );
};

export default OrderSuccess;
