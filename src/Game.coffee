Imagine = require '../bower_components/imagine/imagine.js'
$ = require 'jquery-browserify'
Grid = require './Game/Grid/Grid.coffee'
Input = require './Game/Input.coffee'
Storage = require './Game/Storage.coffee'
config = require './Game/config.coffee'
_ = require 'underscore'

Character = require './Game/Character/Character.coffee'

UI = require './Game/UI/Layer.coffee'
CharacterLayer = require './Game/Character/Layer.coffee'

class window.Game
	name: "spacesim"
	# @state: 'no'
	constructor: (container)->
		# @constructor.state = "yes"
		@container = container


		loaded = Storage.get()
		if loaded
			@constructor.state = JSON.parse Storage.get()
		else
			@constructor.state = require './Game/State.coffee'

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
		_.extend canvas, config.canvas
		_.extend canvas.style, config.canvas.style
		$(container).append canvas
		@constructor.character = Imagine new CharacterLayer canvas

		# UI
		div = document.createElement 'div'
		div.id = "ui"
		$(container).append div
		@constructor.ui = new UI div


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

	update: ->
		if Math.random() < 0.01
			blocks = Game.grid.blocksWithRoom 'dock'
			if blocks.length > 0
				block = blocks[Math.floor(Math.random()*blocks.length)]
				Imagine new Character({block})








module.exports = window.Game