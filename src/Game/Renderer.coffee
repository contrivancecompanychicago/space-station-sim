State = require 'Game/State'

Layer = require 'Game/Renderer/Layer'

class Renderer extends require 'Mixin'
  @extend require 'DependencyInjector'

  constructor: (@container) ->
    @gridLayer = new Layer @container



module.exports = Renderer