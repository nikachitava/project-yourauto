"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import CustomFormField from "../Custom/CustomFormField";
import { RegisterSchema } from "@/schemas/RegisterSchema";

const RegisterForm = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
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
