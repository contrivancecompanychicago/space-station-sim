Imagine = require '../bower_components/imagine/imagine.js'
$ = require 'jquery-browserify'
State = require './Game/State.coffee'
Grid = require './Game/Grid/Grid.coffee'
Input = require './Game/Input.coffee'

config = require './Game/config.coffee'
_ = require 'underscore'

class window.Game
	name: "spacesim"
	# @state: 'no'
	constructor: (container)->
		# @constructor.state = "yes"
		@container = container
		@canvas = document.createElement 'canvas'

		@constructor.input = new Input @canvas
		@constructor.state = new State()
		

		_.extend @canvas, config.canvas
		_.extend @canvas.style, config.canvas.style


		$(container).append @canvas
		Imagine new Grid @canvas





module.exports = window.Game