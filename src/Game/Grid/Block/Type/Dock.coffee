Base = require './Base.coffee'
img = require './dock.png'

block = new Base()
block.isWall = false
block.render = (context, offset, data) ->
	@.renderImage img, context, offset
module.exports = block

