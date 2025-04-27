import React from "react";
import SingleVehicle from "@/components/SingleVehicle";

interface ISingleVehiclePageProps {
    params: Promise<{
        id: string;
    }>;
}

const SingleVehiclePage: React.FC<ISingleVehiclePageProps> = async ({
    params,
}) => {
    const { id } = await params;
    return <SingleVehicle vehicleId={id} />;
};

export default SingleVehiclePage;
