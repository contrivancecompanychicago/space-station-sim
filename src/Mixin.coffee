MODULE_KEYWORDS = ['extended', 'included']

class Mixin
  @extend: (obj) ->
    for key, value of obj when key not in MODULE_KEYWORDS
      @[key] = value

    obj.extended?.apply(this)
    this

  @include: (obj) ->
    mixin = if typeof obj is 'function' then obj.prototype else obj
    for key, value of mixin when key not in MODULE_KEYWORDS
# Assign properties to the prototype
      @::[key] = value

    obj.included?.apply(this)
    this

  @defineGetter: (name, getter) ->
    Object.defineProperty(@prototype, name, {
      configurable: true,
      enumerable: true,
      get: getter
    })

  @defineSetter: (name, setter) ->
    Object.defineProperty(@prototype, name, {
      configurable: true,
      enumerable: true,
      set: setter
    })

module.exports = Mixin
