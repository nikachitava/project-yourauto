import FilterMenu from "@/components/FilterMenu";
import VehicleCardSection from "@/components/VehicleCardSection";

export default async function Home() {
    return (
        <main className="min-h-screen">
            <FilterMenu />
            <VehicleCardSection />
        </main>
    );
}
