"use server";

import { LoginSchema } from "@/schemas/LoginSchema";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LoginAction(prevState: any, formData: FormData) {
    const supabase = createClient(cookies());

    const rawFormData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = LoginSchema.safeParse(rawFormData);

    if (!result.success) {
        const errors = result.error.flatten();
        const firstError = Object.values(errors.fieldErrors)[0]?.[0] || "Validation failed";
        return { error: firstError };
    }


    const { error } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password,
    });

    if (error) {
        console.error("Error signing up:", error.message);
        return { error: error.message };
    }
    redirect("/")
}