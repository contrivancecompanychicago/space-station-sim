Base = require 'Game/Grid/Item/Base'
Imagine = require 'imagine'
#gridhelper = require('Game/Grid/Helper').getInstance()
img = require './dockspot.png'
ship = require './ship.png'
#charHelper = require('Game/Character/Helper').getInstance()

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

