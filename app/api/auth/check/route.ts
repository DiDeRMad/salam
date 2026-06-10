import { NextRequest, NextResponse } from "next/server"
import { isValidSession } from "@/lib/session"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session")?.value
    if (token && (await isValidSession(token))) {
      return NextResponse.json({ authenticated: true })
    }
    return NextResponse.json({ authenticated: false }, { status: 401 })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
