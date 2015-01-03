config = require '../config.coffee'

class Layer
	cw = config.canvas.width
	ch = config.canvas.height
	constructor: (@canvas) ->
		# console.log 'layer'
		@context = @canvas.getContext '2d'
		@render()

	# requireRender: ->
	# 	@willRender = true

	# update: ->
	# 	if @willRender
	# 		@render()
	# 		@willRender = false


	# wipes canvas
	clear: ->
		# console.log 0, 0, cw, ch
		@context.closePath()
		@context.clearRect 0, 0, cw, ch

	render: ->
		@clear()
		pos = Game.localToGlobal {x: 10, y: 10}
		@context.fillRect pos.x, pos.y, 10, 10

	requireRender: ->
		@willRender = true

	update: ->
		if @willRender
			@render()
			@willRender = false

module.exports = Layer