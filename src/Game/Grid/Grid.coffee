config = require '../config.coffee'
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
		@draw()


	clear: ->
		@context.clearRect 0, 0, config.canvas.width, config.canvas.height

	# looks at @offset, @scale and config.grid.block to output a list of blocks that are on screen
	blocksToRender: ->
		tl = {x: 0, y: 0}
		br = 
			x: Math.floor(cw/gbw) - 1
			y: Math.floor(ch/gbh) - 1

		# console.log gbw, cw, gbw/cw
		# console.log br
		out = []
		for x in [tl.x..br.x]
			for y in [tl.y..br.y]
				out.push {x, y}
		out

	# tries to render the block in Game.state.gridData['_'+x+'_'+y]
	renderBlock: (block) ->

		offset = 
			x: (Game.state.view.offset.x + (gbw*block.x)) * @scale
			y: (Game.state.view.offset.y + (gbh*block.y)) * @scale

		@context.rect offset.x, offset.y, gbw * @scale, gbh * @scale
		@context.stroke()


	#starts mega draw call
	draw: ->
		@clear()
		blocks = @blocksToRender()
		# console.log blocks
		for block in blocks
			@renderBlock block




module.exports = Grid