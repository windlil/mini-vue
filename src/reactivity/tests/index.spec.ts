import { add } from '../index'
import { it, expect } from 'vitest'

it('init', () => {
  expect(add(1)).toBe(2)
})