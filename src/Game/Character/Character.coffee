vic = require 'victor'
_ = require 'underscore'

class Character
	name: 'character'
	constructor: (data) ->
		keys = _.keys Game.state.gridData
		key = keys[Math.floor(Math.random()*keys.length)]; #random key
		@block = Game.grid.stringToBlock key

		@pos = new vic(20, 20)
		@setTarget()

	setTarget: ->
		@target = new vic(Math.random() * 300, Math.random() * 300)
		

	update: ->
		diff = @target.clone().subtract(@pos)
		len = diff.length()
		dir = diff.norm()
		# console.log vec
		@pos.add dir
		if len < 2
			@setTarget()


module.exports = Character

