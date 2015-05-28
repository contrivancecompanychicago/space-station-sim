config = require 'Game/config'
Imagine = require 'imagine'


cw = config.canvas.width
ch = config.canvas.height

State = require 'Game/State'
Util = require 'Game/Util'

Input = require 'Game/Input'

class CharacterRenderer extends require 'Mixin'
	@extend require 'DependencyInjector'

	@dependencies({
		types: new @Dependency 'CharacterRenderer types'
#		grid: new @Dependency 'Grid Reference'
	})

	render: (@layer) ->
		@layer.clear()
		chars = Imagine.getComponents 'character'
		chars.forEach (char) =>
			@renderChar char.pos

		@renderSelected()

		if @selected
			obj = @selected
			@layer.context.fillStyle = "white"
			@layer.context.font = 'bold 16px verdana'
			y = 30
			@layer.context.fillText obj.data.firstname + " " + obj.data.lastname, 10, y += 20
			@layer.context.font = '14px verdana'
#			@layer.context.fillText @types.action[obj.action].desc, 10, y += 20
			@layer.context.fillText "Needs:", 10, y += 20
			@layer.context.font = '10px verdana'
			for need of obj.data.needs
				@layer.context.fillStyle = 'white'
				@layer.context.fillText need, 10, y += 14
				@layer.context.fillStyle = 'grey'
				y += 4
				@layer.context.fillRect 10, y, 100, 10
				need = obj.data.needs[need]
				r = Math.floor(need * 255)
				@layer.context.fillStyle = 'rgb(' + r + ',' + (255-r) + ',0)'
				@layer.context.fillRect 10, y, need * 100, 10
				y += 10

	renderSelected: ->
		if Input.instance.objectUnderMouse
			@selected = Input.instance.objectUnderMouse

		if @selected
			pos = Util.localToGlobal @selected.pos
			@layer.context.strokeStyle = 'white'
			@layer.context.lineWidth = 2
			# @layer.context.fillRect pos.x, pos.y, 10*State.view.scale, 10*State.view.scale

			@layer.context.beginPath()
			@layer.context.arc(pos.x, pos.y, config.character.radius*State.view.scale, 0, 2 * Math.PI, false);
			@layer.context.stroke()
			@layer.context.closePath()


	renderChar: (data) ->
		pos = Util.localToGlobal data
		@layer.context.fillStyle = 'green'
		# @layer.context.fillRect pos.x, pos.y, 10*State.view.scale, 10*State.view.scale

		@layer.context.beginPath()
		@layer.context.arc(pos.x, pos.y, config.character.radius*State.view.scale, 0, 2 * Math.PI, false);
		@layer.context.fill()
		@layer.context.closePath()


module.exports = CharacterRenderer