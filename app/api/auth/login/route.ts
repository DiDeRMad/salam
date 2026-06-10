import { NextRequest, NextResponse } from "next/server"
import { createSession } from "@/lib/session"
import { LOGIN_RATE_LIMIT, SESSION_TTL_HOURS } from "@/lib/constants"
import bcrypt from "bcryptjs"

const loginAttempts = new Map<string, { count: number; ts: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  // Периодически чистим устаревшие записи, чтобы Map не рос бесконечно
  if (loginAttempts.size > 5000) {
    for (const [key, rec] of loginAttempts) {
      if (now - rec.ts > LOGIN_RATE_LIMIT.windowMs) loginAttempts.delete(key)
    }
  }
  const rec = loginAttempts.get(ip)
  if (!rec || now - rec.ts > LOGIN_RATE_LIMIT.windowMs) {
    loginAttempts.set(ip, { count: 1, ts: now })
    return true
  }
  if (rec.count >= LOGIN_RATE_LIMIT.max) return false
  rec.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Слишком много попыток. Попробуйте через 15 минут." },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body.password !== "string" || body.password.length > 128) {
      return NextResponse.json({ error: "Неверный запрос" }, { status: 400 })
    }

    const hash = process.env.ADMIN_PASSWORD_HASH
    if (!hash) {
      return NextResponse.json({ error: "Сервер не настроен" }, { status: 503 })
    }

    const valid = await bcrypt.compare(body.password, hash)
    if (!valid) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
    }

    const token = await createSession()
    const res = NextResponse.json({ ok: true })
    res.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_TTL_HOURS * 60 * 60,
      secure: process.env.NODE_ENV === "production",
    })
    return res
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
