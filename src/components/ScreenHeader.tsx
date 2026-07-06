import type { ReactNode } from 'react'

interface ScreenHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: ReactNode
}

/** Consistent screen title block: small eyebrow + display title + subtitle. */
export function ScreenHeader({ eyebrow, title, subtitle }: ScreenHeaderProps) {
  return (
    <header className="mb-5">
      {eyebrow && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-[1.7rem] leading-tight text-ink">{title}</h1>
      {subtitle && <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{subtitle}</p>}
    </header>
  )
}
