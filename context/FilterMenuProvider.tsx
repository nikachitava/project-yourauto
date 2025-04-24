"use client";

import { IBrand, IFuelType, IModel } from "@/types/VehicleDataTypes";
import { createContext, useState } from "react";

type FilterMenuProvderProps = {
    selectedBrand: IBrand | null;
    setSelectedbrand: (brand: IBrand | null) => void;
    selectedModel: IModel | null;
    setSelectedModel: (model: IModel | null) => void;
    selectedFuel: IFuelType | null;
    setSelectedFuel: (fuel: IFuelType | null) => void;
    status: string;
    setStatus: (status: string) => void;
    year: { min: number; max: number };
    setYear: (year: { min: number; max: number }) => void;
    price: { min: number; max: number };
    setPrice: (price: { min: number; max: number }) => void;
    handlePriceChange: (min: number, max: number) => void;
    handleYearChange: (min: number, max: number) => void;
    clearBrand: () => void;
    clearModel: () => void;
    clearFuel: () => void;
    clearStatus: () => void;
    clearYear: () => void;
    clearPrice: () => void;
    clearAll: () => void;
};

export const FilterMenuContext = createContext<FilterMenuProvderProps>(
    {} as FilterMenuProvderProps
);

export const FilterMenuProvder = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [selectedBrand, setSelectedbrand] = useState<IBrand | null>(null);
    const [selectedModel, setSelectedModel] = useState<IModel | null>(null);
    const [selectedFuel, setSelectedFuel] = useState<IFuelType | null>(null);
    const [status, setStatus] = useState<string>("");
    const [year, setYear] = useState<{ min: number; max: number }>({
        min: 0,
        max: 0,
    });
    const [price, setPrice] = useState<{ min: number; max: number }>({
        min: 0,
        max: 0,
    });

    const handleYearChange = (min: number, max: number) => {
        setYear({ min, max });
    };

    const handlePriceChange = (min: number, max: number) => {
        setPrice({ min, max });
    };

    return (
        <FilterMenuContext.Provider
            value={{
                selectedBrand,
                setSelectedbrand,
                selectedModel,
                setSelectedModel,
                selectedFuel,
                setSelectedFuel,
                status,
                setStatus,
                year,
                setYear,
                price,
                setPrice,
                handlePriceChange,
                handleYearChange,
                clearBrand: () => setSelectedbrand(null),
                clearModel: () => setSelectedModel(null),
                clearFuel: () => setSelectedFuel(null),
                clearStatus: () => setStatus(""),
                clearYear: () => setYear({ min: 0, max: 0 }),
                clearPrice: () => setPrice({ min: 0, max: 0 }),
                clearAll: () => {
                    setSelectedbrand(null);
                    setSelectedModel(null);
                    setSelectedFuel(null);
                    setStatus("");
                    setYear({ min: 0, max: 0 });
                    setPrice({ min: 0, max: 0 });
                },
            }}
        >
            {children}
        </FilterMenuContext.Provider>
    );
};
