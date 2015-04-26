# console.log "manager spec turned off"
StateManager = require 'Game/State/Helper'
stateManager = StateManager.getInstance()
State = require 'Game/State'
Defaults = require 'Game/State/Defaults'
NewGame = require 'Game/State/NewGame'

Storage = require 'Game/Storage'

defStr = JSON.stringify Defaults
newStr = JSON.stringify NewGame
describe 'Game/State/Helper', ->

	afterEach ->
		stateManager.newGame()


	it 'should extend singleton', ->
		expect(StateManager.getInstance).toBeDefined()
	describe 'init', ->
		it 'should be defined', ->
			expect(stateManager.init).toBeDefined()
		it 'should call clear', ->
			spyOn stateManager, 'clear'
			stateManager.init();
			expect(stateManager.clear).toHaveBeenCalled()
		it 'should set State to Defaults', ->
			stateManager.init()
			expect(JSON.stringify State).toBe JSON.stringify Defaults
	describe 'newGame', ->
		it 'should be defined', ->
			expect(stateManager.newGame).toBeDefined()
		it 'should call init', ->
			spyOn stateManager, 'init'
			stateManager.newGame()
			expect(stateManager.init).toHaveBeenCalled()

#		it 'should extend state with NewGame'
	describe 'loadGame', ->
		it 'should be defined', ->
			expect(stateManager.loadGame).toBeDefined()
		it 'should call init', ->
			spyOn stateManager, 'init'
			stateManager.loadGame()
			expect(stateManager.init).toHaveBeenCalled()
		it 'should have more than defaults', ->

			Storage.set()
			stateManager.loadGame()

			expect(JSON.stringify State).not.toBe defStr

#		it 'should load something from localstorage'

#		it 'should be implemented in game'


#	describe 'Game State', ->
#		it 'should set the variable exposed by Game/State'

	describe 'clear', ->
		it 'should be defined', ->
			expect(stateManager.clear).toBeDefined()
		it 'should turn Game/State to {}', ->
			stateManager.newGame()
			stateManager.clear()
			expect(JSON.stringify State).toBe JSON.stringify {}

	describe 'preserves', ->
		it 'should not have modified defaults', ->
			expect(defStr).toBe JSON.stringify Defaults
		it 'should not have modified NewGame', ->
			expect(newStr).toBe JSON.stringify NewGame
