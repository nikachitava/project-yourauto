import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request, context: any) {
    try {
        const { params } = context;
        const ownerId = params.ownerId as string;
        if (!ownerId || ownerId.length === 0) {
            return NextResponse.json(
                { error: "owner ID is required" },
                { status: 400 }
            );
        }

        if (!ownerId) {
            return NextResponse.json(
                { error: "Invalid owner ID" },
                { status: 400 }
            );
        }

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data, error } = await supabase
        .from('vehicles')
        .select(`
            *,
            vehicle_brands!brand_id(name)
          `)
        .eq('owner_id', ownerId);

        if (error) {
            console.error("Error fetching vehicles by owner id:", error);
            return NextResponse.json(
                { error: "Failed to fetch vehicles by owner id" },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
