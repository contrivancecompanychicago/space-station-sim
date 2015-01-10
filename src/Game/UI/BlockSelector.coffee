view = require './BlockSelector.html.js'
Imagine = require '../../../bower_components/imagine/imagine.js'
Types = require '../Grid/Block/Types.coffee'
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