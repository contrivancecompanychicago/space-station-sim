config = require 'Game/config'
gbw = config.grid.block.width
gbh = config.grid.block.height

State = require 'Game/State'

class Base

	constructor: (@width, @height) ->
		unless @width then @width = 1
		unless @height then @height = 1

	imagePath = 'Game/Grid/Item/'
	renderImage: (image, context, offset) ->

		# image = images[imagePath + image]
		# debugger
		sourceX = 0;
		sourceY = 0;
		sourceWidth = image.width;
		sourceHeight = image.height;
		destWidth = gbw * State.view.scale * @width;
		destHeight = gbh * State.view.scale * @height;
		destX = offset.x
		destY = offset.y
		context.drawImage image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight


module.exports = Base