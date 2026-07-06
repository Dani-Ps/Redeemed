import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenHeader } from '../components/ScreenHeader'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { LineChart } from '../components/charts/LineChart'
import { EmotionBars } from '../components/charts/EmotionBars'
import { useRegistros } from '../store'
import { EMOCIONES, getEmotion } from '../data/content'
import { fechaCorta } from '../lib/fecha'

export function Dashboard() {
  const navigate = useNavigate()
  const { registros } = useRegistros()

  const serie = useMemo(() => {
    // Oldest → newest, last 14 records for a readable line.
    const orden = [...registros].reverse().slice(-14)
    return orden.map((r) => ({ label: fechaCorta(r.fecha), value: r.intensidad }))
  }, [registros])

  const distribucion = useMemo(() => {
    const counts = new Map<string, number>()
    registros.forEach((r) => counts.set(r.emocionId, (counts.get(r.emocionId) ?? 0) + 1))
    return EMOCIONES.map((e) => ({
      nombre: e.nombre,
      icono: e.icono,
      color: e.color,
      count: counts.get(e.id) ?? 0,
    }))
      .filter((d) => d.count > 0)
      .sort((a, b) => b.count - a.count)
  }, [registros])

  const promedio = useMemo(() => {
    if (registros.length === 0) return 0
    const sum = registros.reduce((acc, r) => acc + r.intensidad, 0)
    return Math.round((sum / registros.length) * 10) / 10
  }, [registros])

  const emocionFrecuente = distribucion[0]
    ? getEmotion(EMOCIONES.find((e) => e.nombre === distribucion[0].nombre)!.id)
    : undefined

  if (registros.length === 0) {
    return (
      <div className="animate-fade">
        <ScreenHeader eyebrow="Progreso" title="Tu paisaje emocional" />
        <Card className="flex flex-col items-center py-10 text-center" animate>
          <span className="text-4xl" aria-hidden="true">
            📈
          </span>
          <p className="mt-3 font-display text-lg text-ink">Aún no hay datos</p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-ink-soft">
            Con cada registro verás cómo cambian tus emociones con el tiempo. Sin juicios, solo
            observación.
          </p>
          <Button className="mt-5" onClick={() => navigate('/flujo')}>
            Comenzar
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="animate-fade">
      <ScreenHeader
        eyebrow="Progreso"
        title="Tu paisaje emocional"
        subtitle="Una mirada suave a tu proceso. Esto no evalúa: acompaña."
      />

      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center">
          <p className="font-display text-3xl text-ink">{promedio}</p>
          <p className="mt-1 text-xs text-ink-soft">Intensidad promedio</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl" aria-hidden="true">
            {emocionFrecuente?.icono ?? '🌱'}
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            Más frecuente: {emocionFrecuente?.nombre ?? '—'}
          </p>
        </Card>
      </div>

      <Card className="mt-4">
        <h2 className="font-display text-lg text-ink">Intensidad en el tiempo</h2>
        <p className="mb-3 text-xs text-ink-soft">Últimos {serie.length} registros</p>
        <LineChart data={serie} />
      </Card>

      <Card className="mt-4">
        <h2 className="mb-4 font-display text-lg text-ink">Emociones registradas</h2>
        <EmotionBars data={distribucion} />
      </Card>
    </div>
  )
}
