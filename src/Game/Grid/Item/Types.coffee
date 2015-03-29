# config = require '../../config.coffee'
# gbw = config.grid.block.width
# gbh = config.grid.block.height

module.exports = 
	test: require 'Game/Grid/Item/Test'
	dockingbay: require 'Game/Grid/Item/DockingBay'
	bed: require 'Game/Grid/Item/Bed'
	# test: 
	# 	render: (context, offset, data) ->
	# 		context.fillStyle = "red"
	# 		context.fillRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale
