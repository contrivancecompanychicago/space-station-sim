config = require '../config.coffee'
Block = require './Block/Block.coffee'

class Grid

	gbw = config.grid.block.width
	gbh = config.grid.block.height

	cw = config.canvas.width
	ch = config.canvas.height

	offset: 
		x: 0
		y: 0
	scale: 1
	constructor: (@canvas) ->
		# console.log Game.state
		@context = @canvas.getContext('2d');
		@render()

	# wipes canvas
	clear: ->
		# console.log "clear"
		# console.log @context
		# console.log cw, ch
		@context.closePath()
		@context.clearRect 0, 0, cw, ch

	# looks at @offset, @scale and config.grid.block to output a list of blocks that are on screen
	blocksToRender: ->
		tl = 
			x: Math.ceil((-Game.state.view.offset.x)/gbh)
			y: Math.ceil((-Game.state.view.offset.y)/gbh)
		br = 
			y: Math.floor((ch - Game.state.view.offset.y)/gbh) - 1
			x: Math.floor((cw - Game.state.view.offset.x)/gbw) - 1

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

		@resetContextStyle()

		# console.log "render Block"
		offset = 
			x: (Game.state.view.offset.x + (gbw*block.x)) * @scale
			y: (Game.state.view.offset.y + (gbh*block.y)) * @scale

		# console.log Game.state
		data = Game.state.gridData['g'+block.x+'_'+block.y]
		if data
			type = Block[data.type]
			type.render @context, offset, data


		# debug
		@context.strokeStyle = "grey"
		@context.strokeRect offset.x, offset.y, gbw * @scale, gbh * @scale

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