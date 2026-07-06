import type { EmotionContent } from '../types'
import { StepShell } from './StepShell'

interface Props {
  content: EmotionContent
}

export function StepValidation({ content }: Props) {
  return (
    <StepShell paso={4} total={7} titulo="Antes de seguir, esto es válido">
      <div className="rounded-2xl bg-sage-soft p-5 ring-1 ring-sage/25">
        <span className="text-3xl" aria-hidden="true">
          {content.emocion.icono}
        </span>
        <p className="mt-3 font-display text-xl leading-snug text-ink">{content.validacion}</p>
      </div>
      <p className="mt-4 text-center text-sm text-ink-soft">
        Respira. No tienes que resolverla ahora mismo.
      </p>
    </StepShell>
  )
}
