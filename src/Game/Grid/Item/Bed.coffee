Base = require './Base.coffee'

img = require './bed.png'

item = new Base(1, 2)
item.defaults = {}
item.render = (context, offset, data) ->
	@.renderImage img, context, offset

module.exports = item