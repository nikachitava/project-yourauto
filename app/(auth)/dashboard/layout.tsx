import AdminNavBar from "@/components/Admin/AdminNavBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <AdminNavBar />
            {children}
        </section>
    );
}
