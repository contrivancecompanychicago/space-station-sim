describe "Game.Task.Master", ->
	klass = require 'Game/Task/Master'
	it 'should exist', ->
		expect(klass).toBeDefined()
	it 'should have getTasks', ->
		master = new klass()
		expect master.toBeDefined()
	it 'should addTasks'

		