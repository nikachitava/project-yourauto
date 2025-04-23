import { z } from "zod";

export const RegisterSchema = z
    .object({
        name: z
            .string()
            .min(1, "First name is required")
            .max(50, "First name must be less than 50 characters"),

        surname: z
            .string()
            .min(1, "Last name is required")
            .max(50, "Last name must be less than 50 characters"),

        phone: z
            .string()
            .min(1, "Phone number is required")
            .regex(
                /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,3}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                "Please enter a valid phone number"
            ),

        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least one special character"
            ),

        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
