import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getContentForEmotion } from '../data/content'
import { Button } from '../components/Button'
import { SeedStreak } from '../components/SeedStreak'
import { SafetyBanner } from '../components/SafetyBanner'
import { addRegistro, registrarDiaCompletado } from '../store'
import { DRAFT_INICIAL, TOTAL_PASOS, type FlowDraft } from '../flow/draft'
import { StepEmotion } from '../flow/StepEmotion'
import { StepIntensity } from '../flow/StepIntensity'
import { StepEvent } from '../flow/StepEvent'
import { StepValidation } from '../flow/StepValidation'
import { StepReframe } from '../flow/StepReframe'
import { StepVerse } from '../flow/StepVerse'
import { StepAction } from '../flow/StepAction'

export function DailyFlow() {
  const navigate = useNavigate()
  const [paso, setPaso] = useState(0)
  const [draft, setDraft] = useState<FlowDraft>(DRAFT_INICIAL)
  const [dias, setDias] = useState<number | null>(null)

  const content = useMemo(
    () => (draft.emocionId ? getContentForEmotion(draft.emocionId) : undefined),
    [draft.emocionId],
  )

  function set<K extends keyof FlowDraft>(key: K, value: FlowDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  // Gate progression per step so a record is never half-formed.
  const puedeAvanzar = (() => {
    switch (paso) {
      case 0:
        return draft.emocionId !== null
      case 2:
        return draft.categoria !== null
      case 6:
        return draft.accionId !== null
      default:
        return true
    }
  })()

  function finalizar() {
    if (!draft.emocionId || !draft.categoria || !draft.accionId || !content) return
    addRegistro({
      emocionId: draft.emocionId,
      intensidad: draft.intensidad,
      categoria: draft.categoria,
      nota: draft.nota.trim() || undefined,
      distorsionId: content.distorsion.id,
      reestructuracion: draft.reestructuracion.trim() || undefined,
      versiculoId: content.versiculo.id,
      accionId: draft.accionId,
    })
    const racha = registrarDiaCompletado()
    setDias(racha.diasSeguidos)
  }

  function siguiente() {
    if (paso < TOTAL_PASOS - 1) {
      setPaso((p) => p + 1)
    } else {
      finalizar()
    }
  }

  // ---- Confirmation screen ----
  if (dias !== null) {
    return (
      <div className="animate-rise flex flex-col items-center px-1 pt-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
          Registro guardado
        </p>
        <h1 className="mt-2 font-display text-2xl text-ink">Gracias por cuidarte hoy</h1>
        <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-ink-soft">
          Volviste a ti por un momento. Eso ya es mucho.
        </p>
        <div className="mt-6">
          <SeedStreak dias={dias} />
        </div>
        <div className="mt-8 w-full max-w-xs space-y-3">
          <Button full onClick={() => navigate('/historia')}>
            Ver mi historia
          </Button>
          <Button variant="ghost" full onClick={() => navigate('/')}>
            Volver a Hoy
          </Button>
        </div>
        <div className="mt-8 w-full">
          <SafetyBanner />
        </div>
      </div>
    )
  }

  // ---- Wizard ----
  const progreso = ((paso + 1) / TOTAL_PASOS) * 100

  return (
    <div className="flex min-h-[calc(100dvh-9rem)] flex-col">
      {/* progress bar */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-line/70">
        <div
          className="h-full rounded-full bg-sage transition-all duration-500"
          style={{ width: `${progreso}%` }}
        />
      </div>

      <div className="flex-1">
        {paso === 0 && (
          <StepEmotion value={draft.emocionId} onChange={(id) => set('emocionId', id)} />
        )}
        {paso === 1 && (
          <StepIntensity value={draft.intensidad} onChange={(v) => set('intensidad', v)} />
        )}
        {paso === 2 && (
          <StepEvent
            categoria={draft.categoria}
            nota={draft.nota}
            onCategoria={(id) => set('categoria', id)}
            onNota={(n) => set('nota', n)}
          />
        )}
        {paso === 3 && content && <StepValidation content={content} />}
        {paso === 4 && content && (
          <StepReframe
            content={content}
            reestructuracion={draft.reestructuracion}
            onReestructuracion={(t) => set('reestructuracion', t)}
          />
        )}
        {paso === 5 && content && <StepVerse content={content} />}
        {paso === 6 && content && (
          <StepAction
            content={content}
            accionId={draft.accionId}
            onAccion={(id) => set('accionId', id)}
          />
        )}
      </div>

      {/* nav */}
      <div className="sticky bottom-0 mt-6 flex items-center gap-3 bg-gradient-to-t from-paper via-paper to-transparent pb-2 pt-3">
        <Button
          variant="ghost"
          onClick={() => (paso === 0 ? navigate('/') : setPaso((p) => p - 1))}
        >
          {paso === 0 ? 'Salir' : 'Atrás'}
        </Button>
        <Button full onClick={siguiente} disabled={!puedeAvanzar}>
          {paso === TOTAL_PASOS - 1 ? 'Finalizar' : 'Continuar'}
        </Button>
      </div>
    </div>
  )
}
