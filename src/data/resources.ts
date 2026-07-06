// ------------------------------------------------------------------
// Help resources. These are PLACEHOLDERS on purpose: the app has no
// verified regional hotlines yet. Each item is clearly marked as
// "por completar" so it is obvious what must be filled before release.
// ------------------------------------------------------------------

export interface Recurso {
  id: string
  titulo: string
  descripcion: string
  /** Visible placeholder for a phone/contact to be filled in later. */
  contacto: string
  /** Whether this entry still needs real, verified data. */
  porCompletar: boolean
}

export const RECURSOS: Recurso[] = [
  {
    id: 'emergencias',
    titulo: 'Emergencias',
    descripcion:
      'Si tu vida o la de alguien corre peligro inmediato, llama al servicio de emergencias. Atienden 24 h.',
    contacto: '112 — Emergencias (España)',
    porCompletar: false,
  },
  {
    id: 'linea-crisis',
    titulo: 'Línea de atención a la conducta suicida',
    descripcion:
      'Escucha y prevención por profesionales, de forma gratuita, confidencial y disponible las 24 horas.',
    contacto: '024 — Línea 024 (España, gratuita y 24 h)',
    porCompletar: false,
  },
  {
    id: 'persona-confianza',
    titulo: 'Persona de confianza',
    descripcion:
      'Alguien cercano con quien puedas hablar hoy: familiar, amigo o líder de tu comunidad de fe.',
    contacto: 'Anota aquí tu contacto de confianza — por completar',
    porCompletar: true,
  },
  {
    id: 'terapeuta',
    titulo: 'Terapeuta o profesional de salud mental',
    descripcion:
      'La ayuda profesional es un acto de valentía. Un terapeuta puede acompañarte con herramientas adecuadas.',
    contacto: 'Datos de tu terapeuta o centro de salud — por completar',
    porCompletar: true,
  },
  {
    id: 'comunidad-fe',
    titulo: 'Comunidad de fe',
    descripcion:
      'Tu iglesia o grupo pequeño puede ser un espacio de oración y acompañamiento cercano.',
    contacto: 'Contacto de tu comunidad — por completar',
    porCompletar: true,
  },
]

export const DISCLAIMER = 'No sustituye la terapia ni la atención médica.'
