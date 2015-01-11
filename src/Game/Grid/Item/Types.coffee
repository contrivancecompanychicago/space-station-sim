# config = require '../../config.coffee'
# gbw = config.grid.block.width
# gbh = config.grid.block.height

module.exports = 
	test: require './Test.coffee'
	dockingbay: require './DockingBay.coffee'
	# test: 
	# 	render: (context, offset, data) ->
	# 		context.fillStyle = "red"
	# 		context.fillRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale
