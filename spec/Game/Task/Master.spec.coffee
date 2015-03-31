describe "Game.Task.Master", ->
	beforeEach ->
		@TaskMaster = require 'Game/Task/Master'
		@taskMaster = new @TaskMaster()

	it 'should exist', ->
		expect(@TaskMaster).toBeDefined()
	it 'should have getTasks', ->
		expect(@taskMaster.getTasks).toBeDefined()
	describe 'addTask', ->
		it 'should be defined', ->
			expect(@taskMaster.addTask).toBeDefined()

		