
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
			len = State.taskData.length
			@taskMaster.addTask {}
			expect(len+1).toBe State.taskData.length

	describe 'getTasks', ->
		it 'should be defined', ->
			expect(@taskMaster.getTasks).toBeDefined()
		it 'should return an array', ->
			expect(Array.isArray @taskMaster.getTasks()).toBe true
		it 'should return state.taskdata', ->
			expect(@taskMaster.getTasks()).toBe State.taskData

	describe 'task state', ->
		it 'should be defined', ->
			expect(State.taskData).toBeDefined()
		it 'should be an array', ->
			expect(Array.isArray(State.taskData)).toBe(true)

		