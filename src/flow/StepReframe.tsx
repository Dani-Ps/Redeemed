import type { EmotionContent } from '../types'
import { StepShell } from './StepShell'

interface Props {
  content: EmotionContent
  reestructuracion: string
  onReestructuracion: (text: string) => void
}

export function StepReframe({ content, reestructuracion, onReestructuracion }: Props) {
  return (
    <StepShell
      paso={5}
      total={7}
      titulo="Miremos el pensamiento de otra forma"
      intro="A veces la mente distorsiona lo que vivimos. Reconocerlo es el primer paso."
    >
      <div className="rounded-2xl bg-amber-soft p-4 ring-1 ring-amber/30">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b98724]">
          Distorsión frecuente
        </p>
        <p className="mt-1 font-display text-lg text-ink">{content.distorsion.nombre}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {content.distorsion.descripcion}
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-paper p-4 ring-1 ring-line">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
          Ejercicio
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink">{content.reencuadre}</p>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-medium text-ink-soft">
          Tu reencuadre (opcional)
        </span>
        <textarea
          value={reestructuracion}
          onChange={(e) => onReestructuracion(e.target.value)}
          rows={3}
          placeholder="Escribe una mirada más amable y realista…"
          className="w-full resize-none rounded-2xl bg-paper p-4 text-[15px] leading-relaxed text-ink ring-1 ring-line placeholder:text-ink-faint focus:ring-2 focus:ring-ink/40"
        />
      </label>
    </StepShell>
  )
}
