
StateManager = require 'Game/State/Helper'
stateManager = StateManager.getInstance()
State = require 'Game/State'

TaskHelper = require 'Game/Task/Helper'
taskHelper = TaskHelper.getInstance()
describe "Game/Task/Helper", ->

	it 'should be singleton', ->
		expect(TaskHelper.getInstance).toBeDefined()
	beforeEach ->
		stateManager.newGame()

	it 'should exist', ->
		expect(TaskHelper).toBeDefined()
	it 'should have getTasks', ->
		expect(taskHelper.getTasks).toBeDefined()
	describe 'addTask', ->
		it 'should be defined', ->
			expect(taskHelper.addTask).toBeDefined()
		it 'should add a task to the list', ->
			len = State.taskData.length
			taskHelper.addTask {}
			expect(len+1).toBe State.taskData.length

	describe 'getTasks', ->
		it 'should be defined', ->
			expect(taskHelper.getTasks).toBeDefined()
		it 'should return an array', ->
			expect(Array.isArray taskHelper.getTasks()).toBe true
		it 'should return state.taskdata', ->
			expect(taskHelper.getTasks()).toBe State.taskData

	describe 'task state', ->
		it 'should be defined', ->
			expect(State.taskData).toBeDefined()
		it 'should be an array', ->
			expect(Array.isArray(State.taskData)).toBe(true)

		