import { useCallback, useSyncExternalStore } from 'react'
import type { Evidencia } from '../types'
import { KEYS, makeId, readJSON, writeJSON } from './local'
import { deletePhoto, savePhoto } from './photoDb'

// ------------------------------------------------------------------
// Evidencias de Gracia — metadata in localStorage, photo blobs in
// IndexedDB (referenced by imagenId).
// ------------------------------------------------------------------

type Listener = () => void
const listeners = new Set<Listener>()

// Cached snapshot — getSnapshot must return a stable reference between
// renders (see useRegistros for the full explanation).
let cache: Evidencia[] | null = null

function read(): Evidencia[] {
  if (cache === null) cache = readJSON<Evidencia[]>(KEYS.evidencias, [])
  return cache
}

function commit(next: Evidencia[]) {
  cache = next
  writeJSON(KEYS.evidencias, next)
  emit()
}

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export interface NuevaEvidencia {
  tipo: Evidencia['tipo']
  titulo: string
  contenido?: string
  /** Optional photo blob; only used for tipo === 'foto'. */
  foto?: Blob
}

async function add(nueva: NuevaEvidencia): Promise<Evidencia> {
  let imagenId: string | undefined
  if (nueva.tipo === 'foto' && nueva.foto) {
    imagenId = makeId()
    await savePhoto(imagenId, nueva.foto)
  }
  const evidencia: Evidencia = {
    id: makeId(),
    tipo: nueva.tipo,
    titulo: nueva.titulo,
    contenido: nueva.contenido,
    imagenId,
    fecha: new Date().toISOString(),
  }
  commit([evidencia, ...read()])
  return evidencia
}

async function remove(id: string): Promise<void> {
  const evidencia = read().find((e) => e.id === id)
  if (evidencia?.imagenId) {
    await deletePhoto(evidencia.imagenId)
  }
  commit(read().filter((e) => e.id !== id))
}

export function useEvidencias() {
  const evidencias = useSyncExternalStore(subscribe, read, read)
  return {
    evidencias,
    add: useCallback(add, []),
    remove: useCallback(remove, []),
  }
}
