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
		# for [0..0]
		# 	@addCharacter()
		@willRender = true

		Game.state.characterData.visitor.forEach (data) ->
			Imagine new Character({data})

		# throw new Error 'LOAD CHAR DATA'
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

		@renderSelected()

		if @selected
			obj = @selected
			@context.fillStyle = "white"
			@context.font = 'bold 16px verdana'
			y = 30
			@context.fillText obj.data.firstname + " " + obj.data.lastname, 10, y += 20
			@context.font = '14px verdana'
			@context.fillText ActionTypes[obj.action].desc, 10, y += 20
			@context.fillText "Needs:", 10, y += 20
			@context.font = '10px verdana'
			# console.log obj
			for need of obj.data.needs
				@context.fillStyle = 'white'
				@context.fillText need, 10, y += 14
				@context.fillStyle = 'grey'
				y += 4
				@context.fillRect 10, y, 100, 10
				need = obj.data.needs[need]
				r = Math.floor(need * 255)
				@context.fillStyle = 'rgb(' + r + ',' + (255-r) + ',0)'
				@context.fillRect 10, y, need * 100, 10
				 
				y += 10

	renderSelected: ->
		if Game.input.objectUnderMouse
			@selected = Game.input.objectUnderMouse

		if @selected
			# console.log @selected.pos

			pos = Game.localToGlobal @selected.pos
			@context.strokeStyle = 'white'
			@context.lineWidth = 2
			# @context.fillRect pos.x, pos.y, 10*Game.state.view.scale, 10*Game.state.view.scale

			@context.beginPath()
			@context.arc(pos.x, pos.y, config.character.radius*Game.state.view.scale, 0, 2 * Math.PI, false);
			@context.stroke()
			@context.closePath()


	renderChar: (data) ->
		pos = Game.localToGlobal data
		@context.fillStyle = 'green'
		# @context.fillRect pos.x, pos.y, 10*Game.state.view.scale, 10*Game.state.view.scale

		@context.beginPath()
		@context.arc(pos.x, pos.y, config.character.radius*Game.state.view.scale, 0, 2 * Math.PI, false);
		@context.fill()
		@context.closePath()

	requireRender: ->
		@willRender = true

	update: ->
		if @willRender
			@render()
			# @willRender = false

module.exports = CharacterLayer