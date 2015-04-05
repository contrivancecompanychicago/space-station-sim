view = require './ModeSelector.html'
Imagine = require 'imagine'

State = require 'Game/State'

class ModeSelector
	name: 'UIModeSelector'
	state:
		selected: 'block'
	UIBlockSelected: ->
		State.ui.mode = 'block'
		Imagine.notify 'UIModeSelected'
		@render()
	UIRoomSelected: ->
		State.ui.mode = 'room'
		Imagine.notify 'UIModeSelected'
		@render()
	UIItemSelected: ->
		State.ui.mode = 'item'
		Imagine.notify 'UIModeSelected'
		@render()
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view({selected: State.ui.mode})
		$(@container).find('button').click (e)=>
			State.ui.mode = e.currentTarget.value
			Imagine.notify 'UIModeSelected'
			@render()



module.exports = ModeSelector