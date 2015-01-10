
_ = require 'underscore'
config = require '../config.coffee'
Imagine = require '../../../bower_components/imagine/imagine.js'
namegen = require '../Util/namegen.coffee'
vic = require 'victor'

ActionTypes = 
	walk:
		waitTime: 0
	wait:
		waitTime: 3
	leave:
		room: 'dock'
	shop:
		room: 'shop'
		need: ['shop']
	bar:
		room: 'bar'
		need: ['fun']

class Character
	name: 'character'
	speed: 50

	constructor: (data) ->

		[@firstname, @lastname] = namegen()
		# console.log @firstname, @lastname
		@makeNeeds()
		if data?.block
			@block = data.block
		else
			@block = Game.grid.randomBlock()

		@pos = @getBlockPosition @block

		@whatToDoNext()

	makeNeeds: ->
		@needs =
			energy: Math.random()
			fun: Math.random()
			hunger: Math.random()
			shop: Math.random()


	gridStateChanged: ->
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

	# actions: ['walk', 'wait', 'leave', 'shop', 'bar']
	whatToDoNext: ->
		
		# console.log "what next"
		# debugger
		options = []
		path = {}
		for type of ActionTypes
			action = ActionTypes[type]
			if action.need #only process actions with needs
				need = @needs[action.need]
				if need #if needs to go to this room
					path[action.room] = @findPathToRoom action.room
					if path[action.room] then options.push type




		if options.length is 0
			path.leave = @findPathToRoom 'dock'
			if path.leave then options.push 'leave'


		if options.length is 0
			options.push 'walk'
			destination = Game.grid.randomBlock()
			path.walk = Game.grid.path(@block, destination)
			options.push 'wait'

		action = options[Math.floor(Math.random() * options.length)]
		@setAction action, path[action]


	walkUpdate: ->
		if @target
			diff = @target.clone().subtract(@pos)
			len = diff.length()
			dir = diff.norm()
			m = Imagine.time.deltaTime * @speed * Game.state.timeScale
			dir.multiply(new vic(m,m))
			@pos.add dir
			if len < 10
				@setTarget()
		else
			@setTarget()


	setAction: (@action, path) ->
		@waitTime = 0
		unless path 
			unless @action is 'wait'
				debugger
				throw new Error 'no path'
		# console.log @, @waitTime
		action = ActionTypes[@action]
		if action.waitTime
			@waitTime = action.waitTime

		if path
			@path = path
		switch @action
			# when 'walk'
			# 	# @destination = Game.grid.randomBlock()
			# 	# @setPath @destination
			when 'wait'
				@waitTime = Math.random() * action.waitTime
	update: ->

		@walkUpdate()
		# console.log @target
		unless @target #still walking
			@waitTime -= Imagine.time.deltaTime * Game.state.timeScale
			if @waitTime < 0
				@endAction()
					

	endAction: ->
		switch @action
			when 'leave'
				Imagine.destroy @
			when 'shop'
				@needs.shop = 0
			when 'bar'
				@needs.fun = 0

		@whatToDoNext()

module.exports = Character

