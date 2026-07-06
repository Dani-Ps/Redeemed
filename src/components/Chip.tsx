import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface ChipProps {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
}

export function Chip({ children, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ring-1',
        selected
          ? 'bg-ink text-paper-raised ring-ink'
          : 'bg-paper-raised text-ink-soft ring-line hover:ring-ink/40 hover:text-ink',
      )}
    >
      {children}
    </button>
  )
}
