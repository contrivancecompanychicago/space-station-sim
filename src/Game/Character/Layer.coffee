class Layer
	constructor: (@canvas) ->
		console.log 'layer'
		@context = @canvas.getContext '2d'
		@render()

	# requireRender: ->
	# 	@willRender = true

	# update: ->
	# 	if @willRender
	# 		@render()
	# 		@willRender = false

	render: ->
		pos = Game.localToGlobal {x: 10, y: 10}
		@context.fillRect pos.x, pos.y, 10, 10

	requireRender: ->
		@willRender = true

	update: ->
		if @willRender
			@render()
			@willRender = false

module.exports = Layer