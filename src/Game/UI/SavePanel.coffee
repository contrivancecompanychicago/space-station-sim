view = require './SavePanel.html'

class SavePanel
	constructor: (@container) ->
		@render()
	render: ->
		@container.innerHTML = view()
		$(@container).find('button').click (e) ->
			Game.save()


module.exports = SavePanel