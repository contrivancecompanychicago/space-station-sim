Base = require './Base.coffee'
Character = require '../../Character/Character.coffee'
Imagine = require '../../../../bower_components/imagine/imagine.js'

item = new Base(2, 2)
item.defaults = 
	ship: false
item.render = (context, offset, data) ->
	@.renderImage 'dockspot.png', context, offset
	if data.ship
		@.renderImage 'ship.png', context, offset

module.exports = item



#dock manager

Imagine 
	name: 'dockmanager'
	update: ->
		if Game.state #todo: state not available in first frame?
			for key of Game.state.itemData
				data = Game.state.itemData[key]
				if data.type is "dockingbay"
					# unless data.ship
					unless data.timeTilDock
						data.timeTilDock = 1 + (5*Math.random())
					data.timeTilDock -= Imagine.time.deltaTime * Game.state.timeScale
					if data.timeTilDock <=0
						data.ship = !data.ship
						data.timeTilDock = 1 + (5*Math.random())
						landShip Game.grid.stringToBlock key
						Imagine.notify 'gridStateChanged'





landShip = (block) ->
	Imagine new Character({block})