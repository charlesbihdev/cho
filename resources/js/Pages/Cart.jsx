import { useEffect } from "react";
import { Plus, Minus, X } from "lucide-react";
import { Head, useForm } from "@inertiajs/react";
import ToastProvider from "@/Layouts/ToastProvider";
import InputError from "@/Components/InputError";
import DeliveryInfoBanner from "@/Components/DeliveryInfoBanner";
import Header from "@/Components/Header";
import { BsFillInfoCircleFill } from "react-icons/bs";
import useCartStore from "@/Store/cartStore";

const CartPage = () => {
    // const [cartItems, setCartItems] = useState([]);
    const cartItems = useCartStore((state) => state.cartItems);
    const setCartItems = useCartStore((state) => state.setCartItems);

    // const [name, setName] = useState("");
    // const [phone, setPhone] = useState("");
    // const [email, setEmail] = useState("");

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1

        const updatedCart = cartItems.map((item) => {
            if (item.id === itemId) {
                return {
                    ...item,
                    quantity: newQuantity,
                };
            }
            return item;
        });

        setCartItems(updatedCart);

        // localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const uniqueLocations = Array.from(
        new Set(cartItems.map((item) => item.location.id))
    ).map((id) => cartItems.find((item) => item.location.id === id));

    // const calculateTotalDeliveryFees = (items) => {
    //     let totalCost = 0;
    //     items.forEach((item) => {
    //         totalCost += item?.location?.price;
    //     });
    //     return totalCost;
    // };

    const calculateTotalDeliveryFees = (items) => {
        let totalCost = 0;
        items.forEach((item) => {
            // Use discounted delivery price if available, otherwise use original price
            const deliveryPrice = item?.location?.hasDeliveryDiscount
                ? item?.location?.deliveryPrice
                : item?.location?.price;
            totalCost += deliveryPrice;
        });
        return totalCost;
    };

    const calculateSubTotal = (items) => {
        let subTotal = 0;
        items.forEach((item) => {
            subTotal += item?.price * item.quantity;
        });
        return subTotal;
    };

    const subtotal = calculateSubTotal(cartItems);
    const totalDeliveryFee = calculateTotalDeliveryFees(uniqueLocations);
    const totalAmount = subtotal + totalDeliveryFee;

    const handleRemoveItem = (itemId) => {
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCart);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        order_data: [],
        name: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        const orderData = cartItems.map((item) => ({
            variant_id: item.id,
            vendor_id: item.vendor_id,
            quantity: item.quantity,
            location_id: item.location.id,
            food_note: item?.foodNote,
        }));
        setData("order_data", orderData);
    }, [cartItems]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update phone and email in the form data
        // setData("name", name);
        // setData("phone", phone);
        // setData("email", email);

        post(route("paystack.pay"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <ToastProvider>
            <Head title="Cart" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <Header />

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
                            {cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
                                >
                                    <div className="flex items-center">
                                        <img
                                            loading="lazy"
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
                                            ₵
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

                {/* User Info Section */}

                <form onSubmit={handleSubmit}>
                    <div
                        className={`max-w-6xl mx-auto p-4 ${
                            cartItems.length === 0 ? "hidden" : ""
                        }`}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            User Information
                        </h2>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 mb-1"
                                    htmlFor="name"
                                >
                                    Fullname
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter your fullname"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 mb-1"
                                    htmlFor="phone"
                                >
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter your phone number"
                                    required
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 mb-1"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter your email address"
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>
                        </div>
                    </div>
                    {/* Delivery Cost Summary Section */}
                    <div className="max-w-6xl mx-auto p-4">
                        <h2 className="text-xl font-bold mb-4">
                            Delivery Summary
                        </h2>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            {uniqueLocations.map((item) => {
                                const hasDiscount =
                                    item.location.deliveryDiscount;
                                const currentPrice =
                                    item.location.deliveryPrice ||
                                    item.location.price;
                                const originalPrice =
                                    item.location.originalDeliveryPrice ||
                                    item.location.price;

                                return (
                                    <div
                                        key={item.id}
                                        className="mb-3 last:mb-0"
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="font-medium">
                                                {`${item.vendor} - ${item.location.destination}`}
                                            </span>
                                            <div className="text-right">
                                                {hasDiscount ? (
                                                    <div className="space-y-1">
                                                        {/* Current discounted price */}
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-green-600">
                                                                ₵
                                                                {currentPrice.toFixed(
                                                                    2
                                                                )}
                                                            </span>
                                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                                                {
                                                                    hasDiscount.percentage
                                                                }
                                                                % OFF
                                                            </span>
                                                        </div>
                                                        {/* Original price crossed out */}
                                                        <div className="text-xs text-gray-500">
                                                            <span className="line-through">
                                                                ₵
                                                                {originalPrice.toFixed(
                                                                    2
                                                                )}
                                                            </span>
                                                            <span className="ml-1 text-green-600">
                                                                Save ₵
                                                                {hasDiscount.savings.toFixed(
                                                                    2
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="font-semibold">
                                                        ₵
                                                        {currentPrice.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <hr className="my-3 border-gray-200" />

                            {/* Total Delivery Fee */}
                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>Total Delivery Fee</span>
                                <div className="text-right">
                                    <div className="text-green-600">
                                        ₵{totalDeliveryFee.toFixed(2)}
                                    </div>
                                    {/* Show total savings if any items have discounts */}
                                    {uniqueLocations.some(
                                        (item) => item.location.deliveryDiscount
                                    ) && (
                                        <div className="text-sm text-green-600 font-normal">
                                            Total Saved: ₵
                                            {uniqueLocations
                                                .filter(
                                                    (item) =>
                                                        item.location
                                                            .deliveryDiscount
                                                )
                                                .reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        item.location
                                                            .deliveryDiscount
                                                            .savings,
                                                    0
                                                )
                                                .toFixed(2)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Order Summary Section */}
                    <div className="max-w-6xl mx-auto p-4">
                        <h2 className="text-xl font-bold mb-4">
                            Order Summary
                        </h2>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₵{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span>₵{totalDeliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>₵{totalAmount.toFixed(2)}</span>
                            </div>
                            {/* Processing fee notice */}
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-sm text-gray-600 text-center">
                                    <span className="inline-flex items-center">
                                        <BsFillInfoCircleFill className="mr-1" />
                                        Processing fees may be included at
                                        checkout
                                    </span>
                                </p>
                            </div>
                            <InputError
                                className="text-center"
                                message={errors.order_data}
                            />
                            <button
                                type="submit"
                                className="w-full mt-4 bg-[#ecb52a] text-[#493711] py-3 rounded-full font-bold hover:bg-[#FBB60E] transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <DeliveryInfoBanner />
        </ToastProvider>
    );
};

export default CartPage;
