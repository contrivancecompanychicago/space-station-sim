view = require './RoomSelector.html.js'

class RoomSelector
	state:
		selected: 'shop'
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			@render()



module.exports = RoomSelector