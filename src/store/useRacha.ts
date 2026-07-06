import { useCallback, useSyncExternalStore } from 'react'
import type { Racha } from '../types'
import { KEYS, readJSON, writeJSON } from './local'
import { applyCompletion, currentStreak, RACHA_INICIAL, toDayKey } from './racha'

// ------------------------------------------------------------------
// Racha (seed streak) — one source of truth for consecutive days.
// ------------------------------------------------------------------

type Listener = () => void
const listeners = new Set<Listener>()

function read(): Racha {
  return readJSON<Racha>(KEYS.racha, RACHA_INICIAL)
}

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Registers today's completion and persists the new streak. */
export function registrarDiaCompletado(): Racha {
  const next = applyCompletion(read(), toDayKey())
  writeJSON(KEYS.racha, next)
  emit()
  return next
}

export function useRacha() {
  const racha = useSyncExternalStore(subscribe, read, read)
  const registrarDia = useCallback(registrarDiaCompletado, [])
  return {
    racha,
    diasSeguidos: currentStreak(racha),
    registrarDia,
  }
}
