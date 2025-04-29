export interface IVehicle {
    id: string;
    title: string;
    brand_id: string;
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
    cover_image: string;
    gallery: string[];
    description: string;
    owner_id: string;
    contact_number: string;
    status: string;
    created_at: string;
    updated_at: string;
    model_id: string;
    vehicle_brands?: {
      name: string;
    };
  }

  