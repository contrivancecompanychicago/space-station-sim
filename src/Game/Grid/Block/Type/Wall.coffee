config = require '../../../config.coffee'
images = require '../../../images.coffee'
gbw = config.grid.block.width
gbh = config.grid.block.height

module.exports =
	isWall: true
	render: (context, offset, data) ->
		# context.fillStyle = "red"
		# context.fillRect offset.x, offset.y, gbw * Game.state.view.scale, gbh * Game.state.view.scale

		image = images['grid/block/plain.png']

		# context.drawImage image, offset.x, offset.y

		sourceX = 0;
		sourceY = 0;
		sourceWidth = image.width;
		sourceHeight = image.height;
		destWidth = gbw * Game.state.view.scale;
		destHeight = gbh * Game.state.view.scale;
		destX = offset.x
		destY = offset.y
		# console.log image.width
		context.drawImage image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight
		