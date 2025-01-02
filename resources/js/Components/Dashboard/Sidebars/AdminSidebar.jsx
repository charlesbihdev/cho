import { useState, forwardRef } from "react";
import { FaUtensils } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { MdFastfood } from "react-icons/md";

import Modal from "@/Components/Modal";
import { Link } from "@inertiajs/react";

const AdminSidebar = forwardRef(({ className, showSidebar }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    // Function to handle button clicks and show the modal with content
    const handleButtonClick = (content) => {
        setModalContent(content);
        setIsOpen(true);
    };

    return (
        <aside
            className={`-mt-1 md:mt-[1.5px] z-40 transition-transform ${
                showSidebar ? "translate-x-0" : "-translate-x-full"
            }  border-r md:translate-x-0 bg-[#493711]  ${className}`}
        >
            <div className=" py-5 px-3 bg-[#493711] ">
                <ul className="space-y-2 mb-5">
                    <li>
                        <Link
                            prefetch
                            preserveScroll
                            href={route("orders")}
                            className={`flex items-center w-full p-2 text-base font-medium rounded-lg text-white hover:bg-[#695019]  ${
                                route().current("orders") ? "bg-[#695019]" : ""
                            }`}
                        >
                            <FaShoppingCart className="text-xl text-white" />
                            <span className="ml-3">Orders</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            prefetch
                            preserveScroll
                            href={route("dishes")}
                            className={`flex items-center w-full p-2 text-base font-medium rounded-lg text-white hover:bg-[#695019]  ${
                                route().current("dishes") ? "bg-[#695019]" : ""
                            }`}
                        >
                            <MdFastfood className="text-xl text-white" />
                            <span className="ml-3">Dish</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            prefetch
                            preserveScroll
                            href={route("foods")}
                            className={`flex items-center w-full p-2 text-base font-medium rounded-lg text-white hover:bg-[#695019]  ${
                                route().current("foods") ? "bg-[#695019]" : ""
                            }`}
                        >
                            <FaUtensils className="text-xl text-white" />
                            <span className="ml-3">Food Types</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            prefetch
                            preserveScroll
                            href={route("vendors")}
                            className={`flex items-center w-full p-2 text-base font-medium rounded-lg text-white hover:bg-[#695019]  ${
                                route().current("vendors") ? "bg-[#695019]" : ""
                            }`}
                        >
                            <MdPeopleAlt className="text-xl text-white" />
                            <span className="ml-3">Vendors</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            prefetch
                            preserveScroll
                            href={route("locations.index")}
                            className={`flex items-center w-full p-2 text-base font-medium rounded-lg text-white hover:bg-[#695019]  ${
                                route().current("locations")
                                    ? "bg-[#695019]"
                                    : ""
                            }`}
                        >
                            <IoLocationSharp className="text-xl text-white" />
                            <span className="ml-3">Location</span>
                        </Link>
                    </li>
                </ul>

                <hr />
            </div>

            {/* Modal */}
            <Modal show={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-4">
                    <h2 className="text-lg font-bold">Modal Content</h2>
                    <p>{modalContent}</p>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-4 text-red-500 hover:text-red-700"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </aside>
    );
});

export default AdminSidebar;
