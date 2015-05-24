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
    @requireRender()
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
    if @willRender
      @blockRenderer.render @gridLayer
      @willRender = false





module.exports = Renderer