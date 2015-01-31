view = require './ModeSelector.html'
Imagine = require 'bower/imagine/imagine'
class ModeSelector
	name: 'UIModeSelector'
	state:
		selected: 'block'
	UIBlockSelected: ->
		@state.selected = 'block'
		Imagine.notify 'UIModeSelected'
		@render()
	UIRoomSelected: ->
		@state.selected = 'room'
		Imagine.notify 'UIModeSelected'
		@render()
	UIItemSelected: ->
		@state.selected = 'item'
		Imagine.notify 'UIModeSelected'
		@render()
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			Imagine.notify 'UIModeSelected'
			@render()



module.exports = ModeSelector