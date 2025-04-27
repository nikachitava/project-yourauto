import * as z from "zod";

export const vehicleFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    brand_id: z.string().uuid("Please select a brand"),
    model_id: z.string().uuid("Please select a model"),
    year: z
        .number()
        .min(1900)
        .max(new Date().getFullYear() + 1),
    price: z.number().positive("Price must be positive"),
    mileage: z.number().nonnegative("Mileage must be positive or zero"),
    vin: z.string().min(17, "VIN must be 17 characters").max(17),
    engine: z.string().min(1, "Engine details required"),
    transmission: z.string().min(1, "Please select transmission type"),
    fuel_type: z.string().min(1, "Please select fuel type"),
    drive_type: z.string().min(1, "Please select drive type"),
    body_type: z.string().min(1, "Please select body type"),
    doors: z.number().min(1).max(7),
    seats: z.number().min(1).max(9),
    color: z.string().min(1, "Please select color"),
    condition: z.string().min(1, "Please select condition"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    cover_image: z.string().url("Please provide a valid image URL"),
    gallery: z.array(z.string().url("Please provide valid image URLs")),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    contact_number: z.string().min(1, "Contact number is required"),
    status: z.string().min(1, "Please select status"),
});
