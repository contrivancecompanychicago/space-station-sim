config = require '../config.coffee'
Block = require './Block/Block.coffee'

class Grid

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
		@context = @canvas.getContext('2d');
		@render()


	requireRender: ->
		@willRender = true

	update: ->
		if @willRender
			@render()
			@willRender = false

	blockAtPoint: (point)->
		# console.log "looking up block"
		# x: Math.floor (point.x - Game.state.view.offset.x) / (gbw * Game.state.view.scale)
		# y: Math.floor (point.y - Game.state.view.offset.y) / (gbh * Game.state.view.scale)
		x: Math.floor ((point.x / Game.state.view.scale) - Game.state.view.offset.x) / gbw
		y: Math.floor ((point.y / Game.state.view.scale) - Game.state.view.offset.y) / gbh

	addBlock: (type, position) ->
		Game.state.gridData['g'+position.x+'_'+position.y] =
			type: type

	# wipes canvas
	clear: ->
		# console.log "clear"
		# console.log @context
		# console.log cw, ch
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
	renderBlock: (block) ->
		if @selection
			s = @selection
			if (s.l<=block.x) and (s.r>=block.x) and (s.t<=block.y) and (s.b>=block.y)
				selected = true

		@resetContextStyle()

		# console.log "render Block"
		# console.log Game.state.view.scale
		offset = 
			x: (Game.state.view.offset.x + (gbw*block.x)) * Game.state.view.scale
			y: (Game.state.view.offset.y + (gbh*block.y)) * Game.state.view.scale

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