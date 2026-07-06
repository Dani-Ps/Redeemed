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
      'Si tu vida o la de alguien corre peligro inmediato, contacta a los servicios de emergencia de tu país.',
    contacto: 'Número de emergencias local — por completar',
    porCompletar: true,
  },
  {
    id: 'linea-crisis',
    titulo: 'Línea de ayuda emocional',
    descripcion:
      'Líneas de escucha y prevención atendidas por personas capacitadas, disponibles según tu región.',
    contacto: 'Línea de crisis regional — por completar',
    porCompletar: true,
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
