

class Layer
  constructor: (@container)->
    @canvas = document.createElement 'canvas'
    @container.appendChild @canvas


module.exports = Layer