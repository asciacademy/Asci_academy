import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/login")

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, name, email")
        .eq("id", user.id)
        .single()

    if (!profile || (profile.role !== "admin" && profile.role !== "super_admin")) {
        redirect("/dashboard")
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            <AdminSidebar userName={profile.name || user.email || "Admin"} userRole={profile.role} />
            <main className="flex-1 ml-0 md:ml-64 pt-14 md:pt-0 min-h-screen flex flex-col">
                <div className="relative min-h-screen">
                    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
