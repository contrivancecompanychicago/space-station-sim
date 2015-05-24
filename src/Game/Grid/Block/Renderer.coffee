
class BlockRenderer
  render: (layer) ->


  #todo this is broken - supposed to render room titles
  renderRooms: ->
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




module.exports = BlockRenderer