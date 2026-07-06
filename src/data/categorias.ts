import type { Categoria } from '../types'

/** Life-area chips for flow step 3 ("¿Qué ocurrió?"). */
export const CATEGORIAS: Categoria[] = [
  { id: 'familia', nombre: 'Familia', icono: '🏠' },
  { id: 'pareja', nombre: 'Pareja', icono: '💞' },
  { id: 'amistades', nombre: 'Amistades', icono: '🫂' },
  { id: 'trabajo', nombre: 'Trabajo', icono: '💼' },
  { id: 'estudios', nombre: 'Estudios', icono: '📚' },
  { id: 'salud', nombre: 'Salud', icono: '🩺' },
  { id: 'fe', nombre: 'Fe', icono: '✝️' },
  { id: 'dinero', nombre: 'Dinero', icono: '💰' },
  { id: 'soledad', nombre: 'Soledad', icono: '🌙' },
  { id: 'otro', nombre: 'Otro', icono: '✨' },
]

export function getCategoria(id: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.id === id)
}
