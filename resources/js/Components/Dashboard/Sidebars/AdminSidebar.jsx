import { useState, forwardRef } from "react";
import { FaUtensils } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import Modal from "@/Components/Modal";

const AdminSidebar = forwardRef(
    (
        { className, showSidebar, events, slug = "#", is_private = false },
        ref
    ) => {
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
                }  border-r border-gray-200 md:translate-x-0 dark:bg-[#493711]  ${className}`}
            >
                <div className=" py-5 px-3 bg-white dark:bg-[#493711]">
                    <ul className="space-y-2 mb-5">
                        <li>
                            <button
                                onClick={() =>
                                    handleButtonClick("Orders Content")
                                }
                                className="flex items-center w-full p-2 text-base font-medium rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-[#7e6f4da0] group"
                            >
                                <FaShoppingCart className="text-xl text-white" />
                                <span className="ml-3">Orders</span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() =>
                                    handleButtonClick("Food Content")
                                }
                                className="flex items-center w-full p-2 text-base font-medium rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-[#7e6f4da0] group"
                            >
                                <FaUtensils className="text-xl text-white" />
                                <span className="ml-3">Food</span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() =>
                                    handleButtonClick("Vendors Content")
                                }
                                className="flex items-center w-full p-2 text-base font-medium rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-[#7e6f4da0] group"
                            >
                                <MdPeopleAlt className="text-xl text-white" />
                                <span className="ml-3">Vendors</span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() =>
                                    handleButtonClick("Location Content")
                                }
                                className="flex items-center w-full p-2 text-base font-medium rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-[#7e6f4da0] group"
                            >
                                <IoLocationSharp className="text-xl text-white" />
                                <span className="ml-3">Location</span>
                            </button>
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
    }
);

export default AdminSidebar;
