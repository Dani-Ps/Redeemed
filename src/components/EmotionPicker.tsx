import { EMOCIONES } from '../data/content'
import { emotionStyle } from '../lib/emotionStyles'
import { cn } from '../lib/cn'

interface EmotionPickerProps {
  value: string | null
  onChange: (emotionId: string) => void
}

/** Grid of emotions (color + icon) for flow step 1. */
export function EmotionPicker({ value, onChange }: EmotionPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Elige una emoción">
      {EMOCIONES.map((emocion) => {
        const style = emotionStyle(emocion.color)
        const selected = value === emocion.id
        return (
          <button
            key={emocion.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(emocion.id)}
            className={cn(
              'flex items-center gap-3 rounded-2xl p-4 text-left transition-all duration-200 ring-1',
              style.bg,
              selected
                ? 'ring-2 ring-ink scale-[1.02]'
                : 'ring-line/50 hover:ring-ink/30',
            )}
          >
            <span className="text-2xl" aria-hidden="true">
              {emocion.icono}
            </span>
            <span className={cn('font-semibold leading-tight', style.text)}>
              {emocion.nombre}
            </span>
          </button>
        )
      })}
    </div>
  )
}
