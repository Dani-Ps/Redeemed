interface IntensitySliderProps {
  value: number
  onChange: (value: number) => void
}

const ETIQUETAS: Record<number, string> = {
  0: 'Apenas la noto',
  2: 'Suave',
  4: 'Presente',
  6: 'Notable',
  8: 'Intensa',
  10: 'Muy intensa',
}

function etiquetaPara(value: number): string {
  const keys = Object.keys(ETIQUETAS)
    .map(Number)
    .sort((a, b) => a - b)
  let label = ETIQUETAS[0]
  for (const k of keys) {
    if (value >= k) label = ETIQUETAS[k]
  }
  return label
}

/** 0–10 slider with visual feedback (size + color react to value). */
export function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  const pct = (value / 10) * 100
  // Interpolate a soft hue from calm periwinkle to warm rose as it rises.
  const scale = 0.7 + (value / 10) * 0.6

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300"
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(207,143,154,${0.15 + (value / 10) * 0.5}), rgba(143,163,199,0.18))`,
          transform: `scale(${scale})`,
        }}
        aria-hidden="true"
      >
        <span className="font-display text-4xl text-ink">{value}</span>
      </div>

      <p className="text-center text-base font-medium text-ink-soft" aria-live="polite">
        {etiquetaPara(value)}
      </p>

      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`Intensidad ${value} de 10, ${etiquetaPara(value)}`}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ink [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-ink"
        style={{
          background: `linear-gradient(to right, var(--color-peri) 0%, var(--color-rose) ${pct}%, var(--color-line) ${pct}%)`,
        }}
      />
      <div className="flex w-full justify-between text-xs text-ink-faint">
        <span>0</span>
        <span>10</span>
      </div>
    </div>
  )
}
