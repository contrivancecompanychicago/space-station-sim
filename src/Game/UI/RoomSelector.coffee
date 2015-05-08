view = require './RoomSelector.html'
Imagine = require 'imagine'
Types = require 'Game/Grid/Room/Types'
_ = require 'lodash'

State = require 'Game/State'

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
			state: State.ui.room
			mode: State.ui.mode
			types: _.keys Types
		$(@container).find('button').click (e)=>
			State.ui.room = e.currentTarget.value
			Imagine.notify 'UIRoomSelected'
			@render()



module.exports = RoomSelector