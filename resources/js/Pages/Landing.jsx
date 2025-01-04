import { useState, useEffect, useMemo } from "react";
import {
    ShoppingCart,
    ChevronDown,
    Plus,
    Minus,
    MapPin,
    Search,
    X,
} from "lucide-react";

import { Head, Link } from "@inertiajs/react";
import ToastProvider from "@/Layouts/ToastProvider";
// Enhanced sample data

const FoodOrderingPage = ({ foodData, locations, categories }) => {
    // console.log(foodData);
    // console.log(categories);
    // console.log(selectedVendor);

    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [foodNote, setFoodNote] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showFoodDetail, setShowFoodDetail] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(storedCart.length);
    }, []);
    // console.log(selectedLocation);

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
        if (!selectedVariant || !selectedVendor || !selectedLocation) return 0;
        const basePrice = selectedVariant.price;
        // const deliveryPrice = selectedLocation.price;
        return basePrice;
    };

    const handleFoodClick = (food) => {
        setSelectedFood(food);
        setShowFoodDetail(true);
        setSelectedVariant(null);
        setSelectedVendor(null);
        setSelectedLocation(null);
        setFoodNote("");
    };

    const addToCart = () => {
        if (!selectedVariant || !selectedVendor || !selectedLocation) {
            alert("Please select all options");
            return;
        }

        const cartItem = {
            id: selectedVariant.id,
            name: selectedFood.name,
            image: selectedFood.thumbnail,
            variant: selectedVariant.name,
            vendor: selectedVendor.name,
            vendor_id: selectedVendor.id,
            location: selectedLocation,
            foodNote: foodNote,
            quantity: quantity,
            price: calculateTotalPrice(),
        };

        // Retrieve existing cart from local storage
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the item already exists in the cart
        const existingCartItemIndex = existingCart.findIndex(
            (item) =>
                item.id === cartItem.id && item.variant === cartItem.variant
        );

        if (existingCartItemIndex > -1) {
            // Update quantity if it already exists
            existingCart[existingCartItemIndex].quantity += quantity;
            existingCart[existingCartItemIndex].totalPrice +=
                cartItem.totalPrice;
        } else {
            // Add new item to the cart
            existingCart.push(cartItem);
        }

        // Store updated cart in local storage
        localStorage.setItem("cart", JSON.stringify(existingCart));

        // Update cart count
        setCartCount(existingCart.length);

        // Reset form
        setShowFoodDetail(false);
        setSelectedVariant(null);
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

    // console.log(selectedVendor);
    // console.log(filteredLocations);

    return (
        <ToastProvider>
            <Head title="Food Ordering" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-[#493711] text-white p-4 sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <Link href={route("landing")}>
                                <h1 className="text-2xl font-bold">Cho Eats</h1>
                            </Link>
                            <div className="flex items-center">
                                <Link
                                    as="button"
                                    href={route("cart")}
                                    className="relative p-2 hover:bg-[#E4BF57] hover:text-[#493711] rounded-full transition-colors"
                                >
                                    <ShoppingCart size={24} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-[#FBB60E] text-[#493711] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search for food..."
                                className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-[#493711] focus:outline-none focus:ring-2 focus:ring-[#E4BF57]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

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
                                                    (vendor, index) => (
                                                        <button
                                                            key={index}
                                                            className={`w-full p-3 rounded-lg text-left transition-colors
                            ${
                                selectedVendor === vendor
                                    ? "bg-[#E4BF57] text-[#493711]"
                                    : "bg-gray-50 hover:bg-gray-100"
                            }`}
                                                            onClick={() =>
                                                                setSelectedVendor(
                                                                    vendor
                                                                )
                                                            }
                                                        >
                                                            <div className="flex justify-between text-gray-600">
                                                                <span className="font-bold">
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
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {selectedVendor && (
                                        <div>
                                            <h3 className="font-bold text-[#493711] uppercase mb-2">
                                                Choose Variant
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                {selectedVendor.variants.map(
                                                    (variant, index) => (
                                                        <button
                                                            key={
                                                                variant.id ||
                                                                index
                                                            } // Preferably use variant.id if available
                                                            className={`p-3 rounded-lg text-left transition-colors
                    ${
                        selectedVariant === variant
                            ? "bg-[#E4BF57] text-[#493711]"
                            : "bg-gray-50 hover:bg-gray-100"
                    }`}
                                                            onClick={() =>
                                                                setSelectedVariant(
                                                                    variant
                                                                )
                                                            }
                                                        >
                                                            <div className="font-bold">
                                                                {variant.name}
                                                            </div>
                                                            <div className="text-sm">
                                                                ₵{variant.price}
                                                            </div>
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {selectedVariant && (
                                        <>
                                            {/* Location Selection */}
                                            <h3 className="font-bold uppercase text-[#493711] mb-2">
                                                Delivery Location
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                {selectedVendor.locations.map(
                                                    (location) => (
                                                        <button
                                                            key={location.id}
                                                            className={`p-3 rounded-lg text-left transition-colors ${
                                                                selectedLocation?.destination ===
                                                                location?.destination
                                                                    ? "bg-[#E4BF57] text-[#493711]"
                                                                    : "bg-gray-50 hover:bg-gray-100"
                                                            }`}
                                                            onClick={() =>
                                                                setSelectedLocation(
                                                                    location
                                                                )
                                                            }
                                                        >
                                                            <div className="font-bold">
                                                                {
                                                                    location?.destination
                                                                }
                                                            </div>
                                                            <div className="text-sm">
                                                                +₵
                                                                {
                                                                    location.price
                                                                }{" "}
                                                                delivery
                                                            </div>
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </>
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
        </ToastProvider>
    );
};

export default FoodOrderingPage;
