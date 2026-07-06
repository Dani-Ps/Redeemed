import { Link } from 'react-router-dom'
import { DISCLAIMER } from '../data/resources'

/**
 * Permanent, gentle safety note. Shown on Ayuda and after the daily flow.
 * Never claims a clinical state; simply points to help + the disclaimer.
 */
export function SafetyBanner() {
  return (
    <div className="rounded-2xl bg-peri-soft px-4 py-3.5 ring-1 ring-peri/30">
      <p className="text-sm leading-relaxed text-ink">
        Si estás pasando por un momento difícil, no tienes que hacerlo en soledad.{' '}
        <Link to="/ayuda" className="font-semibold underline decoration-peri underline-offset-2">
          Ver recursos de ayuda
        </Link>
        .
      </p>
      <p className="mt-1 text-xs text-ink-soft">{DISCLAIMER}</p>
    </div>
  )
}
