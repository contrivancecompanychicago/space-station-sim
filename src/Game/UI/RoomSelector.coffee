view = require './RoomSelector.html.js'
Imagine = require '../../../bower_components/imagine/imagine.js'

class RoomSelector
	state:
		selected: 'shop'
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			Imagine.notify 'UIRoomSelected'
			@render()



module.exports = RoomSelector