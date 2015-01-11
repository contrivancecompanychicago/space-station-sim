Base = require './Base.coffee'

item = new Base()
item.render = (context, offset, data) ->
	@.renderImage 'test.png', context, offset
module.exports = item