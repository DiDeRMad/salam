import { getPool, ensureDb } from "./pg"
import { Booking } from "./bookings"
import crypto from "crypto"

function rowToBooking(row: Record<string, unknown>): Booking {
  return {
    id: row.id as string,
    name: row.name as string,
    phone: row.phone as string,
    date: row.date as string,
    time: row.time as string,
    table: row.table_num as number,
  }
}

function generateId(): string {
  return crypto.randomBytes(8).toString("hex")
}

export async function getAllBookings(): Promise<Booking[]> {
  await ensureDb()
  const result = await getPool().query(
    "SELECT * FROM bookings ORDER BY date ASC, time ASC, created_at ASC"
  )
  return result.rows.map(rowToBooking)
}

export class SlotTakenError extends Error {
  constructor() {
    super("Стол уже занят на это время")
    this.name = "SlotTakenError"
  }
}

export async function createBooking(data: Omit<Booking, "id">): Promise<Booking> {
  await ensureDb()
  const id = generateId()
  try {
    const result = await getPool().query(
      "INSERT INTO bookings (id, name, phone, date, time, table_num) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, data.name, data.phone, data.date, data.time, data.table]
    )
    return rowToBooking(result.rows[0])
  } catch (e) {
    // 23505 = нарушение уникального индекса (стол уже занят на эту дату/время)
    if (e && typeof e === "object" && "code" in e && e.code === "23505") {
      throw new SlotTakenError()
    }
    throw e
  }
}

export async function updateBookingById(
  id: string,
  updates: Partial<Omit<Booking, "id">>
): Promise<Booking | null> {
  await ensureDb()
  const fields: string[] = []
  const values: (string | number)[] = []
  let i = 1

  if (updates.name !== undefined) { fields.push(`name = $${i++}`); values.push(updates.name) }
  if (updates.phone !== undefined) { fields.push(`phone = $${i++}`); values.push(updates.phone) }
  if (updates.date !== undefined) { fields.push(`date = $${i++}`); values.push(updates.date) }
  if (updates.time !== undefined) { fields.push(`time = $${i++}`); values.push(updates.time) }
  if (updates.table !== undefined) { fields.push(`table_num = $${i++}`); values.push(updates.table) }

  if (fields.length === 0) return null
  values.push(id)

  try {
    const result = await getPool().query(
      `UPDATE bookings SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`,
      values
    )
    if (result.rows.length === 0) return null
    return rowToBooking(result.rows[0])
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "23505") {
      throw new SlotTakenError()
    }
    throw e
  }
}

export async function deleteBookingById(id: string): Promise<boolean> {
  await ensureDb()
  const result = await getPool().query(
    "DELETE FROM bookings WHERE id = $1 RETURNING id",
    [id]
  )
  return result.rows.length > 0
}

export async function getOccupied(date: string, time: string): Promise<number[]> {
  await ensureDb()
  const result = await getPool().query(
    "SELECT table_num FROM bookings WHERE date = $1 AND time = $2",
    [date, time]
  )
  return result.rows.map((r) => r.table_num as number)
}
