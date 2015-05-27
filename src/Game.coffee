Imagine = require 'imagine'
#$ = require 'jquery'
_ = require 'lodash'
Grid = require 'Game/Grid'
Input = require 'Game/Input'
Storage = require 'Game/Storage'
config = require 'Game/config'
Renderer = require 'Game/Renderer'
UI = require 'Game/UI/Layer'
CharacterRenderer = require 'Game/Character/Renderer'
Util = require 'Game/Util'

DockingBay = require 'Game/Observer/DockingBay'

State = require 'Game/State'

class window.Game
	name: "spacesim"
	constructor: (container)->
		@init container

	init: (container)->
		unless container
			throw new Error 'Game container not defined'

		@helpers = {}
		@types = {}

		@styleContainer(container)
		@initState()
		@initGrid()
		@initRenderer(container)
		@initInput()
		@initCharacter(container)
		@initUI(container)
		@spawnObservers()

	styleContainer: (container) ->
		@container = container
		@container.style.width = config.canvas.width + "px"
		@container.style.position = "relative"


	initGrid: ->
		@grid = Imagine new Grid
		@helpers.grid = @grid.helper
		_.extend @types, @grid.getTypes()

	initCharacter: (container) ->
		CharHelper = require('Game/Character/Helper')
		CharHelper.inject
			helpers: @helpers
		helper = new CharHelper()
		helper.init()
		@helpers.character = helper


	initInput: ->
		@input = Imagine new Input @renderer.characterLayer.canvas

	initUI: (container) ->
		UI.inject
			helpers: @helpers
			types: @types


		UI_div = document.createElement 'div'
		UI_div.id = "ui"

#		$(container).append UI_div
		container.appendChild UI_div
		@ui = new UI UI_div

	initState: ->
		loaded = Storage.get()
		if loaded
#			@constructor.state = JSON.parse Storage.get()
			require('Game/State/Helper').getInstance().loadGame Storage.get()
		else
#			@constructor.state = require 'Game/State'

	initRenderer: (container) ->
		Renderer.inject
			helpers: @helpers
			types: @types
		@renderer = new Renderer container

	makeCanvas: ->
		canvas = document.createElement 'canvas'
		_.extend canvas, config.canvas
		_.extend canvas.style, config.canvas.style
		canvas

	spawnObservers: ->
		DockingBay.inject
			helpers: @helpers
		Imagine new DockingBay()

	destroy: ->
		@container.innerHTML = ''
		window.Game.instance = undefined
		Imagine.engine.reset()


module.exports = window.Game