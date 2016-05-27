view = require './RoomSelector.html'
Imagine = require 'imagine'
#Types = require 'Game/Grid/Room/Types'
_ = require 'lodash'
$ = require 'jquery'

State = require 'Game/State'

class RoomSelector extends require 'Mixin'
	@extend require 'DependencyInjector'

	@dependencies({
		types: new @Dependency 'Game/Grid/Room/Types'
	})
	state:
		selected: 'shop'
	constructor: (@container) ->
		super()
		@mode = Imagine.getComponent 'UIModeSelector'
		@render()
	UIModeSelected: ->
		@render()
	render: ->
		@container.innerHTML = view
			state: State.ui.room
			mode: State.ui.mode
			types: _.keys @types
		$(@container).find('button').click (e)=>
			State.ui.room = e.currentTarget.value
			Imagine.notify 'UIRoomSelected'
			@render()



module.exports = RoomSelector