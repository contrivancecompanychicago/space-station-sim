Imagine = require 'imagine'
$ = require 'jquery-browserify'
_ = require 'lodash'
Grid = require 'Game/Grid'
Input = require 'Game/Input'
Storage = require 'Game/Storage'
config = require 'Game/config'
Character = require 'Game/Character'
UI = require 'Game/UI/Layer'
CharacterLayer = require 'Game/Character/Layer'

State = require 'Game/State'

class window.Game
	name: "spacesim"
	# @state: 'no'
	constructor: (container)->
		@init container

	init: (container)->
		unless container
			throw new Error 'Game container not defined'

		@styleContainer(container)
		@initState()
		@initGrid(container)
		@initCharacter(container)
		@initUI(container)

	styleContainer: (container) ->
		@container = container
		@container.style.width = config.canvas.width + "px"
		@container.style.position = "relative"


	initGrid: (container) ->
		canvas = @makeCanvas()
		$(container).append canvas
		@constructor.grid = Imagine new Grid canvas

	initCharacter: (container) ->
		canvas = @makeCanvas()
		@constructor.input = Imagine new Input canvas

		canvas.id = "character"
		$(container).append canvas
		@constructor.character = Imagine new CharacterLayer canvas

	initUI: (container) ->
		UI_div = document.createElement 'div'
		UI_div.id = "ui"

		$(container).append UI_div
		@constructor.ui = new UI UI_div

	initState: ->
		loaded = Storage.get()
		if loaded
#			@constructor.state = JSON.parse Storage.get()
			require('Game/State/Helper').getInstance().loadGame Storage.get()
		else
#			@constructor.state = require 'Game/State'

	makeCanvas: ->
		canvas = document.createElement 'canvas'
		_.extend canvas, config.canvas
		_.extend canvas.style, config.canvas.style
		canvas


	destroy: ->
		@container.innerHTML = ''
		window.Game.instance = undefined
		Imagine.engine.reset()

	@globalToLocal: (point) ->
		x: ((point.x / State.view.scale) - State.view.offset.x)
		y: ((point.y / State.view.scale) - State.view.offset.y)
	@localToGlobal: (point) ->
		x: (State.view.offset.x + (point.x)) * State.view.scale
		y: (State.view.offset.y + (point.y)) * State.view.scale

#	@save: =>
#		# @grid.requireRender()
#		# @character.requireRender()
#		Storage.set()







module.exports = window.Game