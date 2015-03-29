view = require './BlockSelector.html'
Imagine = require 'imagine'
Types = require 'Game/Grid/Block/Types'
_ = require 'underscore'

class BlockSelector
	state:
		selected: 'plain'
	constructor: (@container) ->
		@mode = Imagine.getComponent 'UIModeSelector'
		@render()
	UIModeSelected: ->
		@render()
	render: ->
		@container.innerHTML = view
			state: @state
			mode: @mode.state
			types: _.keys Types
		$(@container).find('button').click (e)=>
			@state.selected = e.srcElement.value
			Imagine.notify 'UIBlockSelected'
			@render()



module.exports = BlockSelector