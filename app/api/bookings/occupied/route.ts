import { NextRequest, NextResponse } from "next/server"
import { getOccupied } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date") || ""
    const time = searchParams.get("time") || ""

    if (
      !date ||
      !time ||
      !/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/.test(date)
    ) {
      return NextResponse.json({ tables: [] })
    }

    const tables = await getOccupied(date, time)
    return NextResponse.json({ tables })
  } catch {
    return NextResponse.json({ tables: [] })
  }
}
