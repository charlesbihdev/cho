import AdminLayout from "@/Layouts/AdminLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Vendors({ vendors }) {
    console.log(vendors);
    return (
        <AdminLayout>
            <Head title="Vendors" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto border-l border-r border-t border-b">
                            <table className="w-full text-center table-auto border-collapse">
                                <thead>
                                    <tr className="text-black">
                                        <th className="border-b border-r-2 py-2 px-4">
                                            ID
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Name
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {vendors.map((vendor, index) => (
                                        <tr key={index}>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {index + 1}
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                {vendor.name}
                                            </td>
                                            <td className="border-b border-r-2 py-2 px-4">
                                                <button className="bg-blue-500 text-white py-1 px-4 rounded">
                                                    Edit
                                                </button>
                                                <button className="bg-red-600 text-white py-1 px-4 rounded">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
        // </AuthenticatedLayout>
    );
}
