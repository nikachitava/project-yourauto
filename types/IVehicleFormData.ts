export interface VehicleFormData {
    title: string;
    brand_id: string;
    model_id: string;
    year: number;
    price: number;
    mileage: number;
    vin: string;
    engine: string;
    transmission: string;
    fuel_type: string;
    drive_type: string;
    body_type: string;
    doors: number;
    seats: number;
    color: string;
    condition: string;
    country: string;
    city: string;
    address: string;
    cover_image: File; 
    gallery: File[];  
    description: string;
    contact_number: string;
}
