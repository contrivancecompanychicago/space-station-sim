config = require 'Game/config'

State = require 'Game/State'

module.exports = 
	set: (state)->
		if Game
			# console.log Game.state
			localStorage.setItem config.storage.name, JSON.stringify State
	get: ->
		localStorage.getItem config.storage.name
