import type { EmotionContent } from '../types'
import { cn } from '../lib/cn'
import { StepShell } from './StepShell'

interface Props {
  content: EmotionContent
  accionId: string | null
  onAccion: (id: string) => void
}

export function StepAction({ content, accionId, onAccion }: Props) {
  return (
    <StepShell
      paso={7}
      total={7}
      titulo="Un paso pequeño para hoy"
      intro="Elige una acción concreta. Pequeña y posible es más que suficiente."
    >
      <div className="flex flex-col gap-3">
        {content.acciones.map((accion, i) => {
          const id = `accion-${i}`
          const selected = accionId === id
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              onClick={() => onAccion(id)}
              className={cn(
                'rounded-2xl p-4 text-left text-[15px] leading-relaxed transition-all duration-200 ring-1',
                selected
                  ? 'bg-sage-soft text-ink ring-2 ring-sage'
                  : 'bg-paper-raised text-ink-soft ring-line hover:ring-sage/50',
              )}
            >
              <span className="mr-2" aria-hidden="true">
                {selected ? '🌱' : '·'}
              </span>
              {accion}
            </button>
          )
        })}
      </div>
    </StepShell>
  )
}
