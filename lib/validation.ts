export function sanitize(str: string): string {
  return str.trim().replace(/[<>"'\\;]/g, "").slice(0, 200)
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-()]/g, "")
  return /^\+?\d{7,20}$/.test(digits)
}
