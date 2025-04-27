"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { VehicleFormData } from "@/types/IVehicleFormData";
import { vehicleFormSchema } from "@/schemas/VehicleFormSchema";
import { Car } from "lucide-react";

const CreateListingForm = () => {
    const form = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleFormSchema),
        defaultValues: {
            gallery: [],
            title: "",
            price: 0,
            year: new Date().getFullYear(),
            mileage: 0,
            vin: "",
            transmission: "",
            fuel_type: "",
            body_type: "",
            doors: 4,
            seats: 5,
            country: "",
            city: "",
            address: "",
            contact_number: "",
            description: "",
            engine: "",
        },
    });

    const onSubmit = (data: VehicleFormData) => {
        console.log(data);
    };

    return (
        <div className="container mx-auto py-10 px-5">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 max-w-4xl mx-auto"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Enter the basic details about your vehicle
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter vehicle title"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter price"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter year"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mileage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mileage</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter mileage"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="vin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>VIN</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter VIN"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Car className="h-5 w-5" />
                                Vehicle Details
                            </CardTitle>
                            <CardDescription>
                                Specify the technical details of your vehicle
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="engine"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Engine</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. 2.0L Turbo"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="transmission"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Transmission</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select transmission" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="automatic">
                                                        Automatic
                                                    </SelectItem>
                                                    <SelectItem value="manual">
                                                        Manual
                                                    </SelectItem>
                                                    <SelectItem value="semi-automatic">
                                                        Semi-Automatic
                                                    </SelectItem>
                                                    <SelectItem value="cvt">
                                                        CVT
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fuel_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fuel Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select fuel type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="petrol">
                                                        Petrol
                                                    </SelectItem>
                                                    <SelectItem value="diesel">
                                                        Diesel
                                                    </SelectItem>
                                                    <SelectItem value="electric">
                                                        Electric
                                                    </SelectItem>
                                                    <SelectItem value="hybrid">
                                                        Hybrid
                                                    </SelectItem>
                                                    <SelectItem value="plugin_hybrid">
                                                        Plug-in Hybrid
                                                    </SelectItem>
                                                    <SelectItem value="hydrogen">
                                                        Hydrogen
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="drive_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Drive Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select drive type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="fwd">
                                                        Front-wheel Drive (FWD)
                                                    </SelectItem>
                                                    <SelectItem value="rwd">
                                                        Rear-wheel Drive (RWD)
                                                    </SelectItem>
                                                    <SelectItem value="awd">
                                                        All-wheel Drive (AWD)
                                                    </SelectItem>
                                                    <SelectItem value="4wd">
                                                        Four-wheel Drive (4WD)
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="body_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Body Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select body type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="sedan">
                                                        Sedan
                                                    </SelectItem>
                                                    <SelectItem value="suv">
                                                        SUV
                                                    </SelectItem>
                                                    <SelectItem value="hatchback">
                                                        Hatchback
                                                    </SelectItem>
                                                    <SelectItem value="coupe">
                                                        Coupe
                                                    </SelectItem>
                                                    <SelectItem value="wagon">
                                                        Wagon
                                                    </SelectItem>
                                                    <SelectItem value="convertible">
                                                        Convertible
                                                    </SelectItem>
                                                    <SelectItem value="van">
                                                        Van
                                                    </SelectItem>
                                                    <SelectItem value="pickup">
                                                        Pickup
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Color</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select color" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="black">
                                                        Black
                                                    </SelectItem>
                                                    <SelectItem value="white">
                                                        White
                                                    </SelectItem>
                                                    <SelectItem value="silver">
                                                        Silver
                                                    </SelectItem>
                                                    <SelectItem value="gray">
                                                        Gray
                                                    </SelectItem>
                                                    <SelectItem value="red">
                                                        Red
                                                    </SelectItem>
                                                    <SelectItem value="blue">
                                                        Blue
                                                    </SelectItem>
                                                    <SelectItem value="green">
                                                        Green
                                                    </SelectItem>
                                                    <SelectItem value="brown">
                                                        Brown
                                                    </SelectItem>
                                                    <SelectItem value="beige">
                                                        Beige
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="doors"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Number of Doors
                                            </FormLabel>
                                            <Select
                                                onValueChange={(value) =>
                                                    field.onChange(
                                                        Number(value)
                                                    )
                                                }
                                                defaultValue={field.value?.toString()}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select number of doors" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {[2, 3, 4, 5].map((num) => (
                                                        <SelectItem
                                                            key={num}
                                                            value={num.toString()}
                                                        >
                                                            {num} doors
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="seats"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Number of Seats
                                            </FormLabel>
                                            <Select
                                                onValueChange={(value) =>
                                                    field.onChange(
                                                        Number(value)
                                                    )
                                                }
                                                defaultValue={field.value?.toString()}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select number of seats" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {[
                                                        2, 3, 4, 5, 6, 7, 8, 9,
                                                    ].map((num) => (
                                                        <SelectItem
                                                            key={num}
                                                            value={num.toString()}
                                                        >
                                                            {num} seats
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Location & Contact</CardTitle>
                            <CardDescription>
                                Enter location and contact information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter country"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter city"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="contact_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter contact number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                            <CardDescription>
                                Provide detailed information about your vehicle
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter vehicle description"
                                                className="min-h-[150px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button">
                            Save as Draft
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreateListingForm;
