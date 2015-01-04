vic = require 'victor'
_ = require 'underscore'
config = require '../config.coffee'

class Character
	name: 'character'
	constructor: (data) ->
		
		@block = Game.grid.randomBlock()

		@pos = new vic(20, 20)
		@setTarget()

	setTarget: ->
		# @target = new vic(Math.random() * 300, Math.random() * 300)

		@block = Game.grid.randomBlock()
		@target = new vic(@block.x* config.grid.block.width, @block.y * config.grid.block.height)
		

	update: ->
		diff = @target.clone().subtract(@pos)
		len = diff.length()
		dir = diff.norm()
		# console.log vec
		@pos.add dir
		if len < 2
			@setTarget()


module.exports = Character

