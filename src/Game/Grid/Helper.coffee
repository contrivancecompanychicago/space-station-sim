

config = require 'Game/config'

gbw = config.grid.block.width
gbh = config.grid.block.height

cw = config.canvas.width
ch = config.canvas.height

class Helper
	blockAtPoint: (point)->
		point = Game.globalToLocal point
		x: Math.floor point.x / gbw
		y: Math.floor point.y / gbh

	blockToString: (pos) ->
		'g'+pos.x+'_'+pos.y
	stringToBlock: (str) ->
		ar = str.substr(1).split '_'
		out = {x: parseInt(ar[0]), y: parseInt(ar[1])}
		# debugger
		out 

module.exports = new Helper()