import { describe, it, expect } from 'vitest'
import { KEYS, readJSON, writeJSON, makeId } from './local'

describe('local storage wrapper', () => {
  it('round-trips JSON values', () => {
    writeJSON(KEYS.registros, [{ id: 'a', intensidad: 5 }])
    expect(readJSON(KEYS.registros, [])).toEqual([{ id: 'a', intensidad: 5 }])
  })

  it('returns the fallback for missing keys', () => {
    expect(readJSON('redeemed:none', 42)).toBe(42)
  })

  it('returns the fallback for corrupt data', () => {
    localStorage.setItem(KEYS.racha, '{not valid json')
    expect(readJSON(KEYS.racha, { diasSeguidos: 0, ultimoDia: null })).toEqual({
      diasSeguidos: 0,
      ultimoDia: null,
    })
  })
})

describe('makeId', () => {
  it('produces unique, non-empty ids', () => {
    const ids = new Set(Array.from({ length: 200 }, () => makeId()))
    expect(ids.size).toBe(200)
    for (const id of ids) expect(id.length).toBeGreaterThan(0)
  })
})
