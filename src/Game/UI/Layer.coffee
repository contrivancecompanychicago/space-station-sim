BlockSelector = require './BlockSelector.coffee'
ModeSelector = require './ModeSelector.coffee'
RoomSelector = require './RoomSelector.coffee'
Imagine = require '../../../bower_components/imagine/imagine.js'
class Layer
	_modes: ['select', 'block', 'room']#for reference
	constructor: (@container) ->
		# console.log "layer"
		modeDiv = document.createElement 'div'
		blockDiv = document.createElement 'div'
		roomDiv = document.createElement 'div'
		@container.appendChild modeDiv
		@container.appendChild blockDiv
		@container.appendChild roomDiv

		@mode = Imagine new ModeSelector modeDiv 
		@block = Imagine new BlockSelector blockDiv 
		@room = Imagine new RoomSelector roomDiv 

module.exports = Layer