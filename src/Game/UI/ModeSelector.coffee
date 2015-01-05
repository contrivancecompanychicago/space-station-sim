view = require './ModeSelector.html.js'

class ModeSelector
	state:
		selected: 'block'
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			@render()



module.exports = ModeSelector