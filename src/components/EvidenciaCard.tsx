import { usePhotoUrl } from '../store'
import type { Evidencia } from '../types'
import { fechaLarga } from '../lib/fecha'
import { Card } from './Card'

const TIPO_META: Record<Evidencia['tipo'], { icono: string; etiqueta: string }> = {
  foto: { icono: '📷', etiqueta: 'Foto' },
  carta: { icono: '✉️', etiqueta: 'Carta' },
  musica: { icono: '🎵', etiqueta: 'Música' },
  oracion: { icono: '🙏', etiqueta: 'Oración' },
}

interface EvidenciaCardProps {
  evidencia: Evidencia
  onRemove: (id: string) => void
}

export function EvidenciaCard({ evidencia, onRemove }: EvidenciaCardProps) {
  const url = usePhotoUrl(evidencia.imagenId)
  const meta = TIPO_META[evidencia.tipo]

  return (
    <Card className="overflow-hidden p-0">
      {evidencia.tipo === 'foto' && url && (
        <img
          src={url}
          alt={evidencia.titulo}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-medium text-ink-faint">
              <span aria-hidden="true">{meta.icono}</span>
              {meta.etiqueta}
            </p>
            <h3 className="mt-0.5 font-display text-lg leading-tight text-ink">
              {evidencia.titulo}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onRemove(evidencia.id)}
            aria-label={`Eliminar ${evidencia.titulo}`}
            className="shrink-0 rounded-full p-1.5 text-ink-faint transition-colors hover:bg-rose-soft hover:text-ink"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        {evidencia.contenido && (
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
            {evidencia.contenido}
          </p>
        )}
        <p className="mt-3 text-xs text-ink-faint">{fechaLarga(evidencia.fecha)}</p>
      </div>
    </Card>
  )
}
