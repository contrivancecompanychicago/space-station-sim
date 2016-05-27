view = require './SpeedSelector.html'
Imagine = require 'imagine'
# Types = require '../Grid/Block/Types.coffee'
_ = require 'lodash'

options = [0, 1, 2, 4]

State = require 'Game/State'
$ = require 'jquery'

class TimeSelector
	constructor: (@container) ->
		@mode = Imagine.getComponent 'UIModeSelector'
		@render()
	UIModeSelected: ->
		@render()
	render: ->
		@container.innerHTML = view
			selected: State.timeScale
			options: options
		$(@container).find('button').click (e)=>
			# console.log e.srcElement.value
			State.timeScale = parseInt e.currentTarget.value
			# @state.selected = e.srcElement.value
			# Imagine.notify 'UIBlockSelected'
			@render()



module.exports = TimeSelector