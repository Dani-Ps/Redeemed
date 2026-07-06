import { describe, it, expect } from 'vitest'
import { fechaLarga, fechaCorta, saludoDelDia } from './fecha'

describe('date formatting', () => {
  it('formats a long Spanish date', () => {
    const out = fechaLarga('2025-01-05T10:00:00.000Z')
    expect(out).toMatch(/2025/)
    expect(out.length).toBeGreaterThan(0)
  })

  it('formats a short date without a year', () => {
    const out = fechaCorta('2025-01-05T10:00:00.000Z')
    expect(out).not.toMatch(/2025/)
  })
})

describe('saludoDelDia', () => {
  it('greets by time of day', () => {
    expect(saludoDelDia(new Date(2025, 0, 1, 8))).toBe('Buenos días')
    expect(saludoDelDia(new Date(2025, 0, 1, 15))).toBe('Buenas tardes')
    expect(saludoDelDia(new Date(2025, 0, 1, 22))).toBe('Buenas noches')
    expect(saludoDelDia(new Date(2025, 0, 1, 3))).toBe('Buenas noches')
  })
})
