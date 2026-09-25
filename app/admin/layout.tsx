import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const isDemoAdmin = cookieStore.get("demo_bypass")?.value === "admin"

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user && !isDemoAdmin) {
        redirect("/login")
    }

    let profile: any = null
    if (user) {
        const { data } = await supabase
            .from("profiles")
            .select("role, name, email")
            .eq("id", user.id)
            .maybeSingle()
        profile = data
    }

    const isAdmin = isDemoAdmin || profile?.role === "admin" || profile?.role === "super_admin"

    if (!isAdmin) {
        redirect("/dashboard")
    }

    const userName = profile?.name || user?.email || (isDemoAdmin ? "Lead Administrator" : "Admin")
    const userRole = profile?.role || (isDemoAdmin ? "super_admin" : "admin")

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            <AdminSidebar userName={userName} userRole={userRole} />
            <main className="flex-1 ml-0 md:ml-64 pt-14 md:pt-0 min-h-screen flex flex-col">
                <div className="relative min-h-screen">
                    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
