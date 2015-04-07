
StateManager = require 'Game/State/Manager'
State = require 'Game/State'
describe "Game.Task.Master", ->
	beforeEach ->
		StateManager.newGame()
		@TaskMaster = require 'Game/Task/Master'
		@taskMaster = new @TaskMaster()

	it 'should exist', ->
		expect(@TaskMaster).toBeDefined()
	it 'should have getTasks', ->
		expect(@taskMaster.getTasks).toBeDefined()
	describe 'addTask', ->
		it 'should be defined', ->
			expect(@taskMaster.addTask).toBeDefined()
		it 'should add a task to the list', ->
			len = State.tasks.length
			@TaskMaster.addTask {}
			expect(len+1).toBe State.tasks.length

	describe 'task state', ->
		it 'should be defined', ->
			expect(State.tasks).toBeDefined()
		it 'should be an array', ->
			expect(Array.isArray(State.tasks)).toBe(true)

		