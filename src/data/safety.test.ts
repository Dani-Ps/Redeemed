import { describe, it, expect } from 'vitest'
import { containsRiskSignal, PALABRAS_RIESGO } from './safety'

describe('containsRiskSignal', () => {
  it('returns false for empty or undefined notes', () => {
    expect(containsRiskSignal(undefined)).toBe(false)
    expect(containsRiskSignal('')).toBe(false)
  })

  it('returns false for ordinary notes', () => {
    expect(containsRiskSignal('Hoy fue un día tranquilo y agradecido.')).toBe(false)
    expect(containsRiskSignal('Estoy cansado pero con esperanza.')).toBe(false)
  })

  it('detects risk keywords regardless of case', () => {
    expect(containsRiskSignal('a veces pienso en SUICIDIO')).toBe(true)
    expect(containsRiskSignal('Ya No Quiero Vivir')).toBe(true)
  })

  it('matches even without accents', () => {
    expect(containsRiskSignal('quiero hacerme dano')).toBe(true)
    expect(containsRiskSignal('no aguanto mas')).toBe(true)
  })

  it('matches keywords embedded inside a sentence', () => {
    expect(containsRiskSignal('últimamente quiero desaparecer para siempre y ya')).toBe(true)
  })

  it('every configured keyword actually triggers', () => {
    for (const palabra of PALABRAS_RIESGO) {
      expect(containsRiskSignal(`nota: ${palabra}`)).toBe(true)
    }
  })
})
