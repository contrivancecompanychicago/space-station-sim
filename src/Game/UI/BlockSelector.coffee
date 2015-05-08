view = require './BlockSelector.html'
Imagine = require 'imagine'
Types = require 'Game/Grid/Block/Types'
_ = require 'lodash'

State = require 'Game/State'

class BlockSelector
	constructor: (@container) ->
		@mode = Imagine.getComponent 'UIModeSelector'
		@render()
	UIModeSelected: ->
		@render()
	render: ->
		@container.innerHTML = view
			state: State.ui.block
			mode: State.ui.mode
			types: _.keys Types
		$(@container).find('button').click (e)=>
			State.ui.block = e.currentTarget.value
			Imagine.notify 'UIBlockSelected'
			@render()



module.exports = BlockSelector