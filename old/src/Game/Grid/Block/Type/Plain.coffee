Base = require 'Game/Grid/Block/Type/Base'
img = require './plain.png'
block = new Base()
block.render = (context, offset, data) ->
	@.renderImage img, context, offset
module.exports = block