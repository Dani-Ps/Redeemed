import { useNavigate } from 'react-router-dom'
import { ScreenHeader } from '../components/ScreenHeader'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { useRegistros } from '../store'
import { getEmotion } from '../data/content'
import { getCategoria } from '../data/categorias'
import { emotionStyle } from '../lib/emotionStyles'
import { fechaLarga } from '../lib/fecha'

export function History() {
  const navigate = useNavigate()
  const { registros } = useRegistros()

  if (registros.length === 0) {
    return (
      <div className="animate-fade">
        <ScreenHeader eyebrow="Mi historia" title="Tu camino, día a día" />
        <Card className="flex flex-col items-center py-10 text-center" animate>
          <span className="text-4xl" aria-hidden="true">
            🌱
          </span>
          <p className="mt-3 font-display text-lg text-ink">Aún no hay registros</p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-ink-soft">
            Cada día que te escuchas queda aquí, como un pequeño mapa de tu proceso.
          </p>
          <Button className="mt-5" onClick={() => navigate('/flujo')}>
            Hacer mi primer registro
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="animate-fade">
      <ScreenHeader
        eyebrow="Mi historia"
        title="Tu camino, día a día"
        subtitle={`${registros.length} ${registros.length === 1 ? 'registro' : 'registros'} hasta hoy.`}
      />
      <ol className="space-y-3">
        {registros.map((r) => {
          const emocion = getEmotion(r.emocionId)
          const categoria = getCategoria(r.categoria)
          const style = emotionStyle(emocion?.color ?? 'ink')
          return (
            <li key={r.id}>
              <Card className="flex gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${style.bg}`}
                  aria-hidden="true"
                >
                  {emocion?.icono ?? '🌱'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold text-ink">{emocion?.nombre ?? 'Emoción'}</p>
                    <span className={`text-sm font-semibold ${style.text}`}>
                      {r.intensidad}/10
                    </span>
                  </div>
                  <p className="text-xs text-ink-faint">
                    {fechaLarga(r.fecha)}
                    {categoria ? ` · ${categoria.nombre}` : ''}
                  </p>
                  {r.nota && (
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                      {r.nota}
                    </p>
                  )}
                </div>
              </Card>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
