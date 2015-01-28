Base = require './Base.coffee'
img = require './test.png'
item = new Base()
item.render = (context, offset, data) ->
	@.renderImage img, context, offset
module.exports = item