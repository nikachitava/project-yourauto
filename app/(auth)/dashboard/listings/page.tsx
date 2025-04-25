"use client";

import React, { useEffect, useState } from "react";
import { fetchAllVehicles } from "@/lib/services/vehicleServices";
import { IVehicle } from "@/types/IVehicle";

const ListingsPage = () => {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getVehicles = async () => {
            const data = await fetchAllVehicles();
            setVehicles(data);
            setLoading(false);
        };

        getVehicles();
    }, []);

    if (loading) return <div className="p-4">Loading vehicles...</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {vehicles.map((v) => (
                <div
                    key={v.id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                    <img
                        src={v.cover_image}
                        alt={v.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-lg font-semibold">{v.title}</h2>
                    <p className="text-gray-600">
                        {v.year} • {v.price}€
                    </p>
                    <p className="text-sm text-gray-500">
                        {v.city}, {v.country}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ListingsPage;
