config = require './config.coffee'

class Storage
	@set: ->
		localStorage.setItem config.storage.name, JSON.stringify state
	@get: ->
		localStorage.getItem config.storage.name