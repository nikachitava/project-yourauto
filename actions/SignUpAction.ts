"use server";

import { RegisterSchema } from "@/schemas/RegisterSchema";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignUpAction(prevState: any, formData: FormData) {
    const supabase = createClient(cookies());
   

    const rawFormData = {
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"), 
        name: formData.get("name"),
        surname: formData.get("surname"),
        phone: formData.get("phone"),
    };

    const result = RegisterSchema.safeParse(rawFormData);

    if (!result.success) {
        const errors = result.error.flatten();
        const firstError = Object.values(errors.fieldErrors)[0]?.[0] || "Validation failed";
        return { error: firstError };
    }


    const { error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
        options: {
            data: {
                name: result.data.name,
                surname: result.data.surname,
                phone: result.data.phone,
            },
        },
    });

    if (error) {
        console.error("Error signing up:", error.message);
        return { error: error.message };
    }
    redirect("/")
}