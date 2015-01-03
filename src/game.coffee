Imagine = require '../bower_components/imagine/imagine.js'
$ = require 'jquery-browserify'
Grid = require './Game/Grid/Grid.coffee'
Input = require './Game/Input.coffee'
Storage = require './Game/Storage.coffee'
config = require './Game/config.coffee'
_ = require 'underscore'

class window.Game
	name: "spacesim"
	# @state: 'no'
	constructor: (container)->
		# @constructor.state = "yes"
		@container = container
		@canvas = document.createElement 'canvas'

		@constructor.input = Imagine new Input @canvas
		loaded = Storage.get()
		if loaded
			@constructor.state = JSON.parse Storage.get()
		else
			@constructor.state = require './Game/State.coffee'

		

		_.extend @canvas, config.canvas
		_.extend @canvas.style, config.canvas.style


		$(container).append @canvas
		@constructor.grid = Imagine new Grid @canvas


	@render: =>
		@grid.requireRender()
		Storage.set()





module.exports = window.Game