config = require '../../../config.coffee'
gbw = config.grid.block.width
gbh = config.grid.block.height
module.exports = 
	render: (context, offset, data) ->
		# console.log "plain"

		context.fillStyle = "blue"
		context.fillRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale