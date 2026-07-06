// Spanish-friendly date helpers (Intl, no dependency).

const fmtFecha = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const fmtCorta = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' })

export function fechaLarga(iso: string): string {
  return fmtFecha.format(new Date(iso))
}

export function fechaCorta(iso: string): string {
  return fmtCorta.format(new Date(iso))
}

/** Time-of-day greeting in Spanish. */
export function saludoDelDia(date: Date = new Date()): string {
  const h = date.getHours()
  if (h < 6) return 'Buenas noches'
  if (h < 13) return 'Buenos días'
  if (h < 20) return 'Buenas tardes'
  return 'Buenas noches'
}
