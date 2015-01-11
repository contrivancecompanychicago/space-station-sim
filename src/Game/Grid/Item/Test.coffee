Base = require './Base.coffee'

item = new Base(2, 2)
item.render = (context, offset, data) ->
	@.renderImage 'test.png', context, offset
module.exports = item