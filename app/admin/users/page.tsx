"use client"

import { useEffect, useState, useTransition } from "react"
import { getAllUsers, updateUserRole, updateUserXP, deleteUser, banUser } from "@/app/actions/admin"
import { format } from "date-fns"
import {
    Users, Shield, Trash2, Loader2, Search,
    RefreshCw, UserX, UserCheck, Edit2, Check, X
} from "lucide-react"

type Role = "user" | "admin" | "super_admin"

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [search, setSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState<"all" | Role>("all")
    const [editingXP, setEditingXP] = useState<{ id: string; val: string } | null>(null)
    const [actionId, setActionId] = useState<string | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

    const notify = (type: "ok" | "err", msg: string) => {
        setToast({ type, msg })
        setTimeout(() => setToast(null), 3000)
    }

    const load = () => startTransition(async () => {
        const res = await getAllUsers()
        if (res.success && res.users) setUsers(res.users)
        else notify("err", res.error || "Failed to load users")
        setLoading(false)
    })

    useEffect(() => { load() }, [])

    const handleRoleChange = async (userId: string, role: Role) => {
        setActionId(userId)
        const res = await updateUserRole(userId, role)
        if (res.success) {
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u))
            notify("ok", `Role updated to ${role}`)
        } else notify("err", res.error || "Failed")
        setActionId(null)
    }

    const handleXPSave = async (userId: string) => {
        if (!editingXP) return
        setActionId(userId)
        const res = await updateUserXP(userId, parseInt(editingXP.val) || 0)
        if (res.success) {
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, xp: parseInt(editingXP.val) } : u))
            notify("ok", "XP updated")
        } else notify("err", res.error || "Failed")
        setEditingXP(null)
        setActionId(null)
    }

    const handleBan = async (userId: string, isBanned: boolean) => {
        setActionId(userId)
        const res = await banUser(userId, !isBanned)
        if (res.success) {
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_banned: !isBanned } : u))
            notify("ok", isBanned ? "User unbanned" : "User suspended")
        } else notify("err", res.error || "Failed")
        setActionId(null)
    }

    const handleDelete = async (userId: string) => {
        setActionId(userId)
        const res = await deleteUser(userId)
        if (res.success) {
            setUsers(prev => prev.filter(u => u.id !== userId))
            notify("ok", "User account removed")
        } else notify("err", res.error || "Failed")
        setDeleteConfirm(null)
        setActionId(null)
    }

    const filtered = users.filter(u => {
        const q = search.toLowerCase()
        const matchSearch = !q || (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q)
        const matchRole = roleFilter === "all" || u.role === roleFilter
        return matchSearch && matchRole
    })

    if (loading) return (
        <div className="flex justify-center items-center p-24 font-mono text-xs text-primary">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading student directory...
        </div>
    )

    return (
        <div className="space-y-8 pt-2 font-sans text-foreground">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider shadow-lg ${
                    toast.type === "ok" ? "bg-card border-primary/40 text-foreground" : "bg-card border-destructive/40 text-destructive"
                }`}>
                    {toast.type === "ok" ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-destructive" />}
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2">
                        Scholar Directory
                    </div>
                    <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                        User Management <span className="text-muted-foreground text-xl">({filtered.length})</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-sans">
                        Assign academic clearance roles, calibrate XP computation rewards, and enforce account governance.
                    </p>
                </div>
                <button
                    onClick={load}
                    disabled={isPending}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-mono uppercase tracking-wider font-semibold transition-all shrink-0 cursor-pointer"
                >
                    <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} /> Refresh
                </button>
            </div>

            {/* Search and Role Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by scholar name or email..."
                        className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary font-sans placeholder:text-muted-foreground"
                    />
                </div>
                <div className="flex bg-secondary/40 border border-border rounded-xl p-0.5">
                    {(["all", "user", "admin", "super_admin"] as const).map(r => (
                        <button
                            key={r}
                            onClick={() => setRoleFilter(r)}
                            className={`px-3.5 py-2 text-[10px] font-mono uppercase tracking-wider transition-all rounded-lg cursor-pointer ${
                                roleFilter === r
                                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {r === "all" ? "All" : r === "super_admin" ? "Super Admin" : r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-card/70 backdrop-blur-xl border border-border/80 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-secondary/30">
                            <tr>
                                <th className="px-5 py-3.5 text-left text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Scholar</th>
                                <th className="px-5 py-3.5 text-left text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Role</th>
                                <th className="px-5 py-3.5 text-left text-[10px] font-mono uppercase tracking-widest text-muted-foreground">XP Score</th>
                                <th className="px-5 py-3.5 text-left text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Enrolled</th>
                                <th className="px-5 py-3.5 text-left text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Last Activity</th>
                                <th className="px-5 py-3.5 text-right text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.map(u => (
                                <tr key={u.id} className={`hover:bg-secondary/20 transition-colors ${u.is_banned ? "opacity-50" : ""}`}>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                                                {(u.name || u.email || "?")[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-foreground text-xs font-sans flex items-center gap-2">
                                                    {u.name || "Scholar"}
                                                    {u.is_banned && (
                                                        <span className="text-[9px] text-destructive bg-destructive/10 font-mono px-1.5 py-0.5 rounded border border-destructive/20">
                                                            SUSPENDED
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-[11px] text-muted-foreground font-mono">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <select
                                            value={u.role || "user"}
                                            disabled={actionId === u.id}
                                            onChange={e => handleRoleChange(u.id, e.target.value as Role)}
                                            className="bg-card border border-border rounded-lg text-[11px] font-mono text-foreground px-2.5 py-1 focus:outline-none focus:border-primary uppercase tracking-wider cursor-pointer"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                            <option value="super_admin">Super Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        {editingXP?.id === u.id ? (() => {
                                            const xpEdit = editingXP!
                                            return (
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="number"
                                                        value={xpEdit.val}
                                                        onChange={e => setEditingXP({ id: u.id, val: e.target.value })}
                                                        className="w-20 bg-card border border-primary rounded text-primary text-xs font-mono px-2 py-0.5 focus:outline-none"
                                                        autoFocus
                                                    />
                                                    <button onClick={() => handleXPSave(u.id)} className="p-1 text-primary hover:text-primary-active cursor-pointer"><Check className="h-3.5 w-3.5" /></button>
                                                    <button onClick={() => setEditingXP(null)} className="p-1 text-destructive hover:opacity-80 cursor-pointer"><X className="h-3.5 w-3.5" /></button>
                                                </div>
                                            )
                                        })() : (
                                            <button
                                                onClick={() => setEditingXP({ id: u.id, val: String(u.xp || 0) })}
                                                className="text-primary font-mono text-xs font-semibold hover:underline flex items-center gap-1 group cursor-pointer"
                                            >
                                                {(u.xp || 0).toLocaleString()} XP
                                                <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-muted-foreground font-mono">
                                        {format(new Date(u.created_at), "MMM d, yyyy")}
                                    </td>
                                    <td className="px-5 py-3.5 text-xs font-mono">
                                        {u.last_sign_in_at
                                            ? <span className="text-foreground/80 font-medium">{format(new Date(u.last_sign_in_at), "MMM d, yyyy")}</span>
                                            : <span className="text-muted-foreground/50">Never</span>}
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            {/* Ban toggle */}
                                            <button
                                                onClick={() => handleBan(u.id, u.is_banned)}
                                                disabled={actionId === u.id}
                                                title={u.is_banned ? "Reinstate User" : "Suspend User"}
                                                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                                    u.is_banned
                                                        ? "border-rose-500/30 text-rose-500 bg-rose-500/10 hover:bg-rose-500/20"
                                                        : "border-border bg-card text-muted-foreground hover:text-rose-500 hover:border-rose-500/40"
                                                }`}
                                            >
                                                {u.is_banned ? <UserCheck className="h-3.5 w-3.5" /> : <UserX className="h-3.5 w-3.5" />}
                                            </button>

                                            {/* Delete */}
                                            {deleteConfirm === u.id ? (
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => handleDelete(u.id)}
                                                        disabled={actionId === u.id}
                                                        className="px-2 py-1 rounded bg-destructive text-destructive-foreground text-[10px] font-mono hover:bg-destructive/90 transition-all cursor-pointer"
                                                    >
                                                        {actionId === u.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm"}
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirm(null)}
                                                        className="px-2 py-1 rounded border border-border bg-card text-muted-foreground text-[10px] font-mono hover:bg-secondary cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setDeleteConfirm(u.id)}
                                                    className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-all cursor-pointer"
                                                    title="Delete user account"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground font-mono text-xs">
                                        No users found matching query.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
