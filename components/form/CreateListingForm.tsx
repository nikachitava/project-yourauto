"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

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
import { Car, ImagePlus, X } from "lucide-react";
import { uploadImage } from "@/lib/services/storage";
import { createClient } from "@/utils/supabase/client";
import { fetchBrands, fetchModels } from "@/lib/services/vehicleServices";
import { IBrand, IModel } from "@/types/VehicleDataTypes";
import {
    BODY_TYPE_OPTIONS,
    COLOR_OPTIONS,
    CONDITION_OPTIONS,
    DOOR_OPTIONS,
    DRIVE_TYPE_OPTIONS,
    FUEL_TYPE_OPTIONS,
    SEAT_OPTIONS,
    TRANSMISSION_OPTIONS,
} from "@/data/VehicleStaticData";
import { create } from "domain";

const CreateListingForm = () => {
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IModel[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

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
            brand_id: "",
            model_id: "",
            drive_type: "",
            condition: "",
            cover_image: undefined,
            color: "",
        },
    });

    const watchBrandId = form.watch("brand_id");

    useEffect(() => {
        const getBrands = async () => {
            const brandsData = await fetchBrands();
            setBrands(brandsData);
        };
        getBrands();
    }, []);

    useEffect(() => {
        if (watchBrandId) {
            const getModels = async () => {
                const modelData = await fetchModels(watchBrandId);
                setModels(modelData);
            };
            getModels();
        } else {
            setModels([]);
        }
    }, [watchBrandId]);

    const onCoverDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                form.setValue("cover_image", file);
                const reader = new FileReader();
                reader.onload = () => {
                    setCoverPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        },
        [form]
    );

    const onGalleryDrop = useCallback(
        (acceptedFiles: File[]) => {
            const currentFiles = form.getValues("gallery") || [];
            const newFiles = [...currentFiles, ...acceptedFiles];
            form.setValue("gallery", newFiles);

            const newPreviews = acceptedFiles.map((file) =>
                URL.createObjectURL(file)
            );
            setGalleryPreviews((prev) => [...prev, ...newPreviews]);
        },
        [form]
    );

    const removeGalleryImage = useCallback(
        (index: number) => {
            const currentFiles = form.getValues("gallery");
            const newFiles = currentFiles.filter((_, i) => i !== index);
            form.setValue("gallery", newFiles);

            setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
        },
        [form]
    );

    const {
        getRootProps: getCoverRootProps,
        getInputProps: getCoverInputProps,
    } = useDropzone({
        onDrop: onCoverDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        maxFiles: 1,
    });

    const {
        getRootProps: getGalleryRootProps,
        getInputProps: getGalleryInputProps,
    } = useDropzone({
        onDrop: onGalleryDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        multiple: true,
    });

    useEffect(() => {
        return () => {
            if (coverPreview) URL.revokeObjectURL(coverPreview);
            galleryPreviews.forEach((preview) => URL.revokeObjectURL(preview));
        };
    }, [coverPreview, galleryPreviews]);

    const supabase = createClient();

    const onSubmit = async (formData: VehicleFormData) => {
        setIsUploading(true);
        try {
            const coverUrl = await uploadImage(
                formData.cover_image,
                "vehicle-images",
                `cover-${Date.now()}`
            );

            const galleryUrls = await Promise.all(
                formData.gallery.map((file, index) =>
                    uploadImage(
                        file,
                        "vehicle-images",
                        `gallery-${Date.now()}-${index}`
                    )
                )
            );

            const { error } = await supabase.from("vehicles").insert({
                ...formData,
                cover_image: coverUrl,
                gallery: galleryUrls,
                owner_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const onError = (errors: any) => {
        console.error("Form validation errors:", errors);
    };

    const renderSelectOptions = useCallback(
        (options: { value: string; label: string }[]) =>
            options.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                    {option.label}
                </SelectItem>
            )),
        []
    );

    const renderNumberSelectOptions = useCallback(
        (options: number[]) =>
            options.map((num) => (
                <SelectItem value={num.toString()} key={num}>
                    {num}
                </SelectItem>
            )),
        []
    );

    return (
        <div className="container mx-auto py-10 px-5">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
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

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="brand_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Brand</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select brand" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {brands.map((brand) => (
                                                        <SelectItem
                                                            value={brand.id}
                                                            key={brand.id}
                                                        >
                                                            {brand.name}
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
                                    name="model_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Model</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={watchBrandId === ""}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select model" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {models.map((model) => (
                                                        <SelectItem
                                                            value={model.id}
                                                            key={model.id}
                                                        >
                                                            {model.name}
                                                        </SelectItem>
                                                    ))}
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
                                                    {renderSelectOptions(
                                                        TRANSMISSION_OPTIONS
                                                    )}
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
                                                    {renderSelectOptions(
                                                        FUEL_TYPE_OPTIONS
                                                    )}
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
                                                    {renderSelectOptions(
                                                        DRIVE_TYPE_OPTIONS
                                                    )}
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
                                                    {renderSelectOptions(
                                                        BODY_TYPE_OPTIONS
                                                    )}
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
                                                    {renderSelectOptions(
                                                        COLOR_OPTIONS
                                                    )}
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
                                    name="condition"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Condition</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select condition" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {renderSelectOptions(
                                                        CONDITION_OPTIONS
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="doors"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Doors</FormLabel>
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
                                                            <SelectValue placeholder="Doors" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {renderNumberSelectOptions(
                                                            DOOR_OPTIONS
                                                        )}
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
                                                <FormLabel>Seats</FormLabel>
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
                                                            <SelectValue placeholder="Seats" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {renderNumberSelectOptions(
                                                            SEAT_OPTIONS
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Images</CardTitle>
                            <CardDescription>
                                Upload images of your vehicle
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div>
                                <FormLabel>Cover Image</FormLabel>
                                <div
                                    {...getCoverRootProps()}
                                    className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition"
                                >
                                    <input {...getCoverInputProps()} />
                                    {coverPreview ? (
                                        <div className="relative">
                                            <img
                                                src={coverPreview}
                                                alt="Cover preview"
                                                className="mx-auto max-h-60 rounded-md object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCoverImage(null);
                                                    setCoverPreview(null);
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Drag and drop your cover image
                                                here, or click to select
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Recommended size: 1200x800px
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <FormLabel>Gallery Images</FormLabel>
                                <div
                                    {...getGalleryRootProps()}
                                    className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition"
                                >
                                    <input {...getGalleryInputProps()} />
                                    <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Drag and drop your gallery images here,
                                        or click to select
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        You can upload multiple images
                                    </p>
                                </div>

                                {galleryPreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {galleryPreviews.map(
                                            (preview, index) => (
                                                <div
                                                    key={index}
                                                    className="relative group"
                                                >
                                                    <img
                                                        src={preview}
                                                        alt={`Gallery preview ${
                                                            index + 1
                                                        }`}
                                                        className="rounded-md h-32 w-full object-cover"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                                                        onClick={() =>
                                                            removeGalleryImage(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
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

                    <Button
                        type="submit"
                        className="cursor-pointer w-full"
                        variant="outline"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateListingForm;
