vic = require 'victor'
_ = require 'underscore'
config = require '../config.coffee'
Imagine = require '../../../bower_components/imagine/imagine.js'

class Character
	name: 'character'
	speed: 50
	constructor: (data) ->
		Game.grid.arrayify()
		@block = Game.grid.randomBlock()
		# console.log Game.grid.adjacentBlocks @block
		# @pos = new vic(20, 20)
		@setTarget()
		@pos = @target.clone()

	setTarget: ->
		# @target = new vic(Math.random() * 300, Math.random() * 300)
		adj = Game.grid.adjacentBlocks @block
		@block = adj[Math.floor(Math.random()*adj.length)]
		@target = new vic(@block.x* config.grid.block.width, @block.y * config.grid.block.height)
		

	update: ->
		diff = @target.clone().subtract(@pos)
		len = diff.length()
		dir = diff.norm()
		# console.log vec
		m = Imagine.time.deltaTime * @speed
		dir.multiply(new vic(m,m))
		# console.log dir
		@pos.add dir
		if len < 10
			@setTarget()


module.exports = Character

