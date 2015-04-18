config = require 'Game/config'
# images = require '../../../images.coffee'
gbw = config.grid.block.width
gbh = config.grid.block.height

State = require 'Game/State'

class Base

	imagePath = 'Game/Grid/Block/Type/'
	renderImage: (image, context, offset) ->

		# image = images[imagePath + image]
		# debugger
		sourceX = 0;
		sourceY = 0;
		sourceWidth = image.width;
		sourceHeight = image.height;
		destWidth = gbw * State.view.scale;
		destHeight = gbh * State.view.scale;
		destX = offset.x
		destY = offset.y
		# console.log image
		context.drawImage image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight


module.exports = Base