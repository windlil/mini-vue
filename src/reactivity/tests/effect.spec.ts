import { it, describe, expect, vitest } from 'vitest'
import { reactive } from '../reative'
import { effect } from '../effect'

describe('effect' ,() => {
  it('happy path', () => {
    const obj = reactive({
      a: 0
    })
    let a

    effect(() => {
      a = obj.a + 1
    })

    expect(a).toBe(1)

    obj.a++

    expect(a).toBe(2)
  })

  it('return runner', () => {
    // effect(fn): runner; runner() === fn()

    let foo = 10

    const runner = effect(() => {
      foo++
      return 'foo'
    })

    expect(foo).toBe(11)
    let a = runner()

    expect(a).toBe('foo')
    expect(foo).toBe(12)
  })

  it('scheduler', () => {
    let a = reactive({ age: 1 })
    let run, dummy
    const scheduler = vitest.fn(() => {
      run = runner
    })
    const runner = effect(() => {
      dummy = a.age
    }, { scheduler })

    expect(scheduler).not.toHaveBeenCalled()
    a.age++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    run()
    expect(dummy).toBe(2)
  })
})