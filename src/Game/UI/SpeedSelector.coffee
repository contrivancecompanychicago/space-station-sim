view = require './SpeedSelector.html.js'
Imagine = require '../../../bower_components/imagine/imagine.js'
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
			Game.state.timeScale = parseInt e.srcElement.value
			# @state.selected = e.srcElement.value
			# Imagine.notify 'UIBlockSelected'
			@render()



module.exports = TimeSelector