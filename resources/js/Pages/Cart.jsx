import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import ToastProvider from "@/Layouts/ToastProvider";
import InputError from "@/Components/InputError";
const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart items from local storage on component mount
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

        setCartItems(storedCart);
    }, []);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1

        const updatedCart = cartItems.map((item) => {
            if (item.id === itemId) {
                return {
                    ...item,
                    quantity: newQuantity,
                    // price: item.price * newQuantity,
                };
            }
            return item;
        });

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Create a unique list of locations for rendering
    const uniqueLocations = Array.from(
        new Set(cartItems.map((item) => item.location.id))
    ).map((id) => cartItems.find((item) => item.location.id === id));

    // Function to calculate total delivery fees
    const calculateTotalDeliveryFees = (items) => {
        let totalCost = 0;

        items.forEach((item) => {
            totalCost += item?.location?.price; // Assuming price is the same for the same location
        });

        return totalCost;
    };

    const calculateSubTotal = (items) => {
        let subTotal = 0;

        items.forEach((item) => {
            subTotal += item?.price * item.quantity; // Assuming price is the same for the same location
        });

        return subTotal;
    };

    const subtotal = calculateSubTotal(cartItems);

    const totalDeliveryFee = calculateTotalDeliveryFees(uniqueLocations);

    const totalAmount = subtotal + totalDeliveryFee;

    const handleRemoveItem = (itemId) => {
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        orderData: [],
        phone: "0554676725",
        email: "karl@gmail.com",
    });

    useEffect(() => {
        const orderData = cartItems.map((item) => ({
            variant_id: item.id,
            vendor_id: item.vendor_id,
            quantity: item.quantity,
            location_id: item.location.id,
            food_note: item?.foodNote,
        }));

        // Update the order_data in the form whenever cartItems change
        setData("order_data", orderData);
    }, [cartItems]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("paystack.pay"), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <ToastProvider>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-[#493711] text-white p-4 sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <Link href={route("landing")}>
                            <h1 className="text-2xl font-bold">Cho Eats</h1>
                        </Link>

                        <Link
                            as="button"
                            href={route("cart")}
                            className="relative p-2 hover:bg-[#E4BF57] hover:text-[#493711] rounded-full transition-colors"
                        >
                            <ShoppingCart size={24} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#FBB60E] text-[#493711] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Cart Items Section */}
                <div className="max-w-6xl mx-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-xl font-bold">
                                Your cart is empty
                            </h2>
                        </div>
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg mr-4"
                                        />
                                        <div>
                                            <h3 className="font-bold">
                                                {item.name}
                                            </h3>
                                            <p>{item.variant}</p>
                                            <p>{item.vendor}</p>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="p-1 bg-gray-200 rounded-full cursor-pointer"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="mx-2">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="p-1 bg-gray-200 rounded-full cursor-pointer"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-bold">
                                            $
                                            {(
                                                item?.quantity * item?.price
                                            ).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleRemoveItem(item.id)
                                            }
                                            className="ml-4 text-red-500 cursor-pointer"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Delivery Cost Summary Section */}
                <div className="max-w-6xl mx-auto p-4">
                    <h2 className="text-xl font-bold mb-4">Delivery Summary</h2>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        {uniqueLocations.map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <span>{`${item.vendor} - ${item.location.destination}`}</span>
                                <span>${item.location.price.toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold">
                            <span>Total Delivery Fee</span>
                            <span>${totalDeliveryFee.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="max-w-6xl mx-auto p-4">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span>${totalDeliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <InputError
                            className="text-center"
                            message={errors.order_data}
                        />
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full mt-4 bg-[#FBB60E] text-[#493711] py-3 rounded-full font-bold hover:bg-[#E4BF57] transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </ToastProvider>
    );
};

export default CartPage;
