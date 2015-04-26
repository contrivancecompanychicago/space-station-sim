class Singleton
	@getInstance: ->
		unless @instance
			@instance = new @()
		return @instance
	constructor: ->
		@constructor.instance = @

module.exports = Singleton