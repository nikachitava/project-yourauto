"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

interface IFilterMenuItemProps {
    name: string;
    options: string[];
}

const FilterMenuItem: React.FC<IFilterMenuItemProps> = ({ name, options }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [choosenOption, setChoosenOption] = useState<string>("");
    const menuRef = useRef<HTMLDivElement>(null);

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
                <div className="absolute top-full left-0 w-full z-10 bg-accent rounded-md shadow-lg mt-2">
                    <div className="flex flex-col border p-2 rounded-md h-[200px] overflow-auto">
                        {options.map((brand) => (
                            <div
                                onClick={() => choosenOptionHandler(brand)}
                                key={brand}
                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100/20 rounded-lg"
                            >
                                <span>{brand}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterMenuItem;
