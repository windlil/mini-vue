import { track, trigger } from "./effect"

function createGetter(isReadonly?) {
  return function(target, key) {
    const result = Reflect.get(target, key)
    if (!isReadonly) {
      track(target, key)
    }
    return result
  }
}

function createSetter(isReadonly?) {
  return function(target, key, value) {
    if (isReadonly) {
      console.warn('readonly object cant be modify')
      return false
    }
    const result = Reflect.set(target, key, value)
    trigger(target, key)
    return result
  }
}

export function reactive(target) {
  return new Proxy(target, {
    get: createGetter(),
    set: createSetter(),
  })
}

export function readonly(target) {
  return new Proxy(target, {
    get: createGetter(true),
    set: createSetter(true),
  })
}