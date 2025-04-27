"use client";

import React, { useEffect, useState } from "react";
import { fetchAllVehicles } from "@/lib/services/vehicleServices";
import { IVehicle } from "@/types/IVehicle";
import VehicleCard from "@/components/VehicleCard";
import Loader from "./Loader";

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

    if (loading) return <Loader text="Loading vehicles..." />;

    return (
        <div className="container mx-auto mt-8 px-4 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                Available Vehicles
            </h1>

            <div className="flex flex-col gap-10">
                {vehicles.map((v) => (
                    <VehicleCard
                        key={v.id}
                        id={v.id}
                        city={v.city}
                        country={v.country}
                        cover_image={v.cover_image}
                        title={v.title}
                        year={v.year}
                        price={v.price}
                        mileage={v.mileage}
                        fuel_type={v.fuel_type}
                        transmission={v.transmission}
                    />
                ))}
            </div>
        </div>
    );
};

export default VehicleCardSection;
