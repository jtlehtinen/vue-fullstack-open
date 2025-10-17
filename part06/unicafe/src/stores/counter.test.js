import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from './counter'

describe('Counter store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with counts as 0', () => {
    const store = useCounterStore()

    expect(store.$state).toEqual({
      bad: 0,
      neutral: 0,
      good: 0,
    })
  })

  it('should increment good', () => {
    const store = useCounterStore()

    store.good++
    expect(store.good).toBe(1)

    store.incrementGood()
    expect(store.good).toBe(2)

    expect(store.$state).toEqual({
      bad: 0,
      neutral: 0,
      good: 2,
    })
  })
})