import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex justify-center mt-6 space-x-1 text-sm">
            {links.map((link, index) => (
                <Link
                    preserveScroll
                    preserveState
                    href={link?.url}
                    key={index}
                    className={`px-3 py-1 border rounded ${
                        link.active
                            ? "bg-blue-500 text-white"
                            : link.url
                            ? "bg-white text-gray-700"
                            : "bg-gray-200 cursor-not-allowed"
                    }`}
                    disabled={!link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
