_ = require 'lodash'
astar = require 'astar/astar'
config = require 'Game/config'
Util = require('Game/Util')

ItemTypes = require 'Game/Grid/Item/Types'
BlockTypes = require 'Game/Grid/Block/Types'
RoomTypes = require 'Game/Grid/Room/Types'
Helper = require('Game/Grid/Helper')


State = require 'Game/State'

Input = require 'Game/Input'



class Grid extends require 'Singleton'

	constructor: ->
		Helper.inject
			grid: @
		@helper = Helper.getInstance()
		@calcData()

	getHelpers: ->
		{}
	getTypes: ->
		{
			item: ItemTypes
			block: BlockTypes
			room: RoomTypes
		}


	gridStateChanged: =>
		@calcData()
#		@requireRender()

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

	calcPathData: ->
		keys = _.keys State.gridData
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
			helper = require('Game/Grid/Helper').getInstance()
			block = helper.stringToBlock key
			block.data = State.gridData[key]
			block.type = BlockTypes[block.data.type]
			if block.x < minx then minx = block.x
			if block.y < miny then miny = block.y
			if block.x > maxx then maxx = block.x
			if block.y > maxy then maxy = block.y
			block

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


	# find all blocks with room type
	blocksWithRoom: (room)->
		out = []
		keys = _.keys State.gridData
		# gather data
		blocks = keys.forEach (key) =>
			block = @helper.stringToBlock key
			block.data = State.gridData[key]
			if block.data.room is room
				out.push block
		out




module.exports = Grid