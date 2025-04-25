import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FilterMenuProvder } from "@/context/FilterMenuProvider";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = createClient(cookies());
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <section>
            <NavBar userData={user} />
            <FilterMenuProvder>
                <div className="pt-20">{children}</div>
            </FilterMenuProvder>
            <Footer />
        </section>
    );
}
