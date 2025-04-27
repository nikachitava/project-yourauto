import React from "react";
import { MapPin, Gauge, Fuel, Settings } from "lucide-react";
import Link from "next/link";

interface VehicleCardProps {
    id: string;
    cover_image: string;
    title: string;
    year: number;
    price: number;
    city: string;
    country: string;
    mileage: number;
    fuel_type: string;
    transmission: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
    id,
    cover_image,
    title,
    year,
    price,
    city,
    country,
    mileage,
    fuel_type,
    transmission,
}) => {
    return (
        <Link href={`/vehicle/${id}`} className="group">
            <div className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                {/* Image Section */}
                <div className="relative w-full sm:w-1/3 h-60 sm:h-48 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${cover_image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Year Badge - More Visible */}
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        {year}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-between p-5 w-full">
                    {/* Top - Title and Price */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <h2 className="text-lg font-bold text-foreground leading-snug line-clamp-2">
                            {title}
                        </h2>
                        <p className="mt-2 sm:mt-0 text-primary text-xl font-bold">
                            €{price.toLocaleString()}
                        </p>
                    </div>

                    {/* Middle - Specs with Icons */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Gauge size={16} />
                            <span>{mileage.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Fuel size={16} />
                            <span>{fuel_type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Settings size={16} />
                            <span>{transmission}</span>
                        </div>
                    </div>

                    {/* Bottom - Location */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                        <MapPin size={16} />
                        <span>
                            {city}, {country}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VehicleCard;
