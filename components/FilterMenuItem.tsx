"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { Button } from "./ui/button";

interface IFilterMenuItemProps {
    name: string;
    options?: string[];
    isInputValue?: boolean;
    onValueChange?: (min: string, max: string) => void;
}

const FilterMenuItem: React.FC<IFilterMenuItemProps> = ({
    name,
    options,
    isInputValue,
    onValueChange,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [choosenOption, setChoosenOption] = useState<string>("");
    const menuRef = useRef<HTMLDivElement>(null);

    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

    const choosenOptionHandler = (option: string) => {
        setChoosenOption(option);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative w-full md:max-w-[450px]">
            <div
                onClick={handleToggleMenu}
                className="w-full flex items-center justify-between cursor-pointer border p-2 rounded-md"
            >
                <span>{choosenOption ? choosenOption : name}</span>
                {isMenuOpen ? <FaArrowUp /> : <FaArrowDown />}
            </div>

            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full z-10 bg-background rounded-md shadow-lg mt-2">
                    <div className="flex flex-col border p-2 rounded-md h-auto">
                        {isInputValue ? (
                            <div className="flex flex-col gap-3 px-4 py-3">
                                <span className="text-sm text-muted-foreground font-medium">
                                    Select Price Range
                                </span>

                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label className="block text-xs mb-1 text-gray-500">
                                            Min
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={minValue}
                                            onChange={(e) =>
                                                setMinValue(e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs mb-1 text-gray-500">
                                            Max
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="100000"
                                            value={maxValue}
                                            onChange={(e) =>
                                                setMaxValue(e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between mt-2">
                                    <Button
                                        onClick={() => {
                                            setMinValue("");
                                            setMaxValue("");
                                            setChoosenOption("");
                                        }}
                                        variant="link"
                                        className="text-sm text-gray-500 hover:underline"
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setChoosenOption(
                                                `${minValue || "0"} - ${
                                                    maxValue || "∞"
                                                }`
                                            );
                                            onValueChange?.(minValue, maxValue);
                                            setIsMenuOpen(false);
                                        }}
                                        className="px-4 py-2 text-sm rounded-md hover:bg-primary/90 transition"
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col h-[200px] overflow-auto">
                                {options?.map((brand) => (
                                    <div
                                        onClick={() =>
                                            choosenOptionHandler(brand)
                                        }
                                        key={brand}
                                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100/20 rounded-lg"
                                    >
                                        <span>{brand}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterMenuItem;
