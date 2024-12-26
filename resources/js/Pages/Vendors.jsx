import AdminLayout from "@/Layouts/AdminLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Vendors() {
    return (
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
                                            Name
                                        </th>
                                        <th className="border-b border-r-2 py-2 px-4">
                                            Location
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
