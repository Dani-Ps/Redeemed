import { useNavigate } from 'react-router-dom'

/**
 * Always-visible access to help resources. Present across the whole app
 * (rendered in the app shell). Never diagnoses — just opens Ayuda.
 */
export function HelpButton() {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate('/ayuda')}
      aria-label="Abrir recursos de ayuda"
      className="fixed right-4 top-4 z-40 flex items-center gap-2 rounded-full bg-paper-raised/90 px-3.5 py-2 text-sm font-semibold text-ink shadow-[0_8px_20px_-10px_rgba(59,47,74,0.6)] ring-1 ring-line backdrop-blur-md transition-transform active:scale-95"
    >
      <span aria-hidden="true">🤍</span>
      Ayuda
    </button>
  )
}
