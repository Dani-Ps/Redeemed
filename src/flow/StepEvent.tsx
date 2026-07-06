import { CATEGORIAS } from '../data/categorias'
import { containsRiskSignal } from '../data/safety'
import { Chip } from '../components/Chip'
import { RiskNotice } from '../components/RiskNotice'
import { StepShell } from './StepShell'

interface Props {
  categoria: string | null
  nota: string
  onCategoria: (id: string) => void
  onNota: (nota: string) => void
}

export function StepEvent({ categoria, nota, onCategoria, onNota }: Props) {
  const mostrarAyuda = containsRiskSignal(nota)

  return (
    <StepShell
      paso={3}
      total={7}
      titulo="¿Qué ocurrió?"
      intro="Elige un área de tu vida y, si quieres, escribe lo que pasó. Es opcional."
    >
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map((c) => (
          <Chip key={c.id} selected={categoria === c.id} onClick={() => onCategoria(c.id)}>
            <span className="mr-1" aria-hidden="true">
              {c.icono}
            </span>
            {c.nombre}
          </Chip>
        ))}
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-ink-soft">
          Nota (opcional)
        </span>
        <textarea
          value={nota}
          onChange={(e) => onNota(e.target.value)}
          rows={4}
          placeholder="Escribe lo que quieras soltar aquí…"
          className="w-full resize-none rounded-2xl bg-paper p-4 text-[15px] leading-relaxed text-ink ring-1 ring-line placeholder:text-ink-faint focus:ring-2 focus:ring-ink/40"
        />
      </label>

      {mostrarAyuda && (
        <div className="mt-4">
          <RiskNotice />
        </div>
      )}
    </StepShell>
  )
}
