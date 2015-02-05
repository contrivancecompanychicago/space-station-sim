_ = require 'underscore'
astar = require 'javascript-astar'
BlockTypes = require './Grid/Block/Types.coffee'
config = require './config.coffee'
Imagine = require 'bower/imagine/imagine'
RoomTypes = require './Grid/Room/Types.coffee'
Item = require './Grid/Item.coffee'
helper = require './Grid/Helper.coffee'

ItemTypes = require 'Game/Grid/Item/Types'

class Grid

	constructor: (@canvas) ->

		
		# console.log Game.state
		@context = @canvas.getContext('2d')
		@item = new Item(@context)
		@calcData()
		@render()

	itemStateChanged: =>
		@requireRender()

	viewStateChanged: =>
		# Game.save()
		@requireRender()

	gridStateChanged: =>
		# Game.save()
		@calcData()
		@requireRender()

	pathData = null

	calcData: ->
		@calcPathData()
		@calcRoomData()

	calcRoomData: ->
		combos = [
			{x:0, y:1}
			{x:1, y:0}
			{x:0, y:-1}
			{x:-1, y:0}
		]
		@rooms = {}
		for key in  _.keys RoomTypes
			blocks = @blocksWithRoom key
			rooms = []
			while blocks.length > 0
				#start a new room
				# console.log "new room"
				room = 
					blocks:[]
					minx: Infinity
					miny: Infinity
					maxx: -Infinity
					maxy: -Infinity
				blocksToCheck = [blocks.shift()]
				while blocksToCheck.length > 0
					check = blocksToCheck.shift()
					# console.log 'checking', check
					blocks.forEach (block) ->
						match = false
						combos.forEach (combo) ->
							if (check.x is block.x + combo.x) and (check.y is block.y + combo.y) # is neighbour
								match = true
						if match
							blocksToCheck.push block
					blocks = _.difference blocks, blocksToCheck
					if check.x < room.minx then room.minx = check.x
					if check.y < room.miny then room.miny = check.y
					if check.x > room.maxx then room.maxx = check.x
					if check.y > room.maxy then room.maxy = check.y
					room.blocks.push check

				rooms.push room
			@rooms[key] = rooms
		# console.log @rooms
			


	calcPathData: ->
		keys = _.keys Game.state.gridData
		if keys.length is 0
			return 
			arr: []
			min: 0
			max: 0
		minx = Infinity
		miny = Infinity
		maxx = -Infinity
		maxy = -Infinity

		# gather data
		blocks = keys.map (key) =>
			helper = require 'Game/Grid/Helper'
			block = helper.stringToBlock key
			block.data = Game.state.gridData[key]
			block.type = BlockTypes[block.data.type]
			if block.x < minx then minx = block.x
			if block.y < miny then miny = block.y
			if block.x > maxx then maxx = block.x
			if block.y > maxy then maxy = block.y
			block

		# console.log minx, miny, maxx, maxy

		# make array
		arr = []
		for x in [minx..maxx]
			arr2 = []
			for y in [miny..maxy]
				arr2.push 0
			arr.push arr2
		# console.log arr

		# populate array
		blocks.forEach (block) ->
			weight = 1
			if block.type.isWall
				weight = 0
			arr[block.x-minx][block.y-miny] = weight
		# console.log start, end

		# console.log arr
		
		pathData = {
			arr
			minx
			miny
			# maxx
			# maxy
			}

	path: (start, end) ->
		# unless pathData
		# @calcPathData()
		if (start.x is end.x) and (start.y is end.y)
			return [end]

		pathData.graph = new astar.Graph pathData.arr

		start = pathData.graph.grid[start.x-pathData.minx][start.y-pathData.miny]
		end = pathData.graph.grid[end.x-pathData.minx][end.y-pathData.miny]
		result = astar.astar.search pathData.graph, start, end

		# console.log result

		# reapply the mins
		path = result.map (res) ->
			x: res.x+pathData.minx
			y: res.y+pathData.miny

		# console.log path

		path



	gbw = config.grid.block.width
	gbh = config.grid.block.height

	cw = config.canvas.width
	ch = config.canvas.height

	# offset: 
	# 	x: 0
	# 	y: 0
	scale: 1



	requireRender: ->
		@willRender = true

	update: ->
		if @willRender
			@render()
			@willRender = false






	

	# find all blocks with room type
	blocksWithRoom: (room)->
		out = []
		keys = _.keys Game.state.gridData
		# gather data
		blocks = keys.forEach (key) =>
			block = helper.stringToBlock key
			block.data = Game.state.gridData[key]
			if block.data.room is room
				out.push block
		out

	# wipes canvas
	clear: ->
		@context.closePath()
		@context.clearRect 0, 0, cw, ch


	# tries to render the block in Game.state.gridData['_'+x+'_'+y]
	blockPosition: (block) ->
		Game.localToGlobal 
			x: gbw * block.x
			y: gbh * block.y

	# looks at @offset, @scale and config.grid.block to output a list of blocks that are on screen
	blocksToRender: ->

		tl = helper.blockAtPoint {x:0, y:0}
		br = helper.blockAtPoint {x:cw, y:ch}

		out = []
		for x in [tl.x..br.x]
			for y in [tl.y..br.y]
				out.push {x, y}
		out

	resetContextStyle: ->
		@context.lineWidth = 1
		@context.fillStyle = "black"
		# @context.strokeStyle = "black"

	renderBlock: (block) ->
		if @selection
			s = @selection
			if (s.l<=block.x) and (s.r>=block.x) and (s.t<=block.y) and (s.b>=block.y)
				selected = true

		@resetContextStyle()

		offset = @blockPosition block

		data = Game.state.gridData[helper.blockToString block]
		if data
			type = BlockTypes[data.type]
			type.render @context, offset, data
			room = data.room
			if room
				roomType = RoomTypes[room]
				if roomType
					@context.fillStyle = roomType.color
				else
					@context.fillStyle = 'red' #danger
				@context.fillRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale


		if selected
			@context.lineWidth = 3
			@context.strokeStyle = "green"
		else
			@context.strokeStyle = "rgba(100,100,100,0.0)"
		@context.strokeRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale

		# debug
		@resetContextStyle()
		if config.grid.debugText
			@context.fillStyle = "grey"
			@context.font = '10px verdana'
			@context.fillText block.x+','+block.y, offset.x, offset.y+10

	renderItem: (block) ->

		offset = @blockPosition block
		data = Game.state.itemData[helper.blockToString block]
		if data
			type = ItemTypes[data.type]
			type.render @context, offset, data



	#starts mega draw call
	render: ->
		# console.log "render grid"
		@clear()
		blocks = @blocksToRender()
		# console.log blocks
		for block in blocks
			@renderBlock block
		for block in blocks
			@renderItem block

		@renderRooms()
		



	renderRooms: ->
		# console.log "do me"
		@context.fillStyle = 'rgba(0,0,0,0.5)'
		for type of @rooms
			roomType = RoomTypes[type]
			rooms = @rooms[type]
			# console.log rooms
			for room in rooms
				offset = @blockPosition {x: room.minx, y: room.miny}
				# console.log roomType.name
				@context.font = '10px verdana'
				@context.fillText roomType.name, offset.x+5, offset.y+15




module.exports = Grid