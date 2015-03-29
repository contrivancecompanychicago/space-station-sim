helper = require 'Game/Grid/Helper'
class Helper
	name: 'itemhelper'
	getByBlock: (block) -> Game.state.itemData[helper.blockToString block]


module.exports = new Helper()