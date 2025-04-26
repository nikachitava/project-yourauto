"use client";

import React, { useEffect, useState } from "react";
import { fetchAllVehicles } from "@/lib/services/vehicleServices";
import { IVehicle } from "@/types/IVehicle";
import VehicleCard from "@/components/VehicleCard";

const VehicleCardSection = () => {
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
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {vehicles.map((v) => (
                <VehicleCard
                    key={v.id}
                    city={v.city}
                    country={v.country}
                    cover_image={v.cover_image}
                    id={v.id}
                    price={v.price}
                    title={v.title}
                    year={v.year}
                />
            ))}
        </div>
    );
};

export default VehicleCardSection;
