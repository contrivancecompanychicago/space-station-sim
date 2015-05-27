State = require 'Game/State'

Input = require 'Game/Input'
config = require 'Game/config'
Util = require('Game/Util')

gbw = config.grid.block.width
gbh = config.grid.block.height

cw = config.canvas.width
ch = config.canvas.height

class BlockRenderer extends require 'Mixin'
  @extend require 'DependencyInjector'

  @dependencies({
    helpers: new @Dependency 'Renderer Helpers'
    types: new @Dependency 'Renderer types'
  })

  #todo this is broken - supposed to render room titles
  renderRooms: ->
    @layer.context.fillStyle = 'rgba(0,0,0,0.5)'
    for type of @rooms
      roomType = @types.room[type]
      rooms = @rooms[type]
      # console.log rooms
      for room in rooms
        offset = @blockPosition {x: room.minx, y: room.miny}
        # console.log roomType.name
        @layer.context.font = '10px verdana'
        @layer.context.fillText roomType.name, offset.x+5, offset.y+15


  #starts mega draw call
  render: (@layer) ->
    @layer.clear()
    blocks = @blocksToRender()
    for block in blocks
      @renderBlock block
    for block in blocks
      @renderItem block
#    @renderRooms()

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


  renderBlock: (block) ->
    if Input.selection
      s = Input.selection
      if (s.l<=block.x) and (s.r>=block.x) and (s.t<=block.y) and (s.b>=block.y)
        selected = true

    @layer.resetContextStyle()

    offset = @blockPosition block

    data = State.gridData[@helpers.grid.blockToString block]
    if data
      type = @types.block[data.type]
      type.render @layer.context, offset, data
      room = data.room
      if room
        roomType = @types.room[room]
        if roomType
          @layer.context.fillStyle = roomType.color
        else
          @layer.context.fillStyle = 'red' #danger
        @layer.context.fillRect offset.x, offset.y, gbw * State.view.scale, gbh * State.view.scale
    if selected
      @layer.context.lineWidth = 3
      @layer.context.strokeStyle = "green"
    else
      @layer.context.strokeStyle = "rgba(100,100,100,0.0)"
    @layer.context.strokeRect offset.x, offset.y, gbw * State.view.scale, gbh * State.view.scale
    # debug
    @layer.resetContextStyle()
    if config.grid.debugText
      @layer.context.fillStyle = "grey"
      @layer.context.font = '10px verdana'
      @layer.context.fillText block.x+','+block.y, offset.x, offset.y+10

  renderItem: (block) ->

    offset = @blockPosition block
    data = State.itemData[@helpers.grid.blockToString block]
    if data
      type = @types.item[data.type]
      type.render @layer.context, offset, data



module.exports = BlockRenderer