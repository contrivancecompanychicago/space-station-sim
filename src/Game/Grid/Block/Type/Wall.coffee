Base = require './Base.coffee'

block = new Base()
block.isWall = true
block.render = (context, offset, data) ->
	@.renderImage 'plain.png', context, offset
module.exports = block
