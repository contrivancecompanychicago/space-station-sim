Imagine = require 'imagine'
_ = require "underscore"
config = require 'Game/config'
#ItemTypes = require 'Game/Grid/Item/Types' #circular dependency starts here, affects dockingbay and character
Util = require 'Game/Util'

State = require 'Game/State'

gbw = config.grid.block.width
gbh = config.grid.block.height
cw = config.canvas.width
ch = config.canvas.height

# debugger
#console.log 'initing grid helper'

class Helper extends require 'Singleton'
	name: "gridhelper" #todo: why?
	blockAtPoint: (point)->
		point = Util.globalToLocal point
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
		mode = State.ui.mode
		switch mode
			when 'block'
				type = State.ui.block
				obj = {type: type}
				State.gridData[@blockToString(pos)] = obj
			when 'room'
				type = State.ui.room
				obj = {type: 'plain', room:type}
				State.gridData[@blockToString(pos)] = obj
			when 'item'
				block = @blockToString(pos)
				if State.gridData[block]#check if block exists
					type = State.ui.item
					obj = {type:type}
#					_.extend obj, ItemTypes[type].defaults # todo: build this back in
					State.itemData[block] = obj
			
	removeBlock: (pos) ->
		mode = State.ui.mode
		switch mode
			when 'block'
				delete State.gridData[@blockToString(pos)]
				delete State.itemData[@blockToString(pos)]
			when 'room'
				if State.gridData[@blockToString(pos)]
					delete State.gridData[@blockToString(pos)].room
			when 'item'
				delete State.itemData[@blockToString(pos)]


	# returns adjacent block data
	adjacentBlocks: (block) ->
		# debugger
		combos = [
			{x: -1, y:0}
			{x: 1, y:0}
			{x: 0, y:-1}
			{x: 0, y:1}
			]
		out = []
		combos.forEach (combo) =>
			bl = 
				x: block.x + combo.x
				y: block.y + combo.y
			key = helper.blockToString bl
			val = State.gridData[key]
			if val
				type = BlockTypes[val.type]
				unless type.isWall
					bl.data = val
					out.push bl
		out

	randomBlock: ->
		keys = _.keys State.gridData
		if keys.length is 0
			throw new error 'no block'
		key = keys[Math.floor(Math.random()*keys.length)]; #random key
		# if BlockTypes[State.gridData[key].type].isWall
		# 	return @randomBlock() # try again
		@stringToBlock key

#ret = Imagine new Helper()
module.exports = Helper