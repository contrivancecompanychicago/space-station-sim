_ = require 'lodash'
config = require 'Game/config'

class Layer
  constructor: (@container)->
    @canvas = document.createElement 'canvas'
    @container.appendChild @canvas
    @context = @canvas.getContext '2d'

    _.extend @canvas, config.canvas
    _.extend @canvas.style, config.canvas.style


module.exports = Layer