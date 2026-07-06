import { NavLink } from 'react-router-dom'
import { cn } from '../lib/cn'

interface Tab {
  to: string
  label: string
  icon: string
}

const TABS: Tab[] = [
  { to: '/', label: 'Hoy', icon: '🌱' },
  { to: '/historia', label: 'Historia', icon: '📖' },
  { to: '/progreso', label: 'Progreso', icon: '📈' },
  { to: '/gracia', label: 'Gracia', icon: '🕊️' },
  { to: '/ayuda', label: 'Ayuda', icon: '🤍' },
]

export function BottomNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-paper-raised/90 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-[480px] items-stretch justify-between px-2">
        {TABS.map((tab) => (
          <li key={tab.to} className="flex-1">
            <NavLink
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
                  isActive ? 'text-ink' : 'text-ink-faint hover:text-ink-soft',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full text-lg transition-all',
                      isActive && 'bg-sage-soft',
                    )}
                    aria-hidden="true"
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
