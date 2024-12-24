import React from "react";
import { AiOutlineEye } from "react-icons/ai";

const Table = () => {
    return (
        <div className="p-6 rounded-lg shadow-md">
            {/* Orders Section */}
            <div className="overflow-x-auto border-l border-r border-t border-b">
                <h1>Orders</h1>
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
                                <div>
                                    <AiOutlineEye />
                                </div>
                            </th>

                            {/* <th className="border-b py-2 px-4">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Active Nominees
                            {activeNominees.map((nominee, index) => (
                                <tr
                                    className="border-b last:border-b-0"
                                    key={nominee.id}
                                >
                                    <td className="py-2 px-4 border-r">
                                        {index + 1}
                                    </td>
                                    <td className="py-2 px-4 border-r">
                                        {nominee.name}{" "}
                                    </td>
                                    <td className="py-2 px-4 border-r">
                                        <img
                                            className="!w-28 !h-24 my-auto mx-auto"
                                            src={nominee.photo}
                                            alt={nominee.name}
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-r text-center">
                                        {nominee.description || "-"}
                                    </td>
                                    <td className="py-2 px-4 border-r">
                                        {nominee.category}
                                    </td>

                                    <td className="">
                                        <div className="!h-full flex flex-wrap gap-3 justify-center">
                                            <EditIcon
                                                className="w-5 h-5 text-yellow-400 cursor-pointer"
                                                onClick={() =>
                                                    handleAction(
                                                        "edit",
                                                        nominee
                                                    )
                                                }
                                            />
                                            <TrashIcon
                                                className="text-red-700 cursor-pointer w-5 h-5"
                                                onClick={() =>
                                                    handleAction(
                                                        "delete",
                                                        nominee
                                                    )
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))} */}

                        {/* No Nominees Message */}
                        {/* {nominees.length === 0 && (
                                <tr>
                                    <td
                                        className="text-center text-lg py-4"
                                        colSpan={7}
                                    >
                                        No nominees found
                                    </td>
                                </tr>
                                
                            )} */}
                    </tbody>
                </table>
            </div>

            {/* Food Section */}
            <div className="overflow-x-auto border-l border-r border-t border-b">
                <h1>Food</h1>
                <table className="w-full text-center table-auto border-collapse">
                    <thead>
                        <tr className="text-black">
                            <th className="border-b border-r-2 py-2 px-4">
                                Name
                            </th>
                            <th className="border-b border-r-2 py-2 px-4">
                                Vendor
                            </th>
                            <th className="border-b border-r-2 py-2 px-4">
                                Variants
                            </th>
                            <th className="border-b border-r-2 py-2 px-4">
                                Prices
                            </th>
                            <td className="">
                                <div className="!h-full flex flex-wrap gap-3 justify-center">
                                    <EditIcon
                                        className="w-5 h-5 text-yellow-400 cursor-pointer"
                                        onClick={() =>
                                            handleAction("edit", nominee)
                                        }
                                    />
                                    <TrashIcon
                                        className="text-red-700 cursor-pointer w-5 h-5"
                                        onClick={() =>
                                            handleAction("delete", nominee)
                                        }
                                    />
                                </div>
                            </td>
                        </tr>
                    </thead>

                    <tbody></tbody>
                </table>
            </div>

            {/* Vendors Section */}
            <div className="overflow-x-auto border-l border-r border-t border-b">
                <h1>Vendors</h1>
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

            {/* Location Section */}
            <div className="overflow-x-auto border-l border-r border-t border-b">
                <h1>Location</h1>
                <table className="w-full text-center table-auto border-collapse">
                    <thead>
                        <tr className="text-black">
                            <th className="border-b border-r-2 py-2 px-4">
                                Vendor
                            </th>
                            <th className="border-b border-r-2 py-2 px-4">
                                Destination
                            </th>
                            <th className="border-b border-r-2 py-2 px-4">
                                Price
                            </th>
                            <td className="">
                                <div className="!h-full flex flex-wrap gap-3 justify-center">
                                    <EditIcon
                                        className="w-5 h-5 text-yellow-400 cursor-pointer"
                                        onClick={() =>
                                            handleAction("edit", nominee)
                                        }
                                    />
                                    <TrashIcon
                                        className="text-red-700 cursor-pointer w-5 h-5"
                                        onClick={() =>
                                            handleAction("delete", nominee)
                                        }
                                    />
                                </div>
                            </td>
                        </tr>
                    </thead>

                    <tbody></tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
