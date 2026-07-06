import type { ReactNode } from 'react'

interface StepShellProps {
  paso: number
  total: number
  titulo: string
  intro?: string
  children: ReactNode
}

/** Shared frame for each wizard step: one focus per screen. */
export function StepShell({ paso, total, titulo, intro, children }: StepShellProps) {
  return (
    <div key={paso} className="animate-fade">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
        Paso {paso} de {total}
      </p>
      <h2 className="font-display text-2xl leading-tight text-ink">{titulo}</h2>
      {intro && <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{intro}</p>}
      <div className="mt-6">{children}</div>
    </div>
  )
}
