import crypto from "crypto"
import { getPool, ensureDb } from "./pg"
import { SESSION_TTL_HOURS } from "./constants"

export async function createSession(): Promise<string> {
  await ensureDb()
  const token = crypto.randomBytes(32).toString("hex")
  await getPool().query(
    "INSERT INTO sessions (token) VALUES ($1)",
    [token]
  )
  return token
}

export async function isValidSession(token: string): Promise<boolean> {
  if (!token || token.length !== 64) return false
  await ensureDb()
  const result = await getPool().query(
    "SELECT 1 FROM sessions WHERE token = $1 AND created_at > NOW() - INTERVAL '1 hour' * $2",
    [token, SESSION_TTL_HOURS]
  )
  return result.rows.length > 0
}

export async function removeSession(token: string): Promise<void> {
  await ensureDb()
  await getPool().query("DELETE FROM sessions WHERE token = $1", [token])
}

export async function cleanExpiredSessions(): Promise<void> {
  await ensureDb()
  await getPool().query(
    "DELETE FROM sessions WHERE created_at < NOW() - INTERVAL '1 hour' * $1",
    [SESSION_TTL_HOURS]
  )
}
