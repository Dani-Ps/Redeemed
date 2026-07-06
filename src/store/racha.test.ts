import { describe, it, expect } from 'vitest'
import { applyCompletion, currentStreak, dayDiff, toDayKey, RACHA_INICIAL } from './racha'

describe('toDayKey', () => {
  it('formats a local date as YYYY-MM-DD', () => {
    expect(toDayKey(new Date(2025, 0, 5))).toBe('2025-01-05')
    expect(toDayKey(new Date(2025, 11, 31))).toBe('2025-12-31')
  })
})

describe('dayDiff', () => {
  it('returns whole-day differences', () => {
    expect(dayDiff('2025-01-01', '2025-01-02')).toBe(1)
    expect(dayDiff('2025-01-01', '2025-01-01')).toBe(0)
    expect(dayDiff('2025-01-10', '2025-01-01')).toBe(-9)
  })

  it('spans months and years correctly', () => {
    expect(dayDiff('2025-01-31', '2025-02-01')).toBe(1)
    expect(dayDiff('2025-12-31', '2026-01-01')).toBe(1)
  })
})

describe('applyCompletion', () => {
  it('starts a streak at 1 on the first completion', () => {
    expect(applyCompletion(RACHA_INICIAL, '2025-01-01')).toEqual({
      diasSeguidos: 1,
      ultimoDia: '2025-01-01',
    })
  })

  it('does not double-count the same day', () => {
    const once = applyCompletion(RACHA_INICIAL, '2025-01-01')
    const twice = applyCompletion(once, '2025-01-01')
    expect(twice.diasSeguidos).toBe(1)
    expect(twice.ultimoDia).toBe('2025-01-01')
  })

  it('increments on consecutive days', () => {
    let r = applyCompletion(RACHA_INICIAL, '2025-01-01')
    r = applyCompletion(r, '2025-01-02')
    r = applyCompletion(r, '2025-01-03')
    expect(r.diasSeguidos).toBe(3)
  })

  it('resets to 1 after a gap', () => {
    let r = applyCompletion(RACHA_INICIAL, '2025-01-01')
    r = applyCompletion(r, '2025-01-02')
    r = applyCompletion(r, '2025-01-05')
    expect(r.diasSeguidos).toBe(1)
    expect(r.ultimoDia).toBe('2025-01-05')
  })

  it('is resilient to a clock moving backwards', () => {
    const r = applyCompletion({ diasSeguidos: 4, ultimoDia: '2025-01-10' }, '2025-01-09')
    expect(r.diasSeguidos).toBe(4)
    expect(r.ultimoDia).toBe('2025-01-09')
  })
})

describe('currentStreak', () => {
  it('is 0 with no history', () => {
    expect(currentStreak(RACHA_INICIAL, '2025-01-01')).toBe(0)
  })

  it('holds today and yesterday', () => {
    const r = { diasSeguidos: 3, ultimoDia: '2025-01-02' }
    expect(currentStreak(r, '2025-01-02')).toBe(3)
    expect(currentStreak(r, '2025-01-03')).toBe(3)
  })

  it('lapses to 0 once more than a day has passed', () => {
    const r = { diasSeguidos: 3, ultimoDia: '2025-01-02' }
    expect(currentStreak(r, '2025-01-04')).toBe(0)
  })
})
