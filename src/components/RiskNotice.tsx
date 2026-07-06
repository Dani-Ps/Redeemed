import { Link } from 'react-router-dom'

/**
 * Gently surfaced when the daily note contains a risk signal.
 * IMPORTANT: this never diagnoses and never names a clinical state.
 * It only offers help resources and contacts to fill in.
 */
export function RiskNotice() {
  return (
    <div
      role="status"
      className="animate-rise rounded-2xl bg-rose-soft p-4 ring-1 ring-rose/40"
    >
      <p className="font-display text-lg text-ink">Estamos contigo</p>
      <p className="mt-1 text-sm leading-relaxed text-ink">
        Leerte importa. Si hoy pesa demasiado, hablarlo con alguien puede aliviar. No estás en esto
        a solas.
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink">
        <li>· Busca a una persona de confianza o a tu terapeuta.</li>
        <li>· Si hay peligro inmediato, contacta a los servicios de emergencia de tu país.</li>
      </ul>
      <Link
        to="/ayuda"
        className="mt-3 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper-raised"
      >
        Ver recursos de ayuda
      </Link>
      <p className="mt-2 text-xs text-ink-soft">
        No sustituye la terapia ni la atención médica.
      </p>
    </div>
  )
}
