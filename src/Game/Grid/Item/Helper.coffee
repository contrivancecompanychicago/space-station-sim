helper = require('Game/Grid/Helper').getInstance()
State = require 'Game/State'
class Helper
	name: 'itemhelper'
	getByBlock: (block) -> State.itemData[helper.blockToString block]


module.exports = new Helper()