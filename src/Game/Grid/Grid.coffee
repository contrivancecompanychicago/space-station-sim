config = require '../config.coffee'
class Grid

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

	# tries to render the block in Game.state.gridData['_'+x+'_'+y]
	renderBlock: (x, y) ->
		gbw = config.grid.block.width
		gbh = config.grid.block.height

		offset = 
			x: (@offset.x + (gbw*x)) * @scale
			y: (@offset.y + (gbh*x)) * @scale

		@context.rect offset.x, offset.y, gbw * @scale, gbh * @scale
		@context.stroke()


	#starts mega draw call
	draw: ->
		@clear()

		@renderBlock(1, 1)
		@renderBlock(2, 2)




module.exports = Grid