config = require '../config.coffee'
Block = require './Block/Block.coffee'
_ = require 'underscore'
astar = require 'javascript-astar'
class Grid

	arrayify: ->
		minx = Infinity
		miny = Infinity
		maxx = -Infinity
		maxy = -Infinity

		keys = _.keys Game.state.gridData
		# gather data
		blocks = keys.map (key) =>
			block = @stringToBlock key
			block.data = Game.state.gridData[key]
			block.type = Block[block.data.type]
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

		console.log arr



	gbw = config.grid.block.width
	gbh = config.grid.block.height

	cw = config.canvas.width
	ch = config.canvas.height

	# offset: 
	# 	x: 0
	# 	y: 0
	scale: 1
	constructor: (@canvas) ->
		# console.log Game.state
		@context = @canvas.getContext('2d')
		@render()


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
		key = keys[Math.floor(Math.random()*keys.length)]; #random key
		@stringToBlock key

	addBlock: (pos) ->
		type = Game.ui.blockSelector.state.selected
		Game.state.gridData[@blockToString(pos)] =
			type: type
	removeBlock: (pos) ->
		delete Game.state.gridData[@blockToString(pos)]

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
				type = Block[val.type]
				unless type.isWall
					bl.data = val
					out.push bl
		out




	# wipes canvas
	clear: ->
		@context.closePath()
		@context.clearRect 0, 0, cw, ch

	# looks at @offset, @scale and config.grid.block to output a list of blocks that are on screen
	blocksToRender: ->
		# tl = 
		# 	x: Math.ceil((-Game.state.view.offset.x)/(gbh)) - 1
		# 	y: Math.ceil((-Game.state.view.offset.y)/(gbw)) - 1
		# br = 
		# 	x: Math.floor(((cw - Game.state.view.offset.x*(1 / Game.state.view.scale)) / (gbw))*(1 / Game.state.view.scale))
		# 	y: Math.floor(((ch - Game.state.view.offset.y*(1 / Game.state.view.scale)) / (gbh))*(1 / Game.state.view.scale))

		# console.log br, @blockAtPoint {x:cw-30, y:ch-30}
		tl = @blockAtPoint {x:0, y:0}
		br = @blockAtPoint {x:cw, y:ch}

		# console.log gbw, cw, gbw/cw
		# console.log br
		out = []
		for x in [tl.x..br.x]
			for y in [tl.y..br.y]
				out.push {x, y}
		out
		# [{x:2, y:2}]

	resetContextStyle: ->
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

		# out = (off + (wide*x))*scale
		# solve for x
		# out/scale = off + (wide*x)
		# (out/scale) - off = wide*x
		# ((out/scale) - off)/wide = x
		# console.log Game.state
		data = Game.state.gridData['g'+block.x+'_'+block.y]
		if data
			type = Block[data.type]
			type.render @context, offset, data

		if selected
			@context.strokeStyle = "green"
		else
			@context.strokeStyle = "grey"
		@context.strokeRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale

		# debug
		@resetContextStyle()
		if config.grid.debugText
			@context.fillStyle = "grey"
			@context.font = '10px verdana'
			@context.fillText block.x+','+block.y, offset.x, offset.y+10

	#starts mega draw call
	render: ->
		# console.log "render grid"
		@clear()
		blocks = @blocksToRender()
		# console.log blocks
		for block in blocks
			@renderBlock block




module.exports = Grid