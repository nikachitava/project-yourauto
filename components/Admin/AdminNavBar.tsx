import Link from "next/link";
import React from "react";

const AdminNavBar = () => {
    return (
        <header>
            <nav className="bg-gray-800 p-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/dashboard" className="text-white">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/create" className="text-white">
                            Create Listing
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/listings" className="text-white">
                            All Listings
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AdminNavBar;
