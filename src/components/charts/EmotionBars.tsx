import { emotionStyle } from '../../lib/emotionStyles'
import type { EmotionColor } from '../../types'

interface Barra {
  nombre: string
  icono: string
  color: EmotionColor
  count: number
}

interface EmotionBarsProps {
  data: Barra[]
}

/** Simple horizontal bars for emotion distribution. */
export function EmotionBars({ data }: EmotionBarsProps) {
  const max = Math.max(1, ...data.map((d) => d.count))
  return (
    <ul className="space-y-2.5">
      {data.map((d) => {
        const style = emotionStyle(d.color)
        const pct = (d.count / max) * 100
        return (
          <li key={d.nombre} className="flex items-center gap-3">
            <span className="w-6 text-center text-lg" aria-hidden="true">
              {d.icono}
            </span>
            <div className="flex-1">
              <div className="mb-1 flex justify-between text-xs text-ink-soft">
                <span>{d.nombre}</span>
                <span className="tabular-nums">{d.count}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-line/60">
                <div
                  className={`h-full rounded-full ${style.dot} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
