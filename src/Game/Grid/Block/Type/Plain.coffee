config = require '../../../config.coffee'
gbw = config.grid.block.width
gbh = config.grid.block.height
module.exports = 
	render: (context, offset, data) ->
		context.fillStyle = "white"
		context.fillRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale