"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Button } from "./ui/button";

interface IFilterMenuItemProps<T extends { id: string; name: string }> {
    name: string;
    options?: T[];
    isInputValue?: boolean;
    onValueChange?: (min: string, max: string) => void;
    onOptionSelect?: (selected: T) => void;
    disabled?: boolean;
    disabledText?: string;
}

const FilterMenuItem = <T extends { id: string; name: string }>({
    name,
    options,
    isInputValue,
    onValueChange,
    onOptionSelect,
    disabled = false,
    disabledText,
}: IFilterMenuItemProps<T>) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    const handleToggleMenu = () => {
        if (disabled) return;
        setIsMenuOpen((prev) => !prev);
    };

    const choosenOptionHandler = (option: T) => {
        onOptionSelect?.(option);
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
                className={`group w-full flex flex-col items-start border p-2 rounded-md relative ${
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                }`}
            >
                <div className="w-full flex items-center justify-between">
                    <span>{name}</span>
                    <FaArrowDown
                        className={`transition-transform duration-300 ${
                            isMenuOpen ? "rotate-180" : "rotate-0"
                        }`}
                    />
                </div>

                {disabled && disabledText && (
                    <p className="absolute left-2 bottom-full text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {disabledText}
                    </p>
                )}
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
                                        }}
                                        variant="link"
                                        className="text-sm text-gray-500 hover:underline"
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        onClick={() => {
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
                                {options?.map((option) => (
                                    <div
                                        onClick={() =>
                                            choosenOptionHandler(option)
                                        }
                                        key={option.id}
                                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100/20 rounded-lg"
                                    >
                                        <span>{option.name}</span>
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
