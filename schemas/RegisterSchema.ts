import { z } from "zod";

export const RegisterSchema = z
    .object({
        email: z.string().min(1),
        password: z.string().min(1),
        confirmPassword: z.string().min(1),
    })
    .refine((data) => data.password === data.confirmPassword, {});
