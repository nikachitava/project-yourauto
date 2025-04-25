"use client";

import { FilterMenuContext } from "@/context/FilterMenuProvider";
import React, { useContext } from "react";
import SelectedFilterItem from "./SelectedFilterItem";

const SelectedFilters = () => {
    const {
        selectedBrand,
        selectedFuel,
        selectedModel,
        price,
        status,
        year,
        clearBrand,
        clearFuel,
        clearModel,
        clearPrice,
        clearStatus,
        clearYear,
        clearAll,
    } = useContext(FilterMenuContext);

    const formatPrice = (price: { min: number; max: number }) => {
        if (price.min === 0 && price.max === 0) return null;
        if (price.min === 0) return `Up to ${price.max}`;
        if (price.max === 0) return `From ${price.min}`;
        return `${price.min} - ${price.max}`;
    };

    const formatYear = (year: { min: number; max: number }) => {
        if (year.min === 0 && year.max === 0) return null;
        if (year.min === 0) return `Up to ${year.max}`;
        if (year.max === 0) return `From ${year.min}`;
        return `${year.min} - ${year.max}`;
    };

    const formattedPrice = formatPrice(price);
    const formattedYear = formatYear(year);

    const isSelected =
        selectedModel ||
        selectedBrand ||
        selectedFuel ||
        status ||
        formattedYear ||
        formattedPrice;

    if (!isSelected) return null;

    return (
        <div className="flex items-center gap-4 border-y border-gray-300 py-4 mt-8 transition-all duration-300 ease-in-out">
            {selectedBrand && (
                <SelectedFilterItem
                    name={selectedBrand?.name}
                    onClick={clearBrand}
                />
            )}
            {selectedModel && (
                <SelectedFilterItem
                    name={selectedModel?.name}
                    onClick={clearModel}
                />
            )}
            {selectedFuel && (
                <SelectedFilterItem
                    name={selectedFuel?.name}
                    onClick={clearFuel}
                />
            )}
            {formattedYear && (
                <SelectedFilterItem name={formattedYear} onClick={clearYear} />
            )}
            {formattedPrice && (
                <SelectedFilterItem
                    name={formattedPrice}
                    onClick={clearPrice}
                />
            )}
            {status && (
                <SelectedFilterItem name={status} onClick={clearStatus} />
            )}
            {isSelected && (
                <SelectedFilterItem name="Clear Filter" onClick={clearAll} />
            )}
        </div>
    );
};

export default SelectedFilters;
