import React from "react";
import { IoClose } from "react-icons/io5";

interface ISelectedFilterItem {
    name?: string | number;
    onClick: () => void;
}

const SelectedFilterItem: React.FC<ISelectedFilterItem> = ({
    name,
    onClick,
}) => {
    return (
        <div className="bg-accent flex items-center gap-4 px-3 py-1 rounded-full text-white shadow-md shadow-accent/50 cursor-pointer">
            <span className="text-white text-sm font-semibold text-center">
                {name}
            </span>
            <IoClose onClick={onClick} />
        </div>
    );
};

export default SelectedFilterItem;
