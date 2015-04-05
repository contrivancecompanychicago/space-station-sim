view = require './RoomSelector.html'
Imagine = require 'imagine'
Types = require 'Game/Grid/Room/Types'
_ = require 'underscore'

class RoomSelector
	state:
		selected: 'shop'
	constructor: (@container) ->
		@mode = Imagine.getComponent 'UIModeSelector'
		@render()
	UIModeSelected: ->
		@render()
	render: ->
		@container.innerHTML = view
			state: @state
			mode: @mode.state
			types: _.keys Types
		$(@container).find('button').click (e)=>
			@state.selected = e.currentTarget.value
			Imagine.notify 'UIRoomSelected'
			@render()



module.exports = RoomSelector