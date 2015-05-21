

class Layer
  constructor: (@container)->
    @canvas = document.createElement 'canvas'
    @container.appendChild @canvas
    @context = @canvas.getContext '2d'


module.exports = Layer