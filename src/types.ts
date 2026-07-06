// ------------------------------------------------------------------
// Core domain types for Redeemed. All persistence flows through these.
// ------------------------------------------------------------------

/** Soft color families each emotion can adopt (mapped to CSS tokens). */
export type EmotionColor = 'sage' | 'amber' | 'peri' | 'rose' | 'ink'

export interface Emotion {
  id: string
  nombre: string
  /** Emoji used as the emotion icon in pickers and history. */
  icono: string
  color: EmotionColor
}

export interface Distorsion {
  id: string
  nombre: string
  descripcion: string
}

export interface Versiculo {
  id: string
  cita: string
  texto: string
}

/** Curated, non-clinical content shown across the daily flow for one emotion. */
export interface EmotionContent {
  emocion: Emotion
  /** Warm validating message (flow step 4). */
  validacion: string
  /** Cognitive distortion most commonly tied to this emotion (step 5). */
  distorsion: Distorsion
  /** Reframing prompt / exercise (step 5). */
  reencuadre: string
  /** Mapped Bible verse (step 6). */
  versiculo: Versiculo
  /** 1–2 concrete small actions (step 7). */
  acciones: string[]
}

/** Category chips shown in flow step 3 ("¿Qué ocurrió?"). */
export interface Categoria {
  id: string
  nombre: string
  icono: string
}

// -------------------- Persisted records --------------------

export interface RegistroDiario {
  id: string
  /** ISO datetime string of when the record was saved. */
  fecha: string
  emocionId: string
  intensidad: number // 0-10
  categoria: string
  nota?: string
  distorsionId?: string
  reestructuracion?: string
  versiculoId: string
  accionId: string
  completado: boolean
}

export type EvidenciaTipo = 'foto' | 'carta' | 'musica' | 'oracion'

export interface Evidencia {
  id: string
  tipo: EvidenciaTipo
  titulo: string
  /** Free text, link, or note depending on `tipo`. */
  contenido?: string
  /** Key of the photo blob stored in IndexedDB (only for `tipo === 'foto'`). */
  imagenId?: string
  fecha: string
}

export interface Racha {
  diasSeguidos: number
  /** ISO date (YYYY-MM-DD) of the last completed day. */
  ultimoDia: string | null
}
