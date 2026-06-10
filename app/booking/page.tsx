"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Ornament } from "@/components/ornament"
import {
  Cancel01Icon,
  Tick01Icon,
  Calendar01Icon,
  Clock01Icon,
  UserGroupIcon,
  InformationCircleIcon,
  Alert01Icon,
  ArrowDown01Icon,
} from "hugeicons-react"
import { siteConfig } from "@/lib/site-config"
import { VALID_TIMES, TABLE_COUNT } from "@/lib/constants"
import { formatDateRu } from "@/lib/format"

const tables = [
  { id: 1, x: 10, y: 15, seats: 2, type: "small" },
  { id: 2, x: 35, y: 15, seats: 4, type: "medium" },
  { id: 3, x: 60, y: 15, seats: 4, type: "medium" },
  { id: 4, x: 85, y: 15, seats: 2, type: "small" },
  { id: 5, x: 10, y: 45, seats: 6, type: "large" },
  { id: 6, x: 35, y: 45, seats: 4, type: "medium" },
  { id: 7, x: 60, y: 45, seats: 4, type: "medium" },
  { id: 8, x: 85, y: 45, seats: 6, type: "large" },
  { id: 9, x: 10, y: 75, seats: 2, type: "small" },
  { id: 10, x: 35, y: 75, seats: 4, type: "medium" },
  { id: 11, x: 60, y: 75, seats: 4, type: "medium" },
  { id: 12, x: 85, y: 75, seats: 2, type: "small" },
]

