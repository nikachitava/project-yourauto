"use client";

import React, { useEffect, useState } from "react";
import {
    MapPin,
    Phone,
    Fuel,
    Settings,
    Gauge,
    Car,
    Circle,
    ChevronRight,
    ChevronLeft,
    X,
    Search,
} from "lucide-react";
import Image from "next/image";
import { IVehicle } from "@/types/IVehicle";
import { createClient } from "@/utils/supabase/client";

const SingleVehicle = ({ vehicleId }: { vehicleId: string }) => {
    console.log("Vehicle ID:", vehicleId);
    const [vehicleData, setVehicleData] = useState<IVehicle | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showPreview, setShowPreview] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [allImages, setAllImages] = useState<string[]>([]);

    const supabase = createClient();

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await supabase
                    .from("vehicles")
                    .select("*")
                    .eq("id", vehicleId)
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    setVehicleData(data as IVehicle);

                    const images = [data.cover_image];
                    if (data.gallery && Array.isArray(data.gallery)) {
                        images.push(...data.gallery);
                    }
                    setAllImages(images);
                } else {
                    throw new Error("Vehicle not found");
                }
            } catch (err) {
                console.error("Error fetching vehicle data:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load vehicle data"
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (vehicleId) {
            fetchVehicleData();
        }
    }, [vehicleId, supabase]);

    const openImagePreview = (index: number) => {
        setCurrentImageIndex(index);
        setShowPreview(true);
        document.body.style.overflow = "hidden";
    };

    const closeImagePreview = () => {
        setShowPreview(false);
        document.body.style.overflow = "auto";
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!showPreview) return;

            if (e.key === "Escape") closeImagePreview();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showPreview]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">
                        Loading vehicle details...
                    </p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error || !vehicleData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-destructive/10 border border-destructive p-4 rounded-lg">
                    <h2 className="text-xl font-bold text-destructive mb-2">
                        Error
                    </h2>
                    <p className="text-muted-foreground">
                        {error || "Unable to load vehicle details"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {vehicleData.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                        <MapPin size={18} />
                        <span>
                            {vehicleData.city}, {vehicleData.country}
                        </span>
                    </div>
                </div>
                <div>
                    <p className="text-primary text-3xl font-extrabold">
                        €{vehicleData.price.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl">
                <div
                    className="relative w-full h-64 sm:h-96 cursor-pointer group"
                    onClick={() => openImagePreview(0)}
                >
                    <Image
                        src={vehicleData.cover_image}
                        alt={vehicleData.title}
                        fill
                        className="object-cover rounded-xl"
                        priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/50 rounded-full p-3">
                            <Search size={24} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {vehicleData.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                    {vehicleData.gallery.map((img, index) => (
                        <div
                            key={index}
                            className="relative w-full h-40 overflow-hidden rounded-lg cursor-pointer group"
                            onClick={() => openImagePreview(index + 1)}
                        >
                            <Image
                                src={img}
                                alt={`${vehicleData.title} image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-black/50 rounded-full p-2">
                                    <Search size={20} className="text-white" />
                                </div>
                            </div>
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
                        value={`${vehicleData.mileage.toLocaleString()} km`}
                    />
                    <DetailItem
                        icon={<Fuel size={18} />}
                        label="Fuel Type"
                        value={vehicleData.fuel_type}
                    />
                    <DetailItem
                        icon={<Settings size={18} />}
                        label="Transmission"
                        value={vehicleData.transmission}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Body Type"
                        value={vehicleData.body_type}
                    />
                    <DetailItem
                        icon={<Circle size={18} />}
                        label="Drive Type"
                        value={vehicleData.drive_type}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Engine"
                        value={vehicleData.engine}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Doors"
                        value={`${vehicleData.doors}`}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Seats"
                        value={`${vehicleData.seats}`}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Color"
                        value={vehicleData.color}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Condition"
                        value={vehicleData.condition}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="VIN"
                        value={vehicleData.vin}
                    />
                    <DetailItem
                        icon={<Car size={18} />}
                        label="Year"
                        value={`${vehicleData.year}`}
                    />
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {vehicleData.description}
                </p>
            </div>

            <div className="mt-10 p-6 bg-card border border-border rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">
                    Contact Seller
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={18} />
                    <span>{vehicleData.contact_number}</span>
                </div>
            </div>
            {showPreview && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
                    <button
                        onClick={closeImagePreview}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-50"
                        aria-label="Close preview"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 text-white hover:text-gray-300 p-2 z-50"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 text-white hover:text-gray-300 p-2 z-50"
                        aria-label="Next image"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="w-full h-full flex items-center justify-center p-4 sm:p-10">
                        <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                            <Image
                                src={allImages[currentImageIndex]}
                                alt={`Preview image ${currentImageIndex + 1}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-medium">
                        {currentImageIndex + 1} / {allImages.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleVehicle;

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
