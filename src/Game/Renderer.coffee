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


class Renderer extends require 'Mixin'
  @extend require 'DependencyInjector'

  @dependencies({
    helpers: new @Dependency 'Renderer Helpers'
    types: new @Dependency 'Renderer types'
  })

  constructor: (@container) ->
    @gridLayer = new Layer @container
    @render()
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
      @render()
      @willRender = false





    # wipes canvas
  clear: ->
    @gridLayer.context.closePath()
    @gridLayer.context.clearRect 0, 0, cw, ch


  # tries to render the block in State.gridData['_'+x+'_'+y]
  blockPosition: (block) ->
    Util.localToGlobal
      x: gbw * block.x
      y: gbh * block.y

  # looks at @offset, @scale and config.grid.block to output a list of blocks that are on screen
  blocksToRender: ->
    tl = @helpers.grid.blockAtPoint {x:0, y:0}
    br = @helpers.grid.blockAtPoint {x:cw, y:ch}
    out = []
    for x in [tl.x..br.x]
      for y in [tl.y..br.y]
        out.push {x, y}
    out

  resetContextStyle: ->
    @gridLayer.context.lineWidth = 1
    @gridLayer.context.fillStyle = "black"
# @gridLayer.context.strokeStyle = "black"

  renderBlock: (block) ->
    if Input.selection
      s = Input.selection
      if (s.l<=block.x) and (s.r>=block.x) and (s.t<=block.y) and (s.b>=block.y)
        selected = true

    @resetContextStyle()

    offset = @blockPosition block

    data = State.gridData[@helpers.grid.blockToString block]
    if data
      type = @types.block[data.type]
      type.render @gridLayer.context, offset, data
      room = data.room
      if room
        roomType = @types.room[room]
        if roomType
          @gridLayer.context.fillStyle = roomType.color
        else
          @gridLayer.context.fillStyle = 'red' #danger
        @gridLayer.context.fillRect offset.x, offset.y, gbw * State.view.scale, gbh * State.view.scale


    if selected
      @gridLayer.context.lineWidth = 3
      @gridLayer.context.strokeStyle = "green"
    else
      @gridLayer.context.strokeStyle = "rgba(100,100,100,0.0)"
    @gridLayer.context.strokeRect offset.x, offset.y, gbw * State.view.scale, gbh * State.view.scale

    # debug
    @resetContextStyle()
    if config.grid.debugText
      @gridLayer.context.fillStyle = "grey"
      @gridLayer.context.font = '10px verdana'
      @gridLayer.context.fillText block.x+','+block.y, offset.x, offset.y+10

  renderItem: (block) ->

    offset = @blockPosition block
    data = State.itemData[@helpers.grid.blockToString block]
    if data
      type = @types.item[data.type]
      type.render @gridLayer.context, offset, data



  #starts mega draw call
  render: ->
    @clear()
    blocks = @blocksToRender()
    # console.log blocks
    for block in blocks
      @renderBlock block
    for block in blocks
      @renderItem block

    @renderRooms()




  renderRooms: ->
# console.log "do me"
    @gridLayer.context.fillStyle = 'rgba(0,0,0,0.5)'
    for type of @rooms
      roomType = @types.room[type]
      rooms = @rooms[type]
      # console.log rooms
      for room in rooms
        offset = @blockPosition {x: room.minx, y: room.miny}
        # console.log roomType.name
        @gridLayer.context.font = '10px verdana'
        @gridLayer.context.fillText roomType.name, offset.x+5, offset.y+15

module.exports = Renderer