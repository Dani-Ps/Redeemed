// ------------------------------------------------------------------
// Thin, typed localStorage wrapper. The ONLY place raw localStorage is
// touched. Everything else goes through the hooks.
// ------------------------------------------------------------------

const PREFIX = 'redeemed:'

export const KEYS = {
  registros: `${PREFIX}registros`,
  evidencias: `${PREFIX}evidencias`,
  racha: `${PREFIX}racha`,
} as const

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    // Corrupt or unavailable storage: fall back gracefully.
    return fallback
  }
}

export function writeJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or blocked (e.g. private mode). Data stays in memory
    // for this session; we do not crash the UI over persistence.
  }
}

/** Small unique id without extra dependencies. */
export function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}
