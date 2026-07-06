import { ScreenHeader } from '../components/ScreenHeader'
import { Card } from '../components/Card'
import { SafetyBanner } from '../components/SafetyBanner'
import { RECURSOS } from '../data/resources'

export function Resources() {
  return (
    <div className="animate-fade">
      <ScreenHeader
        eyebrow="Ayuda"
        title="Nunca estás solo"
        subtitle="Si lo necesitas, aquí tienes por dónde empezar. Pedir ayuda es un acto de valentía."
      />

      <div className="mb-5">
        <SafetyBanner />
      </div>

      <ul className="space-y-3">
        {RECURSOS.map((r) => (
          <li key={r.id}>
            <Card>
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-lg text-ink">{r.titulo}</h2>
                {r.porCompletar && (
                  <span className="shrink-0 rounded-full bg-amber-soft px-2.5 py-1 text-[11px] font-semibold text-amber">
                    Por completar
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{r.descripcion}</p>
              <p className="mt-3 rounded-xl bg-paper px-3 py-2 text-sm text-ink-faint ring-1 ring-line">
                {r.contacto}
              </p>
            </Card>
          </li>
        ))}
      </ul>

      <p className="mt-6 px-2 text-center text-xs leading-relaxed text-ink-faint">
        Redeemed acompaña, no reemplaza. La información de contacto anterior es un marcador de
        posición hasta contar con líneas verificadas para tu región.
      </p>
    </div>
  )
}
