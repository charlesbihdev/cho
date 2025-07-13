import { useState, useMemo } from "react";
import { X } from "lucide-react";

import { Head, usePoll } from "@inertiajs/react";
import ToastProvider from "@/Layouts/ToastProvider";
import LocationSelector from "@/Components/Landing/LocationSelector";
import DeliveryInfoBanner from "@/Components/DeliveryInfoBanner";
import Header from "@/Components/Header";
import useCartStore from "@/Store/cartStore";
// Enhanced sample data

const FoodOrderingPage = ({ foodData, categories, deliveryDiscountData }) => {
    // console.log(foodData);
    // console.log(categories);
    // console.log(selectedVendor);

    // console.log(deliveryDiscountData);

    usePoll(8000);

    const [selectedFood, setSelectedFood] = useState(null);
    // const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [foodNote, setFoodNote] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showFoodDetail, setShowFoodDetail] = useState(false);

    // const cartItems = useCartStore((state) => state.cartItems);
    const setCartItems = useCartStore((state) => state.setCartItems);

    const filteredFoods = useMemo(() => {
        return foodData.filter((food) => {
            const matchesSearch = food.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" ||
                (food.category && food.category.name === selectedCategory);
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, foodData]);

    const calculateTotalPrice = () => {
        if (!selectedVariants.length || !selectedVendor || !selectedLocation)
            return 0;

        const total = selectedVariants.reduce((sum, variant) => {
            return sum + variant.price * quantity;
        }, 0);

        return total;
    };

    const handleFoodClick = (food) => {
        setSelectedFood(food);
        setShowFoodDetail(true);
        setSelectedVariants([]);
        setSelectedVendor(null);
        setSelectedLocation(null);
        setFoodNote("");
    };

    const addToCart = () => {
        if (!selectedVariants.length || !selectedVendor || !selectedLocation) {
            alert("Please select all options");
            return;
        }

        // Calculate delivery pricing with discount
        const originalDeliveryPrice = selectedLocation.price;
        const hasDeliveryDiscount =
            deliveryDiscountData?.active &&
            deliveryDiscountData?.value &&
            deliveryDiscountData?.value > 0;
        const discountedDeliveryPrice = hasDeliveryDiscount
            ? originalDeliveryPrice -
              (deliveryDiscountData.value / 100) * originalDeliveryPrice
            : originalDeliveryPrice;

        // Retrieve existing cart from local storage
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        selectedVariants.forEach((variant) => {
            const cartItem = {
                id: variant.id,
                name: selectedFood.name,
                image: selectedFood.thumbnail,
                variant: variant.name,
                vendor: selectedVendor.name,
                vendor_id: selectedVendor.id,
                location: {
                    ...selectedLocation,
                    hasDeliveryDiscount: hasDeliveryDiscount,
                    originalDeliveryPrice: originalDeliveryPrice,
                    deliveryPrice: discountedDeliveryPrice,
                    deliveryDiscount: hasDeliveryDiscount
                        ? {
                              percentage: deliveryDiscountData.value,
                              savings:
                                  originalDeliveryPrice -
                                  discountedDeliveryPrice,
                          }
                        : null,
                },
                foodNote: foodNote,
                quantity: quantity,
                price: variant.price,
            };

            const existingCartItemIndex = existingCart.findIndex(
                (item) =>
                    item.id === cartItem.id &&
                    item.variant === cartItem.variant &&
                    item.vendor_id === cartItem.vendor_id &&
                    item.location.destination === cartItem.location.destination
            );

            if (existingCartItemIndex > -1) {
                // Update quantity if it already exists
                existingCart[existingCartItemIndex].quantity += quantity;
                // Recalculate total price based on new quantity
                existingCart[existingCartItemIndex].price =
                    variant.price *
                    existingCart[existingCartItemIndex].quantity;
            } else {
                // Add new item to the cart
                existingCart.push(cartItem);
            }
            // console.log("exisiting 22" + existingCart);

            setCartItems(existingCart);
        });
        // Reset form
        setShowFoodDetail(false);
        setSelectedVariants([]);
        setSelectedVendor(null);
        setSelectedLocation(null);
        setFoodNote("");
        setQuantity(1);
    };

    // console.log(locations);

    // Get locations for the selected vendor
    // const filteredLocations = useMemo(() => {
    //     if (!selectedVendor) return [];
    //     return locations.filter(
    //         (location) => location.vendor_id === selectedVendor.id
    //     );
    // }, [selectedVendor, locations]);

    // console.log(selectedVendor)6
    // console.log(filteredLocations);

    return (
        <ToastProvider>
            <Head title="Food Ordering" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <Header
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    showSearchBar
                />

                {/* Main Content */}
                <div className="max-w-6xl mx-auto p-4">
                    {/* Category Filter */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                        {categories.map((category, id) => (
                            <button
                                key={id}
                                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
                ${
                    selectedCategory === category
                        ? "bg-[#FBB60E] text-[#493711] font-bold"
                        : "bg-white text-[#493711] hover:bg-[#E4BF57]"
                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Food Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredFoods.map((data) => (
                            <div
                                key={data.id}
                                className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all hover:scale-105"
                                onClick={() => handleFoodClick(data)}
                            >
                                <img
                                    loading="lazy"
                                    src={data.thumbnail}
                                    alt={data.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold text-[#493711]">
                                        {data.name}
                                    </h3>

                                    <p className="text-sm text-[#FBB60E] mt-2">
                                        From ₵
                                        {data.vendors.length > 0
                                            ? Math.min(
                                                  ...data.vendors.flatMap(
                                                      (vendor) =>
                                                          vendor.variants.map(
                                                              (variant) =>
                                                                  variant.price
                                                          )
                                                  )
                                              )
                                            : null}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Food Detail Modal */}
                    {showFoodDetail && selectedFood && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-[#493711]">
                                        {selectedFood.name}
                                    </h2>
                                    <button
                                        onClick={() => setShowFoodDetail(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="p-4">
                                    <img
                                        loading="lazy"
                                        src={selectedFood.thumbnail}
                                        alt={selectedFood.name}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />

                                    {selectedFood && (
                                        <>
                                            {/* Vendor Selection */}
                                            <h3 className="font-bold text-[#493711] uppercase mb-2">
                                                Choose Vendor
                                            </h3>
                                            <div className="space-y-2 mb-4">
                                                {selectedFood.vendors.map(
                                                    (vendor, index) => {
                                                        let buttonClasses =
                                                            "w-full p-3 rounded-lg text-left transition-colors ";

                                                        if (!vendor.isActive) {
                                                            buttonClasses +=
                                                                "bg-gray-200 text-gray-500 cursor-not-allowed";
                                                        } else if (
                                                            selectedVendor ==
                                                            vendor
                                                        ) {
                                                            buttonClasses +=
                                                                "bg-[#E4BF57] text-[#493711]";
                                                        } else {
                                                            buttonClasses +=
                                                                "bg-gray-50 hover:bg-gray-100";
                                                        }

                                                        return (
                                                            <button
                                                                key={index}
                                                                disabled={
                                                                    !vendor.isActive
                                                                }
                                                                className={
                                                                    buttonClasses
                                                                }
                                                                onClick={() => {
                                                                    if (
                                                                        vendor.isActive
                                                                    )
                                                                        setSelectedVendor(
                                                                            vendor
                                                                        );
                                                                }}
                                                            >
                                                                <div className="flex justify-between">
                                                                    <span
                                                                        className={`font-bold ${
                                                                            !vendor.isActive
                                                                                ? "text-gray-400"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        {
                                                                            vendor.name
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        ⭐{" "}
                                                                        {vendor.rating ||
                                                                            5}
                                                                    </span>
                                                                </div>
                                                                {!vendor.isActive && (
                                                                    <div className="text-xs text-red-500 mt-1">
                                                                        Unavailable
                                                                    </div>
                                                                )}
                                                            </button>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {/* Variant Selection */}
                                    {selectedVendor && (
                                        <div>
                                            <h3 className="font-bold text-[#493711] uppercase mb-2">
                                                Choose Variants
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                {selectedVendor.variants.map(
                                                    (variant, index) => {
                                                        const isSelected =
                                                            selectedVariants.some(
                                                                (v) =>
                                                                    v.id ===
                                                                    variant.id
                                                            );

                                                        return (
                                                            <button
                                                                key={
                                                                    variant.id ||
                                                                    index
                                                                }
                                                                className={`p-3 rounded-lg text-left transition-colors w-full
                            ${
                                !variant.isActive
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-[#E4BF57] text-[#493711]"
                                    : "bg-gray-50 hover:bg-gray-100"
                            }`}
                                                                onClick={() => {
                                                                    if (
                                                                        !variant.isActive
                                                                    )
                                                                        return;

                                                                    setSelectedVariants(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            const exists =
                                                                                prev.find(
                                                                                    (
                                                                                        v
                                                                                    ) =>
                                                                                        v.id ===
                                                                                        variant.id
                                                                                );
                                                                            if (
                                                                                exists
                                                                            ) {
                                                                                return prev.filter(
                                                                                    (
                                                                                        v
                                                                                    ) =>
                                                                                        v.id !==
                                                                                        variant.id
                                                                                ); // unselect
                                                                            } else {
                                                                                return [
                                                                                    ...prev,
                                                                                    variant,
                                                                                ]; // select
                                                                            }
                                                                        }
                                                                    );
                                                                }}
                                                                disabled={
                                                                    !variant.isActive
                                                                }
                                                            >
                                                                <div className="font-bold">
                                                                    {
                                                                        variant.name
                                                                    }
                                                                </div>
                                                                <div className="text-sm">
                                                                    ₵
                                                                    {
                                                                        variant.price
                                                                    }
                                                                </div>
                                                                {!variant.isActive && (
                                                                    <div className="text-xs text-red-500 mt-1">
                                                                        Unavailable
                                                                    </div>
                                                                )}
                                                            </button>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {selectedVariants.length > 0 && (
                                        <LocationSelector
                                            deliveryDiscountData={
                                                deliveryDiscountData
                                            }
                                            selectedVendor={selectedVendor}
                                            selectedLocation={selectedLocation}
                                            setSelectedLocation={
                                                setSelectedLocation
                                            }
                                        />
                                    )}

                                    {selectedLocation && (
                                        <>
                                            {/* Room Number */}
                                            <div className="mb-4">
                                                <label className="block font-bold text-[#493711] mb-2">
                                                    Add Food Note
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter note. eg. no pepper"
                                                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E4BF57]"
                                                    value={foodNote}
                                                    onChange={(e) =>
                                                        setFoodNote(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            {/* Quantity */}
                                            <div className=" mb-4">
                                                <div className="font-bold text-xl">
                                                    ₵
                                                    {calculateTotalPrice().toFixed(
                                                        2
                                                    )}
                                                </div>

                                                <p className="text-sm text-gray-600">
                                                    without delivery fee
                                                </p>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <button
                                                className="w-full bg-[#FBB60E] text-[#493711] py-3 rounded-full font-bold hover:bg-[#E4BF57] transition-colors"
                                                onClick={addToCart}
                                            >
                                                Add to Cart
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <DeliveryInfoBanner />
        </ToastProvider>
    );
};

export default FoodOrderingPage;
