config = require 'Game/config'
# images = require '../../images.coffee'
gbw = config.grid.block.width
gbh = config.grid.block.height

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
		destWidth = gbw * Game.state.view.scale * @width;
		destHeight = gbh * Game.state.view.scale * @height;
		destX = offset.x
		destY = offset.y
		context.drawImage image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight


module.exports = Base