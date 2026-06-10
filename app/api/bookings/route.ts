import { NextRequest, NextResponse } from "next/server"
import { getAllBookings, createBooking, getOccupied, SlotTakenError } from "@/lib/db"
import { isValidSession } from "@/lib/session"
import { VALID_TIMES, TABLE_COUNT, BOOKING_MONTHS_AHEAD, BOOKING_RATE_LIMIT } from "@/lib/constants"
import { sanitize, isValidPhone } from "@/lib/validation"

const bookingAttempts = new Map<string, { count: number; ts: number }>()

function checkBookingLimit(ip: string): boolean {
  const now = Date.now()
  // Периодически чистим устаревшие записи, чтобы Map не рос бесконечно
  if (bookingAttempts.size > 5000) {
    for (const [key, rec] of bookingAttempts) {
      if (now - rec.ts > BOOKING_RATE_LIMIT.windowMs) bookingAttempts.delete(key)
    }
  }
  const rec = bookingAttempts.get(ip)
  if (!rec || now - rec.ts > BOOKING_RATE_LIMIT.windowMs) {
    bookingAttempts.set(ip, { count: 1, ts: now })
    return true
  }
  if (rec.count >= BOOKING_RATE_LIMIT.max) return false
  rec.count++
  return true
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session")?.value
    if (!token || !(await isValidSession(token))) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 401 })
    }
    const bookings = await getAllBookings()
    return NextResponse.json(bookings)
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"

    if (!checkBookingLimit(ip)) {
      return NextResponse.json(
        { error: "Слишком много запросов. Попробуйте позже." },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Неверный запрос" }, { status: 400 })
    }

    const name = typeof body.name === "string" ? sanitize(body.name) : ""
    const phone = typeof body.phone === "string" ? sanitize(body.phone) : ""
    const date = typeof body.date === "string" ? body.date.trim() : ""
    const time = typeof body.time === "string" ? body.time.trim() : ""
    const table = Number.isInteger(body.table) ? (body.table as number) : 0

    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Неверное имя" }, { status: 400 })
    }
    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: "Неверный формат телефона" }, { status: 400 })
    }
    if (!date || !/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/.test(date)) {
      return NextResponse.json({ error: "Неверная дата" }, { status: 400 })
    }

    const today = new Date().toISOString().split("T")[0]
    if (date < today) {
      return NextResponse.json({ error: "Нельзя бронировать прошедшие даты" }, { status: 400 })
    }

    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + BOOKING_MONTHS_AHEAD)
    if (date > maxDate.toISOString().split("T")[0]) {
      return NextResponse.json({ error: `Нельзя бронировать более чем на ${BOOKING_MONTHS_AHEAD} месяца вперёд` }, { status: 400 })
    }

    if (!VALID_TIMES.includes(time)) {
      return NextResponse.json({ error: "Неверное время" }, { status: 400 })
    }
    if (table < 1 || table > TABLE_COUNT) {
      return NextResponse.json({ error: "Неверный номер стола" }, { status: 400 })
    }

    const occupied = await getOccupied(date, time)
    if (occupied.includes(table)) {
      return NextResponse.json({ error: "Стол уже занят на это время" }, { status: 409 })
    }

    const booking = await createBooking({ name, phone, date, time, table })
    return NextResponse.json(booking, { status: 201 })
  } catch (e) {
    if (e instanceof SlotTakenError) {
      return NextResponse.json({ error: e.message }, { status: 409 })
    }
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
