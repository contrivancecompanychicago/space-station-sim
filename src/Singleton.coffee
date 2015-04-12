class Singleton
	@getInstance: ->
		unless @instance
			@instance = new @()
		return @instance

module.exports = Singleton