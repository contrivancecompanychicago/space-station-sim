vic = require 'victor'
_ = require 'underscore'
config = require '../config.coffee'
Imagine = require '../../../bower_components/imagine/imagine.js'

class Character
	name: 'character'
	speed: 50
	constructor: (data) ->
		
		# Game.grid.path Game.grid.randomBlock(), Game.grid.randomBlock()
		@block = Game.grid.randomBlock()
		@pos = @getBlockPosition @block
		# console.log Game.grid.adjacentBlocks @block
		# @pos = new vic(20, 20)
		@setPath Game.grid.randomBlock() 
		@setTarget()
		

	setPath: (block) ->
		@path = Game.grid.path(@block, block)

	getBlockPosition: (block) ->
		# debugger
		# console.log block
		pos = new vic(block.x* config.grid.block.width, block.y * config.grid.block.height)
		pos.add new vic(Math.random()*20, Math.random()*20)

	setTarget: ->
		@destination = Game.grid.randomBlock() 
		if @path.length is 0
			@setPath @destination
		unless @path.length is 0 #double check
			@block = @path.shift()
			@target = @getBlockPosition @block

		# adj = Game.grid.adjacentBlocks @block
		# @block = adj[Math.floor(Math.random()*adj.length)]
		# @target = new vic(@block.x* config.grid.block.width, @block.y * config.grid.block.height)
		

	update: ->
		if @target
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
		else
			@setTarget()


module.exports = Character

