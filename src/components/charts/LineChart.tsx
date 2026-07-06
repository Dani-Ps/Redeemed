// Lightweight hand-rolled SVG line chart. No chart dependency, so the
// bundle stays small. Plots intensity (0-10) over time.

interface Punto {
  label: string
  value: number
}

interface LineChartProps {
  data: Punto[]
}

export function LineChart({ data }: LineChartProps) {
  const w = 320
  const h = 160
  const padX = 14
  const padY = 16
  const innerW = w - padX * 2
  const innerH = h - padY * 2

  const n = data.length
  const x = (i: number) => (n <= 1 ? padX + innerW / 2 : padX + (i / (n - 1)) * innerW)
  const y = (v: number) => padY + (1 - v / 10) * innerH

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.value)}`).join(' ')
  const areaPath = `${linePath} L ${x(n - 1)} ${padY + innerH} L ${x(0)} ${padY + innerH} Z`

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      role="img"
      aria-label="Intensidad emocional a lo largo del tiempo"
    >
      {/* horizontal guides at 0, 5, 10 */}
      {[0, 5, 10].map((v) => (
        <g key={v}>
          <line
            x1={padX}
            x2={w - padX}
            y1={y(v)}
            y2={y(v)}
            stroke="var(--color-line)"
            strokeWidth="1"
          />
          <text x={2} y={y(v) + 3} fontSize="8" fill="var(--color-ink-faint)">
            {v}
          </text>
        </g>
      ))}

      <path d={areaPath} fill="var(--color-peri)" opacity="0.14" />
      <path
        d={linePath}
        fill="none"
        stroke="var(--color-peri)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.value)} r="3" fill="var(--color-ink)" />
      ))}
    </svg>
  )
}
