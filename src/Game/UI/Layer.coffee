BlockSelector = require './BlockSelector.coffee'
ModeSelector = require './ModeSelector.coffee'
RoomSelector = require './RoomSelector.coffee'
SpeedSelector = require './SpeedSelector.coffee'
Imagine = require '../../../bower_components/imagine/imagine.js'
class Layer
	_modes: ['select', 'block', 'room']#for reference
	constructor: (@container) ->
		# console.log "layer"
		modeDiv = document.createElement 'div'
		blockDiv = document.createElement 'div'
		roomDiv = document.createElement 'div'
		speedDiv = document.createElement 'div'
		@container.appendChild modeDiv
		@container.appendChild blockDiv
		@container.appendChild roomDiv
		@container.appendChild speedDiv

		@mode = Imagine new ModeSelector modeDiv 
		@block = Imagine new BlockSelector blockDiv 
		@room = Imagine new RoomSelector roomDiv 
		@speed = Imagine new SpeedSelector speedDiv 

module.exports = Layer