import { useRef, useState } from 'react'
import { ScreenHeader } from '../components/ScreenHeader'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { EvidenciaCard } from '../components/EvidenciaCard'
import { useEvidencias } from '../store'
import type { EvidenciaTipo } from '../types'

const TIPOS: { id: EvidenciaTipo; icono: string; etiqueta: string }[] = [
  { id: 'foto', icono: '📷', etiqueta: 'Foto' },
  { id: 'carta', icono: '✉️', etiqueta: 'Carta' },
  { id: 'musica', icono: '🎵', etiqueta: 'Música' },
  { id: 'oracion', icono: '🙏', etiqueta: 'Oración' },
]

const PLACEHOLDER: Record<EvidenciaTipo, string> = {
  foto: 'Una nota sobre este momento (opcional)',
  carta: 'Escribe una carta a tu yo del futuro, o palabras que quieras recordar…',
  musica: 'Nombre de la canción, o un enlace que te sostiene…',
  oracion: 'Una oración, un agradecimiento, una petición…',
}

export function Grace() {
  const { evidencias, add, remove } = useEvidencias()
  const [abierto, setAbierto] = useState(false)
  const [tipo, setTipo] = useState<EvidenciaTipo>('foto')
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [foto, setFoto] = useState<Blob | null>(null)
  const [previa, setPrevia] = useState<string | null>(null)
  const [guardando, setGuardando] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function resetForm() {
    setTitulo('')
    setContenido('')
    setFoto(null)
    if (previa) URL.revokeObjectURL(previa)
    setPrevia(null)
    setTipo('foto')
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFoto(file)
    if (previa) URL.revokeObjectURL(previa)
    setPrevia(URL.createObjectURL(file))
  }

  async function onGuardar() {
    if (!titulo.trim()) return
    setGuardando(true)
    try {
      await add({
        tipo,
        titulo: titulo.trim(),
        contenido: contenido.trim() || undefined,
        foto: tipo === 'foto' && foto ? foto : undefined,
      })
      resetForm()
      setAbierto(false)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="animate-fade">
      <ScreenHeader
        eyebrow="Evidencias de gracia"
        title="Lo que te sostiene"
        subtitle="Guarda recuerdos, cartas, canciones y oraciones. Vuelve a ellos cuando lo necesites."
      />

      {!abierto && (
        <Button full variant="soft" className="mb-5" onClick={() => setAbierto(true)}>
          <span aria-hidden="true">＋</span> Añadir evidencia
        </Button>
      )}

      {abierto && (
        <Card className="mb-5" animate>
          <h2 className="font-display text-lg text-ink">Nueva evidencia</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {TIPOS.map((t) => (
              <Chip key={t.id} selected={tipo === t.id} onClick={() => setTipo(t.id)}>
                <span aria-hidden="true">{t.icono}</span> {t.etiqueta}
              </Chip>
            ))}
          </div>

          {tipo === 'foto' && (
            <div className="mt-4">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={onPickFile}
                className="sr-only"
                aria-label="Elegir foto"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-line bg-paper text-ink-faint transition-colors hover:border-ink/40"
              >
                {previa ? (
                  <img src={previa} alt="Vista previa" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex flex-col items-center gap-1 text-sm">
                    <span className="text-2xl" aria-hidden="true">
                      📷
                    </span>
                    Toca para elegir o tomar una foto
                  </span>
                )}
              </button>
            </div>
          )}

          <label className="mt-4 block">
            <span className="mb-1 block text-sm font-medium text-ink-soft">Título</span>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Un nombre para recordarlo"
              maxLength={80}
              className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-shadow placeholder:text-ink-faint focus:ring-2 focus:ring-peri/40"
            />
          </label>

          <label className="mt-3 block">
            <span className="mb-1 block text-sm font-medium text-ink-soft">
              {tipo === 'foto' ? 'Nota' : 'Contenido'}
            </span>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder={PLACEHOLDER[tipo]}
              rows={tipo === 'carta' || tipo === 'oracion' ? 4 : 2}
              className="w-full resize-none rounded-2xl border border-line bg-paper px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-shadow placeholder:text-ink-faint focus:ring-2 focus:ring-peri/40"
            />
          </label>

          <div className="mt-4 flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                resetForm()
                setAbierto(false)
              }}
            >
              Cancelar
            </Button>
            <Button full onClick={onGuardar} disabled={!titulo.trim() || guardando}>
              {guardando ? 'Guardando…' : 'Guardar'}
            </Button>
          </div>
        </Card>
      )}

      {evidencias.length === 0 && !abierto ? (
        <Card className="flex flex-col items-center py-10 text-center">
          <span className="text-4xl" aria-hidden="true">
            🕊️
          </span>
          <p className="mt-3 font-display text-lg text-ink">Aún no hay evidencias</p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-ink-soft">
            Empieza guardando algo pequeño y bueno: una foto, unas palabras, una canción.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {evidencias.map((e) => (
            <EvidenciaCard key={e.id} evidencia={e} onRemove={remove} />
          ))}
        </div>
      )}
    </div>
  )
}
