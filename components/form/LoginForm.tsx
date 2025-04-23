"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import CustomFormField from "../Custom/CustomFormField";
import { LoginSchema } from "@/schemas/LoginSchema";
import { useActionState } from "react";
import { LoginAction } from "@/actions/LoginAction";

const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [state, formAction, isPending] = useActionState(
        LoginAction,
        undefined
    );

    return (
        <div>
            <Form {...form}>
                <form
                    action={formAction}
                    className="space-y-8 max-w-3xl mx-auto py-10"
                >
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

                    <Link
                        href={"/auth/register"}
                        className="text-xs text-primary hover:text-muted/70 transition-all duration-400"
                    >
                        I don't have an account
                    </Link>
                    {state?.error && (
                        <div className="text-status-error text-sm mt-2">
                            {state?.error}
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full cursor-pointer mt-2"
                    >
                        {isPending ? "Loading..." : "Login"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
