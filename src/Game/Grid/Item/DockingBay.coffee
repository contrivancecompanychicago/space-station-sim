Base = require './Base.coffee'
Character = require '../../Character/Character.coffee'
Imagine = require '../../../../bower_components/imagine/imagine.js'

item = new Base(2, 2)
item.defaults = 
	ship: false
	waitingFor: 0
	timeTilDock: 3
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
					if data.ship
						if data.waitingFor <=0 #everyone on board!
							data.ship = false
							data.timeTilDock = 4 + (5*Math.random())
							Imagine.notify 'itemStateChanged'
					else
						unless data.timeTilDock
							data.timeTilDock = 1 + (5*Math.random())
						data.timeTilDock -= Imagine.time.deltaTime * Game.state.timeScale
						if data.timeTilDock <=0
							data.ship = true
							
							block = Game.grid.stringToBlock key

							num = 1 + Math.floor(Math.random()*4)
							for [1..num]
								char = Imagine new Character({block})
								char.dock = block
							data.waitingFor = num
							Imagine.notify 'itemStateChanged'





landShip = (block) ->