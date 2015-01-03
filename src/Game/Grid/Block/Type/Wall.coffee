config = require '../../../config.coffee'
gbw = config.grid.block.width
gbh = config.grid.block.height

module.exports =
	isWall: true
	render: (context, offset, data) ->
		context.fillStyle = "red"
		context.fillRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale
		