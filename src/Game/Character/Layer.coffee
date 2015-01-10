config = require '../config.coffee'
Character = require './Character.coffee'
Imagine = require '../../../bower_components/imagine/imagine.js'
ActionTypes = require '../Character/Action/Types.coffee'

class CharacterLayer
	cw = config.canvas.width
	ch = config.canvas.height
	constructor: (@canvas) ->
		# console.log 'layer'
		@context = @canvas.getContext '2d'
		for [0..0]
			@addCharacter()
		@willRender = true
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
		chars = Imagine.getComponents 'character'
		chars.forEach (char) =>
			@renderChar char.pos

		if Game.input.objectUnderMouse
			obj = Game.input.objectUnderMouse
			@context.fillStyle = "white"
			@context.font = 'bold 16px verdana'
			y = 30
			@context.fillText obj.firstname + " " + obj.lastname, 10, y += 20
			@context.font = '14px verdana'
			@context.fillText ActionTypes[obj.action].desc, 10, y += 20
			# str += " action:"+obj.action
			# str += " x:" + Math.floor obj.pos.x
			# str += " y:" + Math.floor obj.pos.y
			# # console.log @context.measureText str
			# @context.fillText str, 10, ch - 20

	renderChar: (data) ->
		pos = Game.localToGlobal data
		@context.fillStyle = 'green'
		# @context.fillRect pos.x, pos.y, 10*Game.state.view.scale, 10*Game.state.view.scale

		@context.beginPath()
		@context.arc(pos.x, pos.y, 5*Game.state.view.scale, 0, 2 * Math.PI, false);
		@context.fill()
		@context.closePath()

	requireRender: ->
		@willRender = true

	update: ->
		if @willRender
			@render()
			# @willRender = false

module.exports = CharacterLayer