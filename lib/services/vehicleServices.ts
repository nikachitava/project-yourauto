import { IBrand, IFuelType, IModel } from "@/types/VehicleDataTypes";

export const fetchBrands = async (): Promise<IBrand[]> => {
    try {
        const response = await fetch("/api/vehicle/brands");

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching brands:", errorData);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching brands:", error);
        return [];
    }
};

export const fetchModels = async (brandId: string): Promise<IModel[]> => {
    try {
        const response = await fetch(`/api/vehicle/models/${brandId}`);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching models:", errorData);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching models:", error);
        return [];
    }
};

export const fetchFuelTypes = async (): Promise<IFuelType[]> => {
    try {
        const response = await fetch(`/api/vehicle/fuel/`);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching fuel types:", errorData);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching fuel types:", error);
        return [];
    }
};