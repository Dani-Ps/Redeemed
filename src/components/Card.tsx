import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
  /** Adds the gentle rise-in animation. */
  animate?: boolean
}

export function Card({ children, className, animate }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] bg-paper-raised p-5 shadow-[0_10px_30px_-18px_rgba(59,47,74,0.4)] ring-1 ring-line/70',
        animate && 'animate-rise',
        className,
      )}
    >
      {children}
    </div>
  )
}
