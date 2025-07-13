import { useState, useMemo } from "react";
import { Search } from "lucide-react";

const LocationSelector = ({
    deliveryDiscountData,
    selectedVendor,
    selectedLocation,
    setSelectedLocation,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const locationsPerPage = 4;

    // console.log(deliveryDiscountData);

    // Filter locations based on search query
    const filteredLocations = useMemo(() => {
        return selectedVendor.locations.filter((location) =>
            location.destination
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [selectedVendor.locations, searchQuery]);

    // Get current page locations
    const currentLocations = useMemo(() => {
        const startIndex = currentPage * locationsPerPage;
        return filteredLocations.slice(
            startIndex,
            startIndex + locationsPerPage
        );
    }, [filteredLocations, currentPage]);

    // Calculate total pages
    const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);

    return (
        <>
            <h3 className="font-bold uppercase text-[#493711] mb-2">
                Delivery Location
            </h3>

            {/* Search Bar */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(0); // Reset to first page on search
                    }}
                    className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4BF57] focus:border-transparent"
                />
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                />
            </div>

            {/* Locations Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                {currentLocations.map((location) => {
                    // Calculate discounted price if discount is active
                    const originalPrice = location.price;
                    const hasDiscount =
                        deliveryDiscountData?.active &&
                        deliveryDiscountData?.value;
                    const discountedPrice = hasDiscount
                        ? originalPrice -
                          (deliveryDiscountData.value / 100) * originalPrice
                        : originalPrice;

                    return (
                        <button
                            key={location.id}
                            className={`p-3 rounded-lg text-left transition-colors ${
                                selectedLocation?.destination ===
                                location?.destination
                                    ? "bg-[#E4BF57] text-[#493711]"
                                    : "bg-gray-50 hover:bg-gray-100"
                            }`}
                            onClick={() => setSelectedLocation(location)}
                        >
                            <div className="font-bold mb-1">
                                {location?.destination}
                            </div>

                            <div className="text-sm">
                                {hasDiscount ? (
                                    <div className="space-y-1">
                                        {/* Discounted price - prominent */}
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-green-600">
                                                +₵{discountedPrice.toFixed(2)}{" "}
                                                delivery
                                            </span>
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                                {deliveryDiscountData.value}%
                                                OFF
                                            </span>
                                        </div>
                                        {/* Original price - crossed out */}
                                        <div className="text-xs text-gray-500">
                                            <span className="line-through">
                                                Was ₵{originalPrice.toFixed(2)}
                                            </span>
                                            <span className="ml-1 text-green-600 font-medium">
                                                Save ₵
                                                {(
                                                    originalPrice -
                                                    discountedPrice
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <span>
                                        +₵{originalPrice.toFixed(2)} delivery
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(0, prev - 1))
                        }
                        disabled={currentPage === 0}
                        className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50 hover:bg-gray-200"
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(totalPages - 1, prev + 1)
                            )
                        }
                        disabled={currentPage === totalPages - 1}
                        className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50 hover:bg-gray-200"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default LocationSelector;
