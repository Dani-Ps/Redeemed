import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { SeedStreak, etapaDeRacha } from '../components/SeedStreak'
import { useRacha, useRegistros, toDayKey } from '../store'
import { getEmotion } from '../data/content'
import { saludoDelDia } from '../lib/fecha'

export function Home() {
  const navigate = useNavigate()
  const { diasSeguidos } = useRacha()
  const { registros } = useRegistros()

  const hoy = toDayKey()
  const registroDeHoy = registros.find((r) => toDayKey(new Date(r.fecha)) === hoy)
  const emocionHoy = registroDeHoy ? getEmotion(registroDeHoy.emocionId) : undefined
  const { etapa } = etapaDeRacha(diasSeguidos)

  return (
    <div className="animate-fade">
      <header className="pt-2">
        <p className="text-sm font-medium text-ink-soft">{saludoDelDia()}</p>
        <h1 className="mt-1 font-display text-[2rem] leading-tight text-ink">
          ¿Cómo estás hoy?
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Un momento contigo mismo, sin prisa. Une lo que sientes con lo que crees.
        </p>
      </header>

      {/* Seed streak — the signature widget */}
      <Card className="mt-6 flex flex-col items-center bg-gradient-to-b from-sage-soft/60 to-paper-raised" animate>
        <SeedStreak dias={diasSeguidos} />
        <p className="mt-4 max-w-[16rem] text-center text-sm leading-relaxed text-ink-soft">
          {diasSeguidos === 0
            ? 'Tu semilla espera. El primer registro la hace brotar.'
            : `Tu constancia riega esta planta. ${etapa.frase}`}
        </p>
      </Card>

      {/* Entry to daily flow */}
      <div className="mt-6">
        {registroDeHoy ? (
          <Card className="flex items-center gap-4" animate>
            <span className="text-3xl" aria-hidden="true">
              {emocionHoy?.icono ?? '🌱'}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-ink">Ya registraste tu día</p>
              <p className="text-sm text-ink-soft">
                Sentiste {emocionHoy?.nombre?.toLowerCase() ?? 'algo'}. Puedes repasarlo cuando
                quieras.
              </p>
            </div>
          </Card>
        ) : (
          <Card
            className="bg-gradient-to-br from-paper-raised to-amber-soft/50"
            animate
          >
            <p className="font-display text-lg text-ink">Tu momento de hoy</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Un recorrido guiado de unos 3 minutos: reconocer, comprender y dar un paso.
            </p>
            <Button full className="mt-4" onClick={() => navigate('/flujo')}>
              Comenzar
            </Button>
          </Card>
        )}
      </div>

      <button
        type="button"
        onClick={() => navigate('/historia')}
        className="mt-4 w-full text-center text-sm font-medium text-ink-soft underline decoration-line underline-offset-4"
      >
        Ver mi historia
      </button>
    </div>
  )
}
