import type { EmotionColor } from '../types'

// Maps an emotion color family to soft background / text / ring classes.
// Centralized so pickers, chips and history stay visually consistent.
interface Style {
  bg: string
  text: string
  ring: string
  dot: string
}

const STYLES: Record<EmotionColor, Style> = {
  sage: { bg: 'bg-sage-soft', text: 'text-sage', ring: 'ring-sage/40', dot: 'bg-sage' },
  amber: { bg: 'bg-amber-soft', text: 'text-[#b98724]', ring: 'ring-amber/50', dot: 'bg-amber' },
  peri: { bg: 'bg-peri-soft', text: 'text-peri', ring: 'ring-peri/40', dot: 'bg-peri' },
  rose: { bg: 'bg-rose-soft', text: 'text-rose', ring: 'ring-rose/40', dot: 'bg-rose' },
  ink: { bg: 'bg-line/60', text: 'text-ink', ring: 'ring-ink/25', dot: 'bg-ink' },
}

export function emotionStyle(color: EmotionColor): Style {
  return STYLES[color]
}
