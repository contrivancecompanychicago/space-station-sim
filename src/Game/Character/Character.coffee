vic = require 'victor'
_ = require 'underscore'
config = require '../config.coffee'
Imagine = require '../../../bower_components/imagine/imagine.js'


class Character
	name: 'character'
	speed: 50

	constructor: (data) ->
		if data?.block
			@block = data.block
		else
			@block = Game.grid.randomBlock()

		@pos = @getBlockPosition @block

		@whatToDoNext()
		# @setPath Game.grid.randomBlock() 
		# @setTarget()
		# @action = 'walk'

	setPathToRoom: (type) ->
		blocks = Game.grid.blocksWithRoom type
		if blocks.length > 0
			@setPath blocks[0]
		
	findPathToRoom: (type) ->
		# console.log "find path to ", type
		# console.log Game.grid.rooms
		rooms = Game.grid.rooms[type]
		finalPath = false
		pathLen = Infinity
		if rooms.length > 0
			rooms.forEach (room) =>
				unless @block
					throw new Error '@block isnt defined'
				# console.log room
				block = room.blocks[Math.floor(room.blocks.length*Math.random())]
				unless block
					throw new Error 'block isnt defined'
				# console.log @block, block
				path = Game.grid.path(@block, block)
				# console.log 'path', path
				if path.length > 0 
					if path.length < pathLen
						pathLen = path.length
						finalPath = path
		# console.log "pathing", type, finalPath
		finalPath

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
			

	actions: ['walk', 'wait', 'leave', 'shop']
	whatToDoNext: ->
		# console.log "what next"
		# @debug = true
		# shopPath = @findPathToRoom('shop')
		# console.log shopPath

		action = @actions[Math.floor(Math.random() * @actions.length)]
		# console.log action
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
				@path = @findPathToRoom 'dock'
				@setTarget()
			when 'shop'
				@path = @findPathToRoom 'shop'
				@setTarget()
	update: ->
		switch @action
			when 'walk'
				@walkUpdate()
			when 'leave'
				@walkUpdate()
			when 'shop'
				@walkUpdate()
			when 'wait'
				@waitTime -= Imagine.time.deltaTime
				if @waitTime < 0
					@endAction()

	endAction: ->
		# console.log 'end', @action
		switch @action
			when 'leave'
				Imagine.destroy @

		@whatToDoNext()

module.exports = Character

