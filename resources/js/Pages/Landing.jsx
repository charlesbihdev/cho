import React, { useState, useEffect, useMemo } from "react";
import {
    ShoppingCart,
    ChevronDown,
    Plus,
    Minus,
    MapPin,
    Search,
    X,
} from "lucide-react";

// Enhanced sample data
const foodData = {
    "Fried Rice": {
        id: 1,
        image: "https://status.pizza/101",
        description: "Flavorful fried rice with fresh vegetables",
        category: "Rice Dishes",
        variants: [
            { name: "Assorted", basePrice: 12.99 },
            { name: "Beef", basePrice: 14.99 },
            { name: "Sausage", basePrice: 13.99 },
            { name: "Chicken", basePrice: 13.99 },
        ],
        vendors: [
            {
                name: "Asian Kitchen",
                rating: 4.5,
                deliveryTime: "20-30",
                locationPrices: {
                    "Hall A": 2.0,
                    "Hall B": 1.5,
                    "Hall C": 3.0,
                    "Graduate Housing": 2.5,
                },
            },
            {
                name: "Quick Wok",
                rating: 4.3,
                deliveryTime: "15-25",
                locationPrices: {
                    "Hall A": 1.5,
                    "Hall B": 2.0,
                    "Hall C": 2.5,
                    "Graduate Housing": 3.0,
                },
            },
        ],
    },
    Noodles: {
        id: 2,
        image: "https://status.pizza/200",
        description: "Fresh noodles in savory sauce",
        category: "Noodles",
        variants: [
            { name: "Stir Fried", basePrice: 11.99 },
            { name: "Soup Based", basePrice: 12.99 },
            { name: "Spicy", basePrice: 12.99 },
        ],
        vendors: [
            /* Similar structure */
        ],
    },
    // ... more food items
};

const locations = ["Hall A", "Hall B", "Hall C", "Graduate Housing"];
const categories = ["All", "Rice Dishes", "Noodles", "Fast Food", "Beverages"];

