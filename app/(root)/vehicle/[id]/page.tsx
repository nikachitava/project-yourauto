import React from "react";
import { IVehicle } from "@/types/IVehicle";
import {
    MapPin,
    Phone,
    Fuel,
    Settings,
    Gauge,
    Car,
    Circle,
} from "lucide-react";
import Image from "next/image";

export const fakeVehicle: IVehicle = {
    id: "1",
    title: "Toyota Corolla SE",
    brand_id: "toyota",
    year: 2022,
    price: 15900,
    mileage: 24500,
    vin: "JTDEPRAE4NJ123456",
    engine: "1.8L I4",
    transmission: "Automatic",
    fuel_type: "Petrol",
    drive_type: "Front Wheel Drive",
    body_type: "Sedan",
    doors: 4,
    seats: 5,
    color: "White",
    condition: "Used - Excellent",
    country: "Georgia",
    city: "Tbilisi",
    address: "Rustaveli Avenue 15",
    cover_image:
        "https://images.unsplash.com/photo-1571607385063-7f3b9f13e5fa?auto=format&fit=crop&w=800&q=80",
    gallery: [
        "https://images.unsplash.com/photo-1589395937772-d5a37a5a079d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592194996308-7b43878e84af?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1601924582970-9237f3c6c57a?auto=format&fit=crop&w=800&q=80",
    ],
    description: `This Toyota Corolla SE is in excellent condition with low mileage. 
  It features a reliable 1.8L engine, automatic transmission, and full service history. 
  Perfect for daily driving or family use. Immediate delivery available.`,
    owner_id: "user_12345",
    contact_number: "+995 599 12 34 56",
    status: "active",
    created_at: "2025-04-27T10:00:00Z",
    updated_at: "2025-04-27T10:00:00Z",
    model_id: "corolla_se",
};

interface ISingleVehiclePageProps {
    params: Promise<{
        id: string;
    }>;
}

const SingleVehiclePage: React.FC<ISingleVehiclePageProps> = async ({
    params,
}) => {
    const { id } = await params;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {fakeVehicle.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                        <MapPin size={18} />
                        <span>
                            {fakeVehicle.city}, {fakeVehicle.country}
                        </span>
                    </div>
                </div>
                <div>
                    <p className="text-primary text-3xl font-extrabold">
                        €{fakeVehicle.price.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl">
                <div className="relative w-full h-64 sm:h-96">
                    <Image
                        src={fakeVehicle.cover_image}
                        alt={fakeVehicle.title}
                        fill
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>
            </div>

            {fakeVehicle.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                    {fakeVehicle.gallery.map((img, index) => (
                        <div
                            key={index}
                            className="relative w-full h-40 overflow-hidden rounded-lg"
                        >
                            <Image
                                src={img}
                                alt={`${fakeVehicle.title} image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Vehicle Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                    <DetailItem
                        icon={<Gauge size={18} />}
                        label="Mileage"
                        value={`${fakeVehicle.mileage.toLocaleString()} km`}
                    />
                    <DetailItem
                        icon={<Fuel size={18} />}
                        label="Fuel Type"
                        value={fakeVehicle.fuel_type}
                    />
                    <DetailItem
                        icon={<Settings size={18} />}
                        label="Transmission"
                        value={fakeVehicle.transmission}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Body Type"
                        value={fakeVehicle.body_type}
                    />
                    <DetailItem
                        icon={<Circle size={18} />}
                        label="Drive Type"
                        value={fakeVehicle.drive_type}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Engine"
                        value={fakeVehicle.engine}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Doors"
                        value={`${fakeVehicle.doors}`}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Seats"
                        value={`${fakeVehicle.seats}`}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Color"
                        value={fakeVehicle.color}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Condition"
                        value={fakeVehicle.condition}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="VIN"
                        value={fakeVehicle.vin}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Year"
                        value={`${fakeVehicle.year}`}
                    />
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {fakeVehicle.description}
                </p>
            </div>

            <div className="mt-10 p-6 bg-card border border-border rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">
                    Contact Seller
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={18} />
                    <span>{fakeVehicle.contact_number}</span>
                </div>
            </div>
        </div>
    );
};

export default SingleVehiclePage;

const DetailItem = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => {
    return (
        <div className="flex items-center gap-3">
            <div className="text-primary">{icon}</div>
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{label}</span>
                <span>{value}</span>
            </div>
        </div>
    );
};
