import { NextRequest, NextResponse } from "next/server"
import { removeSession } from "@/lib/session"

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("session")?.value
    if (token) await removeSession(token)
  } catch {
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })
  return res
}
