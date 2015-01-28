Base = require './Base.coffee'
img = require './plain.png'
block = new Base()
block.render = (context, offset, data) ->
	@.renderImage img, context, offset
module.exports = block