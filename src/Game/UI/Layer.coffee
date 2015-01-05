BlockSelector = require './BlockSelector.coffee'
ModeSelector = require './ModeSelector.coffee'
RoomSelector = require './RoomSelector.coffee'
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

		@modeSelector = new ModeSelector modeDiv 
		@blockSelector = new BlockSelector blockDiv 
		@roomSelector = new RoomSelector roomDiv 

module.exports = Layer