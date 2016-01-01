State = require 'Game/State'
Defaults = require 'Game/State/Defaults'
NewGame = require 'Game/State/NewGame'
_ = require 'lodash'
Storage = require 'Game/Storage'



class StateManager extends require 'Singleton'
	init: ->
		window.state = State #DEBUG
		@clear()
		_.merge State, Defaults
	clear: ->
		for prop of State
			if State.hasOwnProperty prop
				delete State[prop]
	newGame: ->
		@init()
		_.merge State, NewGame

	loadGame: ->
		@init()
		_.extend State, JSON.parse Storage.get()



module.exports = StateManager
