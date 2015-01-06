view = require './ModeSelector.html.js'
Imagine = require '../../../bower_components/imagine/imagine.js'
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
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			Imagine.notify 'UIModeSelected'
			@render()



module.exports = ModeSelector