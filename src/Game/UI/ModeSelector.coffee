view = require './ModeSelector.html.js'

class ModeSelector
	state:
		selected: 'select'
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			@render()



module.exports = ModeSelector