"use client";

import React, { useContext, useEffect, useState } from "react";
import { fetchAllVehicles } from "@/lib/services/vehicleServices";
import { IVehicle } from "@/types/IVehicle";
import VehicleCard from "@/components/VehicleCard";
import Loader from "./Loader";
import { FilterMenuContext } from "@/context/FilterMenuProvider";

const VehicleCardSection = () => {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [loading, setLoading] = useState(true);

    const [filteredVehicles, setFilteredVehicles] = useState<IVehicle[]>([]);

    useEffect(() => {
        const getVehicles = async () => {
            const data = await fetchAllVehicles();
            setVehicles(data);
            setLoading(false);
        };

        getVehicles();
    }, []);

    const { selectedBrand, selectedModel, year, price, selectedFuel, status } =
        useContext(FilterMenuContext);

    const filtereVehicles = () => {
        let filtered = vehicles;

        if (selectedBrand) {
            filtered = filtered.filter(
                (vehicle) => vehicle.brand_id === selectedBrand.id
            );
        }
        if (selectedModel) {
            filtered = filtered.filter(
                (vehicle) => vehicle.model_id === selectedModel.id
            );
        }
        if (year.max) {
            filtered = filtered.filter((vehicle) => vehicle.year <= year.max);
        }
        if (year.min) {
            filtered = filtered.filter((vehicle) => vehicle.year >= year.min);
        }
        if (price.max) {
            filtered = filtered.filter((vehicle) => vehicle.price <= price.max);
        }
        if (price.min) {
            filtered = filtered.filter((vehicle) => vehicle.price >= price.min);
        }
        if (selectedFuel) {
            filtered = filtered.filter(
                (vehicle) => vehicle.fuel_type === selectedFuel.name
            );
        }
        if (status) {
            filtered = filtered.filter((vehicle) => vehicle.status === status);
        }
        setFilteredVehicles(filtered);
    };
    useEffect(() => {
        filtereVehicles();
    }, [
        selectedBrand,
        selectedModel,
        year,
        price,
        selectedFuel,
        status,
        vehicles,
    ]);

    if (loading) return <Loader text="Loading vehicles..." />;

    return (
        <div className="container mx-auto my-40 px-4 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                Available Vehicles
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((v) => (
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
                    ))
                ) : (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center text-gray-500">
                        No vehicles found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleCardSection;
