view = require './ItemSelector.html'
Imagine = require 'imagine'
Types = require 'Game/Grid/Item/Types'
_ = require 'lodash'

State = require 'Game/State'

class ItemSelector
	constructor: (@container) ->
		@mode = Imagine.getComponent 'UIModeSelector'
		@render()

	UIModeSelected: ->
		@render()
	render: ->
		@container.innerHTML = view
			state: State.ui.item
			mode: State.ui.mode
			types: _.keys Types
		$(@container).find('button').click (e)=>
			State.ui.item = e.currentTarget.value
			Imagine.notify 'UIItemSelected'
			@render()



module.exports = ItemSelector