const FoodOrderingPage = () => {
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [roomNumber, setRoomNumber] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showFoodDetail, setShowFoodDetail] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(
            storedCart.reduce((total, item) => total + item.quantity, 0)
        );
    }, []);

    // Filter foods based on search and category
    const filteredFoods = useMemo(() => {
        return Object.entries(foodData).filter(([name, data]) => {
            const matchesSearch = name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" ||
                data.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const calculateTotalPrice = () => {
        if (!selectedVariant || !selectedVendor || !selectedLocation) return 0;
        const basePrice = selectedVariant.basePrice;
        const deliveryPrice = selectedVendor.locationPrices[selectedLocation];
        return (basePrice + deliveryPrice) * quantity;
    };

    const handleFoodClick = (food, name) => {
        setSelectedFood({ ...food, name });
        setShowFoodDetail(true);
        setSelectedVariant(null);
        setSelectedVendor(null);
        setSelectedLocation(null);
        setRoomNumber("");
    };

    const addToCart = () => {
        if (
            !selectedVariant ||
            !selectedVendor ||
            !selectedLocation ||
            !roomNumber
        ) {
            alert("Please select all options and enter a room number.");
            return;
        }

        const cartItem = {
            id: selectedFood.id,
            name: selectedFood.name,
            variant: selectedVariant.name,
            vendor: selectedVendor.name,
            location: selectedLocation,
            roomNumber,
            quantity,
            totalPrice: calculateTotalPrice(),
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
        setCartCount(
            existingCart.reduce((total, item) => total + item.quantity, 0)
        );

        // Reset form
        setShowFoodDetail(false);
        setSelectedVariant(null);
        setSelectedVendor(null);
        setSelectedLocation(null);
        setRoomNumber("");
        setQuantity(1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-[#493711] text-white p-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Campus Eats</h1>
                        <div className="flex items-center">
                            <button className="relative p-2 hover:bg-[#E4BF57] hover:text-[#493711] rounded-full transition-colors">
                                <ShoppingCart size={24} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#FBB60E] text-[#493711] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
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
                    {categories.map((category) => (
                        <button
                            key={category}
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
                    {filteredFoods.map(([name, data]) => (
                        <div
                            key={data.id}
                            className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all hover:scale-105"
                            onClick={() => handleFoodClick(data, name)}
                        >
                            <img
                                src={data.image}
                                alt={name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-[#493711]">
                                    {name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {data.description}
                                </p>
                                <p className="text-sm text-[#FBB60E] mt-2">
                                    From $
                                    {Math.min(
                                        ...data.variants.map((v) => v.basePrice)
                                    )}
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
                                    src={selectedFood.image}
                                    alt={selectedFood.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />

                                {/* Variants Selection */}
                                <h3 className="font-bold text-[#493711] mb-2">
                                    Choose Variant
                                </h3>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {selectedFood.variants.map(
                                        (variant, index) => (
                                            <button
                                                key={index}
                                                className={`p-3 rounded-lg text-left transition-colors
                        ${
                            selectedVariant === variant
                                ? "bg-[#E4BF57] text-[#493711]"
                                : "bg-gray-50 hover:bg-gray-100"
                        }`}
                                                onClick={() =>
                                                    setSelectedVariant(variant)
                                                }
                                            >
                                                <div className="font-bold">
                                                    {variant.name}
                                                </div>
                                                <div className="text-sm">
                                                    ${variant.basePrice}
                                                </div>
                                            </button>
                                        )
                                    )}
                                </div>

                                {selectedVariant && (
                                    <>
                                        {/* Vendor Selection */}
                                        <h3 className="font-bold text-[#493711] mb-2">
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
                                                        <div className="flex justify-between">
                                                            <span className="font-bold">
                                                                {vendor.name}
                                                            </span>
                                                            <span>
                                                                ⭐{" "}
                                                                {vendor.rating}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm">
                                                            {
                                                                vendor.deliveryTime
                                                            }{" "}
                                                            mins
                                                        </div>
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </>
                                )}

                                {selectedVendor && (
                                    <>
                                        {/* Location Selection */}
                                        <h3 className="font-bold text-[#493711] mb-2">
                                            Delivery Location
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {locations.map((location) => (
                                                <button
                                                    key={location}
                                                    className={`p-3 rounded-lg text-left transition-colors
                            ${
                                selectedLocation === location
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
                                                        {location}
                                                    </div>
                                                    <div className="text-sm">
                                                        +$
                                                        {
                                                            selectedVendor
                                                                .locationPrices[
                                                                location
                                                            ]
                                                        }{" "}
                                                        delivery
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {selectedLocation && (
                                    <>
                                        {/* Room Number */}
                                        <div className="mb-4">
                                            <label className="block font-bold text-[#493711] mb-2">
                                                Room Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter your room number"
                                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E4BF57]"
                                                value={roomNumber}
                                                onChange={(e) =>
                                                    setRoomNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    className="p-2 rounded-full bg-[#FFB400] text-white hover:bg-[#FF9F00]"
                                                    onClick={() =>
                                                        setQuantity(
                                                            Math.max(
                                                                1,
                                                                quantity - 1
                                                            )
                                                        )
                                                    }
                                                >
                                                    <Minus size={20} />
                                                </button>
                                                <span className="text-xl font-bold">
                                                    {quantity}
                                                </span>
                                                <button
                                                    className="p-2 rounded-full bg-[#FFB400] text-white hover:bg-[#FF9F00]"
                                                    onClick={() =>
                                                        setQuantity(
                                                            quantity + 1
                                                        )
                                                    }
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            </div>
                                            <div className="font-bold text-xl">
                                                $
                                                {calculateTotalPrice().toFixed(
                                                    2
                                                )}
                                            </div>
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
    );
};

export default FoodOrderingPage;
