Imagine = require 'bower/imagine/imagine'
config = require 'Game/config'

gbw = config.grid.block.width
gbh = config.grid.block.height
cw = config.canvas.width
ch = config.canvas.height

class Helper
	name: "gridhelper"
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

	addBlock: (pos) ->
		mode = Game.ui.mode.state.selected
		switch mode
			when 'block'
				type = Game.ui.block.state.selected
				obj = {type: type}
				Game.state.gridData[@blockToString(pos)] = obj
			when 'room'
				type = Game.ui.room.state.selected
				obj = {type: 'plain', room:type}
				Game.state.gridData[@blockToString(pos)] = obj
			when 'item'
				block = @blockToString(pos)
				if Game.state.gridData[block]#check if block exists
					type = Game.ui.item.state.selected
					obj = {type:type}
					_.extend obj, ItemTypes[type].defaults
					Game.state.itemData[block] = obj
			
	removeBlock: (pos) ->
		mode = Game.ui.mode.state.selected
		switch mode
			when 'block'
				delete Game.state.gridData[@blockToString(pos)]
				delete Game.state.itemData[@blockToString(pos)]
			when 'room'
				if Game.state.gridData[@blockToString(pos)]
					delete Game.state.gridData[@blockToString(pos)].room
			when 'item'
				delete Game.state.itemData[@blockToString(pos)]

module.exports = Imagine new Helper()