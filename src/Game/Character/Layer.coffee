config = require '../config.coffee'
Character = require './Character.coffee'
Imagine = require '../../../bower_components/imagine/imagine.js'

class CharacterLayer
	cw = config.canvas.width
	ch = config.canvas.height
	constructor: (@canvas) ->
		# console.log 'layer'
		@context = @canvas.getContext '2d'
		new Character()
		@render()

	# wipes canvas
	clear: ->
		# console.log 0, 0, cw, ch
		@context.closePath()
		@context.clearRect 0, 0, cw, ch

	addCharacter: ->
		Imagine new Character()

	render: ->
		@clear()
		console.log Imagine.getComponents 'character'
		console.log 'last array shouldnt be empty'
		console.log Imagine.objects

		@renderChar
			x: 10
			y: 20

	renderChar: (data) ->
		pos = Game.localToGlobal data
		@context.fillRect pos.x, pos.y, 10, 10

	requireRender: ->
		@willRender = true

	update: ->
		if @willRender
			@render()
			@willRender = false

module.exports = CharacterLayer