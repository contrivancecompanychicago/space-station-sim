Singleton = require 'Singleton'

describe 'Singleton', ->
	it 'should be defined', ->
		expect(Singleton).toBeDefined()

	describe 'getInstance', ->
		it 'should be defined', ->
			expect(Singleton.getInstance).toBeDefined()
		it 'should return an instance of itself', ->
			ins = new Singleton()
			expect(ins).toBe Singleton.getInstance()