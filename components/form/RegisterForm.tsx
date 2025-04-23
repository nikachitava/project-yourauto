"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import CustomFormField from "../Custom/CustomFormField";

const formSchema = z
    .object({
        email: z.string().min(1),
        password: z.string().min(1),
        confirmPassword: z.string().min(1),
    })
    .refine((data) => data.password === data.confirmPassword, {});

const RegisterForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    return (
        <div>
            <Form {...form}>
                <form className="space-y-8 max-w-3xl mx-auto py-10">
                    <CustomFormField
                        control={form.control}
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="example@gmail.com"
                    />

                    <CustomFormField
                        control={form.control}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                    />

                    <CustomFormField
                        control={form.control}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm password"
                    />
                    <Link
                        href={"/auth/login"}
                        className="text-xs text-primary hover:text-muted/70 transition-all duration-400"
                    >
                        I already have an account
                    </Link>
                    <Button
                        type="submit"
                        className="w-full cursor-pointer mt-2"
                    >
                        REGISTER
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default RegisterForm;
