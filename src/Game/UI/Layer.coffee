bs = require './BlockSelector.coffee'
class Layer
	constructor: (@container) ->
		# console.log "layer"
		@blockSelector = new bs @container 

module.exports = Layer