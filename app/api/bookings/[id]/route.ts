import { NextRequest, NextResponse } from "next/server"
import { updateBookingById, deleteBookingById, SlotTakenError } from "@/lib/db"
import { isValidSession } from "@/lib/session"
import { VALID_TIMES, TABLE_COUNT } from "@/lib/constants"
import { sanitize, isValidPhone } from "@/lib/validation"

type RouteContext = { params: Promise<{ id: string }> }

async function isAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("session")?.value
  if (!token) return false
  return isValidSession(token)
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 401 })
    }

    const { id } = await context.params
    if (!id || typeof id !== "string" || id.length > 32) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 })
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Неверный запрос" }, { status: 400 })
    }

    const updates: Record<string, string | number> = {}

    if (typeof body.name === "string") {
      const name = sanitize(body.name)
      if (!name || name.length < 2 || name.length > 100) {
        return NextResponse.json({ error: "Неверное имя" }, { status: 400 })
      }
      updates.name = name
    }

    if (typeof body.phone === "string") {
      const phone = sanitize(body.phone)
      if (!isValidPhone(phone)) {
        return NextResponse.json({ error: "Неверный формат телефона" }, { status: 400 })
      }
      updates.phone = phone
    }

    if (typeof body.date === "string") {
      if (!/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/.test(body.date)) {
        return NextResponse.json({ error: "Неверная дата" }, { status: 400 })
      }
      updates.date = body.date
    }

    if (typeof body.time === "string") {
      if (!VALID_TIMES.includes(body.time)) {
        return NextResponse.json({ error: "Неверное время" }, { status: 400 })
      }
      updates.time = body.time
    }

    if (typeof body.table === "number") {
      if (!Number.isInteger(body.table) || body.table < 1 || body.table > TABLE_COUNT) {
        return NextResponse.json({ error: "Неверный номер стола" }, { status: 400 })
      }
      updates.table = body.table
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Нет данных для обновления" }, { status: 400 })
    }

    const booking = await updateBookingById(id, updates)
    if (!booking) return NextResponse.json({ error: "Бронирование не найдено" }, { status: 404 })
    return NextResponse.json(booking)
  } catch (e) {
    if (e instanceof SlotTakenError) {
      return NextResponse.json({ error: e.message }, { status: 409 })
    }
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 401 })
    }

    const { id } = await context.params
    if (!id || typeof id !== "string" || id.length > 32) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 })
    }

    const deleted = await deleteBookingById(id)
    if (!deleted) return NextResponse.json({ error: "Бронирование не найдено" }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
