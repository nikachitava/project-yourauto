"use client";

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
                    isInputValue
                    onValueChange={(min, max) => {
                        console.log("Selected price range:", min, max);
                    }}
                />
                <FilterMenuItem
                    name="Price"
                    isInputValue
                    onValueChange={(min, max) => {
                        console.log("Selected price range:", min, max);
                    }}
                />
                <FilterMenuItem
                    name="Mileage"
                    isInputValue
                    onValueChange={(min, max) => {
                        console.log("Selected price range:", min, max);
                    }}
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
