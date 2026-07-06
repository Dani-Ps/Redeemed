import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'soft' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  full?: boolean
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ink text-paper-raised hover:bg-ink/90 active:scale-[0.98] shadow-[0_10px_24px_-12px_rgba(59,47,74,0.7)]',
  soft: 'bg-sage-soft text-sage hover:bg-sage-soft/70 active:scale-[0.98]',
  ghost: 'bg-transparent text-ink-soft hover:text-ink hover:bg-line/40',
}

export function Button({
  children,
  variant = 'primary',
  full,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45',
        full && 'w-full',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
