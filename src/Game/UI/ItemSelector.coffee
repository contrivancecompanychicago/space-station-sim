view = require './ItemSelector.html'
Imagine = require 'imagine'
Types = require 'Game/Grid/Item/Types'
_ = require 'underscore'

class ItemSelector
	state:
		selected: 'test'
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
			@state.selected = e.currentTarget.value
			Imagine.notify 'UIItemSelected'
			@render()



module.exports = ItemSelector