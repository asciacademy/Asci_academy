import { NextResponse } from "next/server"
import { getPublicProfile } from "@/app/actions/user"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ profile: null, error: "Username parameter is required." }, { status: 400 })
  }

  try {
    const profile = await getPublicProfile(username)
    if (!profile) {
      return NextResponse.json({ profile: null, error: "Profile not found or is private." }, { status: 404 })
    }

    return NextResponse.json({ profile }, { status: 200 })
  } catch (error: any) {
    console.error("Error in /api/user/profile:", error)
    return NextResponse.json({ profile: null, error: "Internal server error." }, { status: 500 })
  }
}
