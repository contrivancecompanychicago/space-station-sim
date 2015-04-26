State = require 'Game/State'

class Util

  guidbase = new Date().getTime()
  @guid: ->
    '_'+(guidbase++)

  @globalToLocal: (point) ->
    x: ((point.x / State.view.scale) - State.view.offset.x)
    y: ((point.y / State.view.scale) - State.view.offset.y)
  @localToGlobal: (point) ->
    x: (State.view.offset.x + (point.x)) * State.view.scale
    y: (State.view.offset.y + (point.y)) * State.view.scale


module.exports = Util