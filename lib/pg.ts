import { Pool, types } from "pg"
import { TABLE_COUNT } from "./constants"

types.setTypeParser(1082, (val: string) => val)

let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set")
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    })

    pool.on("error", () => {
      pool = null
    })
  }
  return pool
}

export async function initDb(): Promise<void> {
  const db = getPool()
  await db.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id          VARCHAR(20)  PRIMARY KEY,
      name        VARCHAR(100) NOT NULL,
      phone       VARCHAR(20)  NOT NULL,
      date        DATE         NOT NULL,
      time        VARCHAR(5)   NOT NULL,
      table_num   SMALLINT     NOT NULL CHECK (table_num BETWEEN 1 AND ${TABLE_COUNT}),
      created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    )
  `)
  await db.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      token       VARCHAR(64)  PRIMARY KEY,
      created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    )
  `)
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings (date, time)
  `)
  await db.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS uniq_bookings_slot ON bookings (date, time, table_num)
  `)
}

let initialized = false

export async function ensureDb(): Promise<void> {
  if (!initialized) {
    await initDb()
    initialized = true
  }
}
