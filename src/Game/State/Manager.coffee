State = require 'Game/State'
Defaults = require 'Game/State/Defaults'
NewGame = require 'Game/State/NewGame'
_ = require 'lodash'

class StateManager extends require 'Singleton'
	@init: ->
		StateManager.clear()
		_.extend State, Defaults
	@clear: ->
		for prop of State
			if State.hasOwnProperty prop
				delete State[prop]
	@newGame: ->
		StateManager.init()
		_.extend State, NewGame

	@loadGame: ->
		StateManager.init()



module.exports = StateManager