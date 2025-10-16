import { describe, expect, test } from 'vitest'
import { dummy } from './helpers.js'

describe('dummy', () => {
  test('dummy returns one', () => {
    expect(dummy([])).toBe(1)
  })
})
