view = require './RoomSelector.html.js'
Imagine = require '../../../bower_components/imagine/imagine.js'

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
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			Imagine.notify 'UIRoomSelected'
			@render()



module.exports = RoomSelector