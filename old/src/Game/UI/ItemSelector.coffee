view = require './ItemSelector.html'
Imagine = require 'imagine'
_ = require 'lodash'
$ = require 'jquery'

State = require 'Game/State'

class ItemSelector extends require 'Mixin'
	@extend require 'DependencyInjector'

	@dependencies({
		types: new @Dependency 'Game/Grid/Item/Types'
	})

	constructor: (@container) ->
		super()
		@mode = Imagine.getComponent 'UIModeSelector'
		@render()

	UIModeSelected: ->
		@render()
	render: ->
		@container.innerHTML = view
			state: State.ui.item
			mode: State.ui.mode
			types: _.keys @types
		$(@container).find('button').click (e)=>
			State.ui.item = e.currentTarget.value
			Imagine.notify 'UIItemSelected'
			@render()



module.exports = ItemSelector