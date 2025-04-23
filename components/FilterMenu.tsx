import React from "react";
import FilterMenuItem from "./FilterMenuItem";
import { vehicleBrands } from "@/data/vehicleBrands";

const FilterMenu = () => {
    return (
        <div className="w-full px-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <FilterMenuItem
                    name="Vehicle Type"
                    options={["Car", "Truck"]}
                />
                <FilterMenuItem name="Brand" options={vehicleBrands} />
                <FilterMenuItem
                    name="Status"
                    options={["Before Clearence", "After Clearence"]}
                />
                <FilterMenuItem
                    name="Year"
                    options={["2020", "2021", "2022"]}
                />
                <FilterMenuItem
                    name="Price"
                    options={["1000", "2000", "3000"]}
                />
                <FilterMenuItem
                    name="Mileage"
                    options={["1000", "2000", "3000"]}
                />
                <FilterMenuItem
                    name="Color"
                    options={["Red", "Blue", "Green"]}
                />
            </div>
        </div>
    );
};

export default FilterMenu;
