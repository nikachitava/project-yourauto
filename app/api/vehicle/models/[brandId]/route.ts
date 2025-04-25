import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { brandId: string } }
) {
  try {
    const brandId = context.params.brandId;

    if (!brandId) {
      return NextResponse.json({ error: "Invalid brand ID" }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("vehicle_models")
      .select("*")
      .eq("brand_id", brandId)
      .order("name");

    if (error) {
      console.error("Error fetching models:", error);
      return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
