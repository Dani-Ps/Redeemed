import type { Racha } from '../types'

// ------------------------------------------------------------------
// Pure streak logic (seed growth). No competition — just consecutive
// days of showing up. Kept pure so it is fully unit-tested.
// ------------------------------------------------------------------

export const RACHA_INICIAL: Racha = { diasSeguidos: 0, ultimoDia: null }

/** Local calendar day as YYYY-MM-DD (not UTC, so streaks match the user's day). */
export function toDayKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Whole-day difference between two YYYY-MM-DD keys (b - a). */
export function dayDiff(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00`)
  const db = new Date(`${b}T00:00:00`)
  return Math.round((db.getTime() - da.getTime()) / 86_400_000)
}

/**
 * Applies a completed day to a streak.
 * - first ever completion → 1
 * - same day again → unchanged (one count per day)
 * - consecutive day → +1
 * - any gap → resets to 1
 */
export function applyCompletion(racha: Racha, today: string = toDayKey()): Racha {
  if (!racha.ultimoDia) {
    return { diasSeguidos: 1, ultimoDia: today }
  }
  const diff = dayDiff(racha.ultimoDia, today)
  if (diff <= 0) {
    // Same day (or clock moved back): keep the existing count, anchor to today.
    return { diasSeguidos: Math.max(1, racha.diasSeguidos), ultimoDia: today }
  }
  if (diff === 1) {
    return { diasSeguidos: racha.diasSeguidos + 1, ultimoDia: today }
  }
  return { diasSeguidos: 1, ultimoDia: today }
}

/**
 * Returns the streak "as of today" for display: if the last completed day
 * was before yesterday, the streak has lapsed and shows as 0.
 */
export function currentStreak(racha: Racha, today: string = toDayKey()): number {
  if (!racha.ultimoDia) return 0
  const diff = dayDiff(racha.ultimoDia, today)
  if (diff <= 1) return racha.diasSeguidos
  return 0
}
