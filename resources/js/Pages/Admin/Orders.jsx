import AdminLayout from "@/Layouts/AdminLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { AiOutlineEye } from "react-icons/ai";

export default function Orders() {
    return (
        //     <AuthenticatedLayout
        //         header={
        //             <h2 className="text-xl font-semibold leading-tight text-gray-800">
        //                 Dashboard
        //             </h2>
        //         }
        //     >

        <AdminLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Username
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Phone
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Location
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Total Price
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            <button className="">
                                                <AiOutlineEye className="size-5" />
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
        // </AuthenticatedLayout>
    );
}
