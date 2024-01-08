import { it, expect, describe } from 'vitest'
import { reactive } from '../reative'

describe('reactive', () => {
  it('happy path', () => {
    const obj1 = { a: 0 }
    const obj2 = reactive(obj1)

    expect(obj1).not.toBe(obj2)
    expect(obj2.a).toBe(0)
  })
})