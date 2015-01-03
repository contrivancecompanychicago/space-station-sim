config = require './config.coffee'

module.exports = 
	set: (state)->
		if Game
			# console.log Game.state
			localStorage.setItem config.storage.name, JSON.stringify Game.state
	get: ->
		localStorage.getItem config.storage.name
