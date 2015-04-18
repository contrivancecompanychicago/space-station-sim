
_ = require 'underscore'
config = require 'Game/config'
Imagine = require 'imagine'
namegen = require 'Game/Util/namegen'
vic = require 'victor'

ActionTypes = require 'Game/Character/Action/Types'
gridhelper = require('Game/Grid/Helper').getInstance()

State = require 'Game/State'

class Character
	name: 'character'
	speed: 50

	constructor: (@data) ->
		@block = @data.block
#
#		if params?.block
#			@block = params.block
#		else
#			@block = gridhelper.randomBlock()
#
#		@pos = @getBlockPosition @block
#
#		if params?.data
#			@data = params.data
#		else
#			[firstname, lastname] = namegen()
#			State.characterData.visitor.push {
#				'firstname': firstname
#				'lastname': lastname
#			}
#			@data = State.characterData.visitor[State.characterData.visitor.length-1]
#			@makeNeeds()


	makeNeeds: ->
		@data.needs =
			# energy: Math.random()
			fun: Math.random()
			# hunger: Math.random()
			shop: Math.random()
			medical: Math.random()
			repair: Math.random()

	gridStateChanged: ->
		@whatToDoNext()
		
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
	findPathToBlock: (block) ->
		path = Game.grid.path(@block, block)
		if path.length is 0
			return false
		path

	setPath: (block) ->
		@path = Game.grid.path(@block, block)
		@setTarget()

	getBlockPosition: (block) ->
		pos = new vic(block.x* config.grid.block.width, block.y * config.grid.block.height)
		v = (config.grid.block.width / 4) + (Math.random() * (config.grid.block.width / 2))
		pos.add new vic(v, v)

	setTarget: ->
		if @path 
			block = @path.shift()
			if block
				@block = block
				@target = @getBlockPosition @block
			else
				@target = null
	whatToDoNext: ->
		options = []
		path = {}
		for type of ActionTypes
			action = ActionTypes[type]
			if action.need #only process actions with needs
				if @data.needs # todo: remove
					need = @data.needs[action.need[0]]
					if need #if needs to go to this room
						path[action.room] = @findPathToRoom action.room
						if path[action.room] then options.push {
							action: type
							length: path[action.room].length
							need: need
						}
		if options.length #what one do I want the most
			options.sort (a, b) ->
				b.need - a.need
			options = [options[0].action]
			# debugger

		if options.length is 0
			if @data.dock
				path.leave = @findPathToBlock @data.dock
			unless path.leave	
				path.leave = @findPathToRoom 'dock'
			if path.leave then options.push 'leave'


		if options.length is 0
			options.push 'walk'
			destination = gridhelper.randomBlock()
			path.walk = Game.grid.path(@block, destination)
			options.push 'wait'

		action = options[Math.floor(Math.random() * options.length)]
		@setAction action, path[action]
	walkUpdate: ->
		if @target
			diff = @target.clone().subtract(@pos)
			len = diff.length()
			dir = diff.norm()
			m = Imagine.time.deltaTime * @speed * State.timeScale
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
		action = ActionTypes[@action]
		if action.waitTime
			@waitTime = action.waitTime

		if path
			@path = path
		switch @action
			when 'wait'
				@waitTime = Math.random() * action.waitTime
	update: ->
		unless @action
			@whatToDoNext()
		action = ActionTypes[@action]
		@walkUpdate()
		unless @target #still walking
			timediff = Imagine.time.deltaTime * State.timeScale
			@waitTime -= timediff
			# debugger
			need = 0
			if action.need
				need = action.need.map((need) ->
					@data.needs[need] -= 0.1 * Imagine.time.deltaTime * State.timeScale
				, @)
				.reduce (a,b) ->
					a+b
			
			if @waitTime <= 0 and need <= 0
				@endAction()
					

	endAction: ->
		action = ActionTypes[@action]
		if action.need
			for need in action.need
				@data.needs[need] = 0

		switch @action
			when 'leave'
				# ind = State.characterData.visitor.indexOf @data
				State.characterData.visitor = _.without State.characterData.visitor, @data
				# @data.del = "me"
				# delete @data
				if @data.dock
					if (@block.x is @data.dock.x) and (@block.y is @data.dock.y)
						# leaving at the dock I came from
						data = State.itemData[gridhelper.blockToString @data.dock]
						if data?.waitingFor
							data.waitingFor--

				Imagine.destroy @

		@whatToDoNext()

module.exports = Character

