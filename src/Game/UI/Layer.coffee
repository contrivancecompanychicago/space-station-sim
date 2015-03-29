BlockSelector = require './BlockSelector.coffee'
ModeSelector = require './ModeSelector.coffee'
RoomSelector = require './RoomSelector.coffee'
SpeedSelector = require './SpeedSelector.coffee'
ItemSelector = require './ItemSelector.coffee'
SavePanel = require './SavePanel.coffee'
Imagine = require 'imagine'
class Layer
	_modes: ['select', 'block', 'room']#for reference
	constructor: (@container) ->
		# console.log "layer"
		modeDiv = document.createElement 'div'
		blockDiv = document.createElement 'div'
		roomDiv = document.createElement 'div'
		speedDiv = document.createElement 'div'
		itemDiv = document.createElement 'div'
		saveDiv = document.createElement 'div'
		@container.appendChild modeDiv
		@container.appendChild blockDiv
		@container.appendChild roomDiv
		@container.appendChild speedDiv
		@container.appendChild itemDiv
		@container.appendChild saveDiv

		@mode = Imagine new ModeSelector modeDiv 
		@block = Imagine new BlockSelector blockDiv 
		@room = Imagine new RoomSelector roomDiv 
		@speed = Imagine new SpeedSelector speedDiv 
		@item = Imagine new ItemSelector itemDiv 
		@save = Imagine new SavePanel saveDiv 

module.exports = Layer