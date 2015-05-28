State = require 'Game/State'

Layer = require 'Game/Renderer/Layer'
config = require 'Game/config'
Util = require('Game/Util')

gbw = config.grid.block.width
gbh = config.grid.block.height

cw = config.canvas.width
ch = config.canvas.height

Input = require 'Game/Input'

Imagine = require 'imagine'

BlockRenderer = require 'Game/Grid/Block/Renderer'
CharacterRenderer = require 'Game/Character/Renderer'


class Renderer extends require 'Mixin'
  @extend require 'DependencyInjector'

  @dependencies({
    helpers: new @Dependency 'Renderer Helpers'
    types: new @Dependency 'Renderer types'
  })

  constructor: (@container) ->
    @blockRenderer = new BlockRenderer()
    BlockRenderer.inject
      helpers: @helpers
      types: @types
    @gridLayer = new Layer @container
    @gridLayer.canvas.id = 'grid'
    @characterLayer = new Layer @container
    @characterLayer.canvas.id = 'character'
    @requireRender()
    CharacterRenderer.inject
      types: @types
    @characterRenderer = new CharacterRenderer
    Imagine @

  itemStateChanged: =>
    @requireRender()

  viewStateChanged: =>
    @requireRender()

  gridStateChanged: =>
#    @calcData() #todo
    @requireRender()

  requireRender: ->
    @willRender = true

  update: ->
    @characterRenderer.render @characterLayer
    if @willRender
      @blockRenderer.render @gridLayer
      @willRender = false





module.exports = Renderer