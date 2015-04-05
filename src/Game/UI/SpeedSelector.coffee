view = require './SpeedSelector.html'
Imagine = require 'imagine'
# Types = require '../Grid/Block/Types.coffee'
_ = require 'underscore'

options = [0, 1, 2, 4]

class TimeSelector
	constructor: (@container) ->
		@mode = Imagine.getComponent 'UIModeSelector'
		@render()
	UIModeSelected: ->
		@render()
	render: ->
		@container.innerHTML = view
			selected: Game.state.timeScale
			options: options
		$(@container).find('button').click (e)=>
			# console.log e.srcElement.value
			Game.state.timeScale = parseInt e.currentTarget.value
			# @state.selected = e.srcElement.value
			# Imagine.notify 'UIBlockSelected'
			@render()



module.exports = TimeSelector