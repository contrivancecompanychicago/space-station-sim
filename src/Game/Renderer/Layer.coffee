_ = require 'lodash'
config = require 'Game/config'

class Layer
  constructor: (@container)->
    @canvas = document.createElement 'canvas'
    @container.appendChild @canvas
    @context = @canvas.getContext '2d'

    _.extend @canvas, config.canvas
    _.extend @canvas.style, config.canvas.style

  # wipes canvas
  clear: ->
    @context.closePath()
    @context.clearRect 0, 0, config.canvas.width, config.canvas.height

  resetContextStyle: ->
    @context.lineWidth = 1
    @context.fillStyle = "black"


  #todo this is broken - supposed to render room titles
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

module.exports = Layer