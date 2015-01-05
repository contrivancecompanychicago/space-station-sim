view = require './BlockSelector.html.js'

class BlockSelector
	state:
		selected: 'plain'
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			@render()



module.exports = BlockSelector