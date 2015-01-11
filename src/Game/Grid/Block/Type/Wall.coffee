# config = require '../../../config.coffee'
# gbw = config.grid.block.width
# gbh = config.grid.block.height
# module.exports = 
# 	isWall: true
# 	render: (context, offset, data) ->
# 		context.fillStyle = "grey"
# 		context.fillRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale

Base = require './Base.coffee'

block = new Base()
block.isWall = true
block.render = (context, offset, data) ->
	@.renderImage 'wall.png', context, offset
module.exports = block