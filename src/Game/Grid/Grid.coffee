_ = require 'underscore'
astar = require 'javascript-astar'
BlockTypes = require './Block/Types.coffee'
config = require '../config.coffee'
Imagine = require 'bower\\imagine\\imagine'
RoomTypes = require './Room/Types.coffee'
Item = require './Item.coffee'
ItemTypes = require './Item/Types.coffee'

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
		Game.save()
		@requireRender()

	gridStateChanged: =>
		Game.save()
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
			block = @stringToBlock key
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

	blockAtPoint: (point)->
		# console.log "looking up block"
		point = Game.globalToLocal point
		# x: Math.floor (point.x - Game.state.view.offset.x) / (gbw * Game.state.view.scale)
		# y: Math.floor (point.y - Game.state.view.offset.y) / (gbh * Game.state.view.scale)
		x: Math.floor point.x / gbw
		y: Math.floor point.y / gbh

	blockToString: (pos) ->
		'g'+pos.x+'_'+pos.y
	stringToBlock: (str) ->
		ar = str.substr(1).split '_'
		out = {x: parseInt(ar[0]), y: parseInt(ar[1])}
		# debugger
		out 


	randomBlock: ->
		keys = _.keys Game.state.gridData
		if keys.length is 0
			throw new error 'no block'
		key = keys[Math.floor(Math.random()*keys.length)]; #random key
		if BlockTypes[Game.state.gridData[key].type].isWall
			return @randomBlock() # try again
		@stringToBlock key

	addBlock: (pos) ->
		mode = Game.ui.mode.state.selected
		switch mode
			when 'block'
				type = Game.ui.block.state.selected
				obj = {type: type}
				Game.state.gridData[@blockToString(pos)] = obj
			when 'room'
				type = Game.ui.room.state.selected
				obj = {type: 'plain', room:type}
				Game.state.gridData[@blockToString(pos)] = obj
			when 'item'
				block = @blockToString(pos)
				if Game.state.gridData[block]#check if block exists
					type = Game.ui.item.state.selected
					obj = {type:type}
					_.extend obj, ItemTypes[type].defaults
					Game.state.itemData[block] = obj
			
	removeBlock: (pos) ->
		mode = Game.ui.mode.state.selected
		switch mode
			when 'block'
				delete Game.state.gridData[@blockToString(pos)]
				delete Game.state.itemData[@blockToString(pos)]
			when 'room'
				if Game.state.gridData[@blockToString(pos)]
					delete Game.state.gridData[@blockToString(pos)].room
			when 'item'
				delete Game.state.itemData[@blockToString(pos)]

	# returns adjacent block data
	adjacentBlocks: (block) ->
		# debugger
		combos = [
			{x: -1, y:0}
			{x: 1, y:0}
			{x: 0, y:-1}
			{x: 0, y:1}
			]
		out = []
		combos.forEach (combo) =>
			bl = 
				x: block.x + combo.x
				y: block.y + combo.y
			key = @blockToString bl
			val = Game.state.gridData[key]
			if val
				type = BlockTypes[val.type]
				unless type.isWall
					bl.data = val
					out.push bl
		out




	# wipes canvas
	clear: ->
		@context.closePath()
		@context.clearRect 0, 0, cw, ch

	# find all blocks with room type
	blocksWithRoom: (room)->
		out = []
		keys = _.keys Game.state.gridData
		# gather data
		blocks = keys.forEach (key) =>
			block = @stringToBlock key
			block.data = Game.state.gridData[key]
			if block.data.room is room
				out.push block
		out

	# looks at @offset, @scale and config.grid.block to output a list of blocks that are on screen
	blocksToRender: ->

		tl = @blockAtPoint {x:0, y:0}
		br = @blockAtPoint {x:cw, y:ch}

		out = []
		for x in [tl.x..br.x]
			for y in [tl.y..br.y]
				out.push {x, y}
		out

	resetContextStyle: ->
		@context.lineWidth = 1
		@context.fillStyle = "black"
		# @context.strokeStyle = "black"

	# tries to render the block in Game.state.gridData['_'+x+'_'+y]
	blockPosition: (block) ->
		Game.localToGlobal 
			x: gbw * block.x
			y: gbh * block.y
	renderBlock: (block) ->
		if @selection
			s = @selection
			if (s.l<=block.x) and (s.r>=block.x) and (s.t<=block.y) and (s.b>=block.y)
				selected = true

		@resetContextStyle()

		offset = @blockPosition block

		data = Game.state.gridData[@blockToString block]
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
		data = Game.state.itemData[@blockToString block]
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