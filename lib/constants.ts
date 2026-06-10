export const VALID_TIMES = [
  "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
]

export const TABLE_COUNT = 12
export const BOOKING_MONTHS_AHEAD = 3
export const SESSION_TTL_HOURS = 24

export const LOGIN_RATE_LIMIT = {
  max: 5,
  windowMs: 15 * 60 * 1000,
}

export const BOOKING_RATE_LIMIT = {
  max: 10,
  windowMs: 60 * 60 * 1000,
}
