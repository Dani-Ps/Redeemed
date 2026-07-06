import type { Distorsion } from '../types'

/**
 * Common cognitive distortions (TCC) described in warm, plain Spanish.
 * These are educational, never a diagnosis.
 */
export const DISTORSIONES: Distorsion[] = [
  {
    id: 'catastrofizacion',
    nombre: 'Catastrofización',
    descripcion:
      'Imaginar el peor desenlace posible y darlo por seguro, aunque haya muchas otras salidas.',
  },
  {
    id: 'todo-o-nada',
    nombre: 'Pensamiento todo o nada',
    descripcion:
      'Verlo todo en blanco o negro: si no es perfecto, siento que es un fracaso total.',
  },
  {
    id: 'lectura-mente',
    nombre: 'Lectura de mente',
    descripcion:
      'Suponer que sabes lo que otros piensan de ti, casi siempre en tu contra, sin evidencia real.',
  },
  {
    id: 'sobregeneralizacion',
    nombre: 'Sobregeneralización',
    descripcion:
      'Tomar un hecho aislado y convertirlo en un "siempre" o un "nunca" que define toda tu vida.',
  },
  {
    id: 'filtro-mental',
    nombre: 'Filtro mental',
    descripcion:
      'Quedarte solo con lo negativo del día y dejar fuera todo lo bueno que también ocurrió.',
  },
  {
    id: 'razonamiento-emocional',
    nombre: 'Razonamiento emocional',
    descripcion:
      'Creer que algo es verdad solo porque lo sientes: "me siento inútil, entonces lo soy".',
  },
  {
    id: 'deberia',
    nombre: 'Los "debería"',
    descripcion:
      'Exigirte con reglas rígidas ("debería poder con todo") que solo dejan culpa y presión.',
  },
  {
    id: 'personalizacion',
    nombre: 'Personalización',
    descripcion:
      'Cargar sobre ti la responsabilidad de cosas que no dependían solo de ti.',
  },
  {
    id: 'etiquetado',
    nombre: 'Etiquetado',
    descripcion:
      'Ponerte una etiqueta global ("soy un desastre") a partir de un error puntual.',
  },
]

export function getDistorsion(id: string): Distorsion | undefined {
  return DISTORSIONES.find((d) => d.id === id)
}
