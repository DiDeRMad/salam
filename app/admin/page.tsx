"use client"

import { useState, useEffect } from "react"
import { Booking } from "@/lib/bookings"
import {
  PencilEdit01Icon,
  Delete01Icon,
  Tick01Icon,
  Cancel01Icon,
  ArrowUpDownIcon,
  Logout01Icon,
  LockPasswordIcon,
  UserGroupIcon,
  Calendar01Icon,
  ArrowLeft01Icon,
} from "hugeicons-react"
import Link from "next/link"
import { VALID_TIMES, TABLE_COUNT } from "@/lib/constants"
import { formatDateRu } from "@/lib/format"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Booking>>({})
  const [sortAsc, setSortAsc] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [actionError, setActionError] = useState("")

  useEffect(() => {
    fetch("/api/auth/check")
      .then((r) => {
        if (r.ok) {
          setIsLoggedIn(true)
          loadBookings()
        }
      })
      .finally(() => setChecking(false))
  }, [])

  const loadBookings = async () => {
    const r = await fetch("/api/bookings")
    if (r.ok) {
      const data = await r.json()
      setBookings(data)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await r.json()
      if (r.ok) {
        setIsLoggedIn(true)
        setPassword("")
        loadBookings()
      } else {
        setError(data.error || "Ошибка входа")
      }
    } catch {
      setError("Ошибка соединения")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setIsLoggedIn(false)
    setBookings([])
  }

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      const r = await fetch(`/api/bookings/${id}`, { method: "DELETE" })
      if (r.ok) {
        setDeleteConfirm(null)
        loadBookings()
      }
    } else {
      setDeleteConfirm(id)
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  const handleEdit = (booking: Booking) => {
    setEditingId(booking.id)
    setEditForm({ ...booking })
    setDeleteConfirm(null)
  }

  const handleSave = async () => {
    if (!editingId || !editForm) return
    setActionError("")
    const r = await fetch(`/api/bookings/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
    if (r.ok) {
      setEditingId(null)
      setEditForm({})
      loadBookings()
    } else {
      const data = await r.json().catch(() => ({}))
      setActionError(data.error || "Не удалось сохранить изменения")
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleSort = () => {
    const sorted = [...bookings].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return sortAsc ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    })
    setBookings(sorted)
    setSortAsc(!sortAsc)
  }

  const todayStr = new Date().toISOString().split("T")[0]
  const activeBookings = bookings.filter((b) => b.date >= todayStr)
  const todayBookings = bookings.filter((b) => b.date === todayStr)

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary/20 rotate-45" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-accent/20 -rotate-12" />
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 w-full max-w-sm relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-6"
          >
            <ArrowLeft01Icon className="w-4 h-4" />
            На сайт
          </Link>

          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LockPasswordIcon className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-center text-foreground mb-2">Панель управления</h1>
          <p className="text-center text-muted-foreground text-sm mb-8">Введите пароль для входа</p>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                className="w-full px-4 py-3 border border-border rounded-xl bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted-foreground/50"
                placeholder="Введите пароль"
                autoComplete="current-password"
              />
              {error && (
                <p className="text-accent text-sm mt-2 flex items-center gap-1">
                  <Cancel01Icon className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-background py-3 rounded-xl font-bold hover:bg-primary/80 transition-all shadow-lg shadow-primary/30 disabled:opacity-60"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>

          <p className="text-center text-muted-foreground/60 text-xs mt-6">Только для персонала ресторана</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-background font-bold text-xl">С</span>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Панель управления</h1>
              <p className="text-muted-foreground text-xs">Бронирования ресторана</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors text-sm"
            >
              <ArrowLeft01Icon className="w-4 h-4" />
              На сайт
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
            >
              <Logout01Icon className="w-4 h-4" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                <Calendar01Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                <p className="text-muted-foreground text-sm">Всего бронирований</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center shrink-0">
                <UserGroupIcon className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeBookings.length}</p>
                <p className="text-muted-foreground text-sm">Активных</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
                <Calendar01Icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{todayBookings.length}</p>
                <p className="text-muted-foreground text-sm">На сегодня</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="font-bold text-foreground text-lg">Список бронирований</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSort}
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <ArrowUpDownIcon className="w-4 h-4" />
                По дате {sortAsc ? "↑" : "↓"}
              </button>
              <button
                onClick={loadBookings}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Обновить
              </button>
            </div>
          </div>

          {actionError && (
            <div className="mx-4 mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-2">
              <Cancel01Icon className="w-4 h-4 text-destructive shrink-0" />
              <span className="text-destructive text-sm">{actionError}</span>
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-border/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar01Icon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">Нет бронирований</p>
              <p className="text-muted-foreground/60 text-sm mt-1">Бронирования появятся здесь после создания</p>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">№</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Имя</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Телефон</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Дата</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Время</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Стол</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {bookings.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className={`hover:bg-muted/50 transition-colors ${booking.date < todayStr ? "opacity-50" : ""}`}
                      >
                        <td className="px-4 py-4 text-sm text-muted-foreground">{index + 1}</td>
                        <td className="px-4 py-4 text-sm">
                          {editingId === booking.id ? (
                            <input
                              type="text"
                              value={editForm.name || ""}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          ) : (
                            <span className="text-foreground font-medium">{booking.name}</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {editingId === booking.id ? (
                            <input
                              type="text"
                              value={editForm.phone || ""}
                              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          ) : (
                            <span className="text-muted-foreground">{booking.phone}</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {editingId === booking.id ? (
                            <input
                              type="date"
                              value={editForm.date || ""}
                              onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          ) : (
                            <span className="text-muted-foreground">{formatDateRu(booking.date)}</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {editingId === booking.id ? (
                            <select
                              value={editForm.time || ""}
                              onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              {VALID_TIMES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-primary font-medium">{booking.time}</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {editingId === booking.id ? (
                            <select
                              value={editForm.table ?? ""}
                              onChange={(e) => setEditForm({ ...editForm, table: Number(e.target.value) })}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-primary text-background rounded-lg font-bold">
                              {booking.table}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {editingId === booking.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={handleSave}
                                className="p-2 bg-success/20 text-success rounded-lg hover:bg-success/30 transition-colors"
                              >
                                <Tick01Icon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="p-2 bg-muted-foreground/20 text-muted-foreground rounded-lg hover:bg-muted-foreground/30 transition-colors"
                              >
                                <Cancel01Icon className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(booking)}
                                className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                              >
                                <PencilEdit01Icon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(booking.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  deleteConfirm === booking.id
                                    ? "bg-destructive text-destructive-foreground"
                                    : "bg-accent/20 text-accent hover:bg-accent/30"
                                }`}
                              >
                                <Delete01Icon className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden divide-y divide-border">
                {bookings.map((booking) => (
                  <div key={booking.id} className={`p-4 ${booking.date < todayStr ? "opacity-50" : ""}`}>
                    {editingId === booking.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          placeholder="Имя"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="text"
                          value={editForm.phone || ""}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder="Телефон"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            value={editForm.date || ""}
                            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <select
                            value={editForm.time || ""}
                            onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            {VALID_TIMES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <select
                          value={editForm.table ?? ""}
                          onChange={(e) => setEditForm({ ...editForm, table: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>Стол {n}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="flex-1 py-2 bg-success/20 text-success rounded-lg hover:bg-success/30 transition-colors text-sm font-medium"
                          >
                            Сохранить
                          </button>
                          <button
                            onClick={handleCancel}
                            className="flex-1 py-2 bg-muted-foreground/20 text-muted-foreground rounded-lg hover:bg-muted-foreground/30 transition-colors text-sm font-medium"
                          >
                            Отмена
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-foreground font-medium">{booking.name}</p>
                            <p className="text-muted-foreground text-sm">{booking.phone}</p>
                          </div>
                          <span className="inline-flex items-center justify-center w-9 h-9 bg-primary text-background rounded-lg font-bold text-sm">
                            {booking.table}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-muted-foreground text-sm">{formatDateRu(booking.date)}</span>
                            <span className="text-primary font-medium text-sm">{booking.time}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(booking)}
                              className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                            >
                              <PencilEdit01Icon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                deleteConfirm === booking.id
                                  ? "bg-destructive text-destructive-foreground"
                                  : "bg-accent/20 text-accent hover:bg-accent/30"
                              }`}
                            >
                              <Delete01Icon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
