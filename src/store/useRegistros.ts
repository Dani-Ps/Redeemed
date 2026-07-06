import { useCallback, useSyncExternalStore } from 'react'
import type { RegistroDiario } from '../types'
import { KEYS, makeId, readJSON, writeJSON } from './local'

// ------------------------------------------------------------------
// Registros (daily records) — stored in localStorage, newest first.
// ------------------------------------------------------------------

type Listener = () => void
const listeners = new Set<Listener>()

// Cached snapshot: useSyncExternalStore compares snapshots with Object.is,
// so getSnapshot MUST return a stable reference between renders. We only
// swap the reference when the data actually changes (via commit()).
let cache: RegistroDiario[] | null = null

function read(): RegistroDiario[] {
  if (cache === null) cache = readJSON<RegistroDiario[]>(KEYS.registros, [])
  return cache
}

/** Persist a new value, refresh the cached snapshot and notify subscribers. */
function commit(next: RegistroDiario[]) {
  cache = next
  writeJSON(KEYS.registros, next)
  emit()
}

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Persists a new record (prepended) and returns it. Pure of React. */
export function addRegistro(
  data: Omit<RegistroDiario, 'id' | 'fecha' | 'completado'> &
    Partial<Pick<RegistroDiario, 'fecha' | 'completado'>>,
): RegistroDiario {
  const registro: RegistroDiario = {
    id: makeId(),
    fecha: data.fecha ?? new Date().toISOString(),
    completado: data.completado ?? true,
    emocionId: data.emocionId,
    intensidad: data.intensidad,
    categoria: data.categoria,
    nota: data.nota,
    distorsionId: data.distorsionId,
    reestructuracion: data.reestructuracion,
    versiculoId: data.versiculoId,
    accionId: data.accionId,
  }
  commit([registro, ...read()])
  return registro
}

export function getRegistros(): RegistroDiario[] {
  return read()
}

export function removeRegistro(id: string): void {
  commit(read().filter((r) => r.id !== id))
}

export function useRegistros() {
  const registros = useSyncExternalStore(subscribe, read, read)
  const add = useCallback(addRegistro, [])
  const remove = useCallback(removeRegistro, [])
  return { registros, add, remove }
}
