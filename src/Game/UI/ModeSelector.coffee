view = require './ModeSelector.html.js'

class ModeSelector
	state:
		selected: 'select'
	constructor: (@container) ->
		# console.log "init"
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value



module.exports = ModeSelector