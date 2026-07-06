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

function read(): Evidencia[] {
  return readJSON<Evidencia[]>(KEYS.evidencias, [])
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
  writeJSON(KEYS.evidencias, [evidencia, ...read()])
  emit()
  return evidencia
}

async function remove(id: string): Promise<void> {
  const evidencia = read().find((e) => e.id === id)
  if (evidencia?.imagenId) {
    await deletePhoto(evidencia.imagenId)
  }
  writeJSON(
    KEYS.evidencias,
    read().filter((e) => e.id !== id),
  )
  emit()
}

export function useEvidencias() {
  const evidencias = useSyncExternalStore(subscribe, read, read)
  return {
    evidencias,
    add: useCallback(add, []),
    remove: useCallback(remove, []),
  }
}
