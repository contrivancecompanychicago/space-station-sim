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

	setPathToRoom: (type) ->
		blocks = Game.grid.blocksWithRoom type
		if blocks.length > 0
			@setPath blocks[0]
		
	findPathToRoom: (type) ->
		rooms = Game.grid.rooms[type]
		finalPath = false
		pathLen = Infinity
		if rooms.length > 0
			rooms.forEach (room) =>
				unless @block
					throw new Error '@block isnt defined'
				block = room.blocks[Math.floor(room.blocks.length*Math.random())]
				unless block
					throw new Error 'block isnt defined'
				path = Game.grid.path(@block, block)
				if path.length > 0 
					if path.length < pathLen
						pathLen = path.length
						finalPath = path
		finalPath

	setPath: (block) ->
		@path = Game.grid.path(@block, block)
		@setTarget()

	getBlockPosition: (block) ->
		pos = new vic(block.x* config.grid.block.width, block.y * config.grid.block.height)
		pos.add new vic(Math.random()*20, Math.random()*20)

	setTarget: ->

		if @path 
			block = @path.shift()
			if block
				@block = block
				@target = @getBlockPosition @block
			else
				@target = null
			# if @path.length is 0
			# 	@target = null
			# 	@endAction()
			# else
			# 	unless @path
			# 		debugger
			# 	@block = @path.shift()
			# 	@target = @getBlockPosition @block
			

	actions: ['walk', 'wait', 'leave', 'shop', 'bar']
	whatToDoNext: ->
		# console.log "what next"
		# debugger
		# options = []
		# path = {}
		# path.shop = @findPathToRoom 'shop'
		# if path.shop then options.push 'shop'
		# path.bar = @findPathToRoom 'bar'
		# if path.bar then options.push 'bar'
		# path.leave = @findPathToRoom 'dock'
		# if path.leave then options.push 'leave'


		# if options.length is 0
		# 	options.push 'wait'

		# action = options[Math.floor(Math.random() * @actions.length)]
		# @setAction action, path[action]

		action = @actions[Math.floor(Math.random() * @actions.length)]
		@setAction action




	walkUpdate: ->
		if @target
			diff = @target.clone().subtract(@pos)
			len = diff.length()
			dir = diff.norm()
			m = Imagine.time.deltaTime * @speed
			dir.multiply(new vic(m,m))
			@pos.add dir
			if len < 10
				@setTarget()
		else
			@setTarget()


	setAction: (@action, path) ->
		switch @action
			when 'walk'
				@destination = Game.grid.randomBlock()
				@setPath @destination
			when 'wait'
				@waitTime = Math.random() * 5
			when 'leave'
				path = @findPathToRoom 'dock'
				if path
					@path = path
			when 'shop'
				path = @findPathToRoom 'shop'
				if path
					@path = path
			when 'bar'
				path = @findPathToRoom 'bar'
				if path
					@path = path
	update: ->

		@walkUpdate()
		unless @target #still walking
			if @waitTime # wait around a bit if needed
				@waitTime -= Imagine.time.deltaTime
				if @waitTime < 0
					@endAction()
			# switch @action
			# 	when 'walk'
			# 		@endAction()
			# 	when 'leave'
			# 		@endAction()
			# 	when 'shop'
			# 		@endAction()
			# 	when 'bar'
			# 		@endAction()
			# 	when 'wait'
					

	endAction: ->
		switch @action
			when 'leave'
				Imagine.destroy @

		@whatToDoNext()

module.exports = Character

