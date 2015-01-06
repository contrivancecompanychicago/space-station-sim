view = require './BlockSelector.html.js'
Imagine = require '../../../bower_components/imagine/imagine.js'

class BlockSelector
	state:
		selected: 'plain'
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view(@state)
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			Imagine.notify 'UIBlockSelected'
			@render()



module.exports = BlockSelector