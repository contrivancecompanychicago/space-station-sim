Imagine = require '../bower_components/imagine/imagine.js'
$ = require 'jquery-browserify'

Grid = require './Game/Grid/Grid.coffee'

config = require './Game/config.coffee'
_ = require 'underscore'

class Game
	name: "spacesim"
	constructor: (container)->
		Game.container = container
		@canvas = document.createElement 'canvas'

		_.extend @canvas, config.canvas
		_.extend @canvas.style, config.canvas.style


		$(container).append @canvas
		Imagine new Grid @canvas





module.exports = Game