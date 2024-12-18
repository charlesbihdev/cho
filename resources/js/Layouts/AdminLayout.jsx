import { useState, useEffect, useRef } from "react";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { router } from "@inertiajs/react";
import AppLogo from "@/Components/AppLogo";
import Footer from "@/Components/Dashboard/Footer";
import AdminSidebar from "@/Components/Dashboard/Sidebars/AdminSidebar";
import ToastProvider from "./ToastProvider";

export default function AdminLayout({ user, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [showSidebar, setShowSidebar] = useState(false);
    let menuRef = useRef();
    let sidebarRef = useRef();
    //click the mouse outside the menu to close
    useEffect(() => {
        let mouseDownHandler = (e) => {
            if (
                menuRef.current &&
                sidebarRef.current &&
                !menuRef.current.contains(e.target) &&
                !sidebarRef.current.contains(e.target)
            ) {
                setShowSidebar(false);
                setShowingNavigationDropdown(false);
            }
        };
        document.addEventListener("mousedown", mouseDownHandler);
        return () => {
            document.removeEventListener("mousedown", mouseDownHandler);
        };
    });

    const pathname = router.page?.url;

    return (
        <ToastProvider>
            <div className="min-h-screen bg-gray-100">
                <nav className="fixed z-40 w-full bg-white border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="-me-2 flex items-center md:hidden">
                                <button
                                    onClick={() =>
                                        setShowSidebar(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showSidebar
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showSidebar
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="shrink-0 flex items-center">
                                <AppLogo className="w-40" blue={true} />
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <img
                                    src={`https://ui-avatars.com/api/?background=random&name=${user?.name}`}
                                    className="rounded-full w-12 h-12"
                                />
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-900 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user?.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?background=random&name=${user?.name}`}
                                        className="rounded-full w-10"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div
                            ref={menuRef}
                            className="pt-4 pb-1 border-t border-gray-200"
                        >
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="pt-[4.1rem] min-h-screen">
                    <AdminSidebar
                        ref={sidebarRef}
                        className="fixed overflow-scroll w-64 overflow-y-auto h-screen max-h-screen pb-8 border"
                        pathname={pathname}
                        showSidebar={showSidebar}
                    />

                    <article className="flex flex-col justify-between md:ml-[16rem] min-h-[94vh] md:min-h-[95vh] lg:min-h-[88vh]">
                        <div className="py-12">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                    {children}
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </article>
                </main>
            </div>
        </ToastProvider>
    );
}
