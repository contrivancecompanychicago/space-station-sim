_ = require 'lodash'

# Manual way as coffeescript wraps the whole class in another function
Dependency = (@module, @description) ->
Dependency::toString = -> return ["[Dependency] - Unmet dependency #{@module}", @description ? ''].join(' ')

class DependencyInjector
  @Dependency: Dependency

  @dependencies: (@_dependencies) ->
    dependencies = @_dependencies
    _.keys(dependencies).forEach (key) =>
      dependency = dependencies[key]
      unless dependency instanceof Dependency
        throw new Error "Dependency `#{key}` should be an instance of `DependencyInjector.Dependency`"
      unresolved = -> throw new Error "#{dependency}"
      Object.defineProperty(@prototype, key, {
        configurable: true
        enumerable: true
        get: unresolved
        set: unresolved
      })


  @registerDependencies: (deps) ->
    dependencies = @_dependencies

    dependencyKeys = _.keys(dependencies)
    return unless dependencyKeys.length

    _.keys(deps).forEach (key) =>
      unless dependencies[key] and dependencies[key] instanceof Dependency
        throw new Error "Extraneous dependency `#{key}`"
      dependencies[key] = deps[key]

    _.keys(dependencies).forEach (key) =>
      dependency = dependencies[key]
      unless dependency instanceof Dependency
        delete @prototype[key]
        @prototype[key] = dependency

  @inject = @registerDependencies

module.exports = DependencyInjector
