import type { EmotionContent } from '../types'
import { StepShell } from './StepShell'

interface Props {
  content: EmotionContent
}

export function StepVerse({ content }: Props) {
  return (
    <StepShell paso={6} total={7} titulo="Una palabra para hoy">
      <figure className="rounded-2xl bg-peri-soft p-6 text-center ring-1 ring-peri/25">
        <span className="text-2xl" aria-hidden="true">
          ✝️
        </span>
        <blockquote className="mt-3 font-display text-xl leading-snug text-ink">
          «{content.versiculo.texto}»
        </blockquote>
        <figcaption className="mt-3 text-sm font-semibold text-peri">
          {content.versiculo.cita}
        </figcaption>
      </figure>
      <p className="mt-4 text-center text-sm text-ink-soft">
        Déjala reposar un momento antes de continuar.
      </p>
    </StepShell>
  )
}
