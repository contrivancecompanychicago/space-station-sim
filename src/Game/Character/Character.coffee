vic = require 'victor'
_ = require 'underscore'
config = require '../config.coffee'
Imagine = require '../../../bower_components/imagine/imagine.js'


class Character
	name: 'character'
	speed: 50

	constructor: (data) ->
		
		@block = Game.grid.randomBlock()
		@pos = @getBlockPosition @block

		@whatToDoNext()
		# @setPath Game.grid.randomBlock() 
		# @setTarget()
		# @action = 'walk'
		

	setPath: (block) ->
		@path = Game.grid.path(@block, block)

	getBlockPosition: (block) ->
		pos = new vic(block.x* config.grid.block.width, block.y * config.grid.block.height)
		pos.add new vic(Math.random()*20, Math.random()*20)

	setTarget: ->

		if @path.length is 0
			@target = null
			@whatToDoNext()
		else
			@block = @path.shift()
			@target = @getBlockPosition @block
			

		
	whatToDoNext: ->
		# console.log "what next"
		# @debug = true
		if Math.random() > 0.5
			@setAction 'walk'
		else
			@setAction 'wait'

	setAction: (@action) ->
		# @actions[@action].start()
		# debugger
		# console.log 'do', @action
		switch @action
			when 'walk'
				@destination = Game.grid.randomBlock()
				@setPath @destination
				@setTarget()
			when 'wait'
				@waitTime = Math.random() * 5


	actions: ['walk', 'wait']


	update: ->
		# if @debug
		# 	debugger
		switch @action
			when 'walk'
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
					@whatToDoNext()
			when 'wait'
				@waitTime -= Imagine.time.deltaTime
				if @waitTime < 0
					@whatToDoNext()


module.exports = Character

