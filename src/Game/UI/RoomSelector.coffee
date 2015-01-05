view = require './RoomSelector.html.js'

class RoomSelector
	state:
		selected: 'shop'
	constructor: (@container) ->
		# console.log "init"
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value



module.exports = RoomSelector