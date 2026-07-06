import { describe, it, expect } from 'vitest'
import { EMOCIONES, getEmotion, getContentForEmotion } from './content'
import { CATEGORIAS, getCategoria } from './categorias'

describe('emotions catalogue', () => {
  it('has unique ids', () => {
    const ids = EMOCIONES.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('only uses valid color families', () => {
    const valid = new Set(['sage', 'amber', 'peri', 'rose', 'ink'])
    for (const e of EMOCIONES) expect(valid.has(e.color)).toBe(true)
  })

  it('getEmotion resolves known and unknown ids', () => {
    expect(getEmotion('alegria')?.nombre).toBe('Alegría')
    expect(getEmotion('no-existe')).toBeUndefined()
  })
})

describe('getContentForEmotion', () => {
  it('returns a complete bundle for every catalogued emotion', () => {
    for (const e of EMOCIONES) {
      const content = getContentForEmotion(e.id)
      expect(content, `missing content for ${e.id}`).toBeDefined()
      expect(content!.validacion.length).toBeGreaterThan(0)
      expect(content!.reencuadre.length).toBeGreaterThan(0)
      expect(content!.distorsion.nombre.length).toBeGreaterThan(0)
      expect(content!.versiculo.cita.length).toBeGreaterThan(0)
      expect(content!.versiculo.texto.length).toBeGreaterThan(0)
      expect(content!.acciones.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('returns undefined for an unknown emotion', () => {
    expect(getContentForEmotion('no-existe')).toBeUndefined()
  })
})

describe('categorias', () => {
  it('has unique ids and resolves lookups', () => {
    const ids = CATEGORIAS.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(getCategoria('familia')?.nombre).toBe('Familia')
    expect(getCategoria('nope')).toBeUndefined()
  })
})
