Base = require 'Game/Grid/Item/Base'
Imagine = require 'imagine'
gridhelper = require('Game/Grid/Helper').getInstance()
img = require './dockspot.png'
ship = require './ship.png'
charHelper = require('Game/Character/Helper').getInstance()

State = require 'Game/State'

item = new Base(2, 2)
item.defaults = 
	ship: false
	waitingFor: 0
	timeTilDock: 3
item.render = (context, offset, data) ->
	@.renderImage img, context, offset
	if data.ship
		@.renderImage ship, context, offset

module.exports = item



#dock manager

Imagine 
	name: 'dockmanager'
	update: ->
		Game = require('Game')
		# console.log Game
		if State #todo: state not available in first frame?
			for key of State.itemData
				data = State.itemData[key]
				if data.type is "dockingbay"
					if data.ship
						if data.waitingFor <=0 #everyone on board!
							data.ship = false
							data.timeTilDock = 4 + (50*Math.random())
							Imagine.notify 'itemStateChanged'
					else
						unless data.timeTilDock
							data.timeTilDock = 1 + (5*Math.random())
						data.timeTilDock -= Imagine.time.deltaTime * State.timeScale
						if data.timeTilDock <=0
							data.ship = true
#							console.log gridhelper

							block = gridhelper.stringToBlock key

							num = 1 + Math.floor(Math.random()*4)
							for [1..num]
								char = Imagine charHelper.add({block})
								char.data.dock = block
							data.waitingFor = num
							Imagine.notify 'itemStateChanged'





landShip = (block) ->