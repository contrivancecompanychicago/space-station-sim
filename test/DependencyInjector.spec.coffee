Mixin = require 'Mixin'
DependencyInjector = require 'DependencyInjector'

class Home extends Mixin
  @extend DependencyInjector

  @dependencies({
    env: new @Dependency 'environment'
    etc: new @Dependency 'etcetera'
  })

  constructor: ->
    str = @env

describe 'DependencyInjector', ->
  it 'should throw an error if it doesnt have deps injected', ->
    expect( -> new Home())
      .toThrow new Error '[Dependency] - Unmet dependency environment '

  it 'should not throw if dep it met', ->
    Home.inject
      env: "myEnv"
    new Home()
