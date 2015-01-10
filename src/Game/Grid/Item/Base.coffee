config = require '../../config.coffee'
images = require '../../images.coffee'
gbw = config.grid.block.width
gbh = config.grid.block.height

class Base

	imagePath = 'Game/Grid/Item/'
	renderImage: (image, context, offset) ->

		image = images[imagePath + image]
		# debugger
		sourceX = 0;
		sourceY = 0;
		sourceWidth = image.width;
		sourceHeight = image.height;
		destWidth = gbw * Game.state.view.scale;
		destHeight = gbh * Game.state.view.scale;
		destX = offset.x
		destY = offset.y
		context.drawImage image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight


module.exports = Base