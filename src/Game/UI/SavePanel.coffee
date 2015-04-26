view = require './SavePanel.html'
Storage = require 'Game/Storage'

class SavePanel
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view()
		$(@container).find('button').click (e) ->
			Storage.set()


module.exports = SavePanel