"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IVehicle } from "@/types/IVehicle";
import { getVehicleByOwnerId } from "@/lib/services/vehicleServices";

import { MdDeleteForever } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const OwnedVehicleList = () => {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);

    const fetchVehicles = async () => {
        const vehicleData = await getVehicleByOwnerId(
            "19443252-eabd-4e83-a0bf-386ecdb7bf25"
        );
        setVehicles(vehicleData);
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const router = useRouter();

    const goToVehiclePage = (vehicleId: string) =>
        router.push(`/vehicle/${vehicleId}`);
    const editVehicle = (vehicleId: string) =>
        router.push(`/vehile//edit/${vehicleId}`);

    console.log("vehicles: ", vehicles);

    return (
        <div className="px-10">
            <h1 className="underline underline-offset-8 font-medium uppercase text-2xl mb-4">
                Your vehicle listings
            </h1>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-500/5 rounded">
                            <TableHead className="w-[200px]">Title</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow key={vehicle.id}>
                                <TableCell className="font-medium">
                                    {vehicle.title}
                                </TableCell>
                                <TableCell>
                                    {vehicle?.vehicle_brands?.name}
                                </TableCell>
                                <TableCell>{vehicle.description}</TableCell>
                                <TableCell>${vehicle.price}</TableCell>
                                <TableCell>
                                    <div className="flex gap-3 justify-end">
                                        <FaArrowRight
                                            size={20}
                                            color="#16a34a"
                                            className="cursor-pointer"
                                            onClick={() =>
                                                goToVehiclePage(vehicle.id)
                                            }
                                        />
                                        <FiEdit3
                                            size={20}
                                            color="#ca8a04"
                                            className="cursor-pointer"
                                            onClick={() =>
                                                editVehicle(vehicle.id)
                                            }
                                        />
                                        <MdDeleteForever
                                            size={20}
                                            color="#dc2626"
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OwnedVehicleList;
