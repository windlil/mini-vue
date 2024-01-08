import { track, trigger } from "./effect"

export function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      const value = Reflect.get(target, key)

      track(target, key)

      return value
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value)

      trigger(target, key)

      return result
    }
  })
}