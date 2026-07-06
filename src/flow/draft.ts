// Working draft for the daily flow before it becomes a RegistroDiario.
export interface FlowDraft {
  emocionId: string | null
  intensidad: number
  categoria: string | null
  nota: string
  reestructuracion: string
  accionId: string | null
}

export const DRAFT_INICIAL: FlowDraft = {
  emocionId: null,
  intensidad: 5,
  categoria: null,
  nota: '',
  reestructuracion: '',
  accionId: null,
}

export const TOTAL_PASOS = 7
