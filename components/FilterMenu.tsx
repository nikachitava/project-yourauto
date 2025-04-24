"use client";

import React, { useContext, useEffect, useState } from "react";
import FilterMenuItem from "./FilterMenuItem";
import SelectedFilters from "./SelectedFilters";
import { FilterMenuContext } from "@/context/FilterMenuProvider";
import {
    fetchBrands,
    fetchFuelTypes,
    fetchModels,
} from "@/lib/services/vehicleServices";
import { IBrand, IFuelType, IModel } from "@/types/VehicleDataTypes";

const statuses = [
    { id: "1", name: "Before Clearence" },
    { id: "2", name: "After Clearence" },
];

const FilterMenu = () => {
    const {
        selectedBrand,
        setSelectedbrand,
        setSelectedFuel,
        setStatus,
        setYear,
        setPrice,
        setSelectedModel,
    } = useContext(FilterMenuContext);

    const [brands, setBrands] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IModel[]>([]);
    const [fuels, setFuels] = useState<IFuelType[]>([]);

    async function getBrands() {
        const brandsData = await fetchBrands();
        setBrands(brandsData);
    }

    async function getModels(brandId: string) {
        if (!brands.length) return;

        const modelsData = await fetchModels(brandId);
        setModels(modelsData);
    }

    async function getFuelTypes() {
        const fuelTypesData = await fetchFuelTypes();
        setFuels(fuelTypesData);
    }

    useEffect(() => {
        getBrands();
    }, []);

    useEffect(() => {
        if (!selectedBrand) return;
        getModels(brands[0].id);
    }, [selectedBrand]);

    useEffect(() => {
        getFuelTypes();
    }, []);

    return (
        <div className="w-full px-4 py-4">
            <div
                className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 
             bg-white/60 dark:bg-zinc-800/70 
             backdrop-blur-xl 
             p-4 rounded-lg border border-zinc-200/50 dark:border-zinc-700/30"
            >
                <FilterMenuItem
                    name="Brand"
                    options={brands}
                    onOptionSelect={(brand) => {
                        setSelectedbrand(brand);
                    }}
                />
                <FilterMenuItem
                    name="Vehicle Type"
                    options={models}
                    onOptionSelect={(model) => {
                        setSelectedModel(model);
                    }}
                />
                <FilterMenuItem
                    name="Status"
                    options={statuses}
                    onOptionSelect={(status) => {
                        setStatus(status.name);
                    }}
                />
                <FilterMenuItem
                    name="Fuel Type"
                    options={fuels}
                    onOptionSelect={(fuel) => {
                        setSelectedFuel(fuel);
                    }}
                />

                <FilterMenuItem
                    name="Year"
                    isInputValue
                    onValueChange={(min, max) => {
                        setYear({ min: Number(min), max: Number(max) });
                    }}
                />
                <FilterMenuItem
                    name="Price"
                    isInputValue
                    onValueChange={(min, max) => {
                        setPrice({ min: Number(min), max: Number(max) });
                    }}
                />
            </div>
            <SelectedFilters />
        </div>
    );
};

export default FilterMenu;
