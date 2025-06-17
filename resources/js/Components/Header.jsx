import { Link } from "@inertiajs/react";
import { ShoppingCart, Search } from "lucide-react";
import { useEffect, useState } from "react";

import useCartStore from "@/Store/cartStore";

const Header = ({
    searchQuery = "",
    setSearchQuery,
    showSearchBar = false,
}) => {
    // const [cartItems, setCartItems] = useState([]);

    const cartItems = useCartStore((state) => state.cartItems);

    // useEffect(() => {
    //     // Load cart items from local storage on component mount
    //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    //     setCartItems(storedCart);
    // }, []);

    return (
        <>
            <div className="bg-[#493711] text-white p-4 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link href={route("landing")}>
                        <img
                            loading="lazy"
                            src="/cho-delivery.png"
                            alt="Cho-App Logo"
                            className={`md:w-[80px] md:h-[70px] w-[55px] h-[50px]`}
                        />
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

                {/* Search Bar */}
                <div
                    className={`relative ${!showSearchBar ? "hidden" : "mt-5"}`}
                >
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
        </>
    );
};

export default Header;
