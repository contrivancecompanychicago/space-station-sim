
Base = require 'Game/Grid/Block/Type/Base'
img = require './wall.png'
block = new Base()
block.isWall = true
block.render = (context, offset, data) ->
	@.renderImage img, context, offset
module.exports = block