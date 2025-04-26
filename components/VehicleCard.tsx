import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface VehicleCardProps {
    id: string;
    cover_image: string;
    title: string;
    year: number;
    price: number;
    city: string;
    country: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
    id,
    cover_image,
    title,
    year,
    price,
    city,
    country,
}) => {
    return (
        <Link href={`/vehicles/${id}`}>
            <div
                key={id}
                className="group relative overflow-hidden rounded-xl bg-card text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
                <div className="relative h-56 w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${cover_image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute right-3 top-3 rounded-full bg-background/90 px-4 py-1.5 backdrop-blur">
                        <span className="font-semibold text-primary">
                            €{price.toLocaleString()}
                        </span>
                    </div>

                    <div className="absolute left-3 top-3 rounded-full bg-black/30 px-3 py-1 backdrop-blur">
                        <span className="text-sm font-medium text-white">
                            {year}
                        </span>
                    </div>
                </div>

                <div className="p-4">
                    <h2 className="mb-2 text-xl font-semibold leading-tight line-clamp-2">
                        {title}
                    </h2>

                    <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin size={16} />
                        <p className="text-sm">
                            {city}, {country}
                        </p>
                    </div>
                </div>

                <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
        </Link>
    );
};

export default VehicleCard;
