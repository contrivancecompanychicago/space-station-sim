config = require '../../../config.coffee'
images = require '../../../images.coffee'
gbw = config.grid.block.width
gbh = config.grid.block.height

Base = require './Base.coffee'

block = new Base()
block.isWall = true
block.render = (context, offset, data) ->
	@.renderImage 'plain.png', context, offset
module.exports = block
