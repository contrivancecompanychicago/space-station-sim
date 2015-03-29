BlockSelector = require 'Game/UI/BlockSelector'
ModeSelector = require 'Game/UI/ModeSelector'
RoomSelector = require 'Game/UI/RoomSelector'
SpeedSelector = require 'Game/UI/SpeedSelector'
ItemSelector = require 'Game/UI/ItemSelector'
SavePanel = require 'Game/UI/SavePanel'
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