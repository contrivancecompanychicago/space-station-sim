view = require './BlockSelector.html'
Imagine = require 'imagine'
Types = require 'Game/Grid/Block/Types'
_ = require 'lodash'
$ = require 'jquery'

State = require 'Game/State'

class BlockSelector extends require 'Mixin'
	@extend require 'DependencyInjector'

	@dependencies({
		Types: new @Dependency 'Game/Grid/Block/Types'
	})

	constructor: (@container) ->
		super()
		@mode = Imagine.getComponent 'UIModeSelector'
		@render()
	UIModeSelected: ->
		@render()
	render: ->
		@container.innerHTML = view
			state: State.ui.block
			mode: State.ui.mode
			types: _.keys @Types
		$(@container).find('button').click (e)=>
			State.ui.block = e.currentTarget.value
			Imagine.notify 'UIBlockSelected'
			@render()



module.exports = BlockSelector