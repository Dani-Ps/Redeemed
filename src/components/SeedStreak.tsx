// ------------------------------------------------------------------
// Signature element: a seed that grows with the streak. Five stages,
// hand-drawn SVG. Growth through grace — never a competitive score.
// ------------------------------------------------------------------

interface SeedStreakProps {
  dias: number
  /** Compact renders a smaller inline version (e.g. lists). */
  size?: 'lg' | 'sm'
}

interface Etapa {
  min: number
  nombre: string
  frase: string
}

const ETAPAS: Etapa[] = [
  { min: 0, nombre: 'Semilla', frase: 'Todo comienzo cuenta.' },
  { min: 1, nombre: 'Brote', frase: 'Algo nuevo asoma.' },
  { min: 3, nombre: 'Hoja', frase: 'Estás echando raíces.' },
  { min: 7, nombre: 'Planta', frase: 'Tu constancia se ve.' },
  { min: 14, nombre: 'En flor', frase: 'Florece a su tiempo.' },
]

export function etapaDeRacha(dias: number): { indice: number; etapa: Etapa } {
  let indice = 0
  ETAPAS.forEach((e, i) => {
    if (dias >= e.min) indice = i
  })
  return { indice, etapa: ETAPAS[indice] }
}

export function SeedStreak({ dias, size = 'lg' }: SeedStreakProps) {
  const { indice, etapa } = etapaDeRacha(dias)
  const dim = size === 'lg' ? 132 : 64

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-end justify-center animate-grow"
        style={{ width: dim, height: dim }}
        role="img"
        aria-label={`Racha de ${dias} ${dias === 1 ? 'día' : 'días'}: ${etapa.nombre}`}
      >
        <svg viewBox="0 0 120 120" width={dim} height={dim} aria-hidden="true">
          {/* Pot */}
          <path
            d="M38 92 h44 l-5 20 a6 6 0 0 1 -6 5 h-22 a6 6 0 0 1 -6 -5 z"
            fill="#e7c9a3"
          />
          <ellipse cx="60" cy="92" rx="24" ry="6" fill="#d8b489" />
          <ellipse cx="60" cy="90" rx="20" ry="4.5" fill="#6b533b" opacity="0.5" />

          {/* Stage 0 — seed resting in soil */}
          {indice === 0 && <ellipse cx="60" cy="88" rx="5" ry="3.5" fill="#8a6b4a" />}

          {/* Stem grows taller by stage */}
          {indice >= 1 && (
            <path
              d={`M60 89 C 60 ${88 - indice * 8}, 60 ${80 - indice * 9}, 60 ${86 - indice * 11}`}
              stroke="#6B8F71"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Sprout leaves */}
          {indice >= 1 && (
            <>
              <path d="M60 74 C 50 70, 44 74, 44 82 C 54 82, 60 80, 60 74 Z" fill="#7fa286" />
              <path d="M60 72 C 70 68, 76 72, 76 80 C 66 80, 60 78, 60 72 Z" fill="#6B8F71" />
            </>
          )}

          {/* Mid leaves */}
          {indice >= 2 && (
            <>
              <path d="M60 58 C 47 53, 39 58, 39 68 C 52 68, 60 65, 60 58 Z" fill="#88ab8e" />
              <path d="M60 55 C 73 50, 81 55, 81 65 C 68 65, 60 62, 60 55 Z" fill="#6B8F71" />
            </>
          )}

          {/* Upper leaves */}
          {indice >= 3 && (
            <>
              <path d="M60 42 C 49 38, 43 42, 43 51 C 53 51, 60 48, 60 42 Z" fill="#7fa286" />
              <path d="M60 40 C 71 36, 77 40, 77 49 C 67 49, 60 46, 60 40 Z" fill="#88ab8e" />
            </>
          )}

          {/* Bloom */}
          {indice >= 4 && (
            <g>
              {[0, 72, 144, 216, 288].map((deg) => (
                <ellipse
                  key={deg}
                  cx="60"
                  cy="20"
                  rx="6"
                  ry="11"
                  fill="#cf8f9a"
                  transform={`rotate(${deg} 60 30)`}
                />
              ))}
              <circle cx="60" cy="30" r="6.5" fill="#E7B75F" />
            </g>
          )}
        </svg>
      </div>

      {size === 'lg' && (
        <div className="mt-1 text-center">
          <p className="font-display text-lg text-ink">
            {dias} {dias === 1 ? 'día' : 'días'} de constancia
          </p>
          <p className="text-sm text-ink-soft">
            {etapa.nombre} · {etapa.frase}
          </p>
        </div>
      )}
    </div>
  )
}
