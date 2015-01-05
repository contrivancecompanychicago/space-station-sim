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

	setPathToRoom: (type) ->
		blocks = Game.grid.blocksWithRoom type
		@setPath blocks[0]
		

	setPath: (block) ->
		@path = Game.grid.path(@block, block)
		@setTarget()

	getBlockPosition: (block) ->
		pos = new vic(block.x* config.grid.block.width, block.y * config.grid.block.height)
		pos.add new vic(Math.random()*20, Math.random()*20)

	setTarget: ->

		if @path.length is 0
			@target = null
			@endAction()
		else
			@block = @path.shift()
			@target = @getBlockPosition @block
			

	actions: ['walk', 'wait', 'leave']
	whatToDoNext: ->
		# console.log "what next"
		# @debug = true

		action = @actions[Math.floor(Math.random() * @actions.length)]
		console.log action
		@setAction action
		# if Math.random() > 0.5
		# 	@setAction 'walk'
		# else
		# 	@setAction 'wait'



	walkUpdate: ->
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
			@endAction()


	setAction: (@action) ->
		# @actions[@action].start()
		# console.log 'do', @action
		switch @action
			when 'walk'
				@destination = Game.grid.randomBlock()
				@setPath @destination
			when 'wait'
				@waitTime = Math.random() * 5
			when 'leave'
				@setPathToRoom 'dock'

	update: ->
		switch @action
			when 'walk'
				@walkUpdate()
			when 'leave'
				@walkUpdate()
			when 'wait'
				@waitTime -= Imagine.time.deltaTime
				if @waitTime < 0
					@endAction()

	endAction: ->
		console.log 'end', @action
		switch @action
			when 'leave'
				Imagine.destroy @

		@whatToDoNext()

module.exports = Character

