Base = require './Base.coffee'

block = new Base()
block.isWall = false
block.render = (context, offset, data) ->
	@.renderImage 'dock.png', context, offset
module.exports = block