export default function BookingPage() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [occupiedTables, setOccupiedTables] = useState<number[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [dateWarning, setDateWarning] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "12:00",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const today = new Date().toISOString().split("T")[0]

  // Для сегодняшней даты скрываем уже прошедшее время
  const availableTimes = (() => {
    if (formData.date !== today) return VALID_TIMES
    const now = new Date()
    const cur = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    return VALID_TIMES.filter((t) => t > cur)
  })()

  // Если выбранное время стало недоступным — переключаемся на ближайшее доступное
  useEffect(() => {
    if (availableTimes.length > 0 && !availableTimes.includes(formData.time)) {
      setFormData((prev) => ({ ...prev, time: availableTimes[0] }))
    }
  }, [formData.date])

  useEffect(() => {
    if (!formData.date || !formData.time) {
      setOccupiedTables([])
      return
    }
    fetch(`/api/bookings/occupied?date=${formData.date}&time=${formData.time}`)
      .then((r) => r.json())
      .then((data) => setOccupiedTables(data.tables || []))
      .catch(() => setOccupiedTables([]))
  }, [formData.date, formData.time])

  const handleTableClick = (tableId: number) => {
    if (!formData.date) {
      setDateWarning(true)
      setTimeout(() => setDateWarning(false), 3000)
      return
    }
    if (occupiedTables.includes(tableId)) return
    setSelectedTable(tableId)
    setShowModal(true)
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = siteConfig.bookingPage.validation.name
    if (!formData.phone.trim()) {
      newErrors.phone = siteConfig.bookingPage.validation.phoneEmpty
    } else if (!/^\+?\d{7,20}$/.test(formData.phone.replace(/[\s\-()]/g, ""))) {
      newErrors.phone = siteConfig.bookingPage.validation.phoneFormat
    }
    if (!formData.date) newErrors.date = siteConfig.bookingPage.validation.date
    if (!formData.time) newErrors.time = siteConfig.bookingPage.validation.time
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || !selectedTable) return

    setSubmitting(true)
    try {
      const r = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, table: selectedTable }),
      })

      if (r.ok) {
        setShowModal(false)
        setShowSuccess(true)
        setFormData({ name: "", phone: "", date: "", time: "12:00" })
        setSelectedTable(null)
        setOccupiedTables([])
        setTimeout(() => setShowSuccess(false), 4000)
      } else {
        const data = await r.json()
        setErrors({ submit: data.error || siteConfig.bookingPage.validation.submitError })
      }
    } catch {
      setErrors({ submit: siteConfig.bookingPage.validation.connError })
    } finally {
      setSubmitting(false)
    }
  }

  const getTableColor = (tableId: number) => {
    if (!formData.date) return "var(--muted)"
    if (occupiedTables.includes(tableId)) return "var(--destructive)"
    if (selectedTable === tableId) return "var(--primary)"
    return "var(--free-table)"
  }

  const getTableSize = (type: string) => {
    switch (type) {
      case "small": return { w: 12, h: 12 }
      case "large": return { w: 18, h: 14 }
      default: return { w: 15, h: 12 }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-10 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent text-white px-5 py-2 rounded-full text-sm font-bold mb-4">
              {siteConfig.bookingPage.tagline}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {siteConfig.bookingPage.title} <span className="text-primary">{siteConfig.bookingPage.titleHighlight}</span>
            </h1>
            <Ornament />
            <p className="text-muted-foreground max-w-xl mx-auto mt-4">
              {siteConfig.bookingPage.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card border border-border p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Calendar01Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-bold text-lg text-foreground">{siteConfig.bookingPage.dateAndTime}</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">{siteConfig.bookingPage.dateLabel}</label>
                    <div className="relative">
                      <input
                        type="date"
                        min={today}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-xl bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer relative z-10"
                      />
                      <Calendar01Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">{siteConfig.bookingPage.timeLabel}</label>
                    <div className="relative">
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-xl bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer relative z-10"
                      >
                        {availableTimes.length === 0 ? (
                          <option value="">Нет свободного времени на сегодня</option>
                        ) : (
                          availableTimes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))
                        )}
                      </select>
                      <ArrowDown01Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-20" />
                    </div>
                  </div>
                </div>

                {formData.date && (
                  <div className="mt-4 p-3 bg-primary/10 border border-primary/30 rounded-xl">
                    <p className="text-primary text-sm font-medium">
                      {formatDateRu(formData.date)}, {formData.time}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {siteConfig.bookingPage.availableTablesLabel} {TABLE_COUNT - occupiedTables.length} из {TABLE_COUNT}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                    <InformationCircleIcon className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-bold text-lg text-foreground">{siteConfig.bookingPage.legends}</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-6 bg-free-table rounded border border-free-table/20 shadow-[0_0_10px_color-mix(in_srgb,var(--free-table)_20%,transparent)] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">✓</span>
                    </div>
                    <span className="text-foreground text-sm font-medium">{siteConfig.bookingPage.statusFree}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-6 bg-destructive rounded border border-destructive/20 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">✕</span>
                    </div>
                    <span className="text-foreground text-sm font-medium">{siteConfig.bookingPage.statusOccupied}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-6 bg-primary rounded border border-primary/20 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-background">★</span>
                    </div>
                    <span className="text-foreground text-sm font-medium">{siteConfig.bookingPage.statusSelected}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-6 bg-muted opacity-60 rounded border border-border flex items-center justify-center">
                      <span className="text-[10px] font-bold text-muted-foreground">-</span>
                    </div>
                    <span className="text-muted-foreground text-sm">{siteConfig.bookingPage.statusUnavailable}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground/60 text-xs">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>{siteConfig.bookingPage.tableSizes}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card border border-border p-4 md:p-6 rounded-2xl">
                {!formData.date && (
                  <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-xl flex items-center gap-3">
                    <Alert01Icon className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-primary text-sm">{siteConfig.bookingPage.selectDateWarning}</p>
                  </div>
                )}

                <div className="text-center mb-4">
                  <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
                    <Clock01Icon className="w-4 h-4" />
                    {formData.date ? siteConfig.bookingPage.clickTableMsg : siteConfig.bookingPage.schemaMsg}
                  </p>
                </div>

                <svg viewBox="0 0 115 105" className="w-full drop-shadow-2xl" style={{ aspectRatio: "115/105" }}>
                  <rect x="0" y="0" width="115" height="105" fill="var(--background)" rx="4" />

                  <pattern id="floorPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                    <rect width="10" height="10" fill="var(--card)" />
                    <rect x="0" y="0" width="5" height="5" fill="var(--border)" opacity="0.2" />
                    <rect x="5" y="5" width="5" height="5" fill="var(--border)" opacity="0.2" />
                  </pattern>
                  <rect x="2" y="10" width="111" height="88" fill="url(#floorPattern)" rx="2" />

                  <rect x="2" y="2" width="111" height="8" fill="var(--primary)" rx="2" />
                  <text x="57.5" y="6.6" textAnchor="middle" dominantBaseline="middle" fontSize="4" fill="var(--primary-foreground)" fontWeight="bold" letterSpacing="1">{siteConfig.bookingPage.barText}</text>

                  <rect x="42" y="97" width="31" height="6" fill="var(--accent)" rx="2" />
                  <text x="57.5" y="100.5" textAnchor="middle" dominantBaseline="middle" fontSize="3.5" fill="var(--accent-foreground)" fontWeight="bold" letterSpacing="1">{siteConfig.bookingPage.entranceText}</text>

                  <circle cx="8" cy="55" r="2" fill="var(--primary)" opacity="0.5" />
                  <circle cx="8" cy="45" r="1.5" fill="var(--primary)" opacity="0.3" />
                  <circle cx="8" cy="65" r="1.5" fill="var(--primary)" opacity="0.3" />

                  <circle cx="107" cy="55" r="2" fill="var(--primary)" opacity="0.5" />
                  <circle cx="107" cy="45" r="1.5" fill="var(--primary)" opacity="0.3" />
                  <circle cx="107" cy="65" r="1.5" fill="var(--primary)" opacity="0.3" />

                  {tables.map((table) => {
                    const size = getTableSize(table.type)
                    const isOccupied = occupiedTables.includes(table.id)
                    const noDate = !formData.date

                    return (
                      <g
                        key={table.id}
                        onClick={() => handleTableClick(table.id)}
                        className={`transition-all duration-300 ${
                          noDate
                            ? "cursor-default"
                            : isOccupied
                            ? "cursor-not-allowed"
                            : "cursor-pointer hover:drop-shadow-[0_0_4px_var(--primary)]"
                        }`}
                      >
                        <rect
                          x={table.x + 0.5}
                          y={table.y + 1}
                          width={size.w}
                          height={size.h}
                          rx="2"
                          fill="rgba(0,0,0,0.6)"
                        />
                        <rect
                          x={table.x}
                          y={table.y}
                          width={size.w}
                          height={size.h}
                          rx="2"
                          fill={getTableColor(table.id)}
                          stroke="var(--background)"
                          strokeWidth="0.8"
                          opacity={noDate ? 0.6 : 1}
                          className="transition-colors duration-300"
                        />
                        <text
                          x={table.x + size.w / 2}
                          y={table.y + size.h / 2 - 1.5}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="4.5"
                          fill="#ffffff"
                          fontWeight="bold"
                          opacity={noDate ? 0.5 : 1}
                        >
                          {table.id}
                        </text>
                        <text
                          x={table.x + size.w / 2}
                          y={table.y + size.h / 2 + 2.5}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="2"
                          fill="#ffffff"
                          fontWeight="500"
                          opacity={noDate ? 0.4 : 0.9}
                        >
                          {table.seats} {siteConfig.bookingPage.modal.seatsValue}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showModal && selectedTable && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setShowModal(false)
                setSelectedTable(null)
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Cancel01Icon className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <UserGroupIcon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{siteConfig.bookingPage.modal.tableTitle}{selectedTable}</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {tables.find((t) => t.id === selectedTable)?.seats} {siteConfig.bookingPage.modal.seatsValue}
              </p>
              <div className="mt-3 p-2.5 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-primary text-sm font-medium">
                  {formatDateRu(formData.date)}, {formData.time}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">{siteConfig.bookingPage.modal.formNameLabel}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.name ? "border-destructive" : "border-border"
                  }`}
                  placeholder={siteConfig.bookingPage.modal.formNamePlaceholder}
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">{siteConfig.bookingPage.modal.formPhoneLabel}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.phone ? "border-destructive" : "border-border"
                  }`}
                  placeholder={siteConfig.bookingPage.modal.formPhonePlaceholder}
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>

              {errors.submit && (
                <p className="text-destructive text-sm text-center">{errors.submit}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-accent/80 transition-all mt-6 shadow-lg shadow-accent/20 disabled:opacity-60"
              >
                {submitting ? siteConfig.bookingPage.modal.submittingText : siteConfig.bookingPage.modal.submitButton}
              </button>
            </form>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-success text-success-foreground px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 max-w-sm w-full mx-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <Tick01Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold">{siteConfig.bookingPage.success.title}</p>
            <p className="text-sm text-white/80">{siteConfig.bookingPage.success.desc}</p>
          </div>
        </div>
      )}

      {dateWarning && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-background px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 max-w-sm w-full mx-4">
          <Alert01Icon className="w-5 h-5 shrink-0" />
          <p className="font-bold text-sm">{siteConfig.bookingPage.dateWarningPop}</p>
        </div>
      )}

      <Footer />
    </div>
  )
}
