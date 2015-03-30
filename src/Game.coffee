Imagine = require 'imagine'
$ = require 'jquery-browserify'
_ = require 'underscore'
Grid = require 'Game/Grid'
Input = require 'Game/Input'
Storage = require 'Game/Storage'
config = require 'Game/config'

Character = require 'Game/Character'

UI = require 'Game/UI/Layer'
CharacterLayer = require 'Game/Character/Layer'

class window.Game
	name: "spacesim"

	# @state: 'no'
	constructor: (container)->
		@init container

	init: (container)->
		# @instance = @
		unless container
			throw new Error 'Game container not defined'
		# @constructor.state = "yes"
		@container = container

		@container.style.width = config.canvas.width + "px"
		@container.style.position = "relative"


		loaded = Storage.get()
		if loaded
			@constructor.state = JSON.parse Storage.get()
		else
			@constructor.state = require 'Game/State'

		# grid
		@canvas = document.createElement 'canvas'
		_.extend @canvas, config.canvas
		_.extend @canvas.style, config.canvas.style
		$(container).append @canvas
		@constructor.grid = Imagine new Grid @canvas

		# character
		canvas = document.createElement 'canvas'
		@constructor.input = Imagine new Input canvas

		canvas.id = "character"
		for attr of config.canvas
			canvas.setAttribute attr, config.canvas[attr]
		_.extend canvas.style, config.canvas.style
		$(container).append canvas
		@constructor.character = Imagine new CharacterLayer canvas

		# UI
		UIdiv = document.createElement 'div'
		UIdiv.id = "ui"
		
		$(container).append UIdiv
		@constructor.ui = new UI UIdiv

	@instance: ->
		@

	@globalToLocal: (point) ->
		x: ((point.x / Game.state.view.scale) - Game.state.view.offset.x)
		y: ((point.y / Game.state.view.scale) - Game.state.view.offset.y)
	@localToGlobal: (point) ->
		x: (Game.state.view.offset.x + (point.x)) * Game.state.view.scale
		y: (Game.state.view.offset.y + (point.y)) * Game.state.view.scale

	@save: =>
		# @grid.requireRender()
		# @character.requireRender()
		Storage.set()







module.exports = window.Game