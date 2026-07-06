// ------------------------------------------------------------------
// Safety net. NOT a crisis-detection or diagnostic system.
// A simple keyword check that, if matched, GENTLY surfaces help
// resources. It never diagnoses and never claims a clinical state.
// ------------------------------------------------------------------

/**
 * Risk-signal keywords. If any appears in the free note, the app offers
 * help resources — nothing more. Kept lowercase & accent-insensitive at
 * comparison time (see containsRiskSignal).
 */
export const PALABRAS_RIESGO: string[] = [
  'suicida',
  'suicidio',
  'matarme',
  'me quiero morir',
  'quiero morir',
  'no quiero vivir',
  'no quiero seguir',
  'hacerme dano',
  'hacerme daño',
  'lastimarme',
  'morir',
  'desaparecer para siempre',
  'acabar con todo',
  'no aguanto mas',
  'no aguanto más',
  'quitarme la vida',
]

/** Normalizes text: lowercase + strips diacritics for robust matching. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

/**
 * Returns true if the note contains any risk-signal keyword.
 * This is intentionally simple and errs toward offering help.
 */
export function containsRiskSignal(nota: string | undefined): boolean {
  if (!nota) return false
  const haystack = normalize(nota)
  return PALABRAS_RIESGO.some((word) => haystack.includes(normalize(word)))
}
