# console.log "manager spec turned off"
StateManager = require 'Game/State/Manager'
State = require 'Game/State'
Defaults = require 'Game/State/Defaults'
NewGame = require 'Game/State/NewGame'


defStr = JSON.stringify Defaults
newStr = JSON.stringify NewGame
describe 'Game/State/Manager', ->

	afterEach ->
		StateManager.newGame()


	it 'should extend singleton', ->
		expect(StateManager.getInstance).toBeDefined()
	describe 'init', ->
		it 'should be defined', ->
			expect(StateManager.init).toBeDefined()
		it 'should call clear', ->
			spyOn StateManager, 'clear'
			StateManager.init();
			expect(StateManager.clear).toHaveBeenCalled()
		it 'should set State to Defaults', ->
			StateManager.init()
			expect(JSON.stringify State).toBe JSON.stringify Defaults
	describe 'newGame', ->
		it 'should be defined', ->
			expect(StateManager.newGame).toBeDefined()
		it 'should call init', ->
			spyOn StateManager, 'init'
			StateManager.newGame()
			expect(StateManager.init).toHaveBeenCalled()
		# it 'should combine defaults and newgame', ->
		# 	expect(JSON.stringify )


		it 'should extend state with NewGame'
	describe 'loadGame', ->
		it 'should be defined', ->
			expect(StateManager.loadGame).toBeDefined()
		it 'should call init', ->
			spyOn StateManager, 'init'
			StateManager.loadGame()
			expect(StateManager.init).toHaveBeenCalled()

	describe 'Game State', ->
		it 'should set the variable exposed by Game/State'

	describe 'clear', ->
		it 'should be defined', ->
			expect(StateManager.clear).toBeDefined()
		it 'should turn Game/State to {}', ->
			StateManager.newGame()
			StateManager.clear()
			expect(JSON.stringify State).toBe JSON.stringify {}

	describe 'preserves', ->
		it 'should not have modified defaults', ->
			expect(defStr).toBe JSON.stringify Defaults
		it 'should not have modified NewGame', ->
			expect(newStr).toBe JSON.stringify NewGame
