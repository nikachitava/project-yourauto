"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const supabase = createClient(cookies());
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Logout error:", error.message);
        return { error: error.message };
    }

    revalidatePath("/");
    redirect("/");
}
