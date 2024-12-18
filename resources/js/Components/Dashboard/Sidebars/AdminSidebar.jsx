import { useState, forwardRef } from "react";

import { Link } from "@inertiajs/react";

import { AiOutlineDashboard } from "react-icons/ai";
// import { MdOutlineAdminPanelSettings } from "react-icons/md";

// import { MdOutlineCategory } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
// import { MdOutlineHowToVote } from "react-icons/md";

// import { RiCalendarEventLine } from "react-icons/ri";
// import { PiCaretDownBold } from "react-icons/pi";
// import { PiCaretUpBold } from "react-icons/pi";

// import { FaRegMoneyBillAlt } from "react-icons/fa";

// import { FcPlanner } from "react-icons/fc";

// import { IoMdWifi } from "react-icons/io";

const AdminSidebar = forwardRef(
    (
        { className, showSidebar, events, slug = "#", is_private = false },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        // const [openModal, setOpenmodal] = useState(false);

        return (
            <aside
                className={`-mt-1 md:mt-[1.5px] z-40 transition-transform ${
                    showSidebar ? "translate-x-0" : "-translate-x-full"
                } !bg-white border-r border-gray-200 md:translate-x-0 dark:bg-blue-800 dark:border-blue-700 ${className}`}
            >
                <div className=" py-5 px-3 bg-white dark:bg-blue-800">
                    <ul className="space-y-2 mb-5">
                        <p className="font-extrabold text-base">CORE</p>

                        <li>
                            <Link
                                preserveScroll
                                href=""
                                className={`flex items-center ml-3 p-2 text-base font-medium text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group ${
                                    route().current(
                                        "organiser.dashboard.event.specific"
                                    )
                                        ? "bg-blue-100"
                                        : ""
                                } `}
                            >
                                <AiOutlineDashboard className="text-xl text-blue-900" />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                preserveScroll
                                href=""
                                className={`flex items-center ml-3 p-2 text-base font-medium text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group ${
                                    route().current(
                                        "organiser.dashboard.organisers.index"
                                    )
                                        ? "bg-blue-100"
                                        : ""
                                }`}
                            >
                                <TbUsers className="text-xl text-blue-900" />
                                <span className="ml-3">Users</span>
                            </Link>
                        </li>
                    </ul>

                    <hr />
                </div>
            </aside>
        );
    }
);

export default AdminSidebar;
