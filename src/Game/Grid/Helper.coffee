Imagine = require 'imagine'
_ = require "lodash"
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

class Helper extends require 'Mixin'
	@extend require 'DependencyInjector'
	@extend require 'Singleton'

	@dependencies({
		grid: new @Dependency 'Grid Reference'
	})

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
					console.log "TODO: check surrounding block"
					type = State.ui.item
					obj = {type: type, block: block}
#					_.extend obj, ItemTypes[type].defaults # todo: build this back in
					# make the new item
					# just using block key due to simplified refactoring. Could introduce a bug
					key = block
					State.itemData[key] = obj
					State.gridData[block].item = key
					# two way link from block to item for rendering




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

	# PATHING
	findPathToRoom: (startBlock, type) ->
		rooms = @grid.rooms[type]
		finalPath = false
		pathLen = Infinity
		if rooms.length > 0
			rooms.forEach (room) =>
				unless startBlock
					throw new Error '@block isnt defined'
				block = room.blocks[Math.floor(room.blocks.length*Math.random())]
				unless block
					throw new Error 'block isnt defined'
				path = @grid.path(@block, block)
				if path.length > 0
					if path.length < pathLen
						pathLen = path.length
						finalPath = path
		finalPath
	path: (startBlock, endBlock) ->
		path = @grid.path(startBlock, endBlock)
		if path.length is 0
			return false
		path



	#ret = Imagine new Helper()
module.exports = Helper
